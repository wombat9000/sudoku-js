'use strict';

let Symbol = require('es6-symbol');
const _presentation = Symbol();

class Cell {

    constructor(cellPresentation) {
        this[_presentation] = cellPresentation;
        this[_presentation].registerEventHandler('click', this.clickHandler(), false);
        this[_presentation].registerEventHandler('numberPadSelection', this.numberPadSelectionHandler(), false);
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

    getValue() {
        return this.value;
    };

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

    setValue(value) {
        this.value = value;
        this[_presentation].setValue(value);
    };

    // todo: move this function to CellPresentation
    setRowNumber(rowNumber) {
        this[_presentation].setRowNumber(rowNumber);
    };

    // todo: move this function to CellPresentation
    setColumnNumber(colNumber) {
        this[_presentation].setColumnNumber(colNumber);
    };

    // todo: move this function to CellPresentation
    setActive() {
        this.active = true;
        this[_presentation].setActive();
    };

    // todo: move this function to CellPresentation
    setInactive() {
        this.active = false;
        this[_presentation].setInactive();
    };

    // todo: move this function to CellPresentation
    spawnSelector() {
        this[_presentation].spawnSelector();
    };

    // todo: move this function to CellPresentation
    destroySelector() {
        this[_presentation].destroySelector();
    };

    // todo: move this function to CellPresentation
    isActive() {
        return this.active;
    };

    // todo: check for usages and redirect to CellPresentation
    getDom() {
        return this[_presentation].dom;
    };
}

export {Cell};