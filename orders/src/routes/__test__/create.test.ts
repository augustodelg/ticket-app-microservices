import { OrderStatus } from "@tacket/common";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/orders";
import { Ticket } from "../../models/tickets";
import { natsWrapper } from "../../natsWrapper";

const buildTicket = async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20,
    });
    await ticket.save();

    return ticket;
};

it('Return an error if the ticket does not exist', async () => {
    const ticketId = new mongoose.Types.ObjectId();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signup())
        .send({ ticketId })
        .expect(404);
})

it('Return an error if the ticket is already reserved', async () => {
    const ticket = await buildTicket();
    const order = Order.build({
        ticket,
        userId: '12345',
        status: OrderStatus.Created,
        expiresAt: new Date()
    });
    await order.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signup())
        .send({ ticketId: ticket.id })
        .expect(400);
})

it('Reserve a ticket', async () => {
    const ticket = await buildTicket();

    const response = await request(app)
        .post('/api/orders')
        .set('Cookie', global.signup())
        .send({ ticketId: ticket.id })
        .expect(201);

})

it('Emits an order created event', async () => {
    const ticket = await buildTicket();
  
    await request(app)
      .post('/api/orders')
      .set('Cookie', global.signup())
      .send({ ticketId: ticket.id })
      .expect(201);
  
    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });