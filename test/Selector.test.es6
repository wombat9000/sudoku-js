'use strict';

import {Selector} from '../src/Selector.es6';

describe('Selector', () => {

	let sandbox;
	let testee;
	let someValue;
	let domStub;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		domStub = {
			classList: {
				add: sinon.spy(),
				remove: sinon.spy()
			},
			dispatchEvent: sinon.spy(),
			appendChild: sinon.spy(),
			addEventListener: sinon.spy()
		};

		sandbox.stub(document, 'createElement').returns(domStub);

		someValue = 4;
		testee = new Selector(someValue);
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('-> initialisation', () => {

		it('should give dom element class of cell', () => {
			expect(testee.dom.classList.add).to.have.been.calledWith('cell');
		});

		it('should listen for click event', () => {
			expect(domStub.addEventListener).to.have.been.calledWith('click');
		});

		it('should set its value', () => {
			expect(testee.value).to.equal(someValue);
			expect(testee.getDom().innerHTML).to.equal(someValue);
		});

		it('should read "clear" if value is 0', () => {
			testee = new Selector(0);

			expect(testee.value).to.equal(0);
			expect(testee.getDom().innerHTML).to.equal('clear');
		});
	});

	describe('-> clickHandler', () => {
		let someEvent;
		beforeEach(() => {
			someEvent = {
				stopPropagation: sinon.spy()
			};
		});

		it('should stop click propagation', () => {
			let clickHandler = testee.clickHandler();

			clickHandler(someEvent);

			expect(someEvent.stopPropagation).to.have.been.called;
		});

		it('should broadcast the new value', () => {
			let clickHandler = testee.clickHandler();
			let mock = sinon.mock(testee);
			mock.expects('broadcastNewNumber').once();

			clickHandler(someEvent);

			mock.verify();
		});
	});

	describe('-> new value broadcast', () => {
		let domStub;

		beforeEach(() => {
			domStub = {
				dispatchEvent: sinon.spy()
			};

			testee.dom = domStub;
		});

		it('should dispatch an event', () => {
			testee.broadcastNewNumber();

			expect(domStub.dispatchEvent).to.have.been.called;
		});

		it('broadcasted event should hold the selectors value', () => {
			testee.broadcastNewNumber();

			const firedEvent = domStub.dispatchEvent.getCall(0).args[0];
			expect(firedEvent.detail.value).to.equal(someValue);
		});
	});
});
