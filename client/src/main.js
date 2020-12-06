import Vue from 'vue'
import Vuetify from "vuetify"
import Layout from './layouts/Layout.vue'
import 'vuetify/dist/vuetify.min.css'
import Routes from './route'
import store from './store';
import FlashMessage from '@smartweb/vue-flash-message'


Vue.config.productionTip = false
Vue.use(Vuetify);
Vue.use(FlashMessage);



new Vue({
  vuetify: new Vuetify({}),
  router: Routes,
  store: store,
  render: h => h(Layout),
}).$mount('#app')