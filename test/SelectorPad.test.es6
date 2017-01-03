'use strict';

import {SelectorPad} from '../src/SelectorPad.es6';


describe('SelectorPad', function () {

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

        testee = new SelectorPad(cellDomStub);
    });

    describe('- instantiation', function () {
        it('should create a new dom object with class selector pad', function() {
            const dom = testee.getDom();

            expect(dom.classList.contains('selector_pad')).to.equal(true);
        });
    });

    describe('- presentation', function () {
        it('has three rows', function () {
        const rows = testee.getDom().children;
            expect(rows[0].classList.contains('row')).to.equal(true);
            expect(rows).to.have.length(3);
        });

        describe('- row', function () {
            it('has three cells', function () {
                const cells = testee.getDom().firstChild.children;
                expect(cells).to.have.length(3);
            });
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
