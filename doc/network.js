const addNetworkInterfaces = networkInfo => {
    networkInfo.forEach(interface => {
        const interfaceContainer = document.querySelector('.network-interface-container');

        const interfaceName = document.createElement('div');
        interfaceName.classList.add('interface-name');
        interfaceName.textContent = interface.name;
        interfaceContainer.appendChild(interfaceName);

        const interfaceAddress = document.createElement('div');
        interfaceAddress.classList.add('interface-address');
        interfaceAddress.textContent = interface.address;
        interfaceContainer.appendChild(interfaceAddress);
    });

}

module.exports = { addNetworkInterfaces }