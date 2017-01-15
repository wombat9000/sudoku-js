'use strict';

import {CellPresentation} from './../../src/sudoku/CellPresentation.es6';
import {Row} from './../../src/sudoku/Row.es6';

describe('Row', () => {

	let rowDom;
	let cells;
	let someCell;

	beforeEach(() => {
		rowDom = sinon.stub(document.createElement('div'));

		cells = [
			someCell = sinon.createStubInstance(CellPresentation),
		];

		new Row(rowDom, cells);
	});

	describe('- instantiation', () => {
		it('should append each cell dom to row dom', () => {
			let someCellDom;
			cells.forEach(() => {
				someCellDom = someCell.dom;
				expect(rowDom.appendChild).to.have.been.calledWith(someCellDom);
			});
		});
	});
});
