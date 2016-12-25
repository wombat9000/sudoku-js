'use strict';

import {App} from '../src/App.es6';
import {Cell} from '../src/sudoku/Cell.es6';

describe('App', function () {

    let testee;
    let appDomStub;
    let gridBuilderStub;
    let gridStub;

    beforeEach(() => {
        gridStub = {
            getDom: sinon.spy(),
            registerCellSelectionHandler: sinon.spy()
        };

        appDomStub = {
            appendChild: sinon.spy(),
            addEventListener: sinon.spy()
        };

        gridBuilderStub = {
            createGrid: sinon.stub().returns(gridStub)
        };

        testee = new App(appDomStub, gridBuilderStub);
    });

    describe('initialisation', function () {
        it('should build a new grid', function () {
           testee.initialise();

           expect(gridBuilderStub.createGrid).to.have.been.called;
        });

        it('should append gridDom to appDom', function() {
            testee.initialise();

            const gridHtml = gridStub.getDom();

            expect(appDomStub.appendChild).to.have.been.calledWith(gridHtml);
        });

        it('should register cell selection handler', function () {
            const handler = () => {};
            testee.cellSelectionHandler = sinon.stub().returns(handler);

            testee.initialise();

            expect(appDomStub.addEventListener).to.have.been.calledWith('cellSelected', handler);
        });

        it('should register out of bounds click handler', function () {
            const handler = () => {};
            testee.outOfBoundsClickHandler = sinon.stub().returns(handler);
            document.addEventListener = sinon.spy();

            testee.initialise();

            expect(document.addEventListener).to.have.been.calledWith('click', handler);
        });
    });

    describe('- clickOutOfBoundsHandler', function () {
        let outOfBoundsClickHandler;
        let someApp;
        let someEvent;
        let previouslySelectedCell;

        beforeEach(() => {
            previouslySelectedCell = sinon.createStubInstance(Cell);

            someEvent = {};

            someApp = new App(appDomStub, gridBuilderStub);
            outOfBoundsClickHandler = someApp.outOfBoundsClickHandler();
        });

        it('should deselect cells', function () {
            someApp.previouslySelectedCell = previouslySelectedCell;

            outOfBoundsClickHandler();

            expect(previouslySelectedCell.deselect).to.have.been.called;
        });
    });

    describe('- cellSelectionHandler', function () {
        let cellSelectionHandler;
        let someApp;
        let someEvent;
        let newlySelectedCell;

        beforeEach(() => {
            newlySelectedCell = sinon.createStubInstance(Cell);

            someEvent = {
                detail: {
                    cell: newlySelectedCell
                }
            };

            someApp = new App(appDomStub, gridBuilderStub);
            cellSelectionHandler = someApp.cellSelectionHandler();
        });

        it('should deselect previously selected cell', function () {
            const previouslySelectedCell = sinon.createStubInstance(Cell);
            someApp.previouslySelectedCell = previouslySelectedCell;

            cellSelectionHandler(someEvent);

            expect(previouslySelectedCell.deselect).to.have.been.called;
        });

        it('should not deselect if previously selected cell equals new cell', function () {
            const previouslySelectedCell = newlySelectedCell;
            someApp.previouslySelectedCell = previouslySelectedCell;

            cellSelectionHandler(someEvent);

            expect(previouslySelectedCell.deselect).to.have.not.been.called;
        });

        it('should remember newly selected cell, when no cell was selected previously', function () {
            cellSelectionHandler(someEvent);
            let cell = someApp.previouslySelectedCell;

            expect(cell).to.equal(newlySelectedCell);
        });

        it('should remember selected cell', function () {
            const previouslySelectedCell = sinon.createStubInstance(Cell);
            someApp.previouslySelectedCell = previouslySelectedCell;

            cellSelectionHandler(someEvent);
            let cell = someApp.previouslySelectedCell;

            expect(cell).to.equal(newlySelectedCell);
        });
    });
});
