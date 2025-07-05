import * as vscode from 'vscode';
import { workspace, window, ExtensionContext } from 'vscode';
import { Agent } from './core/agent';
import { FileManager } from './codebase/fileManager';
import { ProjectStructure } from './codebase/projectStructure';
import { StateManager } from './core/stateManager';

export function activate(context: ExtensionContext) {
  const stateManager = new StateManager(context);
  const fileManager = new FileManager();
  const projectStructure = new ProjectStructure();
  const agent = new Agent(stateManager);

  // Handle workspace folder changes
  workspace.onDidChangeWorkspaceFolders((event) => {
    event.added.forEach(folder => {
      console.log(`Folder added: ${folder.uri.fsPath}`);
      projectStructure.syncFolder(folder.uri.fsPath);
    });

    event.removed.forEach(folder => {
      console.log(`Folder removed: ${folder.uri.fsPath}`);
      projectStructure.removeFolder(folder.uri.fsPath);
    });
  });

  // Handle active file changes
  window.onDidChangeActiveTextEditor((editor) => {
    if (editor) {
      const document = editor.document;
      agent.analyzeFile(document);
    }
  });

  // Handle file saves
  workspace.onDidSaveTextDocument((document) => {
    agent.analyzeFile(document);
    projectStructure.updateFile(document.uri.fsPath);
  });

  // Register commands
  let analyzeWorkspace = vscode.commands.registerCommand(
    'codegenius.analyzeWorkspace',
    () => {
      const workspaceFolders = workspace.workspaceFolders;
      if (workspaceFolders) {
        workspaceFolders.forEach(folder => {
          projectStructure.syncFolder(folder.uri.fsPath);
          agent.analyzeWorkspace(folder.uri.fsPath);
        });
      } else {
        window.showInformationMessage('No workspace folder is open');
      }
    }
  );

  context.subscriptions.push(analyzeWorkspace);

  // Initial workspace sync
  if (workspace.workspaceFolders) {
    workspace.workspaceFolders.forEach(folder => {
      projectStructure.syncFolder(folder.uri.fsPath);
      agent.analyzeWorkspace(folder.uri.fsPath);
    });
  }
}

export function deactivate() {
  // Cleanup code
}