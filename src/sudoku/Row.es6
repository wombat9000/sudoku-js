'use strict';
import Symbol from 'es6-symbol';
const _cells = Symbol();
const _dom = Symbol();

class Row {

	constructor(rowDom, cells) {
		cells.forEach(cell => {
			rowDom.appendChild(cell.presentation.dom);
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