import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

declare global {
    var signup: (id?: string) => string[];
}

jest.mock('../natsWrapper');

process.env.STRIPE_KEY = 'sk_test_51Lhb9bBQMxIQmPgP9TCETilUDguIjLx0Ml7VwqOShdtSQZUzYAFeKMNOiQCYuYMePONCcRJ24BR3waIrKqvpK3s1006NJcPJaI'

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'testenv';
    const mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
});


beforeEach(async () => {
    jest.clearAllMocks()
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
})


global.signup = (id?: string) => {
    // Build a mock JWT payload 
    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com',
    };
    // Create the JWT 
    const token = jwt.sign(payload, process.env.JWT_KEY!);
    // Take a json
    const session = JSON.stringify({ jwt: token });
    // Encode the json as base64
    const base64 = Buffer.from(session).toString('base64');

    return [`session=${base64}`];





}