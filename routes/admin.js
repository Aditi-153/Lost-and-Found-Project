import express from 'express';
import { register, login } from '../controllers/admin.js';
import { adminProtect } from '../middleware/user.auth.js';

const router = express.Router();





router.post('/register', register);
router.post('/login', login);

export default router;
