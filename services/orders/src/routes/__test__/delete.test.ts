import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/tickets';
import { Order } from '../../models/orders';
import { OrderStatus } from '@tacket/common';
import { natsWrapper } from '../../natsWrapper';
import mongoose from 'mongoose';


const buildTicket = async () => {
  const ticket = Ticket.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: 'concert',
      price: 20,
  });
  await ticket.save();

  return ticket;
};

it('marks an order as cancelled', async () => {
  // create a ticket with Ticket Model
  const ticket = await buildTicket();

  const user = global.signup();
  // make a request to create an order
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make a request to cancel the order
  await request(app)
    .patch(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  // expectation to make sure the thing is cancelled
  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('Emits a order cancelled event', async () => {
  const ticket = await buildTicket();
  await ticket.save();

  const user = global.signup();
  // make a request to create an order
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make a request to cancel the order
  await request(app)
    .patch(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});