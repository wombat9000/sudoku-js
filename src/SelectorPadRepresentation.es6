'use strict';

const SELECTOR_CLASS = 'selector_pad';
const LEFT_OFFSET = 20;
const TOP_OFFSET = 40;

class SelectorPadRepresentation {

    constructor(cellDom) {
        this.cellDom = cellDom;
        this.dom = document.createElement('div');
        this.dom.classList.add(SELECTOR_CLASS);
        this.bindToCell(cellDom);
    };

    bindToCell(cellDom) {
        const rect = cellDom.getBoundingClientRect();
        this.dom.style.left = rect.left + LEFT_OFFSET + 'px';
        this.dom.style.top = rect.top + TOP_OFFSET + 'px';

        cellDom.appendChild(this.dom);

        this.dom.classList.add('fade');
    };

    destroy() {
        this.cellDom.removeChild(this.dom);
    }

    getDom() {
        return this.dom;
    };
}

export {SelectorPadRepresentation};