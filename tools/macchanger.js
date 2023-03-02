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
    label: 'Enter frequency of MAC address changes (in minutes):',
    inputAttrs: {
      type: 'number'
    }
  });
  if (!freq) return;

  const options = {
    name: 'Electron',
  };

  setInterval(() => {
    console.log(`Changing MAC address of ${iface} to ${newMac}`);
    // Use the macchanger command to change the MAC address
    sudo.exec(`macchanger -r ${iface}`, options, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error changing MAC address: ${error.message}`);
        return;
      }
      console.log(`MAC address changed successfully`);
    });
  }, freq * 60000);
}

module.exports = MacChanger;
