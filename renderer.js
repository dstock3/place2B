const { ipcRenderer } = require('electron');

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
