import { Listener, OrderStatus, PaymentCreatedEvent, Subjects } from "@tacket/common";
import { Message } from "node-nats-streaming";
import OrderService from "../../services/orderService";
import { queueGroupName } from "./queueGroupName";


export class PaymentCreatedListener extends Listener<PaymentCreatedEvent>{
    queueGroupName= queueGroupName;
    readonly subject = Subjects.PaymentCreated;

    async onMessage(data: PaymentCreatedEvent['data'], msg: Message): Promise<void> {
        const order = await OrderService.findById(data.orderId);

        if (!order) {
            throw new Error('Order Not Found');
        }

        order.set({
            status: OrderStatus.AwaitingPayment
        });

        await order.save();

        msg.ack();
    }
}