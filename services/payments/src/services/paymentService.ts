import { Payment, PaymentDoc, PaymentsAttrs } from "../models/payments";


class PaymentService {

    public async create(attrs: PaymentsAttrs): Promise<PaymentDoc> {
        const payment = new Payment({
            orderId: attrs.orderId,
            stripeId: attrs.stripeId
        });

        await payment.save()
        return payment;
    }

    public async findByOrderId(orderId: string): Promise<PaymentDoc | null> {
        return await Payment.findOne({ orderId: orderId });
    }

    public async findByStripeId(stripeId: string): Promise<PaymentDoc | null> {
        return await Payment.findOne({ stripeId: stripeId });
    }

}

export default new PaymentService();