import request from 'supertest';
import { app } from '../../app';


it('Return a 201 on successfull signup',async () => {
    return request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "password"
    })
    .expect(201);
})

it('Return a 400 with invalid email', async () => {
    return request(app)
    .post("/api/users/signup")
    .send({
        email: "testtest.com",
        password: "password"
    })
    .expect(400);
})

it('Return a 400 with invalid password', async () => {
    return request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: ":c"
    })
    .expect(400);
})

it('Return a 400 with missing password or email', async () => {
    await request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
    })
    .expect(400);
    await request(app)
    .post("/api/users/signup")
    .send({
        password: "password",
    })
    .expect(400);
})

it('Disallow duplicate emails', async () => {

    await request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "password"
    })
    .expect(201);
    
    await request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "password"
    })
    .expect(400);

})

it('Sets a cookie after successfull signup',async () => {
    const response = await request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "password"
    })
    .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
    
})