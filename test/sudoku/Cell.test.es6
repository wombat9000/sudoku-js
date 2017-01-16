'use strict';

import {Cell} from '../../src/sudoku/Cell.es6';
import {CellPresentation} from '../../src/sudoku/CellPresentation.es6';

describe('Cell', () => {

	let someInitialValue;
	let cellPresentationStub;

	beforeEach(() => {
		cellPresentationStub = sinon.createStubInstance(CellPresentation);
		someInitialValue = 1;

		new Cell(someInitialValue, cellPresentationStub);
	});

	describe('-> initialisation', () => {
		it('should propagate initial value to cell presentation', () => {
			expect(cellPresentationStub.setInitialValue).to.have.been.calledWith(someInitialValue);
		});
	});
});