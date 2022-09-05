import express, { Request, Response } from "express";
import { requireAuth, validateRequest, NotFoundError, NotAuthorizedError, BadRequestError } from "@tacket/common";
import { body } from "express-validator";
import { Ticket } from "../models/tickets";
import { TicketUpdatedPublisher } from "../events/publishers/ticketUpdatedPublisher";
import { natsWrapper } from "../natsWrapper";


const router = express.Router();

router.put('/api/tickets/:id',
    requireAuth,
    [
        body("title")
            .not()
            .isEmpty()
            .withMessage('Title is required'),
        body('price')
            .isFloat({ gt: 0 })
            .not()
            .isEmpty()
            .withMessage('Price must be provided and must be greater than 0')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { title, price } = req.body;
        const ticket = await Ticket.findById(req.params.id)
        if (!ticket) {
            throw new NotFoundError();
        }

        if (ticket.orderId) {
            throw new BadRequestError('Cannot edit a reserved ticket');
        }

        if (ticket.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }
        ticket.set({
            title: title,
            price: price
        });
        await ticket.save()
        await new TicketUpdatedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
            version: ticket.version
        });
        res.send(ticket)
    });

export { router as updateTicketRouter }