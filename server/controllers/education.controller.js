import Education from '../models/Education.model.js';

// Create
export const createEducation = async (req, res) => {
  try {
    const newEducation = new Education(req.body);
    const savedEducation = await newEducation.save();
    res.status(201).json(savedEducation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All
export const getAllEducations = async (req, res) => {
  try {
    const educations = await Education.find();
    res.json(educations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by ID
export const getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) return res.status(404).json({ error: 'Education record not found' });
    res.json(education);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateEducation = async (req, res) => {
  try {
    const updated = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete by ID
export const deleteEducation = async (req, res) => {
  try {
    const result = await Education.findByIdAndDelete(req.params.id);
    res.json({ message: 'Education record deleted', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete All
export const deleteAllEducations = async (req, res) => {
  try {
    const result = await Education.deleteMany();
    res.json({ message: 'All education records deleted', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};