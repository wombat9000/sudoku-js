'use strict';

class App {

    constructor(appDom, gridBuilder) {
        this.gridBuilder = gridBuilder;
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

        const grid = this.gridBuilder.createGrid();

        this.registerCellSelectionHandler(showPad, grid);

        this.dom.appendChild(grid.getHtml());
        this.dom.addEventListener('click', hidePad, false);
    };

    registerCellSelectionHandler(handler, grid) {
        grid.registerCellSelectionHandler(handler);
    }
}

export {App};