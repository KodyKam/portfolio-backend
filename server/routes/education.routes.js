// server/routes/education.routes.js
import express from 'express';
import { requireSignin } from '../controllers/auth.controller.js';

import {
  createEducation,
  getAllEducations,
  getEducationById,
  updateEducation,
  deleteEducation,
  deleteAllEducations
} from '../controllers/education.controller.js';

const router = express.Router();

router.post('/', requireSignin, createEducation);
router.get('/', requireSignin, getAllEducations);
router.post('/', createEducation);
router.get('/', getAllEducations);
router.get('/:id', getEducationById);
router.put('/:id', updateEducation);
router.delete('/:id', deleteEducation);
router.delete('/', deleteAllEducations);

export default router;