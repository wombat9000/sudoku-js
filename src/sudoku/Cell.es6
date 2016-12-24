'use strict';

import {SelectorPadRepresentation} from '../../src/SelectorPadRepresentation.es6';


class Cell {

    constructor(dom) {
        dom.classList.add('cell');
        this.dom = dom;
        this.setInactive();
        this.dom.addEventListener('click', this.clickHandler(), false);
        // this.dom.addEventListener('cellSelected', this.otherSelectionHandler(), false);
    };

    clickHandler() {
        return () => {
            this.toggleSelectionState();
        }
    };

    otherSelectionHandler() {
        return (event) => {
            if(event.detail.cell === this) {
                // this is the emitting cell. do nothing...
            } else {
                // another cell has emitted the event!
                this.deselect();
            }
        }
    };

    broadCastSelectionEvent() {
        let event = new CustomEvent('cellSelected', {
            detail: {
              cell: this
            },
            bubbles: true,
            canceable: true
        });
        this.dom.dispatchEvent(event);
    };

    toggleSelectionState() {
        if(this.isActive()) {
            this.deselect();
        } else {
            this.select();
        }
    };

    setRowNumber(rowNumber) {
        this.dom.classList.add('row'+rowNumber);

        if (this.isBoxDelimiter(rowNumber)) {
            this.addBottomBorderCSS();
        }
    };

    setColumnNumber(colNumber) {
        this.dom.classList.add('col'+colNumber);

        if (this.isBoxDelimiter(colNumber)) {
            this.addRightBorderCSS();
        }
    };

    isBoxDelimiter(colOrRowNumber) {
        return colOrRowNumber == 3 || colOrRowNumber == 6;
    };

    setValue(value) {
        this.dom.innerHTML = value;
    };

    addBottomBorderCSS() {
        this.dom.classList.add('bold-bottom-border');
    };

    addRightBorderCSS() {
        this.dom.classList.add('bold-right-border');
    };

    select() {
        this.spawnSelector();
        this.setActive();
        this.broadCastSelectionEvent();
    };

    deselect() {
        this.destroySelector();
        this.setInactive();
    };

    setActive() {
        this.active = true;
        this.dom.classList.add('active');
    };

    setInactive() {
        this.active = false;
        this.dom.classList.remove('active');
    };

    getDom() {
       return this.dom;
    };

    spawnSelector() {
        this.selector = new SelectorPadRepresentation(this.dom);
        return this.selector;
    };

    destroySelector() {
        if(this.selector) {
            this.selector.destroy();
        }
    };

    isActive() {
        return this.active;
    }
}

export {Cell};