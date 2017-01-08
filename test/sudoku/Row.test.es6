'use strict';

import {CellPresentation} from './../../src/sudoku/CellPresentation.es6';
import {Row} from './../../src/sudoku/Row.es6';

describe('Row', () => {

    let testee;
    let rowDom;
    let rowNumber;
    let cells;
    let someCell;
    let anotherCell;

    beforeEach(() => {

        rowDom = sinon.stub(document.createElement('div'));
        rowNumber = 0;

        cells = [
            someCell = sinon.createStubInstance(CellPresentation),
            anotherCell = sinon.createStubInstance(CellPresentation)
        ];

        testee = new Row(rowNumber, rowDom, cells);
    });

    describe('- instantiation', () => {
        it('should update all member cells with its row number', () => {
            expect(someCell.setRowNumber).to.have.been.calledWith(rowNumber);
            expect(anotherCell.setRowNumber).to.have.been.calledWith(rowNumber);
        });

        it('should update all member cells with their col number', () => {
            expect(someCell.setColumnNumber).to.have.been.calledWith(1);
            expect(anotherCell.setColumnNumber).to.have.been.calledWith(2);
        });

        it('should append each cell dom to row dom', () => {
            let someCellDom;
            cells.forEach(() => {
                someCellDom = someCell.dom;
                expect(rowDom.appendChild).to.have.been.calledWith(someCellDom);
            });
        });
    });
});
