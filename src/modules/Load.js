import { module } from 'modujs';
import modularLoad from 'modularload';
import { html } from '../utils/environment';

export default class extends module {
    constructor(m) {
        super(m)
    }

    init() {
        this.load = new modularLoad({
            enterDelay: 500,
            transitions: {
                menu: {
                    enterDelay: 50
                },
                articles: {
                    enterDelay: 500
                }
            }
        })

        this.load.on('loading', (transition, oldContainer) => {
            if (transition == 'menu') {
                html.classList.add('menu-loading-transition')
            }

            if (transition == 'articles') {
                this.call('removeScrollElements', oldContainer, 'Scroll')
                this.call('scrollTo', { target: oldContainer.parentNode, options: { duration: 1 } }, 'Scroll')
            }
        })

        this.load.on('loaded', (transition, oldContainer, newContainer) => {
            this.call('destroy', oldContainer, 'app');
            this.call('update', newContainer, 'app');
        })

        this.load.on('ready', (transition, newContainer) => {
            this.call('close', null, 'ModalMenu')

            setTimeout(() => {
                this.call('updateCurrentItem', null, 'ModalMenu')
            }, 400)

            if (transition == 'menu') {
                html.classList.remove('menu-loading-transition')
            }

            if (transition == 'articles') {
                this.call('addScrollElements', newContainer, 'Scroll')
            }
        })        
    }
}
