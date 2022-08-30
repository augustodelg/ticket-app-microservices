
import { Ticket, TicketAttrs, TicketDoc } from "../models/tickets";


class TicketService {

    public async findById(ticketId: number | string): Promise<TicketDoc | null> {
        return await Ticket.findById(ticketId);
    }



    public async create(attrs: TicketAttrs): Promise<TicketDoc> {
        const ticket = Ticket.build(attrs);
        await ticket.save();
        return ticket;
    }

}
export default new TicketService();