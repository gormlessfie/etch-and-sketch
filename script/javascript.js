const once = {
    once : true
};


function setup(numBoxes) {
    const gridContainerSelector = document.querySelector('#grid-container');
    const size = 800/numBoxes;

    for(let i = 0; i < numBoxes; i++) {
        const rowBoxes = document.createElement('div');
        rowBoxes.setAttribute(`style`, `display: flex; flex: 1 0 auto; padding: 0; margin: 0`);
        rowBoxes.classList.add('row');
        rowBoxes.classList.add(`${i}`);

        for(let j = 0; j < numBoxes; j++) {
            const columnBoxes = document.createElement('div');
            columnBoxes.classList.add('column');
            columnBoxes.classList.add(`${j}`);
            columnBoxes.setAttribute(`style`, `display: flex; min-width: ${size}px; 
                min-height: ${size}px; width: ${size}px; height: ${size}px; flex: 0 0 auto; 
                padding: 0; margin: 0; background-color: white;`);
            
            rowBoxes.appendChild(columnBoxes);
        }
        gridContainerSelector.appendChild(rowBoxes);
    }
    addHoverEventToButtons(numBoxes); 
}

function addHoverEventToButtons(numBoxes) {
    const listOfRows = document.querySelectorAll('.row');

    for(let i = 0; i < numBoxes; i++) {
        for(let j = 0; j < numBoxes; j++) {
            listOfRows[i].childNodes[j].addEventListener('mouseover',() => {
                changeBackgroundColor(listOfRows[i].childNodes[j]);
            });
        }
    }
}

function changeBackgroundColor(node) {
    node.style.backgroundColor = 'black';
}

function clearGrid(numBoxes) {
    const listOfRows = document.querySelectorAll('.row');

    for(let i = 0; i < numBoxes; i++) {
        for(let j = 0; j < numBoxes; j++) {
            listOfRows[i].childNodes[j].style.backgroundColor = 'white';
        }
    }
}

function promptUser() {
    const response = prompt('Enter length of side for grid. Max: 100. Default: 16', '16');
    return response;
}

function initialize(numBoxes) {
    setup(numBoxes);
    initButton();
}

function initButton() {
    const resetButton = document.querySelector('#resetbtn');
    resetButton.addEventListener('click', () => {

        let userInput = promptUser();
        if(userInput <= 0 || userInput > 100) {
            alert('Please choose a number between 1-100. Reverting back to 16x16 grid.');
            userInput = 16;
        }
        removeGrid();
        initialize(userInput);
    }, once)
}

function removeGrid() {
    const gridContainerSelector = document.querySelector('#grid-container');
    while(gridContainerSelector.hasChildNodes()) {
        gridContainerSelector.removeChild(gridContainerSelector.firstChild);
    }
}

initialize(16);