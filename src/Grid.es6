'use strict';

class Grid {

    constructor(gridDom, rows) {
        rows.map(row => {
            gridDom.appendChild(row.getHtml());
        });
        this.dom = gridDom;
    };

    getHtml() {
        return this.dom;
    };
}

export {Grid};