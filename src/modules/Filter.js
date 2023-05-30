import { module } from 'modujs';

export default class extends module {
    constructor(m) {
        super(m);
    }

    init() {
        fsAttributes.cmsfilter.init()
    }
}
