'use strict';

import {SelectorPadBuilder} from '../builder/SelectorPadBuilder.es6';
import {DomFactory} from '../factory/DomFactory.es6';

let Symbol = require('es6-symbol');
const _dom = Symbol();
const _valueDom = Symbol();
const _cell = Symbol();
const _filled = Symbol();
const _active = Symbol();
const _initial = Symbol();

class CellPresentation {

    get initial() {
        return this[_initial];
    };

    set initial(value) {
        this[_initial] = value;
    };

    constructor(cell) {
        this.initial = false;
        this[_cell] = cell;
        this[_valueDom] = document.createElement('span');
        this[_dom] = DomFactory.createCellDom();
        this[_dom].appendChild(this[_valueDom]);
        this[_dom].addEventListener('click', this.clickHandler(), false);
        this[_dom].addEventListener('numberPadSelection', this.numberPadSelectionHandler(), false);
        this.setInactive();
        this.setInitialValue(cell.value);
    };

    setInitialValue(value) {
        this.setValue(value);
        this.filled = false;

        if(value > 0) {
            this.filled = true;
            this.initial = true;
            this[_dom].classList.add('initial');
        }
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
        if(!this.active && !this.initial) {
            this.spawnSelector();
            this.setActive();
            this.broadCastSelectionEvent();
        }
    };

    setValue(value) {
        if (value > 0) {
            this[_valueDom].innerHTML = value;
            this.dom.classList.add('filled');
            this.filled = true;
        } else {
            this[_valueDom].innerHTML = '';
            this.dom.classList.remove('filled');
            this.filled = false;
        }
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
        if(this.active) {
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