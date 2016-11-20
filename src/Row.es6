'use strict';

class Row {

    constructor(rowNumber, rowDom, cells) {
        let colIndex = 0;
        cells.map(cell => {
            cell.setRowNumber(rowNumber);
            cell.setColumnNumber(colIndex);
            rowDom.appendChild(cell.getHtml());
            colIndex++;
        });

        this.rowDom = rowDom;
    };

    getHtml() {
        return this.rowDom;
    };
}

export {Row};