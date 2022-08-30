import { Publisher, Subjects, OrderCancelledEvent } from "@tacket/common";


export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}