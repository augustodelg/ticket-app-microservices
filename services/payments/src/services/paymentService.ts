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

}

export default new PaymentService();