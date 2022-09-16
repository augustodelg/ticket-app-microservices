import { PaymentCreatedEvent, Publisher, Subjects } from "@tacket/common";


export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    readonly subject = Subjects.PaymentCreated;
}