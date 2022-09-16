import { Listener, OrderCancelledEvent, OrderStatus, Subjects } from "@tacket/common";
import { Message } from "node-nats-streaming";
import orderService from "../../services/orderService";
import { queueGroupName } from "./queueGroupName";


export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;


    async onMessage(data: OrderCancelledEvent['data'], msg: Message): Promise<void> {
        const { id, version } = data;
        const order = await orderService.findByIdAndVersion(id, version);

        if (!order) {
            throw new Error('Order not foud');
        }

        order.set({ status: OrderStatus.Cancelled });
        await order.save();
        msg.ack();
    }
}