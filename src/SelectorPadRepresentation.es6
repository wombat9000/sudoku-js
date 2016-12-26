'use strict';

const SELECTOR_CLASS = 'selector_pad';
const LEFT_OFFSET = 20;
const TOP_OFFSET = 40;

class SelectorPadRepresentation {

    constructor(cellDom) {
        this.dom = document.createElement('div');
        this.dom.classList.add(SELECTOR_CLASS);

        let rows = this.buildSelectorPadRows();

        rows.forEach(row => {
           this.dom.appendChild(row);
        });

        this.bindToCell(cellDom);
    };

    buildSelectorPadRows() {
        let rows = [];
        for (let i = 0; i < 3; i++) {
            let rowDom = document.createElement('div');
            rowDom.classList.add('row');
            let cells = this.buildSelectorPadCells(i);

            cells.forEach(cell => {
                rowDom.appendChild(cell);
            });

            rows[i] = rowDom;
        }

        return rows;
    }

    buildSelectorPadCells(rowNum) {
        let cells = [];

        for (let i = 0; i < 3; i++) {
            let cellDom = document.createElement('div');
            cellDom.classList.add('cell');
            let value = i + 1 + rowNum * 3;
            cellDom.innerHTML = value;
            cells[i] = cellDom;
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