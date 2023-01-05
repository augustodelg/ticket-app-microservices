import { BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus, requireAuth, validateRequest } from '@tacket/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { PaymentCreatedPublisher } from '../events/publishers/paymentCreatedPublisher';
import { PaymentDoc } from '../models/payments';
import { natsWrapper } from '../natsWrapper';
import OrderService from '../services/orderService';
import PaymentService from '../services/paymentService';
import { stripe } from '../stripe';
const router = express.Router();


router.post('/api/payments/intent', requireAuth,
    [
        body('orderId')
            .not()
            .isEmpty()
    ], validateRequest, async (req: Request, res: Response) => {
        const { orderId } = req.body;

        const order = await OrderService.findById(orderId);
        if (!order) {
            throw new NotFoundError();
        }
        if (order.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }
        if (order.status == OrderStatus.Cancelled) {
            throw new BadRequestError('The order has been cancelled');
        }
        if (order.status == OrderStatus.AwaitingPayment) {
            const payment = await PaymentService.findByOrderId(order.id);
            const paymentIntent = await stripe.paymentIntents.retrieve(payment!.stripeId);
            res.status(201).send({ clientSecret: paymentIntent.client_secret })
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: order.price * 100,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            description: `ORDER: ${orderId} created for USER: ${req.currentUser?.email}`,
        });
        // I think i will be more 
        order.set({
            status: OrderStatus.AwaitingPayment
        })
        await order.save()

        console.log('Payment Intent!', paymentIntent);
        const payment = await PaymentService.create({
            stripeId: paymentIntent.id,
            orderId: order.id
        });

        new PaymentCreatedPublisher(natsWrapper.client).publish({
             id: payment.id,
             orderId: payment.orderId,
             stripeId: payment.stripeId
           })


        res.status(201).send({ clientSecret: paymentIntent.client_secret, })
    })

export { router as paymentIntentRouter }