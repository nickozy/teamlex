import { module } from 'modujs';
import modularLoad from 'modularload';

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
            console.log("destroy")
            window.Webflow.destroy()
            window.Webflow.require('lottie').lottie.destroy()
        })

        this.load.on('loaded', (transition, oldContainer, newContainer) => {
            console.log("new lottie")
            this.call('destroy', oldContainer, 'app');
            this.call('update', newContainer, 'app');
         
        })
        this.load.on('loaded', (transition, oldContainer, newContainer) => {
            window.Webflow.ready()
            window.Webflow.require('ix2').init()
            window.Webflow.require('lottie').lottie.play()
            fsAttributes.cmsfilter.init()
            fsAttributes.cmsprevnext.init()
        })
    }
}
