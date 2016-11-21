'use strict';

const gridBuilderModule =  require('./builder/GridBuilder.es6');

const gridBuilder = gridBuilderModule();
const grid = gridBuilder.createGrid();

const body = document.body;
body.appendChild(grid.getHtml());