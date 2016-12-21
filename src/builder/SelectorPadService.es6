'use strict';

import {SelectorPad} from '../SelectorPad.es6';
import {SelectorPadRepresentation} from '../SelectorPadRepresentation.es6';



class SelectorPadService {

    getSpawnPadCb() {
        return (event, cell) => {
            console.log('EVENT: spawn new pad');
            this.buildNewPad(cell);
            event.stopPropagation();
        };
    };

    buildNewPad(cell) {
        const representation = new SelectorPadRepresentation();
        representation.bindToCell(cell);

        return new SelectorPad(representation);
    };
}

export {SelectorPadService};