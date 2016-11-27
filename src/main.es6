'use strict';

const gridBuilderModule =  require('./builder/GridBuilder.es6');

const gridBuilder = gridBuilderModule();
const grid = gridBuilder.createGrid();

const wrapper = document.getElementsByClassName('wrapper')[0];
wrapper.appendChild(grid.getHtml());