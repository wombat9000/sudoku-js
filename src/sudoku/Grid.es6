'use strict';

class Grid {

    constructor(gridDom, rows) {
        gridDom.classList.add('grid');

        rows.forEach(row => {
            gridDom.appendChild(row.getDom());
        });

        gridDom.addEventListener('cellSelected', this.cellSelectionHandler());

        this.rows = rows;
        this.dom = gridDom;
    };

    cellSelectionHandler() {
        return (event) => {
            if (this.cell && this.cell !== event.detail.cell) {
                this.cell.deselect();
                this.cell = event.detail.cell;
            }
            this.cell = event.detail.cell;
        };
    };

    getRows() {
        return this.rows;
    };

    getDom() {
        return this.dom;
    };
}

export {Grid};