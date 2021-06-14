import express from 'express';
const router = express.Router();

import { createCart, cartInfo, carts, deleteCart } from '../controller/carts.js';

//TODO as a reminder because of mysql everything in this area should be 'router.get'.. or is it??

router.get('/', carts);
router.post('/', createCart);
router.get('/:id', cartInfo);
router.delete('/:id', deleteCart);




export default router;