'use strict';

import {SelectorPadBuilder} from '../builder/SelectorPadBuilder.es6';

let Symbol = require('es6-symbol');
const _presentation = Symbol();

class Cell {

    constructor(cellPresentation) {
        this[_presentation] = cellPresentation;
        this.setInactive();
        this[_presentation].registerEventHandler('click', this.clickHandler(), false);
        this[_presentation].registerEventHandler('numberPadSelection', this.numberPadSelectionHandler(), false);
    };

    numberPadSelectionHandler() {
        return (event) => {
            // the order matters, because innerHTML overwrites the child elements. i.e. attempting
            // to destroy the child after overwriting innerHTML results in nullReference
            this.deselect();
            this.setValue(event.detail.value);
        };
    };

    clickHandler() {
        return (event) => {
            this.toggleSelectionState();
            event.stopPropagation();
        };
    };

    broadCastSelectionEvent() {
        let event = new CustomEvent('cellSelected', {
            detail: {
              cell: this
            },
            bubbles: true
        });
        this.getDom().dispatchEvent(event);
    };

    toggleSelectionState() {
        if(this.isActive()) {
            this.deselect();
        } else {
            this.select();
        }
    };

    setRowNumber(rowNumber) {
        this[_presentation].setRowNumber(rowNumber);
    };

    setColumnNumber(colNumber) {
        this[_presentation].setColumnNumber(colNumber);
    };

    setValue(value) {
        this.value = value;
        this[_presentation].setValue(value);
    };

    getValue() {
        return this.value;
    }

    select() {
        if(!this.isActive()) {
            this.spawnSelector();
            this.setActive();
            this.broadCastSelectionEvent();
        }
    };

    deselect() {
        if(this.isActive()) {
            this.destroySelector();
            this.setInactive();
        }
    };

    setActive() {
        this.active = true;
        this[_presentation].setActive();
    };

    setInactive() {
        this.active = false;
        this[_presentation].setInactive();
    };

    getDom() {
       return this[_presentation].dom;
    };

    spawnSelector() {
        this.selector = SelectorPadBuilder.createSelectorPad(this.getDom());
        return this.selector;
    };

    destroySelector() {
        if(this.selector) {
            this.selector.destroy();
        }
    };

    isActive() {
        return this.active;
    };
}

export {Cell};