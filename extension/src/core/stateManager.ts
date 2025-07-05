import * as vscode from 'vscode';

interface FileAnalysis {
    timestamp: string;
    language: string;
    metrics: {
        linesOfCode: number;
        [key: string]: any;
    };
}

interface WorkspaceAnalysis {
    timestamp: string;
    path: string;
    metrics: {
        [key: string]: any;
    };
}

export class StateManager {
    private context: vscode.ExtensionContext;
    private fileAnalyses: Map<string, FileAnalysis>;
    private workspaceAnalyses: Map<string, WorkspaceAnalysis>;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this.fileAnalyses = new Map();
        this.workspaceAnalyses = new Map();
    }

    public setFileAnalysis(filePath: string, analysis: FileAnalysis) {
        this.fileAnalyses.set(filePath, analysis);
        this.persistState();
    }

    public getFileAnalysis(filePath: string): FileAnalysis | undefined {
        return this.fileAnalyses.get(filePath);
    }

    public setWorkspaceAnalysis(workspacePath: string, analysis: WorkspaceAnalysis) {
        this.workspaceAnalyses.set(workspacePath, analysis);
        this.persistState();
    }

    public getWorkspaceAnalysis(workspacePath: string): WorkspaceAnalysis | undefined {
        return this.workspaceAnalyses.get(workspacePath);
    }

    private persistState() {
        // Convert Maps to objects for storage
        const state = {
            fileAnalyses: Object.fromEntries(this.fileAnalyses),
            workspaceAnalyses: Object.fromEntries(this.workspaceAnalyses)
        };

        // Store in extension's global state
        this.context.globalState.update('agentState', state);
    }

    public loadState() {
        const state = this.context.globalState.get<{
            fileAnalyses: Record<string, FileAnalysis>;
            workspaceAnalyses: Record<string, WorkspaceAnalysis>;
        }>('agentState');

        if (state) {
            this.fileAnalyses = new Map(Object.entries(state.fileAnalyses));
            this.workspaceAnalyses = new Map(Object.entries(state.workspaceAnalyses));
        }
    }

    public clearState() {
        this.fileAnalyses.clear();
        this.workspaceAnalyses.clear();
        this.context.globalState.update('agentState', undefined);
    }
} 