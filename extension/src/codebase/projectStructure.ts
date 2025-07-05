import * as vscode from 'vscode';
import { FileManager } from './fileManager';
import { Parser } from './parser';
import { Analyzer } from './analyzer';

export class ProjectStructure {
  private fileManager: FileManager;
  private parser: Parser;
  private analyzer: Analyzer;
  private structure: Map<string, any> = new Map();

  constructor() {
    this.fileManager = new FileManager();
    this.parser = new Parser();
    this.analyzer = new Analyzer();

    this.fileManager.on('fileAdded', this.handleFileAdded.bind(this));
    this.fileManager.on('fileChanged', this.handleFileChanged.bind(this));
    this.fileManager.on('fileDeleted', this.handleFileDeleted.bind(this));
  }

  public syncFolder(folderPath: string): void {
    this.fileManager.watchFolder(folderPath);
    this.updateStructure(folderPath);
  }

  public removeFolder(folderPath: string): void {
    this.fileManager.unwatchFolder(folderPath);
    this.structure.delete(folderPath);
  }

  public updateFile(filePath: string): void {
    this.handleFileChanged(filePath);
  }

  private async handleFileAdded(filePath: string): Promise<void> {
    const content = await this.fileManager.readFile(filePath);
    const parsed = await this.parser.parseFile(filePath, content);
    const analysis = await this.analyzer.analyzeFile(parsed);
    
    this.updateStructureWithFile(filePath, {
      content,
      parsed,
      analysis
    });
  }

  private async handleFileChanged(filePath: string): Promise<void> {
    await this.handleFileAdded(filePath);
  }

  private handleFileDeleted(filePath: string): void {
    this.removeFromStructure(filePath);
  }

  private async updateStructure(folderPath: string): Promise<void> {
    const files = await vscode.workspace.findFiles(
      new vscode.RelativePattern(folderPath, '**/*'),
      '**/node_modules/**'
    );

    for (const file of files) {
      await this.handleFileAdded(file.fsPath);
    }
  }

  private updateStructureWithFile(filePath: string, data: any): void {
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(filePath));
    if (workspaceFolder) {
      const structure = this.structure.get(workspaceFolder.uri.fsPath) || {};
      structure[filePath] = data;
      this.structure.set(workspaceFolder.uri.fsPath, structure);
    }
  }

  private removeFromStructure(filePath: string): void {
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(filePath));
    if (workspaceFolder) {
      const structure = this.structure.get(workspaceFolder.uri.fsPath);
      if (structure) {
        delete structure[filePath];
        this.structure.set(workspaceFolder.uri.fsPath, structure);
      }
    }
  }

  public getStructure(): Map<string, any> {
    return this.structure;
  }

  public dispose(): void {
    this.fileManager.dispose();
  }
}