const { ipcRenderer } = require('electron');
const { addMacChanger } = require('./doc/macchanger')
const { addNetworkInterfaces } = require('./doc/network')
const { getNetworkInterfaces } = require('./tools/network');
const { renderTerminal } = require('./doc/terminal')

/* tab select */

const tabs = Array.from(document.getElementsByClassName('tab'));

tabs.forEach((tab) => {
  tab.addEventListener('click', function() {
    tab.classList.add('selected');
    let tabId = tab.id
    for (let i = 0; i < tabs.length; i++) {
      if (tab !== tabs[i]) {
        tabs[i].classList.remove('selected');
      }
    }
    
    let panelControllerId = tabId.substring(tabId.length - 1);
    const displays = Array.from(document.getElementsByClassName("panel-container"))
    for (let x = 0; x < displays.length; x++) {
      if (panelControllerId === displays[x].id) {
        displays[x].classList.add("active");
        displays[x].classList.remove("hidden");
      } else {
        displays[x].classList.add("hidden");
        displays[x].classList.remove("active");

      }
    }
  });
});

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

