'use strict';

let Symbol = require('es6-symbol');
const _dom = Symbol();

class CellPresentation {
    constructor() {
        this[_dom] = document.createElement('div');
        this[_dom].classList.add('cell');
    };

    registerEventHandler(event, handler, bubble) {
        this[_dom].addEventListener(event, handler, bubble);
    };

    setRowNumber(rowNumber) {
        this[_dom].classList.add('row'+rowNumber);

        if (isBoxDelimiter(rowNumber)) {
            this.addBottomBorderCSS();
        }
    };

    setColumnNumber(colNumber) {
        this[_dom].classList.add('col'+colNumber);

        if (isBoxDelimiter(colNumber)) {
            this.addRightBorderCSS();
        }
    };

    setValue(value) {
        // todo: dont set innerHTML, find a way to manipulate the text or value or something
        // overwriting innerHTML destroys any child elements, which causes problems with the application
        // instead: create and target a child span element
        if (value === 0) {
            this[_dom].innerHTML = '';
            return;
        }
        this[_dom].innerHTML = value;
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

    get dom() {
        return this[_dom];
    };
}

function isBoxDelimiter(colOrRowNumber) {
    return colOrRowNumber == 3 || colOrRowNumber == 6;
};

export {CellPresentation};