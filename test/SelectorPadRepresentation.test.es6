'use strict';

import {SelectorPadRepresentation} from '../src/SelectorPadRepresentation.es6';


describe('SelectorPadRepresentation', function () {

    let testee;
    let cellStub;
    let rectStub;
    let cellDomStub;

    beforeEach(() => {
        rectStub = {
            left: 10,
            top: 20
        };

        cellDomStub = {
            getBoundingClientRect: sinon.stub().returns(rectStub),
            appendChild: sinon.spy(),
            removeChild: sinon.spy()
        };

        cellStub = {
            getDom: sinon.stub().returns(cellDomStub)
        };

        testee = new SelectorPadRepresentation(cellDomStub);
    });

    describe('- instantiation', function () {
        it('should create a new dom object with class selector pad', function() {
            const dom = testee.getDom();

            expect(dom.classList.contains('selector_pad')).to.equal(true);
        });
    });

    describe('- binding to cell', function() {
        it('should bind to a cell', function() {
            const selectorDom = testee.getDom();

            expect(cellDomStub.appendChild).to.have.been.calledWith(selectorDom);
        });

        it('should be positioned relative to the cell', function() {
            const dom = testee.getDom();

            expect(dom.style.left).to.equal(rectStub.left + 20 + 'px');
            expect(dom.style.top).to.equal(rectStub.top + 40 + 'px');
        });

        it('should fade in', function() {
            const dom = testee.getDom();
            expect(dom.classList.contains('fade')).to.equal(true);
        });
    });

    describe('- tear down', function () {
        it('should be destructible', function () {
            const domStub = {
                parentNode: cellDomStub
            };
            testee.dom = domStub;

            testee.destroy();

            expect(cellDomStub.removeChild).to.have.been.calledWith(domStub);
        });
    });
});
