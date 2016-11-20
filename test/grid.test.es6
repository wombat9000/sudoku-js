'use strict';

import {Row} from '../src/Row.es6';
import {Grid} from '../src/Grid.es6';

describe('Grid', function () {

    let testee;

    it('should provide its HTML representation', function () {
        const gridDom = document.createElement('table');
        gridDom.classList.add('grid');

        let rowMock = sinon.createStubInstance(Row);

        rowMock.getHtml = sinon.spy(function () {
            let rowDom = document.createElement('tr');
            return rowDom;
        });

        const rowArray = [rowMock];

        const expectedHtml = '<table class="grid"><tr></tr></table>';

        testee = new Grid(gridDom, rowArray);

        const actualHtml = testee.getHtml();

        expect(actualHtml.outerHTML).to.equal(expectedHtml);
    });
});