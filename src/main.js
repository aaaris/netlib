import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import "./plugins/global.css";
import store from "./store/store.js";

import axios from "axios";
Vue.prototype.$http = axios;
// 配置请求的根目录
// 本地mock测试环境
// Vue.prototype.$http.defaults.baseURL = 'http://127.0.0.1:4523/m1/1426632-0-default'
// 本地测试环境
Vue.prototype.$http.defaults.baseURL = "http://localhost:8081/api/v1";
// 服务器
// Vue.prototype.$http.defaults.baseURL = "http://122.9.215.185:8081/api/v1";



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
