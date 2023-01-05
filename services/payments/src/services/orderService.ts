import { Order, OrderAttrs, OrderDoc } from "../models/orders";

class OrderService {

    public async findById(orderId: number | string): Promise<OrderDoc | null> {
        return await Order.findById(orderId);
    }


    public async findByIdAndVersion(orderId: string, orderVersion: number): Promise<OrderDoc | null> {
        return await Order.findOne({
            _id: orderId,
            version: orderVersion - 1
        });
    }


    public async create(attrs: OrderAttrs): Promise<OrderDoc> {
        const order = Order.build({
            id: attrs.id,
            userId: attrs.userId,
            status: attrs.status,
            price: attrs.price,
            version: attrs.version
        })
        
        await order.save();

        return order;
    }

}
export default new OrderService();