import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faCog,
  faExternalLinkAlt,
  faHome,
  faShareSquare,
  faSyncAlt
} from '@fortawesome/free-solid-svg-icons'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

library.add(
  faChevronLeft,
  faChevronRight,
  faCog,
  faExternalLinkAlt,
  faHome,
  faShareSquare,
  faSyncAlt
)

// Register the component globally
Vue.component('font-awesome-icon', FontAwesomeIcon)
