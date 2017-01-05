'use strict';

import {SelectorPad} from '../SelectorPad.es6';

class Cell {

    constructor(dom) {
        dom.classList.add('cell');
        this.dom = dom;
        this.setInactive();
        this.dom.addEventListener('click', this.clickHandler(), false);
        this.dom.addEventListener('numberPadSelection', this.numberPadSelectionHandler(), false);
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
        this.value = value;
        // todo: dont set innerHTML, find a way to manipulate the text or value or something
        // overwriting innerHTML destroys any child elements, which causes problems with the application
        // instead: create and target a child span element
        this.dom.innerHTML = value;
    };

    getValue() {
        return this.value;
    }

    addBottomBorderCSS() {
        this.dom.classList.add('bold-bottom-border');
    };

    addRightBorderCSS() {
        this.dom.classList.add('bold-right-border');
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
        this.selector = new SelectorPad(this.dom);
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