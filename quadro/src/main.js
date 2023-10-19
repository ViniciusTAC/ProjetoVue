import Vue from 'vue'
import App from './Home.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
