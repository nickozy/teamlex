import  Swiper from 'swiper';
import { module } from 'modujs';

export default class extends module {
    constructor(m) {
        super(m);
    }

    init() {
        const el = this.el
        this.swiper = new Swiper(el, {
        speed: 400,
        direction: 'vertical',
        slidesPerView: 1,
        autoplay: {
            delay: 5000,
          },
          loop: true,
        });
    }
}
