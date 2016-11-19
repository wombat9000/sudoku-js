'use strict';

import {Cell} from '../src/Cell.es6';
import {Row} from '../src/Row.es6';

describe('Row', function() {

    it('should update all member cells with its row number', function () {
        const rowNumber = 0;
        const rowDom = document.createElement('tr');
        const someCellMock = sinon.createStubInstance(Cell);
        const anotherCellMock = sinon.createStubInstance(Cell);
        const cellArray = [someCellMock, anotherCellMock];

        const testee = new Row(rowNumber, rowDom, cellArray);

        expect(someCellMock.setRowNumber).to.have.been.calledWith(rowNumber);
        expect(anotherCellMock.setRowNumber).to.have.been.calledWith(rowNumber);
    });

    it('should update all member cells with their col number', function() {
        const rowNumber = 0;
        const rowDom = document.createElement('tr');
        const firstColumnCellMock = sinon.createStubInstance(Cell);
        const secondColumnCellMock = sinon.createStubInstance(Cell);
        const cellArray = [firstColumnCellMock, secondColumnCellMock];

        const testee = new Row(rowNumber, rowDom, cellArray);

        expect(firstColumnCellMock.setColumnNumber).to.have.been.calledWith(0);
        expect(secondColumnCellMock.setColumnNumber).to.have.been.calledWith(1);
    });
});
