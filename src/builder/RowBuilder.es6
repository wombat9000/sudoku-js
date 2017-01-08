'use strict';

import {Row} from '../sudoku/Row.es6';

class RowBuilder {
    static createRow(rowNumber, cells) {
        const rowDom = document.createElement('div');
        return new Row(rowNumber, rowDom, cells);
    };
}

export {RowBuilder};