export enum MessageType {
  User = 'user',
  Bot = 'bot',
  System = 'system'
}

export interface CodeSnippet {
  language: string;
  before: string;
  after: string;
}

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
  codeSnippet?: CodeSnippet;
}