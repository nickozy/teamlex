import { module } from 'modujs';
import { lazyLoadImage } from '../utils/image';
import LoconativeScroll from 'loconative-scroll';
import { gsap } from 'gsap';
import { html } from '../utils/environment';

export default class extends module {
    constructor(m) {
        super(m);
    }

    init() {

        gsap.delayedCall(1, () => {
            this.scroll = new LoconativeScroll({
                el: this.el,
                smooth: true,
            });
    
            this.scroll.on('call', (func, way, obj, id) => {
                // Using modularJS
                this.call(func[0], { way, obj }, func[1], func[2]);
            });
    
            this.scroll.on('scroll', (args) => {
                html.setAttribute('data-direction', args.direction);

                let currentElementsKeys = Object.keys(args.currentElements);
    
                currentElementsKeys.forEach(key => {
                    let element = args.currentElements[key];
    
                    if(element.el.getAttribute('data-module-timeline') && !window.isMobile) {
                        let progress = element.progress;
                        this.call('progress', progress, 'Timeline', key);
                    }
                });
                
                if(args.scroll.y > 200) {
                    html.classList.add('has-scrolled');
                } else {
                    html.classList.remove('has-scrolled');
                }
            })

            window.scroll = this.scroll;

            gsap.delayedCall(2, () => {
                this.scroll.update();
            });
            gsap.delayedCall(3, () => {
                this.scroll.update();
            });

        });

        html.classList.remove('has-scrolled');
    }

    /**
     * Lazy load the related image.
     *
     * @see ../utils/image.js
     *
     * It is recommended to wrap your `<img>` into an element with the
     * CSS class name `.c-lazy`. The CSS class name modifier `.-lazy-loaded`
     * will be applied on both the image and the parent wrapper.
     *
     * ```html
     * <div class="c-lazy o-ratio u-4:3">
     *     <img data-scroll data-scroll-call="lazyLoad, Scroll, main" data-src="http://picsum.photos/640/480?v=1" alt="" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />
     * </div>
     * ```
     *
     * @param {LocomotiveScroll} args - The Locomotive Scroll instance.
     */
    lazyLoad(args) {
        lazyLoadImage(args.obj.el, null, () => {
            //callback
        })
    }

    toggleFooter(e) {
        if(e.way === 'enter') {
            html.classList.add('has-footer-inview');
        } else {
            html.classList.remove('has-footer-inview');
        }
    }

    destroy() {
        this.scroll.destroy();
    }
}
