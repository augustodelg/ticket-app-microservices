import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './natsWrapper';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined 🤦");

  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined 🤦");

  }
  try {
    await natsWrapper.connect('tacket', 'ticketTest','http:nats-srv:4222');
    
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed.')
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
}

app.listen(3000, () => {
  console.log('TICKETS SERVICES: Listening on port 3000');
});

start();