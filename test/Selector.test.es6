'use strict';

import {Selector} from '../src/Selector.es6';

describe('Selector', function () {

    let testee;
    let someValue;

    beforeEach(() => {
        someValue = 4;
        testee = new Selector(someValue);
    });

    describe('-> initialisation', function () {

        it('should give dom element class of cell', function () {
            const dom = testee.getDom();
            expect(dom.classList.contains('cell')).to.equal(true);
        });

        xit('should register clickhandler', function () {

        });

        it('should set its value', function () {
            const dom = testee.getDom();
            expect(testee.value).to.equal(someValue);
            expect(dom.innerHTML).to.equal(''+someValue);
        });
    });

    describe('-> clickHandler', function () {
        let someEvent;
        beforeEach(() => {
            someEvent = {
                stopPropagation: sinon.spy()
            }
        });

        it('should stop click propagation', function () {
            let clickHandler = testee.clickHandler();

            clickHandler(someEvent);

            expect(someEvent.stopPropagation).to.have.been.called;
        });

        it('should broadcast the new value', function () {
            let clickHandler = testee.clickHandler();
            let mock = sinon.mock(testee);
            mock.expects('broadcastNewNumber').once();

            clickHandler(someEvent);

            mock.verify();
        });
    });

    describe('-> new value broadcast', function () {
        let domStub;

        beforeEach(() => {
            domStub = {
                dispatchEvent: sinon.spy()
            };

            testee.dom = domStub;
        });

        it('should dispatch an event', function () {
            testee.broadcastNewNumber();

            expect(domStub.dispatchEvent).to.have.been.called;
        });

        it('broadcasted event should hold the selectors value', function () {
            testee.broadcastNewNumber();

            const firedEvent = domStub.dispatchEvent.getCall(0).args[0];
            expect(firedEvent.detail.value).to.equal(someValue);
        });
    });
});
