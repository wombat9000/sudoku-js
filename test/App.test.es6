'use strict';

import {App} from '../src/App.es6';

describe('App', function () {

    let testee;
    let appDomStub;

    beforeEach(() => {
        appDomStub = {
            appendChild: sinon.stub(),
            addEventListener: sinon.stub()
        };

        testee = new App(appDomStub);
    });

    describe('initialisation', function () {
        it('should register cell click handler', function() {

            testee.initialise();
        });
    });
});
