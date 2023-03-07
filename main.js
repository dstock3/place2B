const { app, BrowserWindow, ipcMain } = require('electron');
const sudo = require('sudo-prompt');
const { getNetworkInterfaces } = require('./tools/network');

let mainWindow;

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('index.html');

  // Add an error listener to the process object
  process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
  });

};

app.whenReady().then(createWindow);


