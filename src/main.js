import Vue from 'vue'
//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//axios
import axios from 'axios'
import VueAxios from 'vue-axios'
//router
import router from './router/index'

import App from './App.vue'

Vue.use(ElementUI);
Vue.use(VueAxios, axios);


Vue.config.productionTip = false
Vue.config.devtools = true

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

new Vue({
  el: '#app',
  // 引入路由对象
  router,
  render: h => h(App)
});