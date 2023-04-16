export const CreateMap = (div, length, monitor) => {
    createColumn(div);
    function createColumn(parent) {
        const column = document.createElement('div');
        column.classList.add('column');
        parent.appendChild(column);
        for (let index = 0; index < length; index++) createRowCells(column, index + 1);
        monitor ? column.classList.add('border-blue') : column.classList.add('border-red');
    }

    function createRowCells(parent, y) {
        const rowCells = document.createElement('div');
        rowCells.classList.add('row');
        parent.appendChild(rowCells);
        for (let index = 0; index < length; index++) {
            createCell(rowCells, index + 1, y);
        }
    }

    function createCell(parent, x, y) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-x', x);
        cell.setAttribute('data-y', y);
        const nucleus = document.createElement('div');
        nucleus.classList.add('nucleus');
        cell.appendChild(nucleus);
        parent.appendChild(cell);
    }

    function disableCells() {
        const cells = div.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.classList.add('no-click');
            // cell.style.backgroundColor = '#ffffff00';
        });
    }

    return {
        disableCells: disableCells,
    };
};
