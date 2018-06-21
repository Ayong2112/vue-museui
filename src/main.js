// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

Vue.use(MuseUI);

//关闭生产模式下给出的提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// import Vue from 'vue';
// import App from './App';
// import VueRouter from 'vue-router'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import router from './router'
// import axios from 'axios'

// Vue.use(ElementUI);
// Vue.use(VueRouter)

// Vue.prototype.$axios = axios;
// //关闭生产模式下给出的提示
// Vue.config.productionTip = false
// new Vue({
//   el: '#app',
//   router,
//   render: h => h(App)
// });
