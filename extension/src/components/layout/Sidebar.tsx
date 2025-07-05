import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarTab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tabs: SidebarTab[];
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  activeTab,
  onTabChange,
  tabs
}) => {
  return (
    <aside 
      className={`bg-gray-800 flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {!collapsed && (
          <h2 className="text-xl font-semibold text-blue-400">CodeGenius</h2>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-md hover:bg-gray-700 transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <nav className="flex-1 py-4">
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => onTabChange(tab.id)}
              >
                <span className="flex-shrink-0">{tab.icon}</span>
                {!collapsed && <span>{tab.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto p-4 border-t border-gray-700">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white font-medium">AI</span>
          </div>
          {!collapsed && (
            <div className="text-sm">
              <p className="font-medium">CodeGenius</p>
              <p className="text-gray-400">v1.0.0</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;