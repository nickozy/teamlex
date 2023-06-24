import { module } from 'modujs';

export default class extends module {
    constructor(m) {
        super(m);


          // Vars
          
          this.filterIsOpen = false
          this.$el = this.el
          this.textFilter = this.$el.querySelector('.our-cases__show-text');

        this.events = {
            click: {
              more: 'toggleFilter',
            }
          }
    }


    init(){
        const validTags = ["All cases", "Auto Funnels", "Enterprise", "FinTech", "Marketing Analytics", "Conversion Rate Optimization", "No code development"];
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString);
        const name = params.get('tag');
        
        if(name){
          if (validTags.includes(name)) {
            return
          }
            this.openFilter()
        }

    }

    openFilter() {
        if (this.filterIsOpen) {
            return
        }
        this.$el.classList.add("is-open")
        this.filterIsOpen = true
        this.textFilter.innerText = "Hide all tags"
    }


    closeFilter() {

        if (!this.filterIsOpen) {
            return
        }

        this.$el.classList.remove("is-open")
        this.filterIsOpen = false
        this.textFilter.innerText = "Show all tags"
    }


    toggleFilter() {
        if (this.filterIsOpen) {
            this.closeFilter()
        } else {
            this.openFilter()
        }
    }
}