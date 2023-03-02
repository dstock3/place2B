const { app, BrowserWindow } = require('electron');
const MacChanger = require('./tools/macchanger');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // Load the index.html file
  win.loadFile('index.html')

  // Define a function to handle the "Change MAC Address" button click event
  const handleChangeMacClick = () => {
    // Call the MacChanger function to change the MAC address
    MacChanger()
      .then(() => {
        console.log('MAC address changed successfully')
      })
      .catch((err) => {
        console.error('Error changing MAC address:', err)
      })
  }

  // Add a "Change MAC Address" button to the UI
  const template = [
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Change MAC Address',
          accelerator: 'CmdOrCtrl+Shift+C',
          click: handleChangeMacClick
        }
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
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

