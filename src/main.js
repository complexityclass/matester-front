import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import components from './components/index.js'
import routes from './pages/index.js'
import './commonStyles.css'
import axios from 'axios'
import stores from './stores/index.js'
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

export var router = new VueRouter({
  mode: 'history',
  routes
})
Vue.use(VueRouter)
Vue.use(Vuex)

components.forEach(component => {
  Vue.component(component.name, component);
})

Vue.config.productionTip = false
Vue.prototype.$http = axios;
new Vue({
  router,
  store: new Vuex.Store(stores),
  mounted() {
    this.redirect();
  },
  methods: {
    redirect() {
      axios.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        if (error.response.status === 401) {
          router.push('/login');
        }
        return Promise.reject(error)
      })
    }
  },
  render: h => h(App),
}).$mount('#app')
