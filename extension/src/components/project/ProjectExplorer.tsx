import React, { useState } from 'react';
import { Folder, FolderOpen, FileCode, FileText, ChevronRight, ChevronDown, Search } from 'lucide-react';

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
  extension?: string;
}

const ProjectExplorer: React.FC = () => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root', 'src']));
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock file structure data
  const fileStructure: FileNode = {
    id: 'root',
    name: 'codegenius',
    type: 'folder',
    path: '/',
    children: [
      {
        id: 'src',
        name: 'src',
        type: 'folder',
        path: '/src',
        children: [
          {
            id: 'extension',
            name: 'extension.ts',
            type: 'file',
            path: '/src/extension.ts',
            extension: 'ts'
          },
          {
            id: 'core',
            name: 'core',
            type: 'folder',
            path: '/src/core',
            children: [
              {
                id: 'agent',
                name: 'agent.ts',
                type: 'file',
                path: '/src/core/agent.ts',
                extension: 'ts'
              },
              {
                id: 'config',
                name: 'config.ts',
                type: 'file',
                path: '/src/core/config.ts',
                extension: 'ts'
              }
            ]
          },
          {
            id: 'llm',
            name: 'llm',
            type: 'folder',
            path: '/src/llm',
            children: [
              {
                id: 'llmManager',
                name: 'llmManager.ts',
                type: 'file',
                path: '/src/llm/llmManager.ts',
                extension: 'ts'
              }
            ]
          }
        ]
      },
      {
        id: 'package',
        name: 'package.json',
        type: 'file',
        path: '/package.json',
        extension: 'json'
      },
      {
        id: 'tsconfig',
        name: 'tsconfig.json',
        type: 'file',
        path: '/tsconfig.json',
        extension: 'json'
      }
    ]
  };

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getFileIcon = (node: FileNode) => {
    if (node.type === 'folder') {
      return expandedFolders.has(node.id) ? <FolderOpen size={16} className="text-yellow-400" /> : <Folder size={16} className="text-yellow-400" />;
    }
    
    if (node.extension === 'ts' || node.extension === 'tsx') {
      return <FileCode size={16} className="text-blue-400" />;
    }
    
    if (node.extension === 'json') {
      return <FileText size={16} className="text-orange-400" />;
    }
    
    return <FileText size={16} className="text-gray-400" />;
  };

  const renderTree = (node: FileNode, level = 0) => {
    const isExpanded = expandedFolders.has(node.id);
    
    // Filter by search term if present
    if (searchTerm && !node.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      if (node.type === 'folder' && node.children) {
        const matchingChildren = node.children.filter(child => 
          child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (child.type === 'folder' && child.children && 
            child.children.some(grandchild => grandchild.name.toLowerCase().includes(searchTerm.toLowerCase())))
        );
        
        if (matchingChildren.length === 0) {
          return null;
        }
      } else if (node.type === 'file') {
        return null;
      }
    }
    
    return (
      <div key={node.id}>
        <div 
          className={`flex items-center px-4 py-1 cursor-pointer hover:bg-gray-800 ${level === 0 ? 'font-medium' : ''}`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => node.type === 'folder' ? toggleFolder(node.id) : console.log(`Open file: ${node.path}`)}
        >
          {node.type === 'folder' && (
            <span className="mr-1 text-gray-400">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          )}
          
          <span className="mr-2">{getFileIcon(node)}</span>
          <span className="text-gray-300 truncate">{node.name}</span>
        </div>
        
        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map(child => renderTree(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="p-3 border-b border-gray-700">
        <div className="relative">
          <input
            type="text"
            className="w-full bg-gray-800 text-gray-300 rounded-md py-1.5 pl-9 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2 text-gray-400" size={16} />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {renderTree(fileStructure)}
      </div>
      
      <div className="p-3 border-t border-gray-700 flex justify-between text-xs text-gray-500">
        <span>10 files, 5 folders</span>
        <span>TypeScript Project</span>
      </div>
    </div>
  );
};

export default ProjectExplorer;