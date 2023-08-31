 import * as authMiddleware from './../../modules/auth/authuser.middleware';
import { chatGptController } from '../../modules/chatgpt';
 //import { chatGptService } from '../../modules/chatgpt';
import express, { Router } from 'express';
const router: Router = express.Router();

router.post('/create', authMiddleware.authMiddleware,chatGptController.createchatGpt);
router.post('/answer/pdf/file', chatGptController.chatGptAnswer)
router.post('/answer/question', chatGptController.chatGptAnsewQuestion)

export default router;