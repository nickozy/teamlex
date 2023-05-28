import { module } from 'modujs';
import  Swiper, {Navigation} from 'swiper';

export default class extends module {
    constructor(m) {
        super(m);
    }

    init() {
        this.swiper = new Swiper(this.el, {
        modules: [Navigation],
        speed: 400,
        slidesPerView: "auto",
        spaceBetween: 0,
        navigation: {
        nextEl: ".arrow-nav__btn.is-next",
        prevEl: ".arrow-nav__btn.is-prev",
      },
    });
    }   
}