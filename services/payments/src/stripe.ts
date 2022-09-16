import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_KEY!;

export const stripe = new Stripe(stripeKey, {
    apiVersion: '2022-08-01'
});