'use strict';

import {Cell} from '../../src/sudoku/Cell.es6';
import {CellPresentation} from '../../src/sudoku/CellPresentation.es6';

describe('Cell', () => {

    let testee;
    let cellDomStub;
    let cellPresentationStub;
    let someEventHandler;
    let rectStub;

    beforeEach(() => {
        rectStub = {
            left: 10,
            top: 20
        };

        cellDomStub = {
            classList: {
                add: sinon.spy(),
                remove: sinon.spy()
            },
            addEventListener: sinon.spy(),
            getBoundingClientRect: sinon.stub().returns(rectStub),
            dispatchEvent: sinon.spy(),
            appendChild: sinon.spy()
        };

        cellPresentationStub = sinon.createStubInstance(CellPresentation);

        someEventHandler = () => {};

        testee = new Cell(cellPresentationStub);
    });


});