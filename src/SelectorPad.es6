'use strict';

import {SelectorPadRepresentation} from '../src/SelectorPadRepresentation.es6';

class SelectorPad {

    constructor(targetCell) {
        this.cell = targetCell;
        this.presentation = new SelectorPadRepresentation(this.cell.getDom());
    };
}

export {SelectorPad};