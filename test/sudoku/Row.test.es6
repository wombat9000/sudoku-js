'use strict';

import {CellPresentation} from './../../src/sudoku/CellPresentation.es6';
import {Cell} from './../../src/sudoku/Cell.es6';
import {Row} from './../../src/sudoku/Row.es6';

describe('Row', () => {

	let rowDom;
	let cells;
	let someCellStub;
	let someCellPresentationStub;

	beforeEach(() => {
		rowDom = sinon.stub(document.createElement('div'));

		cells = [
			someCellStub = sinon.createStubInstance(Cell),
		];

		someCellPresentationStub = sinon.createStubInstance(CellPresentation);

		sinon.wrapMethod(someCellStub, 'presentation', {
			get:  function () {
				return someCellPresentationStub;
			}
		});

		new Row(rowDom, cells);
	});

	describe('- instantiation', () => {
		it('should append each cell dom to row dom', () => {
			cells.forEach(() => {
				expect(rowDom.appendChild).to.have.been.calledWith(someCellPresentationStub.dom);
			});
		});
	});
});
