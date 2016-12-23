'use strict';

import {App} from '../src/App.es6';


describe('App', function () {

    let testee;
    let appDomStub;
    let gridBuilderStub;
    let selectorServiceStub;
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

        selectorServiceStub = {
            getSpawnPadCb: sinon.stub()
        };

        testee = new App(appDomStub, gridBuilderStub, selectorServiceStub);
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
    });
});
