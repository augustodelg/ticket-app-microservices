import { BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus, requireAuth, validateRequest } from '@tacket/common';
import express, { Request, Response } from 'express';
import OrderService from "../services/orderService";
import { stripe } from '../stripe';
import { body } from 'express-validator';
import PaymentService from '../services/paymentService';
import { PaymentCreatedPublisher } from '../events/publishers/paymentCreatedPublisher';
import { natsWrapper } from '../natsWrapper';
import { StripePaymentIntentEvents } from '../types/stripe.types';
import Stripe from 'stripe';
import { PaymentCompletedPublisher } from '../events/publishers/paymentCompletedPublisher';

const router = express.Router();

const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;

router.post('/api/payments/confirm',
    express.raw({ type: 'application/json' }),
    async (req: Request, res: Response) => {
        let event = req.body;
        if (endpointSecret) {
            const signature = req.headers['stripe-signature'];
            try {
                event = stripe.webhooks.constructEvent(
                    req.body,
                    signature!,
                    endpointSecret
                )
            } catch (err) {
                console.error(err);
                
                throw new BadRequestError(`⚠️  Webhook signature verification failed.`);
            }
        }
        
        const payment = await PaymentService.findByStripeId(event.data.object.id);
        if (!payment) {
            throw new NotFoundError();
        }
        
        
        const order = await OrderService.findById(payment.orderId);
        if (!order) {
            throw new NotFoundError();
        }
        if (order.status == OrderStatus.Cancelled) {
            throw new BadRequestError('The order has been cancelled');
        }

        //const charge = await stripe.paymentIntents.confirm(event.object.id);
        switch (event.type) {
            case StripePaymentIntentEvents.PAYMENT_SUCCEEDED:
                order.set({ status: OrderStatus.Complete });
                await order.save();
                new PaymentCompletedPublisher(natsWrapper.client).publish({
                    id: payment!.id,
                    orderId: payment!.orderId,
                    stripeId: payment!.stripeId
                });
                
                break;
            default:
                // Unexpected event type
                console.log(`Unhandled event type ${event.type}.`);
        }

        
        res.status(201).send({ id: 'Ok thanks :)' })
    })

export { router as confirmPaymentRouter }