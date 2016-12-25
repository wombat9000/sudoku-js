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
            getBoundingClientRect: sinon.stub().returns(rectStub),
            dispatchEvent: sinon.spy(),
            appendChild: sinon.spy()
        };

        someEventHandler = () => {};

        testee = new Cell(cellDomStub);
    });

    describe('- initialisation', function () {
        it('should register onclick eventhandler', function () {
            expect(cellDomStub.addEventListener).to.have.been.calledWith('click');
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

    describe('- onClick', function () {
        let clickFunction;
        let someCellDom;
        let mock;
        let someEvent;

        beforeEach(() => {
            someCellDom = document.createElement('div');
            someEvent = {
                stopPropagation: sinon.spy()
            };
            testee = new Cell(someCellDom);
            mock = sinon.mock(testee);
            clickFunction = testee.clickHandler();
        });

        it('should toggle selection state', function () {
            mock.expects('toggleSelectionState').once();

            clickFunction(someEvent);

            mock.verify();
        });

        it('should stop propagation', function () {
            clickFunction(someEvent);
            expect(someEvent.stopPropagation).to.have.been.called;
        });
    });

    describe('- selection state', function () {

        let mock;

        beforeEach(() => {
            testee = new Cell(cellDomStub);
            mock = sinon.mock(testee);
        });

        it('should toggle off if it is active', function () {
           testee.setActive();

           mock.expects('setInactive').once();
           mock.expects('setActive').never();

           testee.toggleSelectionState();

           mock.verify();
        });

        it('should toggle on if it is inactive', function () {
           testee.setInactive();

           mock.expects('setActive').once();
           mock.expects('setInactive').never();

           testee.toggleSelectionState();

           mock.verify();
        });

        describe('- on selection', function () {

            describe(' - cellSelected event', function () {
                let eventFired;

                beforeEach(() => {
                    testee.select();
                    eventFired = cellDomStub.dispatchEvent.getCall(0).args[0];
                });

                it('should contain reference to cell within its detail', function () {
                    expect(eventFired.detail.cell).to.equal(testee);
                });

                it('should bubble the event to the top', function () {
                    expect(eventFired.bubbles).to.equal(true);
                });
            });

            it('should spawn selection pad', function() {
                mock.expects('spawnSelector').once();

                testee.select();

                mock.verify();
            });

            it('should set state to active', function() {
                mock.expects('setActive').once();

                testee.select();

                mock.verify();
            });

            it('should broadCast cellSelected event', function () {
                mock.expects('broadCastSelectionEvent').once();

                testee.select();

                mock.verify();
            });

            it('should not select if already selected', function () {
                testee.setActive();
                mock.expects('broadCastSelectionEvent').never();
                mock.expects('setActive').never();

                testee.select();

                mock.verify();
            });
        });

        describe('- on deselection', function () {
            it('should destroy selection pad', function() {
                testee.setActive();
                mock.expects('destroySelector').once();

                testee.deselect();

                mock.verify();
            });

            it('should set state to inactive', function() {
                testee.setActive();
                mock.expects('setInactive').once();

                testee.deselect();

                mock.verify();
            });

            it('should not deselect if already inactive', function () {
                testee.setInactive();
                mock.expects('setInactive').never();
                mock.expects('destroySelector').never();

                testee.deselect();

                mock.verify();
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

    describe('- selector pad interactions', function() {
        it('should append a div to its dom with id selector pad', function () {
            const dom = document.createElement('div');
            testee = new Cell(dom);

            testee.spawnSelector();

            const cellDom = testee.getDom();
            const children = cellDom.children;
            expect(children).to.have.length(1);
            expect(children[0].classList.contains('selector_pad')).to.equal(true);
        });

        it('should destroy selector pad', function() {
            const cellDom = document.createElement('div');
            testee = new Cell(cellDom);
            const selector = testee.spawnSelector();

            const mock = sinon.mock(selector);
            mock.expects('destroy').once();

            testee.destroySelector();

            mock.verify();
        });
    });
});