'use strict';

class Cell {

    constructor(dom) {
        dom.classList.add('cell');
        this.dom = dom;
    };

    setRowNumber(rowNumber) {
        this.dom.classList.add('row'+rowNumber);
        if (rowNumber == 3 || rowNumber == 6) {
            this.dom.classList.add('bold-bottom-border');
        }
    };

    setColumnNumber(colNumber) {
        this.dom.classList.add('col'+colNumber);
        if (colNumber == 3 || colNumber == 6) {
            this.dom.classList.add('bold-right-border');
        }
    };

    setValue(value) {
        this.dom.innerHTML = value;
    };

    getHtml() {
       return this.dom;
    };
}

export {Cell};