'use strict';

import {SelectorPad} from '../src/SelectorPad.es6';

describe('SelectorPad', function () {

    let testee;
    let representationStub;

    beforeEach(() => {
        representationStub = {
            getHtml: sinon.stub().returns(cellHtmlStub)
        };

        testee = new SelectorPad(representationStub);
    });

    describe('instantiation', function () {

    });
});
