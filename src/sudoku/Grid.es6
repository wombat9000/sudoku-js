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
            const newlySelectedCell = event.detail.cell;

            if (this.selectionHasChanged(newlySelectedCell)) {
                this.previouslySelectedCell.deselect();
            }

            this.previouslySelectedCell = newlySelectedCell;
        };
    };

    selectionHasChanged(newlySelectedCell) {
        return this.previouslySelectedCell &&
            this.previouslySelectedCell !== newlySelectedCell;
    }

    getRows() {
        return this.rows;
    };

    getDom() {
        return this.dom;
    };
}

export {Grid};