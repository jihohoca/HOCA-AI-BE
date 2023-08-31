import { IChatGpt, MulterRequest, NewCreatedChatGpt} from './chatgpt.interface';
import chatGpt from './chatgpt.mode';

import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAI } from 'langchain/llms';
import { RetrievalQAChain } from 'langchain/chains';
import * as dotenv from 'dotenv';
import { HNSWLib } from 'langchain/vectorstores';
dotenv.config();
import path from 'path';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { Configuration, OpenAIApi } from 'openai';
import config from '../../config/config';
import { Response , Request} from 'express';

/**
 * Create a user
 * @param {NewCreatedChatGpt} chatGptBody
 * @returns {Promise<IChatGpt>}
 */
export const createChatGpt = async (chatGptBody: NewCreatedChatGpt): Promise<IChatGpt> => {
  return chatGpt.create(chatGptBody);
};

export const chatGptAnswerFilePdf = async (req: MulterRequest) => {
  const filename = req.files.screenshot.name;
  const file = req.files.screenshot;
  const __dirname = path.resolve();
  let uploadPath = __dirname + '/src/uploads/' + filename;

  const loader = new PDFLoader(uploadPath);

  await file.mv(uploadPath);
  const docs = await loader.load();
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 10,
  });
  const model = new OpenAI({});
  const docOutput = await textSplitter.splitDocuments(docs);
  
  let vectorStore = await HNSWLib.fromDocuments(docOutput, new OpenAIEmbeddings());

  const vectorStoreRetriever = vectorStore.asRetriever();

  const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);
 
  console.log(chain)
  // Call the RetrievalQAChain with the input question, and store the result in the 'res' variable
  const res = await chain.call({
    query: "univercity",
  });

  return res;
};


export const chatGptAnswerQuestion = async (req:Request, res: Response) => {
  const configOpenAPI = new Configuration({
    apiKey: config.openai.openapi_key,
  });
  const openai = new OpenAIApi(configOpenAPI);
  const { question} = req.body;


  try {
    const completion: any = await openai.createChatCompletion(
      {
        model: config.openai.openapi_mode_text,

        messages: [{ content: question, role: 'assistant' }],

        stream: true,
      },
      { responseType: 'stream' }
    );

    completion.data.on('data', (chunk: any) => {
      const payloads = chunk.toString().split('\n\n');

      for (const payload of payloads) {
        if (payload.includes('[DONE]')) return res.end();

        if (payload.startsWith('data:')) {
          const data = JSON.parse(payload.replace('data: ', ''));

          try {
            const chunk = data.choices[0].delta?.content;

            if (chunk) {
              res.write(chunk);
            
            }
          } catch (error) {
            console.log(`Error with JSON.parse and`);
          }
        }
      }
    });
  } catch (error: any) {
    console.log(error.message, 'error');
  }
}



