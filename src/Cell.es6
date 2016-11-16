'use strict';

class Cell {

    constructor(dom, value = 0) {
        this.dom = dom;
        this.value = value;
    };

    getValue() {
        return this.value;
    };

    setValue(newValue) {
      this.value = newValue;
    };

    getRow() {
        const rowIndex = 0;
        const rowNumberIndex = 3;
        return parseInt(this.dom.classList[rowIndex][rowNumberIndex]);
    };

    getColumn() {
        const colIndex = 1;
        const colNumberIndex = 3;
        return parseInt(this.dom.classList[colIndex][colNumberIndex]);
    };
}

export {Cell};