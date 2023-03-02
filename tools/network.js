const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { networkInterfaces } = require('os');

const getNetworkInterfaces = async () => {
  const interfaces = networkInterfaces();
  const physicalInterfaces = Object.keys(interfaces).filter(name => {
    const iface = interfaces[name][0];
    return !iface.internal && iface.mac !== '00:00:00:00:00:00';
  });

  const activeInterfaces = [];
  for (const name of physicalInterfaces) {
    try {
      console.log(`Checking interface ${name}`);
      const { stdout } = await exec(`ifconfig ${name}`);
      console.log(`ifconfig ${name} output:`, stdout);
      if (stdout.includes('UP') && stdout.includes('RUNNING')) {
        activeInterfaces.push({ name, address: interfaces[name][0].address });
      }
    } catch (err) {
      console.error(`Error checking interface ${name}: ${err.message}`);
    }
  }

  console.log('Active interfaces:', activeInterfaces);
  return activeInterfaces;
};

module.exports = { getNetworkInterfaces };
