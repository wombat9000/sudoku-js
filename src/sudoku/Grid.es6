'use strict';

class Grid {

    constructor(gridDom, rows) {
        gridDom.classList.add('grid');

        rows.forEach(row => {
            gridDom.appendChild(row.getDom());
        });

        this.rows = rows;
        this.dom = gridDom;
    };

    getRows() {
        return this.rows;
    };

    getDom() {
        return this.dom;
    };
}

export {Grid};