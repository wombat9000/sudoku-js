'use strict';

import {CellPresentation} from '../sudoku/CellPresentation.es6';

class CellPresentationBuilder {

    static createPresentationFor(cell) {
        return new CellPresentation(cell);
    }
}

export {CellPresentationBuilder};