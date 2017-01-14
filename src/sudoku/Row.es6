'use strict';
import Symbol from 'es6-symbol';
const _cells = Symbol();
const _dom = Symbol();

class Row {

	constructor(rowNumber, rowDom, cells) {
		let colIndex = 1;
		cells.map(cellPresentation => {
			cellPresentation.setRowNumber(rowNumber);
			cellPresentation.setColumnNumber(colIndex);
			rowDom.appendChild(cellPresentation.dom);
			colIndex++;
		});

		this[_cells] = cells;
		this[_dom] = rowDom;
	}

	get cells() {
		return this[_cells];
	}

	get dom() {
		return this[_dom];
	}
}

export {Row};