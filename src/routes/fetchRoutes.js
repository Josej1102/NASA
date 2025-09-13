import express from 'express';
import { getNasaData } from '../controller/fetchController.js';

const router = express.Router();
router.get('/fetch', getNasaData);

export default router;