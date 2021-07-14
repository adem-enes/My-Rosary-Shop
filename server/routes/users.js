import express from 'express';
const router = express.Router();

import { createUserToken, getUserToken, userLogin } from '../controller/users.js';

router.get('/token', getUserToken);
router.post('/token', createUserToken);
router.post('/login', userLogin);

export default router;