'use strict';


import {CellPresentation} from '../../src/sudoku/CellPresentation.es6';

describe('CellPresentation', () => {

    let sandbox;
    let testee;
    let domStub;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        domStub = {
            addEventListener: sandbox.spy(),
            appendChild: sandbox.spy(),
            classList: {
                add: sandbox.spy()
            }
        };

        sandbox.stub(document, 'createElement').returns(domStub);

        testee = new CellPresentation();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('-> initialisation', () => {
        it('should add cell css class', () => {
            expect(testee.dom.classList.add).to.have.been.calledWith('cell');
        });

        xit('should register click eventhandler', () => {
            expect(testee.dom.addEventListener).to.have.been.calledWith('click');
        });

        xit('should initialise as inactive', () => {
            expect(testee.isActive()).to.equal(false);
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