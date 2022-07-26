import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@tacket/common";
import { Message } from "node-nats-streaming";
import TicketService from "../../services/ticketService";
import { TicketUpdatedPublisher } from "../publishers/ticketUpdatedPublisher";
import { queueGroupName } from "./queueGroupName";

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName;
    async onMessage(data: OrderCreatedEvent['data'], msg: Message): Promise<void> {
        const ticket = await TicketService.findById(data.ticket.id);

        if (!ticket) {
            throw new Error('Ticket not found');
        }

        await TicketService.update(ticket, {
            orderId: data.id
        });
        new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            version: ticket.version,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
            orderId: ticket.orderId
        })
        
        msg.ack();
    }

}