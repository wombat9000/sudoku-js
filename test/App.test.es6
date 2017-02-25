'use strict';

import {App} from './../src/App.es6';
import {Grid} from './../src/sudoku/Grid.es6';
import {GridBuilder} from './../src/builder/GridBuilder.es6';
import {CellPresentation} from '../src/sudoku/CellPresentation.es6';

describe('App', () => {

	let sandbox;
	let testee;
	let appDomStub;
	let gridStub;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		gridStub = sinon.createStubInstance(Grid);

		appDomStub = {
			appendChild: sandbox.spy(),
			addEventListener: sandbox.spy()
		};

		sandbox.stub(GridBuilder, 'createGrid').returns(gridStub);
		testee = new App(appDomStub);

	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('- initialisation', () => {
		it('should build a new grid', () => {
			expect(GridBuilder.createGrid).to.have.been.called;
		});

		it('should append gridDom to appDom', () => {
			const gridHtml = gridStub.dom;
			expect(appDomStub.appendChild).to.have.been.calledWith(gridHtml);
		});

		it('should register cell selection handler', () => {
			expect(appDomStub.addEventListener).to.have.been.calledWith('cellSelected');
		});

		it('should register out of bounds click handler', () => {
			document.addEventListener = sinon.spy();
			testee = new App(appDomStub);

			expect(document.addEventListener).to.have.been.calledWith('click');
		});
	});

	describe('- clickOutOfBoundsHandler', () => {
		let outOfBoundsClickHandler;
		let someApp;
		let previouslySelectedCell;

		beforeEach(() => {
			previouslySelectedCell = sinon.createStubInstance(CellPresentation);

			someApp = new App(appDomStub);
			outOfBoundsClickHandler = someApp.outOfBoundsClickHandler();
		});

		it('should deselect cells', () => {
			someApp.previouslySelectedCell = previouslySelectedCell;

			outOfBoundsClickHandler();

			expect(previouslySelectedCell.deselect).to.have.been.called;
		});
	});

	describe('- cellSelectionHandler', () => {
		let cellSelectionHandler;
		let someApp;
		let someEvent;
		let newlySelectedCell;

		beforeEach(() => {
			newlySelectedCell = sinon.createStubInstance(CellPresentation);

			someEvent = {
				detail: {
					cell: newlySelectedCell
				}
			};

			someApp = new App(appDomStub);
			cellSelectionHandler = someApp.cellSelectionHandler();
		});

		it('should deselect previously selected cell', () => {
			const previouslySelectedCell = sinon.createStubInstance(CellPresentation);
			someApp.previouslySelectedCell = previouslySelectedCell;

			cellSelectionHandler(someEvent);

			expect(previouslySelectedCell.deselect).to.have.been.called;
		});

		it('should not deselect if previously selected cell equals new cell', () => {
			const previouslySelectedCell = newlySelectedCell;
			someApp.previouslySelectedCell = previouslySelectedCell;

			cellSelectionHandler(someEvent);

			expect(previouslySelectedCell.deselect).to.have.not.been.called;
		});

		it('should remember newly selected cell, when no cell was selected previously', () => {
			cellSelectionHandler(someEvent);
			let cell = someApp.previouslySelectedCell;

			expect(cell).to.equal(newlySelectedCell);
		});

		it('should remember selected cell', () => {
			const previouslySelectedCell = sinon.createStubInstance(CellPresentation);
			someApp.previouslySelectedCell = previouslySelectedCell;

			cellSelectionHandler(someEvent);
			let cell = someApp.previouslySelectedCell;

			expect(cell).to.equal(newlySelectedCell);
		});
	});
});
