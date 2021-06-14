import express from 'express';
const router = express.Router();

import { getCategories, createCategory, deleteCategory } from '../controller/categories.js';


router.get('/',getCategories);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);










export default router;