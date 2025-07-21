// server/controllers/user.controller.js
import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';

// Create
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    // Hash password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
  name,
  email,
  password, // model handles hashing
});

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete by ID
export const deleteUser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete All
export const deleteAllUsers = async (req, res) => {
  try {
    const result = await User.deleteMany();
    res.json({ message: 'All users deleted', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};