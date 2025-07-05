import React, { useState } from 'react';
import { Send, Clipboard, ThumbsUp, ThumbsDown, Code, Play } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { Message, MessageType } from '../../types/chat';

const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm CodeGenius, your AI coding assistant. How can I help you with your code today?",
      type: MessageType.Bot,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      type: MessageType.User,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I've analyzed your code and found a potential optimization. You could refactor the function to use memoization which would improve performance for repeated calls with the same parameters.",
        type: MessageType.Bot,
        timestamp: new Date(),
        codeSnippet: {
          language: 'typescript',
          before: 'function fibonacci(n: number): number {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}',
          after: 'const memo: Record<number, number> = {};\n\nfunction fibonacci(n: number): number {\n  if (n in memo) return memo[n];\n  if (n <= 1) return n;\n  return memo[n] = fibonacci(n - 1) + fibonacci(n - 2);\n}'
        }
      };
      
      setMessages((prev) => [...prev, botResponse]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            actions={
              message.type === MessageType.Bot 
                ? [
                    { icon: <Clipboard size={16} />, label: 'Copy', onClick: () => console.log('Copy') },
                    { icon: <ThumbsUp size={16} />, label: 'Helpful', onClick: () => console.log('Helpful') },
                    { icon: <ThumbsDown size={16} />, label: 'Not helpful', onClick: () => console.log('Not helpful') },
                    { icon: <Code size={16} />, label: 'Apply suggestion', onClick: () => console.log('Apply') },
                  ] 
                : []
            }
          />
        ))}
        
        {isProcessing && (
          <div className="flex items-center space-x-2 text-gray-400 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white font-medium">AI</span>
            </div>
            <span>AI is thinking...</span>
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-700 p-4">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex space-x-2">
          <div className="flex-1 relative">
            <textarea
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 resize-none"
              placeholder="Ask about your code or request assistance..."
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="absolute right-2 bottom-2 flex space-x-1">
              <button 
                type="button"
                className="p-1 text-gray-400 hover:text-gray-100"
                title="Run selected code"
              >
                <Play size={16} />
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!input.trim() || isProcessing}
          >
            <Send size={18} />
          </button>
        </form>
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>Tip: Press Enter to send, Shift+Enter for a new line</span>
          <span>Model: GPT-4</span>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;