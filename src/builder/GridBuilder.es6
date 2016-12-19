'use strict';

import {Grid} from '../sudoku/Grid.es6';
import {Row} from '../sudoku/Row.es6';
import {Cell} from '../sudoku/Cell.es6';

class GridBuilder {

    constructor(showPadCallback) {
        this.showPadCallback = showPadCallback;
    };

    createGrid() {
        const gridDom = document.createElement('div');
        const rows = this.createRows();
        return new Grid(gridDom, rows);
    };

    createRows() {
        const rows = [];

        for (let i = 0; i < 9; i++) {
            let rowDom = document.createElement('div');
            let cells = this.createCells();
            rows[i] = new Row(i+1, rowDom, cells);
        }
        return rows;
    };

    createCells() {
        const cells = [];

        for (let i = 0; i < 9; i++) {
            let cellDom = document.createElement('div');
            let cell = new Cell(cellDom, this.showPadCallback);
            cell.setValue("0");
            cells[i] = cell;
        }
        return cells;
    };

}

export {GridBuilder};