import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { TicketUpdatedEvent } from '@tacket/common';
import { TicketUpdatedListener } from '../ticketUpdatedListener';
import { natsWrapper } from '../../../natsWrapper';
import { Ticket } from '../../../models/tickets';

const setup = async () => {
    // Create a listener
    const listener = new TicketUpdatedListener(natsWrapper.client);

    // Create and save a ticket
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
    });
    await ticket.save();

    // Create a mock data object
    const data: TicketUpdatedEvent['data'] = {
        id: ticket.id,
        version: ticket.version + 1,
        title: 'new concert',
        price: 999,
        userId: 'ablskdjf',
    };

    // Create a mock msg object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    };

    // return all of this stuff
    return { listener, ticket, data, msg };
};

it('finds, updates, and saves a ticket', async () => {
    const { msg, data, ticket, listener } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.title).toEqual(data.title);

    expect(updatedTicket!.price).toEqual(data.price);

    expect(updatedTicket!.version).toEqual(data.version);
});

it('acks the message', async () => {
    const { msg, data, listener } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('Does not call ack if the event has a skipped version number', async () => {
    const { msg, data, ticket, listener } = await setup();
    data.version = 8;
    expect(async () => {
        await listener.onMessage(data, msg);
    }).rejects.toThrow();

    expect(msg.ack).not.toHaveBeenCalled();
});