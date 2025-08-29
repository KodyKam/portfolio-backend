// server/routes/contact.routes.js
import express from 'express';
import { requireSignin } from '../controllers/auth.controller.js';
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  deleteAllContacts
} from '../controllers/contact.controller.js';

const router = express.Router();

// Route to create a contact (public or protected, depending on your use case)
router.post('/', async (req, res, next) => {
  try {
    await createContact(req, res);
  } catch (error) {
    console.error('Error creating contact:', error.message);
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

// Get all contacts (requires signin)
router.get('/', requireSignin, async (req, res) => {
  try {
    await getAllContacts(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get contacts' });
  }
});

// Get single contact by ID (requires signin)
router.get('/:id', requireSignin, async (req, res) => {
  try {
    await getContactById(req, res);
  } catch (error) {
    res.status(404).json({ error: 'Contact not found' });
  }
});

// Update contact (requires signin)
router.put('/:id', requireSignin, async (req, res) => {
  try {
    await updateContact(req, res);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update contact' });
  }
});

// Delete a single contact (requires signin)
router.delete('/:id', requireSignin, async (req, res) => {
  try {
    await deleteContact(req, res);
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete contact' });
  }
});

// Delete all contacts (requires signin)
router.delete('/', requireSignin, async (req, res) => {
  try {
    await deleteAllContacts(req, res);
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete all contacts' });
  }
});

export default router;