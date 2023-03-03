const addMacChanger = handleClick => {
    const macChangerButton = document.createElement('button');
    macChangerButton.textContent = 'Change Now';
    macChangerButton.addEventListener('click', handleClick);
    const macChangerDiv = document.createElement('div');
    macChangerDiv.classList.add('button-container');
    macChangerDiv.appendChild(macChangerButton);
    const macContainer = document.querySelector('.mac-changer-container')
    macContainer.appendChild(macChangerDiv)
}

module.exports = { addMacChanger }