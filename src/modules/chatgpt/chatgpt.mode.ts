import mongoose from "mongoose"
import { IChatGpt } from "./chatgpt.interface";


const chatGptSchema = new mongoose.Schema<IChatGpt>(
    {
        chunkSize: {
          type: Number,
          required: true,
          trim: true,
        },
        chunkOverlap:{
            type:Number,
            required:true,
            trim:true
        },
        basePrompt:{
            type:String,
            required:true,
            trim:true
        }
    }


)


const chatGpt = mongoose.model<IChatGpt>('chatGpt', chatGptSchema);

export default chatGpt;