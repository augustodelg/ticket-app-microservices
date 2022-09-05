import { Listener, OrderCancelledEvent, Subjects } from "@tacket/common";
import { Message } from "node-nats-streaming";
import TicketService from "../../services/ticketService";
import { TicketUpdatedPublisher } from "../publishers/ticketUpdatedPublisher";
import { queueGroupName } from "./queueGroupName";


export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
    readonly subject = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
        const ticket = await TicketService.findById(data.ticket.id);

        if (!ticket) {
            throw new Error('Ticket not found');
        }

        await TicketService.update(ticket, {
            orderId: undefined
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
