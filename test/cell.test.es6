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
    })
});