'use strict';

import {DomFactory} from './factory/DomFactory.es6';
import {Cell} from './sudoku/Cell.es6';
import {CellPresentation} from './sudoku/CellPresentation.es6';
import {Row} from './sudoku/Row.es6';
import {Selector} from './Selector.es6';
import {SelectorPad} from './SelectorPad.es6';

class InstanceProvider {
	static cell(value, presentation) {
		return new Cell(value, presentation);
	}

	static selector(value) {
		return new Selector(value);
	}

	static cellPresentation(rowNumber, colNumber) {
		return new CellPresentation(rowNumber, colNumber);
	}

	static row(cells) {
		const rowDom = DomFactory.createRowDom();
		return new Row(rowDom, cells);
	}

	static selectorPad(cellPresentation) {
		return new SelectorPad(cellPresentation);
	}
}

export {InstanceProvider};