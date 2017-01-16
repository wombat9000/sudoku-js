'use strict';

import {Cell} from '../../src/sudoku/Cell.es6';
import {CellPresentation} from '../../src/sudoku/CellPresentation.es6';
import {Row} from '../../src/sudoku/Row.es6';

describe('Cell', () => {

	let testee;
	let someInitialValue;
	let cellPresentationStub;

	beforeEach(() => {
		cellPresentationStub = sinon.createStubInstance(CellPresentation);
		someInitialValue = 1;

		testee = new Cell(someInitialValue, cellPresentationStub);
	});

	describe('-> initialisation', () => {
		it('should propagate initial value to cell presentation', () => {
			expect(cellPresentationStub.setInitialValue).to.have.been.calledWith(someInitialValue);
		});
	});

	describe('-> add cell group', () => {
		let someCellGroup;

		beforeEach(() => {
			someCellGroup = sinon.createStubInstance(Row);
		});

		it('should report number', () => {
			testee.registerCellGroup(someCellGroup);

			expect(someCellGroup.addNumber).to.have.been.calledWith(someInitialValue);
		});
	});
});