'use strict';


class App {

    constructor(appDom, gridBuilder) {
        this.dom = appDom;
        this.gridBuilder = gridBuilder;
    }

    initialise() {
        const grid = this.gridBuilder.createGrid();
        this.dom.appendChild(grid.getDom());
        this.dom.addEventListener('cellSelected', this.cellSelectionHandler());
    };

    cellSelectionHandler() {
        return (event) => {
            console.log('new2');
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
    };
}

export {App};