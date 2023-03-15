const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
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


