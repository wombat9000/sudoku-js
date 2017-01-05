'use strict';
let Symbol = require('es6-symbol');
const _cells = Symbol();
const _dom = Symbol();

class Row {

    constructor(rowNumber, rowDom, cells) {
        rowDom.classList.add('row');

        let colIndex = 1;
        cells.map(cell => {
            cell.setRowNumber(rowNumber);
            cell.setColumnNumber(colIndex);
            rowDom.appendChild(cell.getDom());
            colIndex++;
        });

        this[_cells] = cells;
        this[_dom] = rowDom;
    };

    get cells() {
        return this[_cells];
    };

    get dom() {
        return this[_dom];
    };
}

export {Row};