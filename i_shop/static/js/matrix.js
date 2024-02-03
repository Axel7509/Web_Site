document.addEventListener('DOMContentLoaded', function () {
    const generateButton = document.getElementById('generateButton');
    const transposeButton = document.getElementById('transposeButton');
    const addRowButton = document.getElementById('addRowButton');
    const addColumnButton = document.getElementById('addColumnButton');

    generateButton.addEventListener('click', generateTable);
    transposeButton.addEventListener('click', transposeTable);
    addRowButton.addEventListener('click', addRow);
    addColumnButton.addEventListener('click', addColumn);

    document.getElementById('randomTable').addEventListener('click', highlightCell);

});

function generateTable() {
    const tableSize = parseInt(document.getElementById('tableSize').value);
    const randomTable = document.getElementById('randomTable');
    randomTable.innerHTML = '';

    for (let i = 0; i < tableSize; i++) {
        const row = randomTable.insertRow();
        for (let j = 0; j < tableSize; j++) {
            const cell = row.insertCell();
            cell.textContent = Math.floor(Math.random() * 100);
        }

    }

    const transposeButton = document.getElementById('transposeButton');
    transposeButton.style.display = 'inline';
}

function addRow() {
    const randomTable = document.getElementById('randomTable');
    const newRow = randomTable.insertRow();

    for (let i = 0; i < randomTable.rows[0].cells.length; i++) {
        const cell = newRow.insertCell();
        cell.textContent = Math.floor(Math.random() * 100);
    }

}

function addColumn() {
    const randomTable = document.getElementById('randomTable');

    for (let i = 0; i < randomTable.rows.length; i++) {
        const cell = randomTable.rows[i].insertCell();
        cell.textContent = Math.floor(Math.random() * 100);
    }

}

function transposeTable() {
    const randomTable = document.getElementById('randomTable');
    const rows = randomTable.rows;
    const cols = rows[0].cells.length;

    const transposedTable = document.createElement('table');
    for (let i = 0; i < cols; i++) {
        const row = transposedTable.insertRow();
        for (let j = 0; j < rows.length; j++) {
            const cell = row.insertCell();
            cell.textContent = rows[j].cells[i].textContent;
        }
    }

    randomTable.innerHTML = transposedTable.innerHTML;
}

function highlightCell(event) {
    const clickedCell = event.target;

    if (clickedCell.tagName === 'TD') {
        const cellValue = parseInt(clickedCell.textContent);

        const row = clickedCell.parentNode;
        const cellsInRow = row.getElementsByTagName('td');
        for (let cell of cellsInRow) {
            cell.classList.remove('highlighted');
        }

        const maxSelectedCells = parseInt(document.getElementById('maxSelectedCells').value);

        if (cellValue % 2 === 0 && !hasAdjacentSelectedCell(clickedCell, maxSelectedCells, cellsInRow)) {
            clickedCell.classList.add('highlighted-even');
        } else if (cellValue % 2 !== 0 && !hasAdjacentSelectedCell(clickedCell, maxSelectedCells, cellsInRow)) {
            clickedCell.classList.add('highlighted-odd');
        }
    }
}

function hasAdjacentSelectedCell(clickedCell, maxSelectedCells, cellsInRow) {
    const clickedCellIndex = Array.from(cellsInRow).indexOf(clickedCell);

    let leftCount = 0;
    let rightCount = 0;

    let selectedCountRow = 0;
    let selectedCountColumn = 0;
    const columnIndex = clickedCell.cellIndex;
    const table = clickedCell.closest('table');
    const rows = table.rows;
    const rowIndex = Array.from(rows).indexOf(clickedCell.parentNode);

    for (let i = rowIndex; i >= 0; i--) {
        const currentCell = rows[i].cells[columnIndex];
        if (currentCell.classList.contains('highlighted-even') || currentCell.classList.contains('highlighted-odd')) {
            selectedCountColumn++;
        }
    }

    for (let i = rowIndex + 1; i < rows.length; i++) {
        const currentCell = rows[i].cells[columnIndex];
        if (currentCell.classList.contains('highlighted-even') || currentCell.classList.contains('highlighted-odd')) {
            selectedCountColumn++;
        }
    }

    for (let i = clickedCellIndex; i >= 0; i--) {
        const currentCell = cellsInRow[i];
        if (currentCell.classList.contains('highlighted-even') || currentCell.classList.contains('highlighted-odd')) {
            selectedCountRow++;
        }
    }

    for (let i = clickedCellIndex + 1; i < cellsInRow.length; i++) {
        const currentCell = cellsInRow[i];
        if (currentCell.classList.contains('highlighted-even') || currentCell.classList.contains('highlighted-odd')) {
            selectedCountRow++;
        }
    }

    for (let i = clickedCellIndex - 1; i >= 0; i--) {
        const currentCell = cellsInRow[i];
        if (currentCell.classList.contains('highlighted-even') || currentCell.classList.contains('highlighted-odd')) {
            leftCount++;
            if (leftCount <= maxSelectedCells) {
                return true;
            }
        } else if (selectedCountRow >= maxSelectedCells || selectedCountColumn >= maxSelectedCells) {
            return true;
        } else {
            break;
        }
    }

    for (let i = clickedCellIndex + 1; i < cellsInRow.length; i++) {
        const currentCell = cellsInRow[i];
        if (currentCell.classList.contains('highlighted-even') || currentCell.classList.contains('highlighted-odd')) {
            rightCount++;
            if (rightCount <= maxSelectedCells) {
                return true;
            }
        } else if (selectedCountRow >= maxSelectedCells || selectedCountColumn >= maxSelectedCells) {
            return true;
        } else {
            break;
        }
    }

    return false;
}