import { ExpirationCompleteEvent, Publisher, Subjects } from "@tacket/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    readonly subject = Subjects.ExpirationComplete;
}