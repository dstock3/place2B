const helper = () => {
    const infoElement = document.querySelector('.info');

    infoElement.addEventListener('click', () => {
        const terminalDisplay = document.querySelector('.terminal-display');
        const newLine = document.createElement('div');
        newLine.classList.add('terminal-line', 'new');
        newLine.textContent = "here is the info you requested"
        terminalDisplay.appendChild(newLine);
        newLine.scrollIntoView();
    });
};

module.exports = { helper };
