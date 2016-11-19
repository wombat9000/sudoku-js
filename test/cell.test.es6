'use strict';

import {Cell} from '../src/Cell.es6';

describe('Cell', function () {

    let testee;

    const cellDomStub = {
        classList: {
            add: sinon.stub()
        }
    };

    beforeEach(() => {
        testee = new Cell(cellDomStub);
    });

    it('updates classlist when setting row', function () {
        const someRowNumber = 5;
        testee.setRowNumber(someRowNumber);

        expect(cellDomStub.classList.add).to.have.been.calledWith('row'+someRowNumber)
    });

    it('updates classlist when setting column', function () {
        const someColumnNumber = 5;
        testee.setColumnNumber(someColumnNumber);

        expect(cellDomStub.classList.add).to.have.been.calledWith('col'+someColumnNumber)
    });

    it('provides its html representation', function () {
        // TODO: should i stub this domElement?
        let testee = new Cell(document.createElement('td'));
        const someRowNumber = 5;
        testee.setRowNumber(someRowNumber);
        const someColumnNumber = 5;
        testee.setColumnNumber(someColumnNumber);
        const someValue = 1;
        testee.setValue(someValue);
        const expectedHtml = '<td class="row' + someRowNumber + ' col' + someColumnNumber + '">' + someValue + '</td>';

        const actualHtml = testee.getHtml();

        expect(actualHtml.outerHTML).to.equal(expectedHtml);
    });
});