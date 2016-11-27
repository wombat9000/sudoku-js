'use strict';

class Row {

    constructor(rowNumber, rowDom, cells) {
        rowDom.classList.add('row');

        let colIndex = 1;
        cells.map(cell => {
            cell.setRowNumber(rowNumber);
            cell.setColumnNumber(colIndex);
            rowDom.appendChild(cell.getHtml());
            colIndex++;
        });

        this.cells = cells;
        this.rowDom = rowDom;
    };

    getCells() {
        return this.cells;
    };

    getHtml() {
        return this.rowDom;
    };
}

export {Row};