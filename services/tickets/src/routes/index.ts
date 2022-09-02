import express, { Request, Response } from 'express';
import { Ticket } from '../models/tickets';
import TicketService from '../services/ticketService';

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
  const tickets = await TicketService.find({});

  res.send(tickets);
});

export { router as indexTicketRouter };