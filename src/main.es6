'use strict';

import {App} from '../src/App.es6';
import {GridBuilder} from './builder/GridBuilder.es6';
import {SelectorPadService} from './builder/SelectorPadService.es6';


const appDom = document.getElementById('app');

const gridBuilder = new GridBuilder();
const selectorPadService = new SelectorPadService();

const app = new App(appDom, gridBuilder, selectorPadService);
app.initialise();



