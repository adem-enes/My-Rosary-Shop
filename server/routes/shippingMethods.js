import express from 'express';
const router = express.Router();

import { getShippings, createShipment, updateShipment,deleteShipmentMethod } from '../controller/shippingMethods.js';



router.get('/', getShippings);
router.post('/',createShipment);
router.patch('/:id',updateShipment);
router.delete('/:id',deleteShipmentMethod);



export default router;