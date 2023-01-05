export enum StripePaymentIntentEvents {
    PAYMENT_FAILED= 'payment_intent.payment_failed',
    PAYMENT_SUCCEEDED = 'payment_intent.succeeded',
}

export enum StripePaymentIntentStatus {
    SUCCEEDED = 'succeeded',
    REQUIRES_PAYMENT_METHOD = 'requires_payment_method',
    REQUIRES_CONFIRMATION = 'requires_confirmation',
    REQUIRES_ACTION = 'requires_action',
    PROCESSING = 'processing',
    CANCELED = 'canceled',
    REQUIRES_CAPTURE = 'requires_capture',
}
