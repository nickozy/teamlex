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
            }
        })
        
        this.load.on('loading', (transition, oldContainer) => {
            console.log("old")
            window.Webflow.destroy()
        })
        
        this.load.on('loaded', (transition, oldContainer, newContainer) => {
            console.log("new")
            this.call('destroy', oldContainer, 'app');
            this.call('update', newContainer, 'app');
            window.Webflow.ready()
            window.Webflow.require('ix2').init()
        })
    }
}
