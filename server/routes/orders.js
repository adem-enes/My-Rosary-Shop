import express from 'express';
const router = express.Router();

import { getOrders, createOrder, callOrder, updateStatusOfOrder } from '../controller/orders.js';

router.get('/', getOrders);
router.post('/', createOrder);

router.get('/:orderId/carts/:cartId/', callOrder);
router.patch('/:orderId/status/:statusId/', updateStatusOfOrder);

export default router;