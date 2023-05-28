import { module } from 'modujs';
import { lazyLoadImage } from '../utils/image';
import LocomotiveScroll from 'locomotive-scroll';
import { html } from '../utils/environment'
import gsap from 'gsap'

export default class extends module {
    constructor(m) {
        super(m);

        // Binding
        // this.onResizeBind = this.onResize.bind(this)
        this.onScrollBind = this.onScroll.bind(this)

        // Data
        this.scrollDirection = 1
        this.lastProgress = 0
        this.lastDirectionChange = 0
    }

    ///////////////
    // Lifecyle
    ///////////////
    init() {
        if(html.scrollTop < 80) {
            html.classList.add('is-top')
        } else {
            html.classList.remove('is-top')
        }

        // Events
        // this.bindEvents()

        // Scroll Instance
        this.locolenisInstance = new LocomotiveScroll({
            lenisOptions: {
                // duration: 1,
                // smooth: false,
            },
            scrollCallback: this.onScrollBind,
            modularInstance: this,
            initCustomTicker: (render) => {
                gsap.ticker.add(render);
            },
            destroyCustomTicker: (render) => {
                gsap.ticker.remove(render);
            }
        })

        this.locolenisInstance.start()
    }

    destroy() {
        // Events
        // this.unbindEvents()

        // Scroll Instance
        this.locolenisInstance?.destroy();

        html.classList.remove('is-scrolling-up')
    }

    ///////////////
    // Events
    ///////////////
    // bindEvents() {
    //     window.addEventListener("resize", this.onResizeBind)
    // }

    // unbindEvents() {
    //     window.removeEventListener("resize", this.onResizeBind)
    // }

    ///////////////
    // Callbacks
    ///////////////
    onScroll({ scroll, limit, velocity, direction, progress }) {
        if (progress > this.lastProgress) {
            if (this.scrollDirection != 1) {
                this.lastDirectionChange = scroll
                this.scrollDirection = 1
                html.style.setProperty('--scroll-direction', this.scrollDirection);
                html.classList.remove('is-scrolling-up')
            }
        } else {
            if (this.scrollDirection != -1) {
                this.lastDirectionChange = scroll
                this.scrollDirection = -1
                html.style.setProperty('--scroll-direction', this.scrollDirection);
                html.classList.add('is-scrolling-up')
            }
        }

        if(scroll < 80) {
            html.classList.add('is-top')
        } else {
            html.classList.remove('is-top')
        }

        window.scroll = { scroll, limit, velocity, direction: this.scrollDirection, progress }

        this.lastProgress = progress
    }

    // onResize() {

    //     console.log(this.locolenisInstance);
    //     this.locolenisInstance?.resize()
    // }

    scrollTo(params) {
        const { target, options } = params;
        this.locolenisInstance?.scrollTo(target, options);
    }

    update() {
        this.locolenisInstance?.update()
    }

    ///////////////
    // Methods
    ///////////////

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
        lazyLoadImage(args.target, null, () => {
        })
    }
}
