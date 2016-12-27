'use strict';

class Selector {

    constructor(value) {
        this.dom = document.createElement('div');
        this.dom.classList.add('cell');
        this.dom.innerHTML = value;
        this.value = value;

        this.dom.addEventListener('click', this.clickHandler(), false);
    };

    clickHandler() {
        return (event) => {
            event.stopPropagation();
            this.broadcastNewNumber();
        };
    };

    broadcastNewNumber() {
        let event = new CustomEvent('numberPadSelection', {
            detail: {
                value: this.value
            },
            bubbles: true,
            cancelable: false
        });
        this.dom.dispatchEvent(event);
    };

    getDom() {
        return this.dom;
    };
}

export {Selector};