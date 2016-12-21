'use strict';

class SelectorPad {

    constructor(selectorPadRepresentation, targetCell) {
        this.cell = targetCell;
    }

    getCell() {
        return this.cell;
    }
}

export {SelectorPad};