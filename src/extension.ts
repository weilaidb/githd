import * as vs from 'vscode';

import { Model } from './model';
import { GitService } from './gitService';
import { CommandCenter } from './commands';
import { HistoryViewProvider } from './historyViewProvider';
import { ExplorerViewProvider } from './explorerViewProvider';
import { InfoViewProvider } from './infoViewProvider';
import { BlameViewProvider } from './blameViewProvider';
import { Dataloader } from './dataloader';
import { PanelViewProvider } from './panelViewProvider';
import { initializeIcons } from './icons';

export function activate(context: vs.ExtensionContext) {
  initializeIcons(context);
  const gitService = new GitService(context);
  const model = new Model(context, gitService);
  const dataloader = new Dataloader(context, gitService, model);
  let panelView = new PanelViewProvider(context, model);
  let historyViewProvider = new HistoryViewProvider(context, model, dataloader, gitService, panelView);
  let explorerViewProvider = new ExplorerViewProvider(context, model, dataloader, gitService);
  new InfoViewProvider(context, model, gitService);
  new BlameViewProvider(context, model, gitService);
  new CommandCenter(context, model, dataloader, gitService, historyViewProvider, explorerViewProvider);
  gitService.updateGitRoots(vs.workspace.workspaceFolders);
}

export function deactivate() {}
