import { PreguntarOpenAi } from "../controller/PreguntarOpenAi.js";
import { Router } from "express";

const router = Router();

router.post("/preguntar", PreguntarOpenAi);

export default router;