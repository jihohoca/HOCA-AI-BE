
import { IChatGpt, NewCreatedChatGpt } from "./chatgpt.interface";
import chatGpt from "./chatgpt.mode";
import { OpenAI } from 'langchain/llms';
import { RetrievalQAChain } from 'langchain/chains';
import { HNSWLib } from 'langchain/vectorstores';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import path from 'path';
/**
 * Create a user
 * @param {NewCreatedChatGpt} chatGptBody
 * @returns {Promise<IChatGpt>}
 */
export const createChatGpt = async (chatGptBody: NewCreatedChatGpt): Promise<IChatGpt> => {
    
    return chatGpt.create(chatGptBody);
  };

export const chatGptAnswer = async (settingChatGpt:NewCreatedChatGpt) => {
  dotenv.config();
const __dirname = path.resolve();
console.log(__dirname)
const txtPath = '/Users/ductranvan/Desktop/HOCA-AI-BE/src/modules/chatgpt/test.pdf';
const model = new OpenAI({});
let vectorStore;

// 6.2. If the vector store file doesn't exist, create it
// 6.2.1. Read the input text file
const text = fs.readFileSync(txtPath, 'utf8');
const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: settingChatGpt.chunkSize , chunkOverlap:settingChatGpt.chunkOverlap });
const docs = await textSplitter.createDocuments([text]);
// 6.2.4. Create a new vector store from the documents using OpenAIEmbeddings
vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
// 6.2.5. Save the vector store to a file


// 7. Create a RetrievalQAChain by passing the initialized OpenAI model and the vector store retriever
const chain =  RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
// 8. Call the RetrievalQAChain with the input question, and store the result in the 'res' variable
const answer = await chain.call({
query: settingChatGpt.basePrompt,
});

// 9. Log the result to the console
console.log({ answer });

return answer;
  
}


  