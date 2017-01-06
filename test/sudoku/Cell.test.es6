'use strict';

import {Cell} from '../../src/sudoku/Cell.es6';
import {CellPresentation} from '../../src/sudoku/CellPresentation.es6';
import {SelectorPad} from '../../src/SelectorPad.es6';
import {SelectorPadBuilder} from '../../src/builder/SelectorPadBuilder.es6';

describe('Cell', () => {

    let testee;
    let cellDomStub;
    let cellPresentationStub;
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

        cellPresentationStub = sinon.createStubInstance(CellPresentation);

        someEventHandler = () => {};

        testee = new Cell(cellPresentationStub);
    });

    describe('- initialisation', () => {
        it('should register onclick eventhandler', () => {
            expect(cellPresentationStub.registerEventHandler).to.have.been.calledWith('click');
        });

        it('should initialise as inactive', () => {
            expect(testee.isActive()).to.equal(false);
        });
    });

    describe('- onClick', () => {
        let clickFunction;
        let mock;
        let someEvent;

        beforeEach(() => {
            someEvent = {
                stopPropagation: sinon.spy()
            };
            testee = new Cell(cellPresentationStub);
            mock = sinon.mock(testee);
            clickFunction = testee.clickHandler();
        });

        it('should toggle selection state', () => {
            mock.expects('toggleSelectionState').once();

            clickFunction(someEvent);

            mock.verify();
        });

        it('should stop propagation', () => {
            // simulate click
            testee.toggleSelectionState = sinon.stub();
            clickFunction(someEvent);

            expect(someEvent.stopPropagation).to.have.been.called;
        });
    });

    describe('- selection state', () => {

        let mock;

        beforeEach(() => {
            testee = new Cell(cellPresentationStub);
            mock = sinon.mock(testee);
            sinon.stub(testee, 'getDom').returns(cellDomStub);
        });

        it('should toggle off if it is active', () => {
           testee.setActive();

           mock.expects('setInactive').once();
           mock.expects('setActive').never();

            sinon.stub(testee, 'select');
            sinon.stub(testee, 'broadCastSelectionEvent');

            testee.toggleSelectionState();

           mock.verify();
        });

        it('should toggle on if it is inactive', () => {
           testee.setInactive();

           mock.expects('setActive').once();
           mock.expects('setInactive').never();

           testee.toggleSelectionState();

           mock.verify();
        });

        describe('- on selection', () => {
            describe(' - cellSelected event', () => {
                let eventFired;

                beforeEach(() => {
                    testee.select();
                    eventFired = cellDomStub.dispatchEvent.getCall(0).args[0];
                });

                it('should contain reference to cell within its detail', () => {
                    expect(eventFired.detail.cell).to.equal(testee);
                });

                it('should bubble the event to the top', () => {
                    expect(eventFired.bubbles).to.equal(true);
                });
            });

            it('should spawn selection pad', () => {
                mock.expects('spawnSelector').once();

                testee.select();

                mock.verify();
            });

            it('should set state to active', () => {
                mock.expects('setActive').once();

                testee.select();

                mock.verify();
            });

            it('should broadCast cellSelected event', () => {
                mock.expects('broadCastSelectionEvent').once();

                testee.select();

                mock.verify();
            });

            it('should not select if already selected', () => {
                testee.setActive();
                mock.expects('broadCastSelectionEvent').never();
                mock.expects('setActive').never();

                testee.select();

                mock.verify();
            });
        });

        describe('- on deselection', () => {
            it('should destroy selection pad', () => {
                testee.setActive();
                mock.expects('destroySelector').once();

                testee.deselect();

                mock.verify();
            });

            it('should set state to inactive', () => {
                testee.setActive();
                mock.expects('setInactive').once();

                testee.deselect();

                mock.verify();
            });

            it('should not deselect if already inactive', () => {
                testee.setInactive();
                mock.expects('setInactive').never();
                mock.expects('destroySelector').never();

                testee.deselect();

                mock.verify();
            });
        });
    });

    describe('- presentation', () => {
        it('updates classlist when setting row', () => {
            const someRowNumber = 5;
            testee.setRowNumber(someRowNumber);

            expect(cellPresentationStub.setRowNumber).to.have.been.calledWith(someRowNumber);
        });

        it('updates classlist when setting column', () => {
            const someColumnNumber = 5;
            testee.setColumnNumber(someColumnNumber);

            expect(cellPresentationStub.setColumnNumber).to.have.been.calledWith(someColumnNumber);
        });
    });

    describe('- selector pad interactions', () => {

        let sandbox;
        let selectorStub;
        let selectorPadBuilderStub;


        beforeEach(() => {
            sandbox = sinon.sandbox.create();
            selectorStub = sinon.createStubInstance(SelectorPad);

            selectorPadBuilderStub = sandbox.stub(SelectorPadBuilder, 'createSelectorPad').returns(selectorStub);

        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should get a new selector pad from the builder', () => {
            testee = new Cell(cellPresentationStub);

            testee.spawnSelector();

            expect(selectorPadBuilderStub).to.have.been.calledWith(testee.getDom());
        });

        it('should destroy selector pad', () => {
            testee = new Cell(cellPresentationStub);
            testee.spawnSelector();

            testee.destroySelector();

            expect(selectorStub.destroy).to.have.been.called;
        });
    });
});