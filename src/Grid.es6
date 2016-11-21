'use strict';

class Grid {

    constructor(gridDom, rows) {
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