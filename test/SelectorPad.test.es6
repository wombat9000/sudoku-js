'use strict';

import {SelectorPad} from '../src/SelectorPad.es6';


describe('SelectorPad', () => {

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

    describe('- instantiation', () => {
        it('should create a new dom object with class selector pad', () => {
            const dom = testee.getDom();

            expect(dom.classList.contains('selector-pad')).to.equal(true);
        });
    });

    describe('- presentation', () => {
        it('has four rows', () => {
            const rows = testee.getDom().children;
            expect(rows[0].classList.contains('row')).to.equal(true);
            expect(rows).to.have.length(4);
        });

        it('should have a fourth row which only has one cell', () => {
            const rows = testee.getDom().children;
            expect(rows[3].children).to.have.length(1);
        });

        describe('- row', () => {
            it('has three cells', () => {
                const cells = testee.getDom().firstChild.children;
                expect(cells).to.have.length(3);
            });
        });
    });

    describe('- binding to cell', () => {
        it('should bind to a cell', () => {
            const selectorDom = testee.getDom();

            expect(cellDomStub.appendChild).to.have.been.calledWith(selectorDom);
        });

        it('should be positioned relative to the cell', () => {
            const dom = testee.getDom();

            expect(dom.style.left).to.equal(rectStub.left + 20 + 'px');
            expect(dom.style.top).to.equal(rectStub.top + 40 + 'px');
        });

        it('should fade in', () => {
            const dom = testee.getDom();
            expect(dom.classList.contains('fade')).to.equal(true);
        });
    });

    describe('- tear down', () => {
        it('should be destructible', () => {
            const domStub = {
                parentNode: cellDomStub
            };
            testee.dom = domStub;

            testee.destroy();

            expect(cellDomStub.removeChild).to.have.been.calledWith(domStub);
        });
    });
});
