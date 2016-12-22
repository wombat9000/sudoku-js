'use strict';

const SELECTOR_ID = 'selector_pad';

class App {

    constructor(appDom, gridBuilder) {
        this.dom = appDom;
        this.gridBuilder = gridBuilder;
    }

    initialise() {
        const destroySelectionPad = () => {
            // console.log('EVENT: destroy pad');

            const selectorPad = document.getElementById(SELECTOR_ID);

            if (selectorPad) {
                selectorPad.parentNode.removeChild(selectorPad);
            }

            grid.deselectAllCells();
        };

        const grid = this.gridBuilder.createGrid();

        this.dom.appendChild(grid.getDom());
        this.dom.addEventListener('click', destroySelectionPad, true);
    };
}

export {App};