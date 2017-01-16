'use strict';

import {CellPresentation} from './../../src/sudoku/CellPresentation.es6';
import {Cell} from './../../src/sudoku/Cell.es6';
import {Row} from './../../src/sudoku/Row.es6';

describe('Row', () => {

	let testee;
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

		testee = new Row(rowDom, cells);
	});

	describe('-> initialisation', () => {
		it('should append each cell dom to row dom', () => {
			cells.forEach((cell) => {
				expect(rowDom.appendChild).to.have.been.calledWith(cell.presentation.dom);
			});
		});

		it('should register with each cell as cellGroup', () => {
			cells.forEach(cell => {
				expect(cell.registerCellGroup).to.have.been.calledWith(testee);
			});
		});
	});

	xdescribe('-> add number', () => {
		xit('should add a number', () => {
		});
	});
});
