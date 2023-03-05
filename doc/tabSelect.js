const tabSelect = () => {
    const tabs = Array.from(document.getElementsByClassName('tab'));

    tabs.forEach((tab) => {
        tab.addEventListener('click', function() {
            tab.classList.add('selected');
            let tabId = tab.id
            for (let i = 0; i < tabs.length; i++) {
                if (tab !== tabs[i]) {
                    tabs[i].classList.remove('selected');
                }
            }
            
            let panelControllerId = tabId.substring(tabId.length - 1);
            const displays = Array.from(document.getElementsByClassName("panel-container"))
            
            for (let x = 0; x < displays.length; x++) {
                if (panelControllerId === displays[x].id) {
                    displays[x].classList.add("active");
                    displays[x].classList.remove("hidden");
                } else {
                    displays[x].classList.add("hidden");
                    displays[x].classList.remove("active");

                }
            }
        });
    });
}

module.exports = { tabSelect }