'use strict';

let Symbol = require('es6-symbol');
const _presentation = Symbol();

class Cell {

    constructor(cellPresentation) {
        this[_presentation] = cellPresentation;
    };

    getValue() {
        return this.value;
    };

    setValue(value) {
        this.value = value;
        this[_presentation].setValue(value);
    };

    // todo: move this function to CellPresentation
    setRowNumber(rowNumber) {
        this[_presentation].setRowNumber(rowNumber);
    };

    // todo: move this function to CellPresentation
    setColumnNumber(colNumber) {
        this[_presentation].setColumnNumber(colNumber);
    };

    // todo: check for usages and redirect to CellPresentation
    getDom() {
        return this[_presentation].dom;
    };
}

export {Cell};