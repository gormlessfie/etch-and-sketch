
function setup(numBoxofX, numBoxofY) {
    const gridContainerSelector = document.querySelector('#grid-container');

    for(let i = 0; i < numBoxofX; i++) {
        const rowBoxes = document.createElement('div');
        rowBoxes.classList.add(`row-${i}`);
        for(let j = 0; i < numBoxofY; j++) {
            const rowBoxesSelector = document.querySelector(`row-${i}`);
            const columnBoxes = document.createElement('p');
            columnBoxes.classList.add(`column-${j}`);
            columnBoxes.textContent = 'hello';
            rowBoxes.appendChild(columnBoxes);
        }
        gridContainerSelector.appendChild(rowBoxes);
    }
}