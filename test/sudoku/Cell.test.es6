'use strict';

import {Cell} from '../../src/sudoku/Cell.es6';

describe('Cell', function () {

    let testee;
    let cellDomStub;
    let someEventHandler;
    let rectStub;

    beforeEach(() => {
        rectStub = {
            left: 10,
            top: 20
        };

        cellDomStub = {
            classList: {
                add: sinon.spy(),
                remove: sinon.spy()
            },
            addEventListener: sinon.spy(),
            getBoundingClientRect: sinon.stub().returns(rectStub)
        };

        someEventHandler = () => {};

        testee = new Cell(cellDomStub);
    });

    describe('- initialisation', function () {
        it('should register onclick eventhandler', function () {
            expect(cellDomStub.addEventListener).to.have.been.called;
        });

        it('should initialise as inactive', function () {
            expect(testee.isActive()).to.equal(false);
        });

        it('updates classlist with cell', function () {
            expect(cellDomStub.classList.add).to.have.been.calledWith('cell');
        });

        it('should not have a selector pad initially', function () {
            const dom = document.createElement('div');
            testee = new Cell(dom);
            let cellDom = testee.getDom();
            let children = cellDom.children;

            expect(children).to.have.length(0);
        });
    });

    describe('- onClick', function() {
        let clickFunction;
        let someCellDom;
        let mock;

        beforeEach(() => {
            someCellDom = document.createElement('div');
            testee = new Cell(someCellDom);
            mock = sinon.mock(testee);
            clickFunction = testee.clickHandler();
        });

        it('should toggle selection state', function() {
            mock.expects('toggleSelectionState').once();

            clickFunction();

            mock.verify();
        });


        xit('should toggle other cells off ... ?', function() {

        });
    });

    describe('- selection state toggle', function() {

        let someCellDom;
        let mock;

        beforeEach(() => {
            someCellDom = document.createElement('div');
            testee = new Cell(someCellDom);
            mock = sinon.mock(testee);
        });

        it('should toggle off if it is active', function() {
           testee.setActive();

           mock.expects('setInactive').once();
           mock.expects('setActive').never();

           testee.toggleSelectionState();

           mock.verify();
        });

        it('should toggle on if it is inactive', function() {
           testee.setInactive();

           mock.expects('setActive').once();
           mock.expects('setInactive').never();

           testee.toggleSelectionState();

           mock.verify();
        });

        describe('- on selection', function () {
            it('should spawn selection pad', function() {
                mock.expects('spawnSelector').once();

                testee.select();

                mock.verify();
            });

            xit('should set state to active', function() {
            });
        });

        describe('- on deselection', function () {
            xit('should destroy selection pad', function() {

            });
        });
    });

    describe('- presentation', function () {
        it('updates classlist when setting row', function () {
            const someRowNumber = 5;
            testee.setRowNumber(someRowNumber);

            expect(cellDomStub.classList.add).to.have.been.calledWith('row'+someRowNumber);
        });

        it('updates classlist when setting column', function () {
            const someColumnNumber = 5;
            testee.setColumnNumber(someColumnNumber);

            expect(cellDomStub.classList.add).to.have.been.calledWith('col'+someColumnNumber);
        });

        it('provides its html representation', function () {
            let testee = new Cell(document.createElement('div'));
            const someRowNumber = 5;
            testee.setRowNumber(someRowNumber);
            const someColumnNumber = 5;
            testee.setColumnNumber(someColumnNumber);
            const someValue = 1;
            testee.setValue(someValue);
            const expectedHtml = '<div class="cell row' + someRowNumber + ' col' + someColumnNumber + '">' + someValue + '</div>';

            const actualHtml = testee.getDom();

            expect(actualHtml.outerHTML).to.equal(expectedHtml);
        });

        it('applies bold-bottom-border class for third row', function () {
            testee.setRowNumber(3);
            expect(cellDomStub.classList.add).to.have.been.calledWith('bold-bottom-border');
        });

        it('applies bold-bottom-border class for sixth row', function () {
            testee.setRowNumber(6);
            expect(cellDomStub.classList.add).to.have.been.calledWith('bold-bottom-border');
        });

        it('does not apply bold-bottom-border class for fifth row', function () {
            testee.setRowNumber(5);
            expect(cellDomStub.classList.add).to.not.have.been.calledWith('bold-bottom-border');
        });

        it('applies bold-right-border class for third column', function () {
            testee.setColumnNumber(3);
            expect(cellDomStub.classList.add).to.have.been.calledWith('bold-right-border');
        });

        it('applies bold-right-border class for sixth column', function () {
            testee.setColumnNumber(6);
            expect(cellDomStub.classList.add).to.have.been.calledWith('bold-right-border');
        });

        it('does not apply bold-right-border class for fifth column', function () {
            testee.setColumnNumber(5);
            expect(cellDomStub.classList.add).to.not.have.been.calledWith('bold-right-border');
        });
    });

    describe('- spawns selector pad', function() {
        it('should append a div to its dom with id selector pad', function () {
            const dom = document.createElement('div');
            testee = new Cell(dom);

            testee.spawnSelector();

            const cellDom = testee.getDom();
            const children = cellDom.children;
            expect(children).to.have.length(1);
            expect(children[0].classList.contains('selector_pad')).to.equal(true);
        });
    });
});