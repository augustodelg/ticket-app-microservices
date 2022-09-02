
import { Ticket, TicketAttrs, TicketDoc } from "../models/tickets";


class TicketService {

    public async findById(ticketId: string): Promise<TicketDoc | null> {
        return await Ticket.findById(ticketId);
    }

    public async findByIdAndVersion(ticketId: string, ticketVersion: number): Promise<TicketDoc | null> {
        return await Ticket.findOne({
            _id: ticketId,
            version: ticketVersion - 1
        });
    }

    public async create(attrs: TicketAttrs): Promise<TicketDoc> {
        const ticket = Ticket.build(attrs);
        await ticket.save();
        return ticket;
    }

}
export default new TicketService();