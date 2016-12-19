'use strict';

import {GridBuilder} from './builder/GridBuilder.es6';

class App {

    constructor(appDom) {
        this.dom = appDom;
    }

    initialise() {
        const showPad = (event) => {
            const cursorX = event.clientX + 'px';
            const cursorY = event.clientY + 'px';

            const selectorPad = document.getElementById('selector_pad');

            selectorPad.style.left = cursorX;
            selectorPad.style.top = cursorY;

            selectorPad.classList.remove('hidden');
            event.stopPropagation();
        };

        const hidePad = () => {
            const selectorPad = document.getElementById('selector_pad');
            selectorPad.classList.add('hidden');
            grid.deselectAllCells();
        };

        const gridBuilder = new GridBuilder();
        const grid = gridBuilder.createGrid();

        grid.registerCellSelectionHandler(showPad);

        this.dom.appendChild(grid.getHtml());
        this.dom.addEventListener('click', hidePad, false);
    };
}

export {App};