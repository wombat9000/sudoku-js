'use strict';

import {Row} from '../sudoku/Row.es6';
import {DomFactory} from '../factory/DomFactory.es6';

class RowBuilder {
    static createRow(rowNumber, cells) {
        const rowDom = DomFactory.createRowDom();
        return new Row(rowNumber, rowDom, cells);
    };
}

export {RowBuilder};