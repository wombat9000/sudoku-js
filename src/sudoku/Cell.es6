'use strict';

import Symbol from 'es6-symbol';
const _value = Symbol();

class Cell {

	constructor(value) {
		this.value = value;
	}

	get value() {
		return this[_value];
	}

	set value(value) {
		this[_value] = value;
	}
}

export {Cell};