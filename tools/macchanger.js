const cron = require('node-cron');
const sudo = require('sudo-prompt');
const prompt = require('electron-prompt');
const { getNetworkInterfaces } = require('./network');

const changeMacAddress = async (iface) => {
  const options = {
    name: 'Electron',
  };

  return new Promise((resolve, reject) => {
    sudo.exec(`macchanger -r ${iface}`, options, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
};

const MacChanger = async () => {
  const networkInterfaces = await getNetworkInterfaces();
  const iface = await prompt({
    title: 'Change MAC Address',
    label: 'Select network interface:',
    type: 'select',
    selectOptions: networkInterfaces.reduce((options, { name }) => {
      options[name] = name;
      return options;
    }, {}),
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

  const job = cron.schedule(`*/${freq} * * * *`, async () => {
    try {
      console.log(`Changing MAC address of ${iface}`);
      const result = await changeMacAddress(iface);
      console.log(`Result: ${result}`);
    } catch (err) {
      console.error(`Error changing MAC address: ${err.message}`);
    }
  });

  job.start();
};

module.exports = MacChanger;
