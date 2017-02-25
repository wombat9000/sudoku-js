'use strict';

import {GridBuilder} from './builder/GridBuilder.es6';

class App {

	constructor(appDom) {
		this.dom = appDom;
		const grid = GridBuilder.createGrid(somePuzzle);
		this.dom.appendChild(grid.dom);
		this.dom.addEventListener('cellSelected', this.cellSelectionHandler());
		document.addEventListener('click', this.outOfBoundsClickHandler(), false);
	}

	outOfBoundsClickHandler() {
		return () => {
			if(this.previouslySelectedCell) {
				this.previouslySelectedCell.deselect();
			}
		};
	}

	cellSelectionHandler() {
		return (event) => {
			const newlySelectedCell = event.detail.cell;

			if (this.selectionHasChanged(newlySelectedCell)) {
				this.previouslySelectedCell.deselect();
			}

			this.previouslySelectedCell = newlySelectedCell;
		};
	}

	selectionHasChanged(newlySelectedCell) {
		return this.previouslySelectedCell &&
            this.previouslySelectedCell !== newlySelectedCell;
	}
}

const somePuzzle = [
    [0,0,3,0,2,0,6,0,0],
    [9,0,0,3,0,5,0,0,1],
    [0,0,1,8,0,6,4,0,0],
    [0,0,8,1,0,2,9,0,0],
    [7,0,0,0,0,0,0,0,8],
    [0,0,6,7,0,8,2,0,0],
    [0,0,2,6,0,9,5,0,0],
    [8,0,0,2,0,3,0,0,9],
    [0,0,5,0,1,0,3,0,0]
];

export {App};