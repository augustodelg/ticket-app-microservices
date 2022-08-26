import { requireAuth } from '@tacket/common';
import express, { Request, Response } from 'express';
import OrderService from '../services/orderService';

const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
    const orders = await OrderService.userOrders(req.currentUser!.id);
    res.send(orders);
});

export { router as indexOrderRouter };