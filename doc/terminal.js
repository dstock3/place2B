const renderTerminal = (terminal) => {
    const terminalDisplay = document.querySelector('.terminal-display');
  
    terminalDisplay.innerHTML = '';
  
    terminal.lines.forEach((line) => {
      const lineElement = document.createElement('div');
      lineElement.classList.add('terminal-line');
      lineElement.innerText = line;
  
      terminalDisplay.appendChild(lineElement);
    });
  
    terminal.onNewLine = (line) => {
      const lineElement = document.createElement('div');
      lineElement.classList.add('terminal-line');
      lineElement.innerText = line;
  
      terminalDisplay.appendChild(lineElement);
    };
};
  
module.exports = { renderTerminal }
  