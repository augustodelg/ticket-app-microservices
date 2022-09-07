
import { Listener, Subjects, TicketUpdatedEvent } from '@tacket/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/tickets';
import TicketService from '../../services/ticketService';
import { queueGroupName } from './queueGroupName';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent>{
    readonly subject = Subjects.TicketUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: TicketUpdatedEvent['data'], msg: Message): Promise<void> {
        const { id, title, price, version } = data;

        const ticket = await TicketService.findByIdAndVersion(id, version);
        if (!ticket) {
            throw new Error("Ticket not found");
        }
        ticket.set({ title, price });
        await ticket.save();
        msg.ack();
    }


}