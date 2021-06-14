import express from 'express';
const router = express.Router();

import { getStatuses, createStatuses } from '../controller/statuses.js';

router.get('/', getStatuses);
router.post('/', createStatuses);


export default router;