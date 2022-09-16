import { ExpirationCompleteEvent, Listener, OrderStatus, Subjects } from "@tacket/common";
import { Message } from "node-nats-streaming";
import OrderService from "../../services/orderService";
import { OrderCancelledPublisher } from "../publishers/orderCancelledPublisher";
import { queueGroupName } from "./queueGroupName";


export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent>{
    readonly subject= Subjects.ExpirationComplete;
    queueGroupName = queueGroupName;
    async onMessage(data: ExpirationCompleteEvent['data'], msg: Message): Promise<void> {
        const order = await OrderService.findById(data.orderId);
        if (!order) {
            throw new Error('Order not found')
        }

        if (order.status === OrderStatus.Complete){
            return msg.ack();
        }
        order.set({
            status: OrderStatus.Cancelled,
        })
        await order.save();
        await new OrderCancelledPublisher(this.client).publish({
            id: order.id,
            version: order.version,
            ticket:{
                id:order.ticket.id,
            }
        });
        msg.ack();
    }

}