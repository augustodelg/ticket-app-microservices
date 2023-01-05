import { Listener, OrderStatus, PaymentCompletedEvent, Subjects } from "@tacket/common";
import { Message } from "node-nats-streaming";
import OrderService from "../../services/orderService";
import { queueGroupName } from "./queueGroupName";


export class PaymentCompletedListener extends Listener<PaymentCompletedEvent>{
    queueGroupName = queueGroupName;
    readonly subject = Subjects.PaymentCompleted;

    async onMessage(data: PaymentCompletedEvent['data'], msg: Message): Promise<void> {
        const order = await OrderService.findById(data.orderId);
        console.log('ORDER DESDE ORDER SERVICE', order);
        
        if (!order) {
            throw new Error('Order Not Found');
        }

        order.set({
            status: OrderStatus.Complete
        });

        await order.save();

        msg.ack();
    }
}