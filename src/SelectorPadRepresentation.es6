'use strict';

import {Selector} from './Selector.es6';

const SELECTOR_CLASS = 'selector_pad';
const LEFT_OFFSET = 20;
const TOP_OFFSET = 40;

class SelectorPadRepresentation {

    constructor(cellDom) {
        this.dom = document.createElement('div');
        this.dom.classList.add(SELECTOR_CLASS);

        // todo: needs tests
        let rows = this.buildSelectorPadRows();

        rows.forEach(row => {
           this.dom.appendChild(row);
        });
        // end: needs tests


        this.bindToCell(cellDom);
    };

    // todo: needs tests
    buildSelectorPadRows() {
        let rows = [];
        for (let i = 0; i < 3; i++) {
            let rowDom = document.createElement('div');
            rowDom.classList.add('row');
            let selectors = this.buildSelectorPadCells(i);

            selectors.forEach(selector => {
                rowDom.appendChild(selector.getDom());
            });

            rows[i] = rowDom;
        }

        return rows;
    }

    // todo: needs tests
    buildSelectorPadCells(rowNum) {
        let cells = [];

        for (let i = 0; i < 3; i++) {
            let value = i + 1 + rowNum * 3;
            let selector = new Selector(value);

            cells[i] = selector;
        }

        return cells;
    }

    bindToCell(cellDom) {
        const rect = cellDom.getBoundingClientRect();
        this.dom.style.left = rect.left + LEFT_OFFSET + 'px';
        this.dom.style.top = rect.top + TOP_OFFSET + 'px';

        cellDom.appendChild(this.dom);

        this.fadeIn();
    };

    fadeIn() {
        this.dom.classList.add('fade');
    };

    destroy() {
        this.dom.parentNode.removeChild(this.dom);
    };

    getDom() {
        return this.dom;
    };
}

export {SelectorPadRepresentation};