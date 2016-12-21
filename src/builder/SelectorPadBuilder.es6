'use strict';

import {SelectorPad} from '../SelectorPad.es6';
import {SelectorPadRepresentation} from '../SelectorPadRepresentation.es6';



class SelectorPadBuilder {

    buildNewPad(cell) {

        const representation = new SelectorPadRepresentation();
        representation.bindToCell(cell);

        return new SelectorPad(representation);
    }
}

export {SelectorPadBuilder};