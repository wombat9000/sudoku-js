'use strict';

import {App} from '../src/App.es6';
import {GridBuilder} from './builder/GridBuilder.es6';

const appDom = document.getElementById('app');
const gridBuilder = new GridBuilder();

const app = new App(appDom, gridBuilder);
app.initialise();



