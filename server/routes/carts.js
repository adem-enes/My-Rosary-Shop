import express from 'express';
const router = express.Router();

import { createCart, cartInfo, carts, deleteCart } from '../controller/carts.js';

router.get('/', carts);
router.post('/', createCart);
router.get('/:tokenId', cartInfo);
router.delete('/:id', deleteCart);




export default router;