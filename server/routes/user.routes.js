// server/routes/user.routes.js
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

/* ---------- Public Routes ---------- */

// Create a new user
router.post('/', createUser);

// Get all users
router.get('/', getAllUsers);

/* ---------- Protected Routes (Must pass requireSignin middleware) ---------- */

// Sample protected route
router.get('/protected', requireSignin, (req, res) => {
  res.json({ message: 'This is a protected route.' });
});

// Another test protected route
router.get('/secret', requireSignin, (req, res) => {
  res.json({ message: "This is a protected route. You are authenticated." });
});

/* ---------- User CRUD (Some Protected) ---------- */

// Get user by ID (Protected)
router.get('/:id', requireSignin, getUserById);

// Update user by ID
router.put('/:id', updateUser);

// Delete user by ID
router.delete('/:id', deleteUser);

// Delete all users
router.delete('/', deleteAllUsers);

export default router;