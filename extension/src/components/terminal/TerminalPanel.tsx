import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, RefreshCw, Download, Maximize2 } from 'lucide-react';

const TerminalPanel: React.FC = () => {
  const [output, setOutput] = useState<string[]>([
    '> CodeGenius Terminal v1.0.0',
    '> Type a command or use the actions above',
    ''
  ]);
  const [command, setCommand] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto scroll to bottom when output changes
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleCommand = () => {
    if (!command.trim()) return;
    
    setOutput(prev => [...prev, `$ ${command}`, '']);
    setCommand('');
    setIsRunning(true);
    
    // Simulate command execution
    setTimeout(() => {
      const results = ['Running code analysis...', 'Checking for optimizations...', 'Completed!'];
      setOutput(prev => [...prev, ...results, '']);
      setIsRunning(false);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand();
    }
  };

  const handleClear = () => {
    setOutput(['> Terminal cleared', '']);
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="p-2 border-b border-gray-700 flex items-center space-x-2">
        <button
          className={`p-2 rounded hover:bg-gray-700 transition-colors ${
            isRunning ? 'text-red-400' : 'text-green-400'
          }`}
          disabled={isRunning}
          onClick={isRunning ? () => console.log('Stop') : handleCommand}
          title={isRunning ? 'Stop execution' : 'Run command'}
        >
          {isRunning ? <Square size={16} /> : <Play size={16} />}
        </button>
        
        <button
          className="p-2 rounded hover:bg-gray-700 transition-colors text-gray-400 hover:text-gray-100"
          onClick={handleClear}
          title="Clear terminal"
        >
          <RefreshCw size={16} />
        </button>
        
        <button
          className="p-2 rounded hover:bg-gray-700 transition-colors text-gray-400 hover:text-gray-100"
          title="Save output"
        >
          <Download size={16} />
        </button>
        
        <button
          className="p-2 rounded hover:bg-gray-700 transition-colors text-gray-400 hover:text-gray-100"
          title="Maximize terminal"
        >
          <Maximize2 size={16} />
        </button>
        
        <span className="text-sm text-gray-400">Terminal</span>
      </div>
      
      <div 
        ref={outputRef}
        className="flex-1 bg-gray-950 p-3 font-mono text-sm text-gray-300 overflow-y-auto whitespace-pre-wrap"
      >
        {output.map((line, index) => (
          <div key={index} className={line.startsWith('$') ? 'text-blue-400' : ''}>
            {line}
          </div>
        ))}
        {isRunning && (
          <div className="inline-block w-3 h-4 bg-gray-400 animate-pulse" />
        )}
      </div>
      
      <div className="border-t border-gray-800 p-2">
        <div className="flex items-center bg-gray-950 rounded">
          <span className="pl-3 pr-2 text-green-400">$</span>
          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none p-2 text-gray-100 font-mono"
            placeholder="Enter command..."
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isRunning}
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalPanel;