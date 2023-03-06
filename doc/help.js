const helper = (content) => {
    const infoElement = document.querySelector('.info');

    const clearButton = document.querySelector('.clear-button');

    let terminalLines = Array.from(document.getElementsByClassName('.terminal-line'));

    infoElement.addEventListener('click', () => {
        const terminalDisplay = document.querySelector('.terminal-display');
        const newLine = document.createElement('div');
        newLine.classList.add('terminal-line', 'new');
        newLine.textContent = content;
        terminalDisplay.appendChild(newLine);
        newLine.scrollIntoView();
        terminalLines.push(newLine);
    });
    
    clearButton.addEventListener('click', () => {
      terminalLines.forEach((line) => {
        line.remove();
      });
    });
};

module.exports = { helper };
