import {Publisher, Subjects, TicketUpdatedEvent} from '@tacket/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    readonly subject= Subjects.TicketUpdated;
    
}