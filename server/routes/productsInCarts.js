import express from 'express';
const router = express.Router();

import {
    sendProductToCart, productsInTheCarts, allProductsInTheCart,
    addDelQty, deleteProductFromCart, deleteAllProductsFromCart
} from '../controller/productsInCarts.js';

router.get('/', productsInTheCarts);
router.post('/', sendProductToCart);
router.patch('/:id', addDelQty);
router.delete('/:id', deleteProductFromCart);
router.delete('/cart/:cartId', deleteAllProductsFromCart);
router.get('/cart/:cartId', allProductsInTheCart);




export default router;