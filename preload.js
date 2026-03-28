const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  searchWeb: (query) => ipcRenderer.invoke('search-web', query),
  executeCommand: (command) => ipcRenderer.invoke('execute-command', command),
  getSystemInfo: () => ipcRenderer.invoke('system-info')
});
