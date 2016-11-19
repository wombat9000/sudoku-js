'use strict';

import {Row} from '../src/Row.es6';
import {Cell} from '../src/Cell.es6';

class Grid {
    constructor() {
        this.rows = [];

        for (let rowNumber = 0; rowNumber < 9; rowNumber++) {
            let cells = this.createNewCellsForRow();
            let rowDom = document.createElement('tr');
            this.rows[rowNumber] = new Row(rowNumber, rowDom, cells);
        }
    };

    createNewCellsForRow() {
        let cells = [];
        for (let i = 0; i < 9; i++) {
            let cellDom = document.createElement('td');
            cells[i] = new Cell(cellDom);
        }

        return cells;
    };

    getRows() {
        return this.rows;
    }
}

export {Grid};