'use strict';


import {CellPresentation} from '../../src/sudoku/CellPresentation.es6';
import {SelectorPad} from '../../src/SelectorPad.es6';
import {SelectorPadBuilder} from '../../src/builder/SelectorPadBuilder.es6';

describe('CellPresentation', () => {

    let sandbox;
    let testee;
    let docStub;
    let domStub;
    let valueDomStub;
    let selectorStub;
    let selectorPadBuilderStub;


    beforeEach(() => {
        sandbox = sinon.sandbox.create();


        selectorStub = sinon.createStubInstance(SelectorPad);

        selectorPadBuilderStub = sandbox.stub(SelectorPadBuilder, 'createSelectorPad').returns(selectorStub);

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

        testee = new CellPresentation();
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
            expect(testee.isActive()).to.equal(false);
        });
    });

    describe('-> setting value', () => {
        it('leaves the cell blank, when setting value 0', () => {
           testee.setValue(0);

           expect(valueDomStub.innerHTML).to.equal('');
        });

        it('it sets value', () => {
            testee.setValue(5);

            expect(valueDomStub.innerHTML).to.equal(5);
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
            testee = new CellPresentation();
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
            testee = new CellPresentation();
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
            testee = new CellPresentation();

            testee.spawnSelector();

            expect(selectorPadBuilderStub).to.have.been.calledWith(domStub);
        });

        it('should destroy selector pad', () => {
            testee = new CellPresentation();
            testee.spawnSelector();

            testee.destroySelector();

            expect(selectorStub.destroy).to.have.been.called;
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

    xit('should not have a selector pad initially', () => {
        expect(testee.dom.appendChild).to.not.have.been.called;
    });
});