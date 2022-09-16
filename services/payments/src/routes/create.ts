import { BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus, requireAuth, validateRequest } from '@tacket/common';
import express, { Request, Response } from 'express';
import OrderService from "../services/orderService";
import { stripe } from '../stripe';
import { body } from 'express-validator';
import PaymentService from '../services/paymentService';
import { PaymentCreatedPublisher } from '../events/publishers/paymentCreatedPublisher';
import { natsWrapper } from '../natsWrapper';

const router = express.Router();


router.post('/api/payments', requireAuth,
    [
        body('token')
            .not()
            .isEmpty(),
        body('orderId')
            .not()
            .isEmpty()
    ], validateRequest,
    async (req: Request, res: Response) => {
        const { token, orderId } = req.body;

        const order = await OrderService.findById(orderId);
        if (!order) {
            throw new NotFoundError();
        }
        if (order.userId !== req.currentUser!.id){
            throw new NotAuthorizedError();
        }
        if (order.status == OrderStatus.Cancelled){
            throw new BadRequestError('The order has been cancelled');
        }

        const charge = await stripe.charges.create({
            amount: order.price * 100,
            currency: 'usd',
            source: token,
            description: `ORDER: ${orderId} created for USER: ${req.currentUser?.email}`,
          });
        
          const payment = await PaymentService.create({
            stripeId:charge.id,
            orderId: order.id
          });

          new PaymentCreatedPublisher(natsWrapper.client).publish({
            id: payment.id,
            orderId: payment.orderId,
            stripeId: payment.stripeId
          })
        
        res.status(201).send({ id: payment.id })
    })

export { router as createChargeRouter }