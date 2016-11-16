'use strict';

const cell = require('../src/cell.es6');

describe('Cell', function () {

    let testee;

    beforeEach(() => {
        testee = cell();
    });

    it('has a value of 0 upon initialisation', function () {
        const cellValue = testee.getValue();

        expect(cellValue).to.equal(0);
    });
});