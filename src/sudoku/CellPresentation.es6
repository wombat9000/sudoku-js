'use strict';

import {SelectorPadBuilder} from '../builder/SelectorPadBuilder.es6';
import {DomFactory} from '../factory/DomFactory.es6';

let Symbol = require('es6-symbol');
const _dom = Symbol();
const _valueDom = Symbol();
const _cell = Symbol();
const _filled = Symbol();
const _active = Symbol();

class CellPresentation {
    constructor(cell) {
        this.filled = false;
        this[_cell] = cell;
        this[_valueDom] = document.createElement('span');
        this[_dom] = DomFactory.createCellDom();
        this[_dom].appendChild(this[_valueDom]);
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
        if(this.active) {
            this.deselect();
        } else {
            this.select();
        }
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
        if(!this.active) {
            this.spawnSelector();
            this.setActive();
            this.broadCastSelectionEvent();
        }
    };

    setValue(value) {
        if (value === 0) {
            this[_valueDom].innerHTML = '';
            this.dom.classList.remove('filled');
            return;
        }
        this[_valueDom].innerHTML = value;
        this.dom.classList.add('filled');
        this.filled = true;
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
        if(this[_active]) {
            this.destroySelector();
            this.setInactive();
        }
    };

    get dom() {
        return this[_dom];
    };

    get active() {
        return this[_active];
    };

    set active(value) {
        this[_active] = value;
    };

    get filled() {
        return this[_filled];
    };

    set filled(value) {
        this[_filled] = value;
    };
}

function isBoxDelimiter(colOrRowNumber) {
    return colOrRowNumber == 3 || colOrRowNumber == 6;
};

export {CellPresentation};