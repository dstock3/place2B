const { app, BrowserWindow, ipcMain } = require('electron');
const MacChanger = require('./tools/macchanger');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })

  win.loadFile('index.html')

  // Handle "Change MAC Address" button click event
  ipcMain.on('change-mac-address', async (event, arg) => {
    try {
      await MacChanger();
      event.reply('change-mac-address-response', { success: true });
    } catch (err) {
      console.error('Error changing MAC address:', err);
      event.reply('change-mac-address-response', { success: false, error: err });
    }
  });
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
