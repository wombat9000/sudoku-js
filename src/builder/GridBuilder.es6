'use strict';

import {Grid} from '../sudoku/Grid.es6';
import {Row} from '../sudoku/Row.es6';
import {Cell} from '../sudoku/Cell.es6';
import {CellPresentation} from '../sudoku/CellPresentation.es6';

class GridBuilder {

    static createGrid(rawGrid) {
        const gridDom = document.createElement('div');
        const rows = createRows(rawGrid);
        return new Grid(gridDom, rows);
    };
}

function createRows(rawGrid) {
    const rows = [];

    for (let i = 0; i < 9; i++) {
        let rowDom = document.createElement('div');
        let cells = createCells(rawGrid[i]);
        rows[i] = new Row(i+1, rowDom, cells);
    }
    return rows;
};

function createCells(rawRow) {
    const cells = [];

    for (let i = 0; i < 9; i++) {
        let cellPresentation = new CellPresentation();
        let cell = new Cell(cellPresentation);
        cell.setValue(rawRow[i]);
        cells[i] = cell;
    }
    return cells;
};

export {GridBuilder};