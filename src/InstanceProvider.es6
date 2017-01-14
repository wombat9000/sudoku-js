'use strict';

import {DomFactory} from './factory/DomFactory.es6';
import {Cell} from './sudoku/Cell.es6';
import {CellPresentation} from './sudoku/CellPresentation.es6';
import {Row} from './sudoku/Row.es6';
import {Selector} from './Selector.es6';
import {SelectorPad} from './SelectorPad.es6';

class InstanceProvider {
	static cell(rawCell) {
		return new Cell(rawCell);
	}

	static selector(value) {
		return new Selector(value);
	}

	static cellPresentation(cell) {
		return new CellPresentation(cell);
	}

	static row(rowNumber, cells) {
		const rowDom = DomFactory.createRowDom();
		return new Row(rowNumber, rowDom, cells);
	}

	static selectorPad(cellPresentation) {
		return new SelectorPad(cellPresentation);
	}
}

export {InstanceProvider};