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
            decide(listOfRows[i].childNodes[j]);
            });
        }
    }
}

function decide(node) {
    if(node.classList.contains('activated')) {
        return consecutiveHover(node, masterArray);
    } 

    else {
        return firstHover(node);
    }

}

let masterArray = [];

function drawFromArray(node, masterArray) {
    for(let i = 0; i < masterArray.length; i++) {
        if(node == masterArray[i][0]){

            masterArray[i][1][0] -= masterArray[i][2][0];

            masterArray[i][1][1] -= masterArray[i][2][1];

            masterArray[i][1][2] -= masterArray[i][2][2];

            console.log(`orig: ${masterArray[i][1][0]}, ${masterArray[i][1][1]}, ${masterArray[i][1][2]}`);
            console.log(`altered by 10%: ${masterArray[i][2][0]}, ${masterArray[i][2][1]}, ${masterArray[i][2][2]}`);
            node.style.backgroundColor = `rgb(${masterArray[i][1][0]}, ${masterArray[i][1][1]}, ${masterArray[i][1][2]})`;
            console.log(`result: ${masterArray[i][1][0]}, ${masterArray[i][1][1]}, ${masterArray[i][1][2]}`);
        }
    }
}

function consecutiveHover(node, masterArray) {
    drawFromArray(node, masterArray);
}

function firstHover(node) {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    console.log(`${red}, ${green}, ${blue}`);
    node.classList.add('activated');
    node.style.backgroundColor = `rgb(${red},${green},${blue})`;

    let divBackgroundColor = window.getComputedStyle(node).backgroundColor;
    let values = divBackgroundColor.substring(4, divBackgroundColor.length-1).replace(/ /g, '').split(',');
    let alteredValues = [values[0]/10, values[1]/10, values[2]/10];
    let infoArray = [node, values, alteredValues];
    masterArray.push(infoArray);
}

function changeBackgroundColor(node) {
    const dropDown = document.getElementById('dropdown').value;
    let color;

    (dropDown == 'Black') ? color = 'Black' : 
    color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

    node.style.backgroundColor = color;
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