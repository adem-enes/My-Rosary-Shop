import express from 'express';
const router = express.Router();

import { getAllProducts, createProduct, deleteProduct, updateProduct, getTheProduct } from '../controller/products.js';


//TODO as a reminder because of mysql everything in this area should be 'router.get'.. or is it??

router.get('/', getAllProducts);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id', updateProduct);
router.get('/:id', getTheProduct);





export default router;