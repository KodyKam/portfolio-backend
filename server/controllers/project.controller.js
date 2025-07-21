//project.controller.js
import Project from '../models/Project.model.js';

// Create
export const createProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete by ID
export const deleteProject = async (req, res) => {
  try {
    const result = await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }};

// Delete All
export const deleteAllProjects = async (req, res) => {
  try {
    const result = await Project.deleteMany();
    res.json({ message: 'All projects deleted', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

