import React, { useState } from 'react';
import { CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import CodeDiff from './CodeDiff';

interface Suggestion {
  id: string;
  title: string;
  description: string;
  filePath: string;
  before: string;
  after: string;
  language: string;
  confidence: number;
}

const CodeSuggestionPanel: React.FC = () => {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  
  // Mock suggestions data
  const suggestions: Suggestion[] = [
    {
      id: '1',
      title: 'Optimize performance with memoization',
      description: 'Add memoization to recursive fibonacci function to prevent duplicate calculations',
      filePath: 'src/utils/math.ts',
      before: 'function fibonacci(n: number): number {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}',
      after: 'const memo: Record<number, number> = {};\n\nfunction fibonacci(n: number): number {\n  if (n in memo) return memo[n];\n  if (n <= 1) return n;\n  return memo[n] = fibonacci(n - 1) + fibonacci(n - 2);\n}',
      language: 'typescript',
      confidence: 0.92
    },
    {
      id: '2',
      title: 'Fix potential null reference',
      description: 'Add null check before accessing property to prevent runtime errors',
      filePath: 'src/components/UserProfile.tsx',
      before: 'const userName = user.profile.name;',
      after: 'const userName = user?.profile?.name || "Guest";',
      language: 'typescript',
      confidence: 0.88
    },
    {
      id: '3',
      title: 'Improve code readability',
      description: 'Simplify complex conditional with early return pattern',
      filePath: 'src/services/auth.ts',
      before: 'function validateUser(user) {\n  let isValid = false;\n  if (user) {\n    if (user.id && user.token) {\n      if (user.permissions.length > 0) {\n        isValid = true;\n      }\n    }\n  }\n  return isValid;\n}',
      after: 'function validateUser(user) {\n  if (!user) return false;\n  if (!user.id || !user.token) return false;\n  return user.permissions.length > 0;\n}',
      language: 'typescript',
      confidence: 0.85
    }
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'bg-green-500';
    if (confidence >= 0.7) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleApply = (id: string) => {
    console.log(`Applying suggestion: ${id}`);
    // Implementation would apply the change to the actual file
  };

  const handleDismiss = (id: string) => {
    console.log(`Dismissing suggestion: ${id}`);
    // Implementation would remove this suggestion from the list
  };

  const handleFeedback = (id: string) => {
    console.log(`Providing feedback for suggestion: ${id}`);
    // Implementation would open a feedback dialog
  };

  const activeSuggestion = suggestions.find(s => s.id === selectedSuggestion) || suggestions[0];

  return (
    <div className="h-full flex">
      <div className="w-80 border-r border-gray-700 overflow-y-auto">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Suggestions ({suggestions.length})</h2>
        </div>
        
        <div>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              className={`w-full text-left p-4 border-b border-gray-700 hover:bg-gray-800 transition-colors ${
                suggestion.id === (selectedSuggestion || suggestions[0].id) ? 'bg-gray-800' : ''
              }`}
              onClick={() => setSelectedSuggestion(suggestion.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-white">{suggestion.title}</h3>
                  <p className="text-sm text-gray-400 mt-1 truncate">{suggestion.filePath}</p>
                </div>
                <div className={`${getConfidenceColor(suggestion.confidence)} text-white text-xs px-2 py-1 rounded-full`}>
                  {Math.round(suggestion.confidence * 100)}%
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">{activeSuggestion.title}</h2>
          <p className="text-sm text-gray-400 mt-1">{activeSuggestion.filePath}</p>
        </div>
        
        <div className="p-4">
          <p className="text-gray-300 mb-4">{activeSuggestion.description}</p>
          
          <div className="border border-gray-700 rounded-md overflow-hidden">
            <CodeDiff 
              before={activeSuggestion.before}
              after={activeSuggestion.after}
              language={activeSuggestion.language}
            />
          </div>
        </div>
        
        <div className="mt-auto p-4 border-t border-gray-700 flex space-x-3">
          <button
            onClick={() => handleApply(activeSuggestion.id)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center space-x-2"
          >
            <CheckCircle size={16} />
            <span>Apply</span>
          </button>
          
          <button
            onClick={() => handleDismiss(activeSuggestion.id)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors flex items-center space-x-2"
          >
            <XCircle size={16} />
            <span>Dismiss</span>
          </button>
          
          <button
            onClick={() => handleFeedback(activeSuggestion.id)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors flex items-center space-x-2 ml-auto"
          >
            <MessageSquare size={16} />
            <span>Feedback</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeSuggestionPanel;