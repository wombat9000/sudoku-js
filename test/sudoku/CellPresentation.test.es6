'use strict';


import {CellPresentation} from '../../src/sudoku/CellPresentation.es6';
import {SelectorPad} from '../../src/SelectorPad.es6';
import {Cell} from '../../src/sudoku/Cell.es6';
import {InstanceProvider} from '../../src/InstanceProvider.es6';

describe('CellPresentation', () => {

    let sandbox;
    let testee;
    let docStub;
    let domStub;
    let valueDomStub;
    let selectorStub;
    let providerStub;
    let someCell;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        selectorStub = sinon.createStubInstance(SelectorPad);

        providerStub = sandbox.stub(InstanceProvider, 'selectorPad').returns(selectorStub);

        domStub = {
            addEventListener: sandbox.spy(),
            appendChild: sandbox.spy(),
            dispatchEvent: sandbox.spy(),
            classList: {
                add: sandbox.spy(),
                remove: sandbox.spy()
            }
        };

        valueDomStub = {};

        docStub = sandbox.stub(document, 'createElement');
        docStub.withArgs('div').returns(domStub);
        docStub.withArgs('span').returns(valueDomStub);

        someCell = sinon.createStubInstance(Cell);

        sinon.wrapMethod(someCell, 'value', {
            get: function () {
                return 2;
            }
        });

        testee = new CellPresentation(someCell);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('-> initialisation', () => {

        it('should add cell css class', () => {
            expect(testee.dom.classList.add).to.have.been.calledWith('cell');
        });

        it('should append a span for holding cell value to the dom', () => {
            expect(testee.dom.appendChild).to.have.been.calledWith(valueDomStub);
        });

        it('should register click eventhandler', () => {
            expect(testee.dom.addEventListener).to.have.been.calledWith('click');
        });

        it('should initialise as inactive', () => {
            expect(testee.active).to.equal(false);
        });

        it('should initialise as initial for non-empty cell', () => {
            expect(testee.initial).to.equal(true);
            expect(testee.dom.classList.add).to.have.been.calledWith('initial');
        });

        it('should initialise as not yet filled for empty cell', () => {
            sinon.wrapMethod(someCell, 'value', {
                get: function () {
                    return 0;
                }
            });

            testee.dom.classList.add.reset();
            testee = new CellPresentation(someCell);

            expect(testee.filled).to.equal(false);
            expect(testee.initial).to.equal(false);
            expect(testee.dom.classList.add).to.not.have.been.calledWith('filled');
        });
    });

    describe('-> setting value', () => {
        it('clears the cell, when setting value 0', () => {
            testee.setValue(2);
            testee.setValue(0);

            expect(valueDomStub.innerHTML).to.equal('');
            expect(domStub.classList.remove).to.have.been.calledWith('filled');
        });

        it('it sets value', () => {
            testee.setValue(5);

            expect(valueDomStub.innerHTML).to.equal(5);
        });

        it('sets the filled state', () => {
            testee.setValue(5);

            expect(testee.filled).to.equal(true);
            expect(testee.dom.classList.add).to.have.been.calledWith('filled');
        });
    });

    describe('-> onClick', () => {
        let clickFunction;
        let mock;
        let someEvent;

        beforeEach(() => {
            someEvent = {
                stopPropagation: sinon.spy()
            };
            testee = new CellPresentation(someCell);
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

    describe('-> selection state', () => {
        let mock;

        beforeEach(() => {
            sinon.wrapMethod(someCell, 'value', {
                get: function () {
                    return 0;
                }
            });

            testee = new CellPresentation(someCell);
            mock = sinon.mock(testee);
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

        describe('-> on selection', () => {
            describe('-> cellSelected event', () => {
                let firedEvent;

                beforeEach(() => {
                    testee.select();
                    firedEvent = domStub.dispatchEvent.getCall(0).args[0];
                });

                it('should contain reference to cell within its detail', () => {
                    expect(firedEvent.detail.cell).to.equal(testee);
                });

                it('should bubble the event to the top', () => {
                    expect(firedEvent.bubbles).to.equal(true);
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

        describe('-> on deselection', () => {
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

    describe('-> selector pad interactions', () => {
        it('should get a new selector pad from the builder', () => {
            testee = new CellPresentation(someCell);

            testee.spawnSelector();

            expect(providerStub).to.have.been.calledWith(domStub);
        });

        it('should destroy selector pad', () => {
            testee = new CellPresentation(someCell);
            testee.spawnSelector();

            testee.destroySelector();

            expect(selectorStub.destroy).to.have.been.called;
        });
    });

    describe('-> presentation', () => {
        it('updates classlist when setting row', () => {
            const someRowNumber = 5;
            testee.setRowNumber(someRowNumber);

            expect(domStub.classList.add).to.have.been.calledWith('row'+someRowNumber);
        });

        it('updates classlist when setting column', () => {
            const someColumnNumber = 5;
            testee.setColumnNumber(someColumnNumber);

            expect(domStub.classList.add).to.have.been.calledWith('col'+someColumnNumber);
        });
    });

    it('applies bold-bottom-border class for third row', () => {
        testee.setRowNumber(3);
        expect(testee.dom.classList.add).to.have.been.calledWith('bold-bottom-border');
    });

    it('applies bold-bottom-border class for sixth row', () => {
        testee.setRowNumber(6);
        expect(testee.dom.classList.add).to.have.been.calledWith('bold-bottom-border');
    });

    it('does not apply bold-bottom-border class for fifth row', () => {
        testee.setRowNumber(5);
        expect(testee.dom.classList.add).to.not.have.been.calledWith('bold-bottom-border');
    });

    it('applies bold-right-border class for third column', () => {
        testee.setColumnNumber(3);
        expect(testee.dom.classList.add).to.have.been.calledWith('bold-right-border');
    });

    it('applies bold-right-border class for sixth column', () => {
        testee.setColumnNumber(6);
        expect(testee.dom.classList.add).to.have.been.calledWith('bold-right-border');
    });

    it('does not apply bold-right-border class for fifth column', () => {
        testee.setColumnNumber(5);
        expect(testee.dom.classList.add).to.not.have.been.calledWith('bold-right-border');
    });

    it('should not have a selector pad initially', () => {
        expect(InstanceProvider.selectorPad).to.not.have.been.called;
    });
});