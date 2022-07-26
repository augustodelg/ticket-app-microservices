import { requireAuth, OrderStatus } from '@tacket/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { OrderCancelledPublisher } from '../events/publishers/orderCancelledPublisher';
import { handleOwnOrder } from '../middlewares/handleOwnOrder';
import { natsWrapper } from '../natsWrapper';

const router = express.Router();

router.patch('/api/orders/:orderId', requireAuth,
    [
        body('orderId')
            .not()
            .isEmpty()
            .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
            .withMessage('TicketId must be provided or is invalid')
    ],
    handleOwnOrder,
    async (req: Request, res: Response) => {
        req.order!.status = OrderStatus.Cancelled;
        await req.order!.save();

        new OrderCancelledPublisher(natsWrapper.client).publish({
            id: req.order!.id,
            version: req.order!.version,
            ticket: {
                id: req.order!.ticket.id
            }
        });


        res.status(204).send(req.order)
    });

export { router as deleteOrderRouter };