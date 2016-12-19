'use strict';

import {GridBuilder} from '../../src/builder/GridBuilder.es6';

describe('GridBuilder', function () {

    const someCallback = () => {};

    const testee = new GridBuilder(someCallback);

    it('should initialise a grid with 9 rows', function () {
        const grid = testee.createGrid();

        const rows = grid.getRows();

        expect(rows).to.have.lengthOf(9);
    });

    it('should initialise the rows within the grid with 9 cells', function () {
        const grid = testee.createGrid();

        const rows = grid.getRows();
        const cells = rows[0].getCells();

        expect(cells).to.have.lengthOf(9);
    });

    it('should initialise the rows with rownumbers', function () {
        const grid = testee.createGrid();

        const rows = grid.getRows();
        const firstRowCell = rows[0].getCells()[0];
        const secondRowCell = rows[1].getCells()[0];


        expect(firstRowCell.getHtml().classList.contains('row1')).to.equal(true);
        expect(secondRowCell.getHtml().classList.contains('row2')).to.equal(true);
    });
});