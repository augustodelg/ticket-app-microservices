import { BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus, requireAuth, validateRequest } from '@tacket/common';
import express, { Request, Response } from 'express';
import OrderService from "../services/orderService";
import { stripe } from '../stripe';
import { body } from 'express-validator';
import PaymentService from '../services/paymentService';
import { PaymentCreatedPublisher } from '../events/publishers/paymentCreatedPublisher';
import { natsWrapper } from '../natsWrapper';
import { PaymentCompletedPublisher } from '../events/publishers/paymentCompletedPublisher';

const router = express.Router();


router.post('/api/payments', requireAuth,
    requireAuth,
    [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
    validateRequest,
    async (req: Request, res: Response) => {
        const { token, orderId } = req.body;

        const order = await OrderService.findById(orderId);

        if (!order) {
            throw new NotFoundError();
        }
        if (order.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }
        if (order.status === OrderStatus.Cancelled) {
            throw new BadRequestError('Cannot pay for an cancelled order');
        }
        if (order.status === OrderStatus.Complete) {
            throw new BadRequestError('Cannot pay an completed order');
        }

        const charge = await stripe.charges.create({
            metadata: {
                userId: req.currentUser!.id,
                orderId: orderId
            },
            currency: 'usd',
            amount: order.price * 100,
            source: token,
            description: `ORDER: ${orderId} created for USER: ${req.currentUser?.email}`,
        });
        console.log('CHARGEEEEE', charge);

        const payment = await PaymentService.create({
            stripeId: charge.id,
            orderId: order.id
        });

        order.set({
            status: OrderStatus.Complete
        });
        await order.save();

        new PaymentCompletedPublisher(natsWrapper.client).publish({
            id: payment.id,
            orderId: payment.orderId,
            stripeId: payment.stripeId
        });


        res.status(201).send({ id: payment.id })

    })

export { router as createChargeRouter }