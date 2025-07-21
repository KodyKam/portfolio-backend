//server/routes/user.routes.js
import express from 'express';
import { requireSignin } from '../controllers/auth.controller.js';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  deleteAllUsers
} from '../controllers/user.controller.js';

const router = express.Router();

// Public routes
router.post('/', createUser);
router.get('/', getAllUsers);

// Protected route example
router.get('/protected', requireSignin, (req, res) => {
  res.json({ message: 'This is a protected route.' });
});

// Apply protection to GET by ID
router.get('/:id', requireSignin, getUserById);

// Other CRUD routes
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.delete('/', deleteAllUsers);

// Optional test route
router.get('/secret', requireSignin, (req, res) => {
  res.json({ message: "This is a protected route. You are authenticated." });
});

export default router;