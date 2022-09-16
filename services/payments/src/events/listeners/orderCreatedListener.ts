import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@tacket/common";
import { Message } from "node-nats-streaming";
import OrderService from "../../services/orderService";
import { queueGroupName } from "./queueGroupName";


export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroupName= queueGroupName;
    async onMessage(data: OrderCreatedEvent['data'], msg: Message): Promise<void> {
        const order = await OrderService.create({
            id: data.id,
            status: data.status,
            userId: data.userId,
            price: data.ticket.price,
            version: data.version
        });
        msg.ack();
    }
    
}
