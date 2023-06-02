import  Swiper, {Navigation} from 'swiper';
import { module } from 'modujs';

export default class extends module {
    constructor(m) {
        super(m);
    }

    init() {
        const el = this.el
        this.swiper = new Swiper(el.querySelector('.case-solution__cases-collection'), {
        modules: [Navigation],
        speed: 400,
        slidesPerView: "auto",
        wrapperClass: "case-solution__cases-list",
        slideClass: "case-solution__cases-img",
        navigation: {
            nextEl:  el.querySelector(".arrow-nav__btn.is-next"),
            prevEl:  el.querySelector(".arrow-nav__btn.is-prev"),
          },
        });
    }
}
