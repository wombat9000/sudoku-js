'use strict';



class SelectorPadRepresentation {

    constructor() {}

    getDom() {
        this.dom = document.createElement('div');
        this.dom.id = 'selector_pad';

        return this.dom;
    }
}

export {SelectorPadRepresentation};