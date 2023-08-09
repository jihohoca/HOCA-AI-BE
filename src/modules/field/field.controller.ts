import { Request, Response } from 'express';
import { IncomingMessage } from 'http';
import httpStatus from 'http-status';
import { Configuration, OpenAIApi } from 'openai';
import { socket } from '../../index';
import config from '../../config/config';
import { catchAsync } from '../utils';
import * as fieldService from './field.service';

const configOpenAPI = new Configuration({
  apiKey: config.openai.openapi_key,
});

const openai = new OpenAIApi(configOpenAPI);

export const createField = catchAsync(async (req: Request, res: Response) => {
  const field = await fieldService.addFields(req.body);
  res.status(httpStatus.CREATED).send(field);
});

export const getAllFields = catchAsync(async (_req: Request, res: Response) => {
  const fields = await fieldService.getFields();
  res.status(httpStatus.CREATED).send(fields);
});

export const uploadPdf = catchAsync(async (req: any, res: Response) => {
  // const { originalname, mimetype, destination, filename, path, size } = req.file;
  const { filename } = req.file;
  res.status(httpStatus.CREATED).send('image uploaded' + filename);
});

export const getAnswer = catchAsync(async (req: Request, res: Response) => {
  console.log('🚀 ~ file: app.ts:32 ~ app.post ~ req.body:', req.body);

  const { message }: { message: { content: string } } = req.body;

  const completion = await openai.createCompletion(
    {
      model: config.openai.openapi_mode,
      prompt: message.content,
      max_tokens: 1000,
      stream: true,
    },
    { responseType: 'stream' }
  );

  const stream = completion.data as unknown as IncomingMessage;
  let chatgptResponse: { role: 'assistant'; content: string } = { role: 'assistant', content: '' };

  stream.on('data', (data: Buffer) => {
    const lines = data
      ?.toString()
      ?.split('\n')
      .filter((line) => line.trim() !== '');
    for (const line of lines) {
      const message = line.replace(/^data: /, '');
      if (message == '[DONE]') {
        return;
      } else {
        let token;
        try {
          token = JSON.parse(message)?.choices?.[0]?.text;
        } catch (e) {
          console.log('ERROR', e);
        }
        chatgptResponse.content += token;
        socket.emit('chatgptResChunk', { content: token });
      }
    }
  });

  stream.on('end', async () => {
    res.status(200).send({ message: 'Res sent', GPTResponse: chatgptResponse });
  });

  stream.on('error', (err: Error) => {
    console.log(err);
    socket.emit('resError', { error: err });
  });
});
