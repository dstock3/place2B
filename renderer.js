const { ipcRenderer } = require('electron');
const { getNetworkInterfaces } = require('./tools/network');

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

const macChangerButton = document.createElement('button');
macChangerButton.textContent = 'Change MAC Address';
macChangerButton.addEventListener('click', handleChangeMacClick);

const macChangerDiv = document.createElement('div');
macChangerDiv.classList.add('button-container');
macChangerDiv.appendChild(macChangerButton);

const mainElement = document.querySelector('main');
mainElement.appendChild(macChangerDiv);

// Display network interfaces
const networksContainer = document.getElementById('network-container');

async function displayNetworkInterfaces() {
  const networkInterfaces = await getNetworkInterfaces();
  console.log(networkInterfaces)

  networkInterfaces.forEach((iface) => {
    const ifaceDiv = document.createElement('div');
    const nameSpan = document.createElement('span');
    const addressSpan = document.createElement('span');
    nameSpan.textContent = `Name: ${iface.name}`;
    addressSpan.textContent = `Address: ${iface.address}`;
    ifaceDiv.appendChild(nameSpan);
    ifaceDiv.appendChild(addressSpan);
    networksContainer.appendChild(ifaceDiv);
  });
}

displayNetworkInterfaces();



