'use strict';

import {App} from '../src/App.es6';
import {GridBuilder} from './builder/GridBuilder.es6';

const wrapper = document.getElementsByClassName('wrapper')[0];

const gridBuilder = new GridBuilder();

const app = new App(wrapper, gridBuilder);
app.initialise();



