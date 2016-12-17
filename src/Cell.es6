'use strict';

class Cell {

    constructor(dom, showPad) {
        dom.classList.add('cell');
        dom.addEventListener('click', showPad);
        this.dom = dom;
    };

    setRowNumber(rowNumber) {
        this.dom.classList.add('row'+rowNumber);

        if (this.isBoxDelimiter(rowNumber)) {
            this.addBottomBorderCSS();
        }
    };

    setColumnNumber(colNumber) {
        this.dom.classList.add('col'+colNumber);

        if (this.isBoxDelimiter(colNumber)) {
            this.addRightBorderCSS();
        }
    };

    //TODO: 16.12.2016 move this into the row/col classes
    // have row/col decide whether it is the border of a box,
    // then, have it set its member cells css
    isBoxDelimiter(colOrRowNumber) {
        return colOrRowNumber == 3 || colOrRowNumber == 6;
    };

    setValue(value) {
        this.dom.innerHTML = value;
    };

    addBottomBorderCSS() {
        this.dom.classList.add('bold-bottom-border');
    };

    addRightBorderCSS() {
        this.dom.classList.add('bold-right-border');
    };

    getHtml() {
       return this.dom;
    };
}

export {Cell};