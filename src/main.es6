'use strict';

import {App} from '../src/App.es6';
import {GridBuilder} from './builder/GridBuilder.es6';
import {SelectorPadBuilder} from './builder/SelectorPadBuilder.es6';


const appDom = document.getElementById('app');

const gridBuilder = new GridBuilder();
const selectorPadBuilder = new SelectorPadBuilder();

const app = new App(appDom, gridBuilder, selectorPadBuilder);
app.initialise();



