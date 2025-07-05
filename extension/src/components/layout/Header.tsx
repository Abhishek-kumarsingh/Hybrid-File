import React from 'react';

interface ActionButton {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface HeaderProps {
  title: string;
  actions?: ActionButton[];
}

const Header: React.FC<HeaderProps> = ({ title, actions = [] }) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 py-3 px-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-100">{title}</h1>
      
      {actions && actions.length > 0 && (
        <div className="flex space-x-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors flex items-center space-x-1"
              title={action.label}
            >
              {action.icon}
              <span className="hidden md:inline text-sm">{action.label}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;