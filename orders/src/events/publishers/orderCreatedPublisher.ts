import { Publisher, Subjects, OrderCreatedEvent } from "@tacket/common";


export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}