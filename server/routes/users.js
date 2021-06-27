import express from 'express';
const router = express.Router();

import {createUserToken, getUserToken} from '../controller/users.js';

 router.get('/token', getUserToken);
 router.post('/token', createUserToken);

export default router;