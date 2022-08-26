import { NotAuthorizedError, NotFoundError, requireAuth } from '@tacket/common';
import { body } from "express-validator";
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import orderService from '../services/orderService';
import { handleOwnOrder } from '../middlewares/handleOwnOrder';

const router = express.Router();

router.get('/api/orders/:orderId',
    requireAuth,
    [
        body('orderId')
        .not()
        .isEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage('TicketId must be provided or is invalid'),
        handleOwnOrder
    ], async (req: Request, res: Response) => {
        res.send(req.order)
});

export { router as showOrderRouter };