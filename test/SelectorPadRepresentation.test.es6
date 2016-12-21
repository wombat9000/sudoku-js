'use strict';

import {SelectorPadRepresentation} from '../src/SelectorPadRepresentation.es6';


describe('SelectorPadRepresentation', function () {

    let testee;

    beforeEach(() => {


        testee = new SelectorPadRepresentation();
    });

    describe('instantiation', function () {
        it('should create a new dom object with id selector pad', function() {
            const dom = testee.getDom();

            expect(dom.id).to.equal('selector_pad');
        });
    });
});
