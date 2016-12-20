'use strict';

class Grid {

    constructor(gridDom, rows) {
        gridDom.classList.add('grid');

        rows.map(row => {
            gridDom.appendChild(row.getHtml());
        });
        this.rows = rows;

        const deselectCellsHandler = () => {
            this.deselectAllCells();
        };

        gridDom.addEventListener('click', deselectCellsHandler, true);
        this.dom = gridDom;
    };

    registerCellSelectionHandler(handler) {
        this.rows.map(row => {
            row.registerCellSelectionHandler(handler);
        });
    };

    deselectAllCells() {
        this.rows.map(function (row) {
            row.deselectAllCells();
        });
    };

    getRows() {
        return this.rows;
    };

    getHtml() {
        return this.dom;
    };
}

export {Grid};