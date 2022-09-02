import {Publisher, Subjects, TicketCreatedEvent} from '@tacket/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    readonly subject= Subjects.TicketCreated;
    
}