const tabSelect = () => {
    const tabs = Array.from(document.getElementsByClassName('tab'));

    tabs.forEach((tab) => {
        tab.addEventListener('click', function() {
            tab.classList.add('selected');
            
            for (let i = 0; i < tabs.length; i++) {
                if (tab !== tabs[i]) {
                    tabs[i].classList.remove('selected');
                }
            }
            
            const displays = Array.from(document.getElementsByClassName("panel-container"))
            
            for (let x = 0; x < displays.length; x++) {
                if (tab.dataset.panel === displays[x].id) {
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