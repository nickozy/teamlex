import { module } from 'modujs';

export default class extends module {
    constructor(m) {
        super(m);
    }
    init(){
        const btn = this.el;

        const wrapper = document.querySelector(".our-cases__nav-wrapper");

        const text = document.querySelector(".our-cases__show-text")

            btn.addEventListener("click", () => {
                wrapper.classList.toggle("is-open");
            btn.classList.toggle("is-open");
            if (btn.classList.contains("is-open") === true) {
            text.innerHTML = "Hide all tags";
            } else {
            text.innerHTML = "Show all tags";
            }
        }
        );
    }
}