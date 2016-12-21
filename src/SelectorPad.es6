'use strict';

const SELECTOR_ID = 'selector_pad';
const LEFT_OFFSET = 20;
const TOP_OFFSET = 40;

class SelectorPad {

    constructor(cell) {
        const alreadyExists = document.getElementById(SELECTOR_ID);
        if (alreadyExists) {
            throw 'error';
        }

        const cellDom = cell.getHtml();
        const dom = document.createElement('div');
        dom.id = SELECTOR_ID;
        const rect = cellDom.getBoundingClientRect();
        dom.style.left = rect.left + LEFT_OFFSET + 'px';
        dom.style.top = rect.top + TOP_OFFSET + 'px';
        this.dom = dom;
        cellDom.appendChild(this.dom);
        this.dom.classList.add('fade');
    }

    getDom() {
        return this.dom;
    }
}

export {SelectorPad};