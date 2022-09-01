import mongoose from 'mongoose';
import { BadRequestError, NotFoundError, OrderStatus, requireAuth } from '@tacket/common';
import express, { Request, Response } from 'express';
import { body } from "express-validator";
import { Ticket } from '../models/tickets';
import { Order } from '../models/orders';
import OrderService from '../services/orderService';
import { EXPIRATION_WINDOW_SECONDS } from '../config/general';
import { OrderCreatedPublisher } from '../events/publishers/orderCreatedPublisher';
import { natsWrapper } from '../natsWrapper';
const router = express.Router();

router.post('/api/orders', requireAuth, [
    body('ticketId')
        .not()
        .isEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage('TicketId must be provided or is invalid')
], async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    // Find the ticket the user is trying to order
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) throw new NotFoundError()

    // Make sure that this ticket is not alredy order
    const existingOrder = await OrderService.existing(ticket)
    if (existingOrder) {
        throw new BadRequestError('Ticket is alredy reserved');
    }
    // Calculate and expiration date for the order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)
    // Build the order and save it to the database
    const order = await OrderService.create({
        userId: req.currentUser!.id,
        status: OrderStatus.Created,
        expiresAt: expiration,
        ticket
    })
    // Publish an event saying that an order was created
    new OrderCreatedPublisher(natsWrapper.client).publish({
        id: order.id,
        version: order.version,
        status: order.status,
        userId: order.userId,
        expiresAt: order.expiresAt.toISOString(),
        ticket: {
          id: ticket.id,
          price: ticket.price,
        },
      });
  

    res.status(201).send(order);
});

export { router as createOrderRouter };