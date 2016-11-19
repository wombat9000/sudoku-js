'use strict';

import {Row} from '../src/Row.es6';
import {Grid} from '../src/Grid.es6';

describe('Grid', function () {

    let testee;

    beforeEach(() => {
        // testee = new Grid();
    });

    it('should create 9 rows on initialisation', function () {
        testee = new Grid();

        const rows = testee.getRows();

        expect(rows).to.have.lengthOf(9);
        expect(rows[0]).to.be.an.instanceOf(Row);
    });
});