import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/black-green-light.css'
import Directives from '../plugin/directives'
import io from 'socket.io-client'
import router from './router'

var socket = io('http://localhost:3001')

Vue.config.productionTip = false
Vue.prototype.$socket = socket

Vue.use(VueMaterial)
Vue.use(Directives)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
}).$mount('#app')
