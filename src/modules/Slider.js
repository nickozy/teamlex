import { module } from 'modujs';
import Swiper from 'swiper';

export default class extends module {
    constructor(m) {
        super(m);
    }

    init() {
        this.swiper = new Swiper(this.el, {
           speed: 200,
           loop: true,
           autoplay: {
            delay: 2000,
           },
        });
    }
}
