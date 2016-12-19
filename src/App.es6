'use strict';

class App {

    initialise() {
        const showPad = (event) => {
            const cursorX = event.clientX + 'px';
            const cursorY = event.clientY + 'px';

            const selectorPad = document.getElementById('selector_pad');

            selectorPad.style.left = cursorX;
            selectorPad.style.top = cursorY;

            selectorPad.classList.remove('hidden');
            event.stopPropagation();
        };

        const hidePad = () => {
            const selectorPad = document.getElementById('selector_pad');
            selectorPad.classList.add('hidden');
            grid.deselectAllCells();
        };

        const gridBuilderModule =  require('./builder/GridBuilder.es6');

        const gridBuilder = gridBuilderModule(showPad);
        const grid = gridBuilder.createGrid();

        const wrapper = document.getElementsByClassName('wrapper')[0];
        wrapper.appendChild(grid.getHtml());
        wrapper.addEventListener('click', hidePad, false);
    };
}

export {App};