//server/controllers/auth.controller.js
import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import User from '../models/User.model.js';
import config from '../config/config.js';
import bcrypt from 'bcryptjs';

// Sign In
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ error: "User not found." });

    // Check password
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch)
  return res.status(401).json({ error: "Email and password don't match." });

    // Create token
    const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
      expiresIn: '1d'
    });

    // Set cookie and respond
    res.cookie('t', token, { expire: new Date() + 9999 });
    res.json({ token, user: { _id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    return res.status(401).json({ error: "Could not sign in." });
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