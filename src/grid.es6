'use strict';

module.exports = (gridDom) => {

    const createRow = (rowIndex) => {
        let row = document.createElement('tr');
        row.className += 'row';
        insertCells(row, rowIndex);
        return row;
    };

    const insertCells = (row, rowIndex) => {
        for (var colIndex = 1; colIndex <= 9; colIndex++) {
            let cell = document.createElement('td');
            cell.className = 'row' + rowIndex + ' col' + colIndex;
            row.appendChild(cell);
        }

        return row;
    };

    const init = () => {
        for (var rowIndex = 1; rowIndex <= 9; rowIndex++) {
            let row = createRow(rowIndex);
            gridDom.appendChild(row);
        }
    };

    module.log = () => {
        console.log(gridDom);
    };

    return module;
};
