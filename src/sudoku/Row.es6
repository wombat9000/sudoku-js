'use strict';
import Symbol from 'es6-symbol';
const _cells = Symbol();
const _dom = Symbol();
const numbers = Symbol();

class Row {

	constructor(rowDom, cells) {
		this[numbers] = [];
		this[_cells] = cells;
		this[_dom] = rowDom;

		this[_cells].forEach(cell => {
			cell.registerCellGroup(this);
			rowDom.appendChild(cell.presentation.dom);
		});
	}

	addNumber(number) {
        // TODO how to test this w/o getters and setters?
		this[numbers].push(number);
	}

	get cells() {
		return this[_cells];
	}

	get dom() {
		return this[_dom];
	}
}

export {Row};