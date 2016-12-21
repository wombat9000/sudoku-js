'use strict';

import {SelectorPad} from '../SelectorPad.es6';


class SelectorPadBuilder {

    buildNewPad(cell) {
        return new SelectorPad(cell);
    }
}

export {SelectorPadBuilder};