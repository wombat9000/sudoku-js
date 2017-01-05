'use strict';

import {GridBuilder} from '../../src/builder/GridBuilder.es6';

describe('GridBuilder', () => {

    it('should initialise a grid with 9 rows', () => {
        const grid = GridBuilder.createGrid();

        const rows = grid.rows;

        expect(rows).to.have.lengthOf(9);
    });

    it('should initialise the rows within the grid with 9 cells', () => {
        const grid = GridBuilder.createGrid();

        const rows = grid.rows;
        const cells = rows[0].cells;

        expect(cells).to.have.lengthOf(9);
    });

    it('should initialise the rows with rownumbers', () => {
        const grid = GridBuilder.createGrid();

        const rows = grid.rows;
        const firstRowCell = rows[0].cells[0];
        const secondRowCell = rows[1].cells[0];

        expect(firstRowCell.getDom().classList.contains('row1')).to.equal(true);
        expect(secondRowCell.getDom().classList.contains('row2')).to.equal(true);
    });
});