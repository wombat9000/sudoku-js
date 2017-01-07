'use strict';

import {SelectorPadBuilder} from '../builder/SelectorPadBuilder.es6';

let Symbol = require('es6-symbol');
const _dom = Symbol();
const _valueDom = Symbol();

class CellPresentation {
    constructor() {
        this[_dom] = document.createElement('div');
        this[_valueDom] = document.createElement('span');
        this[_dom].appendChild(this[_valueDom]);
        this[_dom].classList.add('cell');

        this[_dom].addEventListener('click', this.clickHandler(), false);
        this[_dom].addEventListener('numberPadSelection', this.numberPadSelectionHandler(), false);

        this.setInactive();
    };

    numberPadSelectionHandler() {
        return (event) => {
            this.setValue(event.detail.value);
            this.deselect();
        };
    };

    clickHandler() {
        return (event) => {
            this.toggleSelectionState();
            event.stopPropagation();
        };
    };

    toggleSelectionState() {
        if(this.isActive()) {
            this.deselect();
        } else {
            this.select();
        }
    };

    registerEventHandler(event, handler, bubble) {
        this[_dom].addEventListener(event, handler, bubble);
    };

    setRowNumber(rowNumber) {
        this[_dom].classList.add('row'+rowNumber);

        if (isBoxDelimiter(rowNumber)) {
            this.addBottomBorderCSS();
        }
    };

    setColumnNumber(colNumber) {
        this[_dom].classList.add('col'+colNumber);

        if (isBoxDelimiter(colNumber)) {
            this.addRightBorderCSS();
        }
    };

    select() {
        if(!this.isActive()) {
            this.spawnSelector();
            this.setActive();
            this.broadCastSelectionEvent();
        }
    };

    setValue(value) {
        if (value === 0) {
            this[_valueDom].innerHTML = '';
            return;
        }
        this[_valueDom].innerHTML = value;
    };

    addBottomBorderCSS() {
        this.dom.classList.add('bold-bottom-border');
    };

    addRightBorderCSS() {
        this.dom.classList.add('bold-right-border');
    };

    setActive() {
        this.active = true;
        this.dom.classList.add('active');
    };

    setInactive() {
        this.active = false;
        this.dom.classList.remove('active');
    };

    spawnSelector() {
        this.selector = SelectorPadBuilder.createSelectorPad(this.dom);
        return this.selector;
    };

    destroySelector() {
        if(this.selector) {
            this.selector.destroy();
        }
    };

    broadCastSelectionEvent() {
        let event = new CustomEvent('cellSelected', {
            detail: {
                cell: this
            },
            bubbles: true
        });
        this[_dom].dispatchEvent(event);
    };

    deselect() {
        if(this.isActive()) {
            this.destroySelector();
            this.setInactive();
        }
    };

    get dom() {
        return this[_dom];
    };

    isActive() {
        return this.active;
    };
}

function isBoxDelimiter(colOrRowNumber) {
    return colOrRowNumber == 3 || colOrRowNumber == 6;
};

export {CellPresentation};