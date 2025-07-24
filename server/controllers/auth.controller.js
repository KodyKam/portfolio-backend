// server/controllers/auth.controller.js
import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import User from '../models/User.model.js';
import config from '../config/config.js';
import bcrypt from 'bcryptjs';

// Sign Up
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ error: 'Email is already taken.' });

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'Signup successful! Please sign in.' });
  } catch (err) {
    res.status(500).json({ error: 'Error signing up user.' });
  }
};

// Sign In
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Email and password don't match." });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: '1d' });

    res.cookie('t', token, { expire: new Date() + 9999 });
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: "Error signing in user." });
  }
};

// Sign Out
export const signout = (req, res) => {
  res.clearCookie('t');
  return res.status(200).json({ message: "Signed out successfully." });
};

// Middleware to protect routes
export const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth"
});