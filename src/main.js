// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);
/* eslint-disable no-new */
/* import '.././node_modules/bootstrap3/dist/js/bootstrap.min.js';
import '.././node_modules/bootstrap3/dist/css/bootstrap.min.css';
 */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
