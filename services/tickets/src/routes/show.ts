import express, { Request, Response } from "express";
import { NotFoundError } from "@tacket/common";

import { Ticket } from "../models/tickets";
import TicketService from "../services/ticketService";


const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
    const ticket = await TicketService.findById(req.params.id);
    
    if (!ticket) {
      throw new NotFoundError();
    }
  
    res.status(200).send(ticket);
})

export { router as showTicketRouter };