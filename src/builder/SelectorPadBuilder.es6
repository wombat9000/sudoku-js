'use strict';

import {SelectorPad} from '../SelectorPad.es6';


class SelectorPadBuilder {
    static createSelectorPad(cellPresentation) {
        return new SelectorPad(cellPresentation);
    }
}


export {SelectorPadBuilder};