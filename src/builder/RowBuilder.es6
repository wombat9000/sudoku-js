'use strict';

import {Row} from '../sudoku/Row.es6';

class RowBuilder {
    static createRow(rowNumber, rowDom, cells) {
        return new Row(rowNumber, rowDom, cells);
    };
}

export {RowBuilder};