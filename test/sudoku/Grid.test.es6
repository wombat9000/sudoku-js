'use strict';

import {Row} from '../../src/sudoku/Row.es6';
import {Grid} from '../../src/sudoku/Grid.es6';

describe('Grid', function () {

    let testee;

    it('should provide its HTML representation', function () {
        const gridDom = document.createElement('div');

        let rowMock = sinon.createStubInstance(Row);
        rowMock.getHtml = sinon.spy(function () {
            return document.createElement('div');
        });

        const expectedHtml = '<div class="grid"><div></div></div>';

        testee = new Grid(gridDom, [rowMock]);
        const actualHtml = testee.getHtml();

        expect(actualHtml.outerHTML).to.equal(expectedHtml);
    });

    it('should register cell selection handler with all rows', function () {
        const gridDom = document.createElement('div');

        let someRow = sinon.createStubInstance(Row);
        someRow.getHtml = sinon.spy(function () {
            return document.createElement('div');
        });

        let anotherRow = sinon.createStubInstance(Row);
        anotherRow.getHtml = sinon.spy(function () {
            return document.createElement('div');
        });

        testee = new Grid(gridDom, [someRow, anotherRow]);

        const handler = () => {};

        testee.registerCellSelectionHandler(handler);


        expect(someRow.registerCellSelectionHandler).to.have.been.calledWith(handler);
        expect(anotherRow.registerCellSelectionHandler).to.have.been.calledWith(handler);
    });
});