import { PaymentCompletedEvent, Publisher, Subjects } from "@tacket/common";


export class PaymentCompletedPublisher extends Publisher<PaymentCompletedEvent>{
    readonly subject = Subjects.PaymentCompleted;
}