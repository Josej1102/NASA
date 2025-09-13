import { Router } from "express";
import { getNasaData } from '../controller/fetchController.js';

const router = Router();
router.get('/fetch', getNasaData);

export default router;