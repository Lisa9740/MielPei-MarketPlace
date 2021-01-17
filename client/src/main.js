import Vue from 'vue'
import Vuetify from "vuetify"
import Layout from './layouts/Layout.vue'
import 'vuetify/dist/vuetify.min.css'
import Routes from './route'
import store from './store';
import FlashMessage from '@smartweb/vue-flash-message'
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

Vue.config.productionTip = false
Vue.use(Vuetify);
Vue.use(FlashMessage);
Vue.use(VueLodash, { lodash: lodash })
Vue.use(VueFilterDateFormat, {
  dayOfWeekNames: [
    'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi',
    'Vendredi', 'Samedi'
  ],
  dayOfWeekNamesShort: [
    'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'
  ],
  monthNames: [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'
  ],
  monthNamesShort: [
    'Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun',
    'Juil', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]
});

new Vue({
  vuetify: new Vuetify({}),
  router: Routes,
  store: store,
  render: h => h(Layout),
}).$mount('#app')