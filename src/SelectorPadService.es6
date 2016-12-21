'use strict';

import {SelectorPad} from './SelectorPad.es6';
import {SelectorPadRepresentation} from './SelectorPadRepresentation.es6';

class SelectorPadService {

    getSpawnPadCb() {
        return (event, cell) => {
            // console.log('EVENT: spawn new pad');
            event.stopPropagation();
            return this.createNewPadFor(cell);
        };
    };

    createNewPadFor(cell) {
        const representation = new SelectorPadRepresentation();
        representation.bindToCell(cell);

        return new SelectorPad(representation, cell);
    };
}

export {SelectorPadService};