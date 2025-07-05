import React, { useState } from 'react';
import { Bot, Code, Terminal, FileCode, Settings, Zap, Brain, History } from 'lucide-react';
import ChatPanel from './chat/ChatPanel';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import CodeSuggestionPanel from './code/CodeSuggestionPanel';
import TerminalPanel from './terminal/TerminalPanel';
import ProjectExplorer from './project/ProjectExplorer';
import { ThemeProvider } from '../contexts/ThemeContext';

const AgentInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderActivePanel = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatPanel />;
      case 'code':
        return <CodeSuggestionPanel />;
      case 'terminal':
        return <TerminalPanel />;
      case 'project':
        return <ProjectExplorer />;
      default:
        return <ChatPanel />;
    }
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-900 text-gray-100">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={[
            { id: 'chat', label: 'AI Chat', icon: <Bot size={20} /> },
            { id: 'code', label: 'Code Suggestions', icon: <Code size={20} /> },
            { id: 'terminal', label: 'Terminal', icon: <Terminal size={20} /> },
            { id: 'project', label: 'Project Structure', icon: <FileCode size={20} /> },
          ]}
        />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          <Header 
            title={
              activeTab === 'chat' ? 'AI Assistant' :
              activeTab === 'code' ? 'Code Suggestions' :
              activeTab === 'terminal' ? 'Terminal Output' :
              'Project Explorer'
            }
            actions={[
              { label: 'Run Analysis', icon: <Zap size={16} />, onClick: () => console.log('Run analysis') },
              { label: 'Model Settings', icon: <Brain size={16} />, onClick: () => console.log('Open settings') },
              { label: 'History', icon: <History size={16} />, onClick: () => console.log('View history') },
              { label: 'Settings', icon: <Settings size={16} />, onClick: () => console.log('Open settings') },
            ]}
          />
          
          <div className="flex-1 overflow-hidden">
            {renderActivePanel()}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default AgentInterface;