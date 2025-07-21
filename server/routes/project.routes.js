//server/routes/project.routes.js
import express from 'express';
import { requireSignin } from '../controllers/auth.controller.js';
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  deleteAllProjects
} from '../controllers/project.controller.js';

const router = express.Router();

router.post('/', requireSignin, createProject);
router.get('/', requireSignin, getAllProjects);
router.post('/', createProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.delete('/', deleteAllProjects);

export default router;