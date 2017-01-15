'use strict';

import {Cell} from '../../src/sudoku/Cell.es6';
import {CellPresentation} from '../../src/sudoku/CellPresentation.es6';

describe('Cell', () => {

	// let testee;
	let cellPresentationStub;
	// let someEventHandler;

	beforeEach(() => {
		cellPresentationStub = sinon.createStubInstance(CellPresentation);

		// someEventHandler = () => {};

		new Cell(cellPresentationStub);
	});
});