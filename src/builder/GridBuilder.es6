'use strict';

import {Grid} from '../sudoku/Grid.es6';
import {Cell} from '../sudoku/Cell.es6';
import {CellPresentationBuilder} from './CellPresentationBuilder.es6';
import {RowBuilder} from './RowBuilder.es6';
import {DomFactory} from '../factory/DomFactory.es6';

class GridBuilder {

    static createGrid(rawRows) {
        const gridDom = DomFactory.createGridDom();
        const rows = createRows(rawRows);
        return new Grid(gridDom, rows);
    };
}

function createRows(rawRows) {
    const rows = [];

    for (let i = 0; i < 9; i++) {
        let cellsForRow = createCells(rawRows[i]);
        let rowNumber = i+1;
        rows.push(RowBuilder.createRow(rowNumber, cellsForRow));
    }

    return rows;
};

function createCells(rawCells) {
    const cells = [];

    rawCells.forEach(rawCell => {
        let cell = new Cell();
        let cellPresentation = CellPresentationBuilder.createPresentationFor(cell);
        cellPresentation.setValue(rawCell);
        cells.push(cellPresentation);
    });

    return cells;
};

export {GridBuilder};