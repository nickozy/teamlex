import { module } from 'modujs';
import { lazyLoadImage } from '../utils/image';
import LocomotiveScroll from 'locomotive-scroll';
import { html } from '../utils/environment';
import gsap from 'gsap'

const HEADER_THRESHOLD = 300

export default class extends module {
    constructor(m) {
        super(m)

        if (history.scrollRestoration) {
            history.scrollRestoration = 'manual'

            window.scrollTo(0,0)
        }

        // Binding
        this.onResizeBind = this.onResize.bind(this)
        this.onScrollBind = this.onScroll.bind(this)
    }

    ///////////////
    // Lifecyle
    ///////////////
    init() {
        // Events
        this.bindEvents()

console.log("lenis init")

        // Scroll Instance
        this.locomotiveScrollInstance = new LocomotiveScroll({
            lenisOptions:{
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
                direction: 'vertical', // vertical, horizontal
                gestureDirection: 'vertical', // vertical, horizontal, both
                smooth: true,
                mouseMultiplier: 1,
                smoothTouch: false,
                touchMultiplier: 2,

            },
            triggerRootMargin: "-1px -5% -1px -5%",
            scrollCallback: this.onScrollBind,
            modularInstance: this,
            initCustomTicker: (render) => {
                gsap.ticker.add(render);
            },
            destroyCustomTicker: (render) => {
                gsap.ticker.remove(render);
            }
        })

        this.locomotiveScrollInstance.start()

        this.onScrollBind

        if(html.scrollTop > HEADER_THRESHOLD) {
            html.classList.add('has-scrolled')
        }
    }

    destroy() {
        // Events
        this.unbindEvents()

        // Scroll Instance
        this.locomotiveScrollInstance?.destroy()
    }

    ///////////////
    // Events
    ///////////////
    bindEvents() {
        window.addEventListener("resize", this.onResizeBind)
    }

    unbindEvents() {
        window.removeEventListener("resize", this.onResizeBind)
    }

    ///////////////
    // Callbacks
    ///////////////
    onScroll({ scroll, limit, velocity, direction, progress }) {
        // Show / Hide fixed header
        if(scroll > HEADER_THRESHOLD && !html.classList.contains('has-scrolled')) {
            html.classList.add('has-scrolled')
        } else if (scroll <= HEADER_THRESHOLD && html.classList.contains('has-scrolled')) {
            html.classList.remove('has-scrolled')
        }

        // Set global velocity variable
        // used by ScalingVisual.js
        window.scrollVelocity = velocity
        
        window.scrollDirection = direction
    }

    onResize() {
        this.locomotiveScrollInstance?.resize()
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
        lazyLoadImage(args.target)
    }

    removeScrollElements($oldContainer) {
        this.locomotiveScrollInstance?.removeScrollElements($oldContainer)
        
    }

    addScrollElements($newContainer) {
        this.locomotiveScrollInstance?.addScrollElements($newContainer)
        
        
    }

    stop() {
        this.locomotiveScrollInstance?.stop()
    }

    start() {
        this.locomotiveScrollInstance?.start()
    }

    /**
     * ScrollTo
     *
     * @param {Int, NodeElement or String} target - The scrollTo a target
     * @param {Object} options - The scrollTo options (offset, duration, easing, immediate)
     *
     * @see https://github.com/studio-freight/lenis#methods
     *
     */
    scrollTo(params) {
        const { target, options } = params
        this.locomotiveScrollInstance?.lenisInstance?.scrollTo(target, options)
    }

    // Hide header when footer is in-view
    hideHeader(args) {
        if (args.way === 'enter') {
            html.classList.add('has-header-hidden')
        }
        if (args.way === 'leave') {
            html.classList.remove('has-header-hidden')
        }
    }
}

