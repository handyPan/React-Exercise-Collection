import express from 'express';
import { createResidency, getAllResidencies, getResidency } from '../controllers/residency.js';

const router = express.Router();

router.post('/create', createResidency);
router.get('/all', getAllResidencies);
router.get('/:id', getResidency);

export { router as residencyRoute };

