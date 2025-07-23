//server/routes/auth.routes.js
import express from 'express';
import { signup, signin, signout, requireSignin } from '../controllers/auth.controller.js';

const router = express.Router();

// POST /src/user/signup
router.post('/signup', signup);

// POST /api/auth/signin
router.post('/signin', signin);

// GET /api/auth/signout
router.get('/signout', signout);

export default router;