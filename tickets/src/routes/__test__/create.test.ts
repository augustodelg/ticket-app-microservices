import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket"


it('Has a route handler listening to /api/tickets for POST request', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});

    expect(response.status).not.toEqual(404);
})

it('Can only be accessed if the user is signed in', async () => {
    await request(app).post('/api/tickets').send({
        title: 'test',
        price: 10
    }).expect(401);

})

it('Returns a status other than 401 if the user is signed in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signup())
        .send({});

    expect(response.status).not.toEqual(401);
})

it('Returns an error if an invalid title is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signup())
        .send({
            title: '',
            price: 10
        }).expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signup())
        .send({
            price: 10
        }).expect(400);

})

it('Returns an error if an invalid price is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signup())
        .send({
            title: 'test',
            price: -10
        }).expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signup())
        .send({
            title: 'test'
        }).expect(400);
})

it('Creates a ticket with valid inputs', async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const title = 'test';

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signup())
        .send({
            title,
            price: 10
        }).expect(201);
    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].title).toEqual(title);
})