const helper = (infoElement, content) => {
    const clearButton = document.querySelector('.clear-button');
    const terminalDisplay = document.querySelector('.terminal-display');
    let terminalLines = Array.from(document.getElementsByClassName('.terminal-line'));

    infoElement.addEventListener('click', () => {
        const terminalCursor = document.querySelector('.terminal-cursor');
        if (terminalCursor) terminalCursor.remove();

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

        const terminalCursor = document.createElement('span');
        terminalCursor.classList.add('terminal-cursor');
        terminalDisplay.appendChild(terminalCursor);
    });
};

module.exports = { helper };
