'use strict';

class Row {

    constructor(rowNumber, rowDom, cells) {
        let colIndex = 0;
        cells.map(cell => {
            cell.setRowNumber(rowNumber);
            cell.setColumnNumber(colIndex);
            colIndex++;
        });
    };
}

export {Row};