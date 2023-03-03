const { ipcRenderer } = require('electron');
const { addMacChanger } = require('./doc/macchanger')
const { addNetworkInterfaces } = require('./doc/network')
const { getNetworkInterfaces } = require('./tools/network');
const { renderTerminal } = require('./doc/terminal')

try {
  const MyTerminal = require('./tools/terminal')
  const terminal = new MyTerminal
  renderTerminal(terminal)
} catch (e) {
  console.error('Error initializing terminal:', e)
}

const handleChangeMacClick = () => {
  ipcRenderer.send('change-mac-address');
  ipcRenderer.once('change-mac-address-response', (event, arg) => {
    if (arg.success) {
      console.log('MAC address changed successfully');
    } else {
      console.error('Error changing MAC address:', arg.error);
    }
  });
};

addMacChanger(handleChangeMacClick)
addNetworkInterfaces(getNetworkInterfaces)

const networkInterfacesSelect = document.getElementById('network-interfaces-select');
const frequencyInput = document.getElementById('frequency-input');
const changeNowButton = document.getElementById('change-mac-btn');

changeNowButton.addEventListener('click', () => {
  const iface = networkInterfacesSelect.value;
  ipcRenderer.send('change-mac-address', iface);
});

ipcRenderer.on('network-interfaces', (event, networkInterfaces) => {
  networkInterfacesSelect.innerHTML = '';
  networkInterfaces.forEach(({ name }) => {
    const option = document.createElement('option');
    option.text = name;
    option.value = name;
    networkInterfacesSelect.add(option);
  });
});

