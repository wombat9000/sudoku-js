'use strict';

class Cell {

    constructor(dom) {
        this.dom = dom;
    };

    setRowNumber(rowNumber) {
        this.dom.classList.add('row'+rowNumber);
    };

    setColumnNumber(colNumber) {
        this.dom.classList.add('col'+colNumber);
    };
}

export {Cell};