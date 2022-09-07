import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@tacket/common";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expirationQueue";
import { queueGroupName } from './queueGroupName';


export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName
    async onMessage(data: OrderCreatedEvent['data'], msg: Message): Promise<void> {
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
        console.log('Waiting milliseconds',delay);
        
        await expirationQueue.add({
            orderId: data.id
        },
        {
            delay
        }
        );
        msg.ack();
    }

}