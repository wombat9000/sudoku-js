'use strict';


const showPad = () => {
    console.log('show selection pad');
};

const gridBuilderModule =  require('./builder/GridBuilder.es6');

const gridBuilder = gridBuilderModule(showPad);
const grid = gridBuilder.createGrid();

const wrapper = document.getElementsByClassName('wrapper')[0];

wrapper.appendChild(grid.getHtml());
