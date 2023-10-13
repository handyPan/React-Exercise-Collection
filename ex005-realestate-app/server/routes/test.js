import express from 'express';

import { createTest } from '../controllers/test.js';

const router = express.Router();

router.post('/', createTest);

export default router;