import { Publisher } from "./abstractPublisher";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticketCreatedEvent";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject= Subjects.TicketCreated;

}