'use strict';

import Symbol from 'es6-symbol';
const _value = Symbol();
const cellGroups = Symbol();

class Cell {

	constructor(value, presentation) {
		this[cellGroups] = [];
		presentation.setInitialValue(value);
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

	get value() {
		return this[_value];
	}

	set value(value) {
		this[_value] = value;
	}
}

export {Cell};