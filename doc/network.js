
const addNetworkInterfaces = getNetworkInterfaces => {
    // Display network interfaces
    const networksContainer = document.getElementById('network-interface-container');

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
}


module.exports = { addNetworkInterfaces }