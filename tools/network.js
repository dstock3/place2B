const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { networkInterfaces } = require('os');
const { refreshTerminal } = require('../doc/terminal')

const getNetworkInterfaces = async () => {
  const interfaces = networkInterfaces();
  const physicalInterfaces = Object.keys(interfaces).filter(name => {
    const iface = interfaces[name][0];
    return !iface.internal && iface.mac !== '00:00:00:00:00:00';
  });

  const activeInterfaces = [];
  for (const name of physicalInterfaces) {
    try {
      refreshTerminal(`ifconfig ${name}`)
      const { stdout } = await exec(`ifconfig ${name}`);
      refreshTerminal(stdout);
      
      if (stdout.includes('DOWN')) {
        activeInterfaces.push({ name, address: interfaces[name][0].address, state: "DOWN" });
      }

      if (stdout.includes('UP') && stdout.includes('RUNNING')) {
        activeInterfaces.push({ name, address: interfaces[name][0].address, state: "UP" });
      }

    } catch (err) {
      refreshTerminal(`Error checking interface ${name}: ${err.message}`);
    }
  }

  return activeInterfaces;
};

const bringDownInterface = async (interfaceName) => {
  try {
    const down = await exec(`sudo ifconfig ${interfaceName} down`)
  } catch (err) {
    refreshTerminal(`Error setting interface state ${interfaceName}: ${err.message}`);
  }
}

const startInterface = async (interfaceName) => {
  try {
    const down = await exec(`sudo ifconfig ${interfaceName} up`)
  } catch (err) {
    refreshTerminal(`Error setting interface state ${interfaceName}: ${err.message}`);
  }
}

module.exports = { getNetworkInterfaces, bringDownInterface, startInterface };
