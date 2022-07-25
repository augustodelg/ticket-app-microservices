import request from 'supertest';
import { app } from '../../app';

it ('Reponds with details about the current user',async () => {

    const cookie = await global.signup();

    const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send({})
    .expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com');
    
})

it ('Reponds with null if not authenticated',async () => {

    const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

    expect(response.body.currentUser).toBeNull()
    
})