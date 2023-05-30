import { module } from 'modujs';
import Swiper from 'swiper';

export default class extends module {
    constructor(m) {
        super(m);
    }

    init() {
        console.log('fs')
        fsAttributes.cmsfilter.destroy()
        fsAttributes.cmsfilter.init()
    }
}
