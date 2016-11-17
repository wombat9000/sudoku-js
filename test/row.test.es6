'use strict';

import {Cell} from '../src/Cell.es6';
import {Row} from '../src/Row.es6';

describe('Row', function() {

    it('should update all member cells with its row number', function () {
        const rowNumber = 0;
        const rowDom = document.createElement('tr');
        const someCellMock = sinon.createStubInstance(Cell);
        const anotherCellMock = sinon.createStubInstance(Cell);

        const testee = new Row(rowNumber, rowDom, [someCellMock, anotherCellMock]);

        expect(someCellMock.setRowNumber).to.have.been.calledWith(rowNumber);
        expect(anotherCellMock.setRowNumber).to.have.been.calledWith(rowNumber);
    });
});