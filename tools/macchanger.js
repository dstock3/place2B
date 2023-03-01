const sudo = require('sudo-prompt');
const prompt = require('electron-prompt');

const MacChanger = async () => {
  const iface = await prompt({
    title: 'Change MAC Address',
    label: 'Enter network interface name:',
    inputAttrs: {
      type: 'text'
    }
  });
  if (!iface) return;

  const freq = await prompt({
    title: 'Change MAC Address',
    label: 'Enter frequency of MAC address changes (in seconds):',
    inputAttrs: {
      type: 'number'
    }
  });
  if (!freq) return;

  const options = {
    name: 'Electron',
  };

  setInterval(() => {
    // Generate a random MAC address
    const newMac = Array.from({ length: 6 }, () => Math.floor(Math.random() * 256).toString(16)).join(':');
    console.log(`Changing MAC address of ${iface} to ${newMac}`);
    // Use the macchanger command to change the MAC address
    sudo.exec(`macchanger -m ${newMac} ${iface}`, options, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error changing MAC address: ${error.message}`);
        return;
      }
      console.log(`MAC address changed successfully`);
    });
  }, freq * 1000);
}

module.exports = MacChanger;
