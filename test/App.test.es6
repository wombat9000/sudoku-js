'use strict';

import {App} from '../src/App.es6';


describe('App', function () {

    let testee;
    let appDomStub;
    let gridBuilderStub;
    let gridStub;

    beforeEach(() => {
        gridStub = {
            getHtml: sinon.spy(),
            registerCellSelectionHandler: sinon.spy()
        };

        appDomStub = {
            appendChild: sinon.spy(),
            addEventListener: sinon.spy()
        };

        gridBuilderStub = {
            createGrid: sinon.stub().returns(gridStub)
        };

        testee = new App(appDomStub, gridBuilderStub);
    });

    describe('initialisation', function () {
        it('should register cell click handler on grid', function() {
            testee.initialise();
            expect(gridStub.registerCellSelectionHandler).to.have.been.called;
        });
    });
});
