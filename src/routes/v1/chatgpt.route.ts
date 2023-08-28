
import { chatGptController } from '../../modules/chatgpt';
import express, { Router } from 'express';
const router: Router = express.Router();

router.post('/create/chatGpt', chatGptController.createchatGpt);

router.post('/answer/chatGpt', chatGptController.chatGptAnswer)

export default router;