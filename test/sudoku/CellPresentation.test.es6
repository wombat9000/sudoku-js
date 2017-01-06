'use strict';


import {CellPresentation} from '../../src/sudoku/CellPresentation.es6';

describe('CellPresentation', () => {

    let sandbox;
    let testee;
    let docStub;
    let domStub;
    let valueDomStub;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        domStub = {
            addEventListener: sandbox.spy(),
            appendChild: sandbox.spy(),
            classList: {
                add: sandbox.spy()
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

        xit('should register click eventhandler', () => {
            expect(testee.dom.addEventListener).to.have.been.calledWith('click');
        });

        xit('should initialise as inactive', () => {
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