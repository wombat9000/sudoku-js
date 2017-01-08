'use strict';

class DomFactory {

    static createCellDom() {
        const dom = document.createElement('div');
        dom.classList.add('cell');
        return dom;
    };

    static createRowDom() {
        const dom = document.createElement('div');
        dom.classList.add('row');
        return dom;
    };

    static createGridDom() {
        return document.createElement('div');
    };
}

export {DomFactory};