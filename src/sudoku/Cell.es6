'use strict';

let Symbol = require('es6-symbol');
const _value = Symbol();

class Cell {

    constructor() {
    };

    get value() {
        return this[_value];
    };

    set value(value) {
        this[_value] = value;
    };
}

export {Cell};