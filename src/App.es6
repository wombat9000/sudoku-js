'use strict';

const SELECTOR_ID = 'selector_pad';

class App {

    constructor(appDom, gridBuilder, selectorPadBuilder) {
        this.dom = appDom;
        this.gridBuilder = gridBuilder;
        this.selectorPadBuilder = selectorPadBuilder;
    }

    initialise() {
        const spawnPad = (event, cell) => {

            this.selectorPadBuilder.buildNewPad(cell);

            event.stopPropagation();
        };

        const destroySelectionPad = () => {
            const selectorPad = document.getElementById(SELECTOR_ID);

            if (selectorPad) {
                selectorPad.parentNode.removeChild(selectorPad);
            }

            grid.deselectAllCells();
        };

        const grid = this.gridBuilder.createGrid();

        this.registerCellSelectionHandler(spawnPad, grid);

        this.dom.appendChild(grid.getHtml());
        this.dom.addEventListener('click', destroySelectionPad, true);
    };

    registerCellSelectionHandler(handler, grid) {
        grid.registerCellSelectionHandler(handler);
    }
}

export {App};