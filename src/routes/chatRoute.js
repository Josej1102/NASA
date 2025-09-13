import {Router} from 'express';
import { getChatHistory } from '../controller/chatController.js';

const router = Router();

router.get('/chats', getChatHistory);

export default router;