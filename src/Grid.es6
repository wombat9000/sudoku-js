'use strict';

class Grid {

    constructor(gridDom, rows) {
        gridDom.classList.add('grid');

        rows.map(row => {
            gridDom.appendChild(row.getHtml());
        });
        this.dom = gridDom;
        this.rows = rows;
    };

    getRows() {
        return this.rows;
    }

    getHtml() {
        return this.dom;
    };
}

export {Grid};