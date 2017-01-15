'use strict';

import {Cell} from '../../src/sudoku/Cell.es6';
import {CellPresentation} from '../../src/sudoku/CellPresentation.es6';

describe('Cell', () => {

	let cellPresentationStub;

	beforeEach(() => {
		cellPresentationStub = sinon.createStubInstance(CellPresentation);

		new Cell(cellPresentationStub);
	});
});