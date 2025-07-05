import * as vscode from 'vscode';
import * as chokidar from 'chokidar';
import { EventEmitter } from 'events';

export class FileManager extends EventEmitter {
  private watchers: Map<string, chokidar.FSWatcher> = new Map();

  constructor() {
    super();
  }

  public watchFolder(folderPath: string): void {
    if (this.watchers.has(folderPath)) {
      return;
    }

    const watcher = chokidar.watch(folderPath, {
      ignored: /(^|[\/\\])\..|(node_modules)/,
      persistent: true,
      ignoreInitial: false
    });

    watcher
      .on('add', path => this.emit('fileAdded', path))
      .on('change', path => this.emit('fileChanged', path))
      .on('unlink', path => this.emit('fileDeleted', path))
      .on('addDir', path => this.emit('dirAdded', path))
      .on('unlinkDir', path => this.emit('dirDeleted', path));

    this.watchers.set(folderPath, watcher);
  }

  public unwatchFolder(folderPath: string): void {
    const watcher = this.watchers.get(folderPath);
    if (watcher) {
      watcher.close();
      this.watchers.delete(folderPath);
    }
  }

  public async readFile(filePath: string): Promise<string> {
    const document = await vscode.workspace.openTextDocument(filePath);
    return document.getText();
  }

  public async writeFile(filePath: string, content: string): Promise<void> {
    const document = await vscode.workspace.openTextDocument(filePath);
    const edit = new vscode.WorkspaceEdit();
    edit.replace(
      document.uri,
      new vscode.Range(
        document.positionAt(0),
        document.positionAt(document.getText().length)
      ),
      content
    );
    await vscode.workspace.applyEdit(edit);
    await document.save();
  }

  public dispose(): void {
    for (const watcher of this.watchers.values()) {
      watcher.close();
    }
    this.watchers.clear();
  }
}