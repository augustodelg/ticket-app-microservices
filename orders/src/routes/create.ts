import mongoose from 'mongoose';
import { requireAuth } from '@tacket/common';
import express, { Request, Response } from 'express';
import { body } from "express-validator";
const router = express.Router();

router.post('/api/orders', requireAuth, [
    body('ticketId')
        .not()
        .isEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage('TicketId must be provided or is invalid')
], async (req: Request, res: Response) => {
    res.send({})
});

export { router as createOrderRouter };