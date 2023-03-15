const { getNetworkInterfaces, bringDownInterface, startInterface } = require('../tools/network')

const addNetworkInterfaces = networkInfo => {
    const interfaceContainer = document.querySelector('.network-interface-container');
    const parent = interfaceContainer.parentElement

    networkInfo.forEach(interface => {
        if (networkInfo) {
            const nameContainer = document.createElement('div');
            nameContainer.classList.add("interface-name-container");
            const nameLabel = document.createElement('div');
            nameLabel.classList.add("interface-name-label");
            nameLabel.textContent = "Interface Name:"
            nameContainer.appendChild(nameLabel);

            const interfaceName = document.createElement('div');
            interfaceName.classList.add('interface-name');
            interfaceName.textContent = interface.name;
            nameContainer.appendChild(interfaceName);
            interfaceContainer.appendChild(nameContainer);
            
            const addressContainer = document.createElement('div');
            addressContainer.classList.add("interface-address-container");
            const addressLabel = document.createElement('div');
            addressLabel.classList.add("interface-address-label");
            addressLabel.textContent = "Address:"
            addressContainer.appendChild(addressLabel);

            const interfaceAddress = document.createElement('div');
            interfaceAddress.classList.add('interface-address');
            interfaceAddress.textContent = interface.address;
            addressContainer.appendChild(interfaceAddress);
            interfaceContainer.appendChild(addressContainer);

            const stateContainer = document.createElement('div');
            stateContainer.classList.add("interface-state-container");
            const stateLabel = document.createElement('div');
            stateLabel.classList.add("interface-state-label");
            stateLabel.textContent = "State:"
            stateContainer.appendChild(stateLabel);

            const interfaceStatus = document.createElement('div');
            interfaceStatus.classList.add('interface-state');
            interfaceStatus.textContent = interface.state;
            stateContainer.appendChild(interfaceStatus);
            interfaceContainer.appendChild(stateContainer);

            const toggleNetworkStateButton = document.createElement('div');
            toggleNetworkStateButton.classList.add('toggle-network-state');
            toggleNetworkStateButton.id = interface.name
            toggleNetworkStateButton.textContent = "Toggle Network State"
            interfaceContainer.appendChild(toggleNetworkStateButton);

            toggleNetworkStateButton.addEventListener('click', async () => {
                if (interface.state === "UP") {
                  await bringDownInterface(interface.name);
                } else {
                  await startInterface(interface.name);
                }
              
                interfaceContainer.innerHTML = '';
              
                const interfaces = await getNetworkInterfaces();
                console.log(interfaces)
                addNetworkInterfaces(interfaces);
              });
        }
    });
}

module.exports = { addNetworkInterfaces }