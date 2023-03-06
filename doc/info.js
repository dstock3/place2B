const { helper } = require('./terminal');
const data = require('../info/info.json');
const info = data.pentesting_tools;

const infoController = () => {
    const infoElements = Array.from(document.getElementsByClassName('info'));
    infoElements.forEach((element) => {
        for (let i = 0; i < info.length; i++) {
            if (element.dataset.app === info[i].id) {
                helper(element, info[i].description);
            }
        }
    });
}

module.exports = { infoController };