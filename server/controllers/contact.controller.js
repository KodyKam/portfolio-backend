// server/controllers/contact.controller.js
import Contact from '../models/Contact.model.js';

// Create
export const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    return res.status(201).json(contact);
  } catch (err) {
    return res.status(400).json({ error: "Failed to create contact." });
  }
};

// Get All
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by ID
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateContact = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete by ID
export const deleteContact = async (req, res) => {
  try {
    const result = await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete All
export const deleteAllContacts = async (req, res) => {
  try {
    const result = await Contact.deleteMany();
    res.json({ message: 'All contacts deleted', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};