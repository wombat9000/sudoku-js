'use strict';

class Cell {

    constructor(dom) {
        dom.classList.add('cell');
        this.dom = dom;
    };

    registerSelectionHandler(createPadCallback) {
        const clickHandler = this.createClickHandler(createPadCallback);
        this.dom.addEventListener('click', clickHandler, false);
    };

    createClickHandler(createPadCallback) {
        return (event) => {
            this.setActive();
            const selectorPad = createPadCallback(event, this);
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

    deselect() {
        this.setInactive();
    };

    setActive() {
        this.dom.classList.add('active');
    };

    setInactive() {
        this.dom.classList.remove('active');
    };

    getDom() {
       return this.dom;
    };

    spawnSelector() {
        const selector = document.createElement('div');
        selector.id = 'selector_pad';

        this.dom.appendChild(selector);
    }
}

export {Cell};