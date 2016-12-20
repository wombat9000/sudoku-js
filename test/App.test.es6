'use strict';

import {App} from '../src/App.es6';


describe('App', function () {

    let testee;
    let appDomStub;
    let gridBuilderStub;
    let gridStub;

    beforeEach(() => {
        gridStub = {
            getHtml: sinon.stub()
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
        it('should register cell click handler', function() {
            let mock = sinon.mock(testee);
            mock.expects('registerCellSelectionHandler').once();

            testee.initialise();

            mock.verify();
        });
    });
});
