
import {Listener, Subjects, TicketCreatedEvent} from '@tacket/common';
import { Message } from 'node-nats-streaming';
import TicketService from '../../services/ticketService';
import { queueGroupName } from './queueGroupNames';

export class TicketCreatedListener extends Listener<TicketCreatedEvent>{
    readonly subject = Subjects.TicketCreated;
    queueGroupName = queueGroupName;
    
    async onMessage(data: TicketCreatedEvent['data'], msg: Message): Promise<void> {
        const { id, title, price } = data;

        TicketService.create({
            id,
            title,
            price
        });
        
        msg.ack();
    }
    

}