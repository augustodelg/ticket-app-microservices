import request from "supertest";
import { app } from "../../app";

function createTicket() {
    return request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
        title:'test',
        price: 10
    });
}

it('Can fetch a list of tickets',async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const response= await request(app)
    .get('/api/tickets')
    .send()
    .expect(200);

    expect(response.body.length).toEqual(3);
})