import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@tacket/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName;
    onMessage(data: OrderCreatedEvent['data'], msg: Message): void {
        throw new Error("Method not implemented.");
    }

}