'use strict';

import {GridBuilder} from './builder/GridBuilder.es6';

class App {

    constructor(appDom) {
        this.dom = appDom;
    };

    initialise() {
        const grid = GridBuilder.createGrid();
        this.dom.appendChild(grid.getDom());
        this.dom.addEventListener('cellSelected', this.cellSelectionHandler());
        document.addEventListener('click', this.outOfBoundsClickHandler(), false);
    };

    outOfBoundsClickHandler() {
        return () => {
            if(this.previouslySelectedCell) {
                this.previouslySelectedCell.deselect();
            }
        };
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
    };
}

export {App};