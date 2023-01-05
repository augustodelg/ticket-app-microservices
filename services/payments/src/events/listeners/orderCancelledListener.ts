import { Listener, OrderCancelledEvent, OrderStatus, Subjects } from "@tacket/common";
import { Message } from "node-nats-streaming";
import orderService from "../../services/orderService";
import PaymentService from "../../services/paymentService";
import { stripe } from "../../stripe";
import { queueGroupName } from "./queueGroupName";

import { natsWrapper } from "../../natsWrapper";
import { PaymentCompletedPublisher } from "../publishers/paymentCompletedPublisher";
import { StripePaymentIntentStatus } from "../../types/stripe.types";


export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;


    async onMessage(data: OrderCancelledEvent['data'], msg: Message): Promise<void> {
        const { id, version } = data;
        console.log(data);
        console.log('ORDERS EN PAYMENTS SERVICE: ', await orderService.findById(id));
        const order = await orderService.findByIdAndVersion(id, version);
        

        if (!order) {
            throw new Error('Order not foud');
        }

        order.set({ status: OrderStatus.Cancelled });
        await order.save();

        const payment = await PaymentService.findByOrderId(order.id);
        if (!payment) {
            throw new Error('Payment not found');
        }
        try {
            await stripe.paymentIntents.cancel(payment.stripeId);
            await payment.remove();
        } catch (err) {
            const paymentIntent = await stripe.paymentIntents.retrieve(payment.stripeId);
            if (paymentIntent.status === StripePaymentIntentStatus.SUCCEEDED) {
                order.set({ status: OrderStatus.Complete });
                await order.save();
                new PaymentCompletedPublisher(natsWrapper.client).publish({
                    id: payment!.id,
                    orderId: payment!.orderId,
                    stripeId: payment!.stripeId
                });
            }
        }
        msg.ack();
    }
}