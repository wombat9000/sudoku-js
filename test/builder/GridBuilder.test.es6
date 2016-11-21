'use strict';

// import {Row} from '../src/Row.es6';
// import {Grid} from '../src/Grid.es6';

const gridBuilder =  require('../../src/builder/GridBuilder.es6');

describe('GridBuilder', function () {

    const testee = gridBuilder();

    it('should initialise a grid with 9 rows', function () {
        const grid = testee.createGrid();

        const rows = grid.getRows();

        expect(rows).to.have.lengthOf(9);
    });
});