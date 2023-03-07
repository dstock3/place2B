const addNetworkInterfaces = networkInfo => {
    networkInfo.forEach(interface => {
        const interfaceContainer = document.querySelector('.network-interface-container');
        if (networkInfo) {
            const interfaceHead = document.createElement('h2');
            interfaceHead.textContent = 'Available Interfaces';
            interfaceContainer.appendChild(interfaceHead);

            const interfaceName = document.createElement('div');
            interfaceName.classList.add('interface-name');
            interfaceName.textContent = interface.name;
            interfaceContainer.appendChild(interfaceName);
    
            const interfaceAddress = document.createElement('div');
            interfaceAddress.classList.add('interface-address');
            interfaceAddress.textContent = interface.address;
            interfaceContainer.appendChild(interfaceAddress);

            const interfaceStatus = document.createElement('div');
            interfaceStatus.classList.add('interface-status');
            interfaceStatus.textContent = interface.status;
            interfaceContainer.appendChild(interfaceStatus);
        }
    });
}

module.exports = { addNetworkInterfaces }