'use strict';

import {GridBuilder} from '../../src/builder/GridBuilder.es6';

describe('GridBuilder', () => {
    let sandbox;

    describe('legacy', () => {
        let grid;
        let somePuzzle;

        sandbox = sinon.sandbox.create();

        beforeEach(() => {
            somePuzzle = [
                [0,0,3,0,2,0,6,0,0],
                [9,0,0,3,0,5,0,0,1],
                [0,0,1,8,0,6,4,0,0],
                [0,0,8,1,0,2,9,0,0],
                [7,0,0,0,0,0,0,0,8],
                [0,0,6,7,0,8,2,0,0],
                [0,0,2,6,0,9,5,0,0],
                [8,0,0,2,0,3,0,0,9],
                [0,0,5,0,1,0,3,0,0]
            ];

            grid = GridBuilder.createGrid(somePuzzle);
        });

        afterEach(() => {
           sandbox.restore();
        });

        it('should initialise a grid with 9 rows', () => {
            const rows = grid.rows;
            expect(rows).to.have.lengthOf(9);
        });

        it('should initialise the rows within the grid with 9 cells', () => {
            const rows = grid.rows;
            const cells = rows[0].cells;

            expect(cells).to.have.lengthOf(9);
        });

        it('should initialise the rows with rownumbers', () => {
            const rows = grid.rows;
            const firstRowCell = rows[0].cells[0];
            const secondRowCell = rows[1].cells[0];

            expect(firstRowCell.dom.classList.contains('row1')).to.equal(true);
            expect(secondRowCell.dom.classList.contains('row2')).to.equal(true);
        });

        xit('should propagate values to cells', () => {
            const rows = grid.rows;
            const cellWithoutValue = rows[0].cells[0];
            const cellWithValue = rows[7].cells[0];

            expect(cellWithoutValue.value).to.equal(0);
            expect(cellWithValue.value).to.equal(8);
        });
    });
});