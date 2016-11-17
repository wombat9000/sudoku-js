'use strict';

import {Cell} from '../src/Cell.es6';

describe('Cell', function () {

    let testee;

    const rowNumber = 1;
    const colNumber = 3;

    const cellDom = document.createElement('td');
    const cellClasses = 'row' + rowNumber + ' col' + colNumber;

    beforeEach(() => {
        cellDom.setAttribute('class', cellClasses);
        testee = new Cell(cellDom);
    });

    it('has a value of 0 upon initialisation', function () {
        const cellValue = testee.getValue();

        expect(cellValue).to.equal(0);
    });

    it('can have its value changed', function () {
        const someValue = 5;
        testee.setValue(someValue);

        const cellValue = testee.getValue();

        expect(cellValue).to.equal(someValue);
    });

    it('can report its row number', function () {
        const result = testee.getRow();

        expect(result).to.equal(rowNumber);
    });

    it('can report its col number', function () {
        const result = testee.getColumn();

        expect(result).to.equal(colNumber);
    });
});