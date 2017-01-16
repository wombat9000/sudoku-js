'use strict';

import Symbol from 'es6-symbol';
const _value = Symbol();
const _presentation = Symbol();
const cellGroups = Symbol();

class Cell {

	constructor(value, presentation) {
		this[cellGroups] = [];
		this[_presentation] = presentation;
		this[_presentation].setInitialValue(value);
		// todo: pass callback for value change event & trigger eventRegister @presentation
		this.value = value;
	}

	registerCellGroup(cellGroup) {
		// TODO how to test this w/o getters and setters?
		this[cellGroups].push(cellGroup);
		cellGroup.addNumber(this.value);
	}

	get presentation() {
		return this[_presentation];
	}

	get value() {
		return this[_value];
	}

	set value(value) {
		this[_value] = value;
	}
}

export {Cell};