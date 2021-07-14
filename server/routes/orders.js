import express from 'express';
const router = express.Router();

import { getOrders, createOrder, callOrderWithProducts,
    callOrder, updateStatusOfOrder } from '../controller/orders.js';

router.get('/', getOrders);
router.post('/', createOrder);
router.get('/:id', callOrder);

router.get('/:orderId/carts/:cartId/', callOrderWithProducts);
router.patch('/:orderId/status/:statusId/', updateStatusOfOrder);

export default router;