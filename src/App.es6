'use strict';


class App {

    constructor(appDom, gridBuilder) {
        this.dom = appDom;
        this.gridBuilder = gridBuilder;
    }

    initialise() {
        const grid = this.gridBuilder.createGrid();
        this.dom.appendChild(grid.getDom());
    };
}

export {App};