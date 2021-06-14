import express from 'express';
const router = express.Router();

import {
    createProductsTable, createCategoriesTable,
    createShippingMethodsTable, createCartsTable,
    createOrdersTable, createAll, productsInTheCarts,
    createAllTriggers, createAllEvents
} from '../controller/createTheTables.js';


router.get('/productsTable', createProductsTable);
router.get('/categoriesTable', createCategoriesTable);
router.get('/shippingMethodsTable', createShippingMethodsTable);
router.get('/cartsTable', createCartsTable);
router.get('/ordersTable', createOrdersTable);
router.get('/pitc', productsInTheCarts);
router.get('/all', createAll);
router.get('/triggers', createAllTriggers);
router.get('/events', createAllEvents);

export default router;