import { catchAsync } from '../utils';
import * as chatGptService from '../chatgpt/chatgpt.service';
import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { MulterRequest} from './chatgpt.interface';


export const createchatGpt = catchAsync(async (req: Request, res: Response) => {
  const chatGpt = await chatGptService.createChatGpt(req.body);
  res.status(httpStatus.CREATED).send(chatGpt);
});

export const chatGptAnswer = catchAsync(async (req:MulterRequest , res: Response) => {
  const chatGpt = await chatGptService.chatGptAnswerFilePdf(req);
  res.status(200).send(chatGpt);
});


export const chatGptAnsewQuestion = catchAsync(async (req: Request, res: Response) => {
  const chatGptAnswer =  chatGptService.chatGptAnswerQuestion(req,res);
  res.status(200).send(chatGptAnswer);
});

