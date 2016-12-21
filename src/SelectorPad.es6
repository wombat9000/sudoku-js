'use strict';

class SelectorPad {

    constructor(cell) {
        const selectorId = 'selector_pad';
        const alreadyExists = document.getElementById(selectorId);
        if (alreadyExists) {
            throw 'error';
        }

        const cellDom = cell.getHtml();

        const dom = document.createElement('div');
        dom.id = selectorId;

        const rect = cellDom.getBoundingClientRect();

        dom.style.left = rect.left + 20 + 'px';
        dom.style.top = rect.top + 40 + 'px';
        this.dom = dom;

        cellDom.appendChild(this.dom);

        this.dom.classList.add('fade');
    }

    getDom() {
        return this.dom;
    }
}

export {SelectorPad};