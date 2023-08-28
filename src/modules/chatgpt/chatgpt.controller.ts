
import { catchAsync } from "../utils";
import * as chatGptService from'../chatgpt/chatgpt.service';
import httpStatus from 'http-status';
import { Request, Response } from 'express';


export const createchatGpt = catchAsync(async (req: Request, res: Response) => {
    const chatGpt = await chatGptService.createChatGpt(req.body);
    res.status(httpStatus.CREATED).send(chatGpt);
  });

  export const chatGptAnswer = catchAsync(async (req: Request, res: Response) => {
    const chatGpt = await chatGptService.chatGptAnswer(req.body);
    res.status(200).send(chatGpt);
  });

  

  