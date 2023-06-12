import  Swiper, {Autoplay} from 'swiper';
import { module } from 'modujs';

export default class extends module {
    constructor(m) {
        super(m);
    }

    init() {
        const el = this.el
        this.swiper = new Swiper(el, {
        modules: [Autoplay],
        speed: 400,
        direction: 'vertical',
        slidesPerView: 1,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          },
          loop: true,
          loopedSlides: 4,
        });
    }
}
