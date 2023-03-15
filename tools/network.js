const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { networkInterfaces } = require('os');
const { refreshTerminal } = require('../doc/terminal');

const getNetworkInterfaces = async () => {
  try {
    const { stdout } = await exec(`ip -br link show`);
    const lines = stdout.split('\n').filter(line => line.trim() !== '');
    refreshTerminal(lines);
    const activeInterfaces = [];

    for (const line of lines) {
      const [name, flags, ...rest] = line.split(/\s+/);
      const isUp = flags.includes('UP');

      if (name === 'lo') {
        continue; // Skip any loopback interface
      }

      const addressInfo = await exec(`ip -json -4 addr show ${name}`);
      const jsonOutput = JSON.parse(addressInfo.stdout);

      if (jsonOutput.length > 0 && jsonOutput[0].addr_info.length > 0) {
        const address = jsonOutput[0].addr_info[0].local;
        activeInterfaces.push({ name, address, state: isUp ? 'UP' : 'DOWN' });
      } else {
        activeInterfaces.push({ name, address: 'N/A', state: isUp ? 'UP' : 'DOWN' });
      }
    }

    return activeInterfaces;
  } catch (err) {
    console.error(`Error getting network interfaces: ${err.message}`);
    return [];
  }
};

const bringDownInterface = async (interfaceName) => {
  try {
    await exec(`sudo ip link set ${interfaceName} down`);
  } catch (err) {
    refreshTerminal(`Error setting interface state ${interfaceName}: ${err.message}`);
  }
};

const startInterface = async (interfaceName) => {
  try {
    await exec(`sudo ip link set ${interfaceName} up`);
  } catch (err) {
    refreshTerminal(`Error setting interface state ${interfaceName}: ${err.message}`);
  }
};

module.exports = { getNetworkInterfaces, bringDownInterface, startInterface };