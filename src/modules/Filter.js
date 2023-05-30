import { module } from 'modujs';
import Swiper from 'swiper';

export default class extends module {
    constructor(m) {
        super(m);
    }

    init() {
        fsAttributes.cmsfilter.destroy()
        fsAttributes.cmsfilter.init()
    }
}
