'use strict';

import {Row} from '../../src/sudoku/Row.es6';
import {Grid} from '../../src/sudoku/Grid.es6';

describe('Grid', function () {

    let testee;

    it('should provide its HTML representation', function () {
        const gridDom = document.createElement('div');

        let rowMock = sinon.createStubInstance(Row);
        rowMock.getDom = sinon.spy(function () {
            return document.createElement('div');
        });

        const expectedHtml = '<div class="grid"><div></div></div>';

        testee = new Grid(gridDom, [rowMock]);
        const actualHtml = testee.getDom();

        expect(actualHtml.outerHTML).to.equal(expectedHtml);
    });
});