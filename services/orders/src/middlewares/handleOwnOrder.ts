import { NotAuthorizedError, NotFoundError } from '@tacket/common';
import { Request, Response, NextFunction } from 'express';
import { OrderDoc } from '../models/orders';
import orderService from '../services/orderService';

declare global {
    namespace Express {
        interface Request {
            order?: OrderDoc;
        }
    }
}

export async function handleOwnOrder(req: Request, res: Response, next: NextFunction) {
    const order = await orderService.findById(req.params.orderId);

    if (!order) throw new NotFoundError();

    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

    req.order = order;
    
    next();
}