'use strict';

import {Cell} from '../../src/sudoku/Cell.es6';
import {Row} from '../../src/sudoku/Row.es6';
import {Grid} from '../../src/sudoku/Grid.es6';

describe('Grid', function () {

    let testee;
    let rowMock;
    let gridDomStub;

    beforeEach(() => {
        gridDomStub = {
            classList: {
                add: sinon.spy()
            },
            appendChild: sinon.spy(),
            addEventListener: sinon.spy()
        };

        rowMock = sinon.createStubInstance(Row);
        rowMock.getDom = sinon.spy(function () {
            return document.createElement('div');
        });

        testee = new Grid(gridDomStub, [rowMock]);
    });

    it('should provide its HTML representation', function () {
        const dom = testee.getDom();
        expect(dom).to.equal(gridDomStub);
    });

    it('should register cell selection handler', function () {
        expect(gridDomStub.addEventListener).to.have.been.calledWith('cellSelected');
    });

    describe('- cellSelectionHandler', function () {

        let cellSelectionHandler;
        let someGrid;
        let someEvent;
        let newlySelectedCell;

        beforeEach(() => {
            newlySelectedCell = sinon.createStubInstance(Cell);

            someEvent = {
                detail: {
                    cell: newlySelectedCell
                }
            };

            someGrid = new Grid(gridDomStub, [rowMock]);
            cellSelectionHandler = someGrid.cellSelectionHandler();
        });

        it('should deselect previously selected cell', function () {
            const previouslySelectedCell = sinon.createStubInstance(Cell);
            someGrid.previouslySelectedCell = previouslySelectedCell;

            cellSelectionHandler(someEvent);

            expect(previouslySelectedCell.deselect).to.have.been.called;
        });

        it('should not deselect if previously selected cell equals new cell', function () {
            const previouslySelectedCell = newlySelectedCell;
            someGrid.previouslySelectedCell = previouslySelectedCell;

            cellSelectionHandler(someEvent);

            expect(previouslySelectedCell.deselect).to.have.not.been.called;
        });

        it('should remember newly selected cell, when no cell was selected previously', function () {
            cellSelectionHandler(someEvent);
            let cell = someGrid.previouslySelectedCell;

            expect(cell).to.equal(newlySelectedCell);
        });

        it('should remember selected cell', function () {
            const previouslySelectedCell = sinon.createStubInstance(Cell);
            someGrid.previouslySelectedCell = previouslySelectedCell;

            cellSelectionHandler(someEvent);
            let cell = someGrid.previouslySelectedCell;

            expect(cell).to.equal(newlySelectedCell);
        });
    });
});