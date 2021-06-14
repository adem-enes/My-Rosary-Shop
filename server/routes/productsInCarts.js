import express from 'express';
const router = express.Router();

import { sendProductToCart, productsInTheCarts, addDelQty, deleteProductFromCart } from '../controller/productsInCarts.js';

//TODO as a reminder because of mysql everything in this area should be 'router.get'.. or is it??

router.get('/', productsInTheCarts);
router.post('/', sendProductToCart);
router.patch('/:id', addDelQty);
router.delete('/:id',deleteProductFromCart);




export default router;