import { module } from 'modujs';
import  Swiper, {Navigation} from 'swiper';

export default class extends module {
    constructor(m) {
        super(m);
    }

    init() {

        const el = this.el;
        const slider = el.querySelector('.swiper');
        
        this.swiper = new Swiper(slider, {
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