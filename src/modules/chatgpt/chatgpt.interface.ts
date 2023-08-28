export interface IChatGpt {
    chunkSize:number
    chunkOverlap:number
    basePrompt:string
  }

  export type NewCreatedChatGpt = Omit<IChatGpt, 'isEmailVerified'>;

