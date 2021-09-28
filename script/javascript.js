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
    prompt('Enter length of side for grid. Max 100');
}