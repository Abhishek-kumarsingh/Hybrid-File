import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CodeDiffProps {
  before: string;
  after: string;
  language: string;
}

const CodeDiff: React.FC<CodeDiffProps> = ({ before, after, language }) => {
  const [view, setView] = useState<'split' | 'before' | 'after'>('split');

  return (
    <div className="bg-gray-900">
      <div className="flex justify-between items-center px-3 py-2 bg-gray-800 border-b border-gray-700">
        <div className="text-sm text-gray-400">
          <span className="text-xs uppercase tracking-wider">{language}</span>
        </div>
        
        <div className="flex space-x-1">
          <button
            className={`px-2 py-1 rounded text-xs ${
              view === 'before' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'
            }`}
            onClick={() => setView('before')}
          >
            Before
          </button>
          <button
            className={`px-2 py-1 rounded text-xs ${
              view === 'split' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'
            }`}
            onClick={() => setView('split')}
          >
            Split
          </button>
          <button
            className={`px-2 py-1 rounded text-xs ${
              view === 'after' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'
            }`}
            onClick={() => setView('after')}
          >
            After
          </button>
        </div>
      </div>
      
      {view === 'split' && (
        <div className="flex">
          <div className="w-1/2 border-r border-gray-700">
            <div className="p-1 bg-red-900/20">
              <pre className="text-sm p-2 text-gray-300 overflow-x-auto">
                <code>{before}</code>
              </pre>
            </div>
          </div>
          <div className="w-1/2">
            <div className="p-1 bg-green-900/20">
              <pre className="text-sm p-2 text-gray-300 overflow-x-auto">
                <code>{after}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
      
      {view === 'before' && (
        <div className="p-1 bg-red-900/20">
          <pre className="text-sm p-2 text-gray-300 overflow-x-auto">
            <code>{before}</code>
          </pre>
        </div>
      )}
      
      {view === 'after' && (
        <div className="p-1 bg-green-900/20">
          <pre className="text-sm p-2 text-gray-300 overflow-x-auto">
            <code>{after}</code>
          </pre>
        </div>
      )}
      
      {view !== 'split' && (
        <div className="flex justify-center items-center p-2 bg-gray-800 border-t border-gray-700">
          <button
            className="p-1 rounded-full hover:bg-gray-700 transition-colors"
            onClick={() => setView(view === 'before' ? 'after' : 'before')}
            title={view === 'before' ? 'View after' : 'View before'}
          >
            {view === 'before' ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          </button>
        </div>
      )}
    </div>
  );
};

export default CodeDiff;