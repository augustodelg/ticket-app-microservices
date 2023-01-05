import { OrderStatus } from "@tacket/common";
import { Order, OrderAttrs, OrderDoc } from "../models/orders";
import { TicketDoc } from "../models/tickets";


class OrderService {

    public async findById(orderId: number | string): Promise<OrderDoc | null> {
        return await Order.findById(orderId).populate('ticket');
    }

    public async existing(ticket: TicketDoc): Promise<boolean> {
        const existingOrder = await Order.findOne({
            ticket: {_id: ticket._id},
            status: {
                $in: [
                    OrderStatus.Created,
                    OrderStatus.AwaitingPayment,
                    OrderStatus.Complete
                ]
            }
        });
        console.log('EXISTING ORDER', existingOrder);
        
        return !!existingOrder;
    }

    public async userOrders(userId: number | string): Promise<OrderDoc[]> {
        return Order.find({ userId }).populate('ticket');
    }

    public async create(attrs: OrderAttrs): Promise<OrderDoc> {
        const order = Order.build({
            userId: attrs.userId,
            status: attrs.status,
            expiresAt: attrs.expiresAt,
            ticket: attrs.ticket
        })
        
        
        await order.save();

        
        return order;
    }

}
export default new OrderService();