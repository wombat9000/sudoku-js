'use strict';

import {SelectorPadService} from '../src/SelectorPadService.es6';
import {Cell} from '../src/sudoku/Cell.es6';

describe('SelectorPadService', function () {

    let testee;
    let cellStub;

    beforeEach(() => {
        cellStub = sinon.createStubInstance(Cell);
        cellStub.getDom = sinon.spy(function () {
            return document.createElement('div');
        });

        testee = new SelectorPadService();
    });

    it('should provide a selection pad for a cell', function() {
        const selectorPad = testee.createNewPadFor(cellStub);

        expect(selectorPad.getCell()).to.equal(cellStub);
    });

    describe('- provides callback fot selectionPad creation', function() {

        let eventStub;
        let callBack;

        beforeEach(() => {
            eventStub = {
                stopPropagation: sinon.spy()
            };

            callBack = testee.getSpawnPadCb();
        });

        it('should return new selection pad', function() {
            const selector = callBack(eventStub, cellStub);

            expect(selector.getCell()).to.equal(cellStub);
        });

        it('should stop event propagation', function() {
            callBack(eventStub, cellStub);
            expect(eventStub.stopPropagation).to.have.been.called;
        });
    });
});