const { app, BrowserWindow, ipcMain } = require('electron');
const sudo = require('sudo-prompt');
const { getNetworkInterfaces } = require('./tools/network');
const { changeMacAddress } = require('./tools/macchanger');

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

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Add an error listener to the process object
  process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
  });

  const interfaces = await getNetworkInterfaces();
  mainWindow.webContents.send('available-interfaces', interfaces);

  ipcMain.on('change-mac-address', async (event, iface) => {
    
    try {
      const result = await changeMacAddress(iface);
      event.reply('mac-address-changed', `Result: ${result}`);
      (async () => {
        try {
          const result = await changeMacAddress(iface);
          event.reply('mac-address-changed', `Result: ${result}`);
        } catch (err) {
          console.error(`Error changing MAC address: ${err.message}`);
        }
      })
    } catch (err) {
      console.error(`Error changing MAC address: ${err.message}`);
    }
  });
};

app.whenReady().then(createWindow);


