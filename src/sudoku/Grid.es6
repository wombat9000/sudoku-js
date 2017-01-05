'use strict';
let Symbol = require('es6-symbol');
const _rows = Symbol();
const _dom = Symbol();

class Grid {

    constructor(gridDom, rows) {
        gridDom.classList.add('grid');

        rows.forEach(row => {
            gridDom.appendChild(row.dom);
        });

        this[_rows] = rows;
        this[_dom] = gridDom;
    };

    get rows() {
        return this[_rows];
    };

    get dom() {
        return this[_dom];
    };
}

export {Grid};