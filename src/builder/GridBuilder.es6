'use strict';

import {Grid} from '../sudoku/Grid.es6';
import {Cell} from '../sudoku/Cell.es6';
import {CellPresentationBuilder} from './CellPresentationBuilder.es6';
import {RowBuilder} from './RowBuilder.es6';

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
        rows[i] = RowBuilder.createRow(i+1, rowDom, cells);
    }
    return rows;
};

function createCells(rawRow) {
    const cells = [];

    for (let i = 0; i < 9; i++) {
        let cell = new Cell();
        let cellPresentation = CellPresentationBuilder.createPresentationFor(cell);
        cellPresentation.setValue(rawRow[i]);
        cells[i] = cellPresentation;
    }
    return cells;
};

export {GridBuilder};