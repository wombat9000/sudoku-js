'use strict';

import {InstanceProvider} from './InstanceProvider.es6';

const SELECTOR_CLASS = 'selector-pad';
const LEFT_OFFSET = 20;
const TOP_OFFSET = 40;

class SelectorPad {

	constructor(cellDom) {
		this.dom = document.createElement('div');
		this.dom.classList.add(SELECTOR_CLASS);

		let rows = this.buildSelectorPadRows();
		rows.forEach(row => {
			this.dom.appendChild(row);
		});

		this.addClearButton();

		this.bindToCell(cellDom);
	}

	addClearButton() {
		const clearButton = InstanceProvider.selector(0);
		clearButton.getDom().classList.add('clear-selection');

		let rowDom = document.createElement('div');
		rowDom.classList.add('row');
		rowDom.appendChild(clearButton.getDom());
		this.dom.appendChild(rowDom);
	}

	buildSelectorPadRows() {
		let rows = [];
		for (let i = 0; i < 3; i++) {
			let rowDom = document.createElement('div');
			rowDom.classList.add('row');

			let selectors = this.buildSelectorPadCells(i);
			selectors.forEach(selector => {
				rowDom.appendChild(selector.getDom());
			});

			rows[i] = rowDom;
		}
		return rows;
	}

	buildSelectorPadCells(rowNum) {
		let cells = [];

		for (let i = 0; i < 3; i++) {
			let value = i + 1 + rowNum * 3;
			cells[i] = InstanceProvider.selector(value);
		}
		return cells;
	}

	bindToCell(cellDom) {
		const rect = cellDom.getBoundingClientRect();
		this.dom.style.left = rect.left + LEFT_OFFSET + 'px';
		this.dom.style.top = rect.top + TOP_OFFSET + 'px';

		cellDom.appendChild(this.dom);

		this.fadeIn();
	}

	fadeIn() {
		this.dom.classList.add('fade');
	}

	destroy() {
		this.dom.parentNode.removeChild(this.dom);
	}

	getDom() {
		return this.dom;
	}
}

export {SelectorPad};