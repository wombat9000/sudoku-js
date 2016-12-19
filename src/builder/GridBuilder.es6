'use strict';

import {Grid} from '../sudoku/Grid.es6';
import {Row} from '../sudoku/Row.es6';
import {Cell} from '../sudoku/Cell.es6';


module.exports = (showPad) => {
    const module = {};

    module.createGrid = () => {
        const gridDom = document.createElement('div');
        const rows = createRows();
        return new Grid(gridDom, rows);
    };

    const createRows = () => {
        const rows = [];

        for (let i = 0; i < 9; i++) {
            let rowDom = document.createElement('div');
            let cells = createCells();
            rows[i] = new Row(i+1, rowDom, cells);
        }
        return rows;
    };

    const createCells = () => {
        const cells = [];

        for (let i = 0; i < 9; i++) {
            let cellDom = document.createElement('div');
            let cell = new Cell(cellDom, showPad);
            cell.setValue("0");
            cells[i] = cell;
        }
        return cells;
    };

    return module;
};