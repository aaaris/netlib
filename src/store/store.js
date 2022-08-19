import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 定义会话状态
const state = {
  isLogin: localStorage.getItem("isLogin")
    ? localStorage.getItem("isLogin")
    : 0,
  // user
  userinfo: localStorage.getItem("userinfo")
    ? JSON.parse(localStorage.getItem("userinfo"))
    : null,
  // token
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "", // token
  // 菜单导航
  menu_data: [],
  //  加载动态路由标志
  isLoadRoute: false,
  userState: 1,
};

// 定义行为方法
const mutations = {
  //  设置菜单导航
  setMeunData(state, data) {
    state.menu_data = data;
  },
  //   设置加载路由标志
  setLoadRoute(state, data) {
    state.isLoadRoute = data;
  },
  setToken(state, value) {
    // 设置存储token
    state.token = value;
    localStorage.setItem("token", value);
    localStorage.setItem("isLogin", 1);
    isLogin = 1;
  },
  removeStorage(state) {
    // 删除token 
    localStorage.removeItem("token");
    localStorage.removeItem("isLogin");
    isLogin = 0;
  },
};

// 定义获取加工方法
const getters = {
  // 监听数据变化的
  getStorage(state) {
    // 获取本地存储的登录信息
    if (!state.token) {
      state.token = JSON.parse(localStorage.getItem(key));
    }
    return state.token;
  },
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
});
