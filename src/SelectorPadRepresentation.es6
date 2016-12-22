'use strict';

const SELECTOR_ID = 'selector_pad';
const LEFT_OFFSET = 20;
const TOP_OFFSET = 40;

class SelectorPadRepresentation {

    constructor(cellDom) {
        this.dom = document.createElement('div');
        this.dom.classList.add('selector_pad');
        this.bindToCell(cellDom);
    };

    bindToCell(cellDom) {
        const rect = cellDom.getBoundingClientRect();
        this.dom.style.left = rect.left + LEFT_OFFSET + 'px';
        this.dom.style.top = rect.top + TOP_OFFSET + 'px';

        cellDom.appendChild(this.dom);

        this.dom.classList.add('fade');
    };

    getDom() {
        return this.dom;
    };
}

export {SelectorPadRepresentation};