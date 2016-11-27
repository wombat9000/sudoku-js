'use strict';

import {Cell} from '../src/Cell.es6';
import {Row} from '../src/Row.es6';

describe('Row', function() {
    describe('- instantiation', function() {
        it('should update all member cells with its row number', function () {
            const rowNumber = 0;
            const rowDom = document.createElement('div');
            const someCellMock = createCellMock(rowNumber, 0);
            const anotherCellMock = createCellMock(rowNumber, 1);
            const cellArray = [someCellMock, anotherCellMock];

            new Row(rowNumber, rowDom, cellArray);

            expect(someCellMock.setRowNumber).to.have.been.calledWith(rowNumber);
            expect(anotherCellMock.setRowNumber).to.have.been.calledWith(rowNumber);
        });

        it('should update all member cells with their col number', function() {
            const rowNumber = 0;
            const rowDom = document.createElement('div');
            const firstColumnCellMock = createCellMock(rowNumber, 0);
            const secondColumnCellMock = createCellMock(rowNumber, 1);
            const cellArray = [firstColumnCellMock, secondColumnCellMock];

            new Row(rowNumber, rowDom, cellArray);

            expect(firstColumnCellMock.setColumnNumber).to.have.been.calledWith(0);
            expect(secondColumnCellMock.setColumnNumber).to.have.been.calledWith(1);
        });
    });

    it('provides its html representation', function() {
        const rowDom = document.createElement('div');
        rowDom.classList.add('row');
        const rowNumber = 1;
        const colNumber = 0;
        const someCellMock = createCellMock(rowNumber, colNumber);

        const cellArray = [someCellMock];

        const expectedHtml = '<div class="row"><div class="row' + rowNumber + ' col'+ 0 +'"></div></div>';

        const testee = new Row(rowNumber, rowDom, cellArray);

        const actualHtml = testee.getHtml();

        expect(actualHtml.outerHTML).to.equal(expectedHtml);
    });

    const createCellMock = (rowNumber, colNumber) => {
        let cellMock = sinon.createStubInstance(Cell);

        cellMock.getHtml = sinon.spy(function () {
            let cellDom = document.createElement('div');
            cellDom.classList.add('row' + rowNumber);
            cellDom.classList.add('col' + colNumber);

            return cellDom;
        });

        return cellMock;
    };
});
