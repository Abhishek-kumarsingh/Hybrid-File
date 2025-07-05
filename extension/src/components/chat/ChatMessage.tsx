import React, { useState } from 'react';
import { Message, MessageType } from '../../types/chat';
import CodeDiff from '../code/CodeDiff';

interface ActionButton {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface ChatMessageProps {
  message: Message;
  actions?: ActionButton[];
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, actions = [] }) => {
  const [showActions, setShowActions] = useState(false);
  
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div 
      className={`group flex space-x-3 ${
        message.type === MessageType.User ? 'justify-end' : ''
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {message.type === MessageType.Bot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
          <span className="text-white font-medium">AI</span>
        </div>
      )}
      
      <div className={`max-w-3xl ${message.type === MessageType.User ? 'bg-blue-600' : 'bg-gray-800'} rounded-lg p-3 relative`}>
        <div className="text-sm text-gray-300 mb-1 flex justify-between items-center">
          <span>{message.type === MessageType.User ? 'You' : 'CodeGenius'}</span>
          <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-100 whitespace-pre-wrap">{message.content}</p>
          
          {message.codeSnippet && (
            <div className="mt-3 border border-gray-700 rounded-md overflow-hidden">
              <CodeDiff 
                before={message.codeSnippet.before}
                after={message.codeSnippet.after}
                language={message.codeSnippet.language}
              />
            </div>
          )}
        </div>
        
        {actions.length > 0 && (
          <div className={`absolute -bottom-4 right-2 flex space-x-1 transition-opacity duration-200 ${
            showActions ? 'opacity-100' : 'opacity-0'
          }`}>
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="p-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition-colors"
                title={action.label}
              >
                {action.icon}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {message.type === MessageType.User && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
          <span className="text-white font-medium">You</span>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;