'use strict';

import {Cell} from '../src/Cell.es6';

class Row {

    constructor(rowNumber, rowDom, cells) {
        cells.map(cell => cell.setRowNumber(rowNumber));
    };
}

export {Row};