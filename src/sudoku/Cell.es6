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
		this.value = value;
	}

	registerCellGroup(cellGroup) {
		this[cellGroups].push(cellGroup);
	}

	validate(value) {
		this[cellGroups].forEach(cellGroup => {
			if (cellGroup.contains(value)) return false;
		});
		return !!value;
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