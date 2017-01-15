'use strict';

import {Grid} from '../sudoku/Grid.es6';
import {DomFactory} from '../factory/DomFactory.es6';
import {InstanceProvider} from '../InstanceProvider.es6';

class GridBuilder {

	static createGrid(rawRows) {
		const gridDom = DomFactory.createGridDom();
		const rows = createRows(rawRows);
		return new Grid(gridDom, rows);
	}
}

function createRows(rawRows) {
	const rows = [];

	for (let i = 0; i < 9; i++) {
		let rowNumber = i+1;
		let cellsForRow = createCells(rawRows[i], rowNumber);
		rows.push(InstanceProvider.row(cellsForRow));
	}

	return rows;
}

function createCells(rawCells, rowNumber) {
	const cells = [];

	for (let i = 0; i < 9; i++) {
		let colNumber = i+1;
		let cell = InstanceProvider.cell(rawCells[i]);
		let cellPresentation = InstanceProvider.cellPresentation(cell, rowNumber, colNumber);
		cells.push(cellPresentation);
	}

	return cells;
}

export {GridBuilder};