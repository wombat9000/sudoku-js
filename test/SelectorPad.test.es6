'use strict';

import {SelectorPad} from '../src/SelectorPad.es6';


describe('SelectorPad', function () {

    let testee;
    let cellStub;
    let cellHtmlStub;
    let rectStub;

    beforeEach(() => {
        rectStub = {
            left: 10,
            top: 20
        };

        cellHtmlStub = {
            getBoundingClientRect: sinon.stub().returns(rectStub),
            appendChild: sinon.spy()
        };

        cellStub = {
            getHtml: sinon.stub().returns(cellHtmlStub)
        };

        testee = new SelectorPad(cellStub);
    });

    describe('instantiation', function () {
        it('should create a new dom object with id selector pad', function() {
            const dom = testee.getDom();

            expect(dom.id).to.equal('selector_pad');
        });

        xit('should throw an error if there already exists a selector pad', function() {
            const createSecondPad = () => {
               new SelectorPad(cellStub);
           };

           expect(createSecondPad).to.throw('error');
        });

        it('should set same position as cell', function() {
            const dom = testee.getDom();

            expect(dom.style.left).to.equal(rectStub.left + 20 + 'px');
            expect(dom.style.top).to.equal(rectStub.top + 40 + 'px');
        });
    });
});
