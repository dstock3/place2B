const { ipcRenderer } = require('electron');
const { addMacChanger } = require('./doc/macchanger')
const { addNetworkInterfaces } = require('./doc/network')
const { getNetworkInterfaces } = require('./tools/network');
const { renderTerminal, clearTerminal } = require('./doc/terminal');
const { tabSelect } = require('./doc/tabSelect');
const { helper } = require('./doc/help')

tabSelect();
helper("test test test content longer message test test test", clearTerminal);

/*

try {
  const MyTerminal = require('./tools/terminal')
  const terminal = new MyTerminal
  renderTerminal(terminal)
} catch (e) {
  console.error('Error initializing terminal:', e)
}

*/

const handleChangeMacClick = () => {
  const iface = networkInterfacesSelect.value;
  ipcRenderer.send('change-mac-address', iface); // pass the iface name as an argument
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
  handleChangeMacClick(iface);
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

