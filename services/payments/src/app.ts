import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors'
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@tacket/common';
import { createChargeRouter } from './routes/create';
import { paymentIntentRouter } from './routes/paymentIntent';
import { confirmPaymentRouter } from './routes/confirmPayment';

const app = express();
app.set('trust proxy', true);
app.use((req, res, next) => {
  if (req.originalUrl === '/api/payments/confirm') {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test'

}))

app.use(currentUser);


//ROUTES
app.use(createChargeRouter);
//app.use(paymentIntentRouter)

//app.use(confirmPaymentRouter)

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);



export { app }