'use strict';

class Cell {

    constructor(dom, showPadCallback) {
        dom.classList.add('cell');
        const clickHandler = this.createClickHandler(showPadCallback);
        dom.addEventListener('click', clickHandler, false);
        this.dom = dom;
    };

    deselect() {
        this.setInactive();
    };

    createClickHandler(showPadCallback) {
        return (evt) => {
            this.setActive();
            showPadCallback(evt, this);
        };
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

    setActive() {
        this.dom.classList.add('active');
    };

    setInactive() {
        this.dom.classList.remove('active');
    };

    getHtml() {
       return this.dom;
    };
}

export {Cell};