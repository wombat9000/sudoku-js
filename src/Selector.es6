'use strict';

class Selector {

	constructor(value) {
		this.dom = document.createElement('div');
		this.dom.classList.add('cell');
		this.value = value;

		if (value == 0) {
			this.dom.innerHTML = 'clear';
		} else {
			this.dom.innerHTML = value;
		}

		this.dom.addEventListener('click', this.clickHandler(), false);
	}

	clickHandler() {
		return (event) => {
			event.stopPropagation();
			this.broadcastNewNumber();
		};
	}

	broadcastNewNumber() {
		let event = new CustomEvent('newNumberSelected', {
			detail: {
				value: this.value
			},
			bubbles: true,
			cancelable: false
		});
		this.dom.dispatchEvent(event);
	}

	getDom() {
		return this.dom;
	}
}

export {Selector};