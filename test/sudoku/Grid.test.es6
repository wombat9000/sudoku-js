'use strict';
import {Row} from '../../src/sudoku/Row.es6';
import {Grid} from '../../src/sudoku/Grid.es6';

describe('Grid', () => {

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
        rowMock.getDom = sinon.spy(() => {
            return document.createElement('div');
        });

        testee = new Grid(gridDomStub, [rowMock]);
    });

    it('should provide its HTML representation', () => {
        const dom = testee.dom;
        expect(dom).to.equal(gridDomStub);
    });
});