import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 定义会话状态
// 便于刷新页面后重新从localStorage中获取值
const state = {
  isLogin: localStorage.getItem("isLogin")
    ? 1
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
    state.isLogin = 1;
  },
  setUserInfo(state, value) {
    // 设置存储token
    state.userinfo = JSON.parse(value);
    localStorage.setItem("userinfo", value);
  },
  removeStorage(state) {
    // 删除token
    localStorage.removeItem("token");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("userinfo");
    state.isLogin = 0;
  },
};

// 定义获取加工方法
const getters = {
  // 监听数据变化的
  getToken(state) {
    // 获取本地存储的登录信息
    if (!state.token) {
      state.token = localStorage.getItem("token");
    }
    return state.token;
  },
  getUserId(state) {
    // 获取用户id
    if (!state.userinfo) {
      state.userinfo = JSON.parse(localStorage.getItem("userinfo"));
    }
    return state.userinfo.user_id;
  },
  getUserLevel(state) {
    // 获取用户权限
    if (!state.userinfo) {
      state.userinfo = JSON.parse(localStorage.getItem("userinfo"));
    } 
    return 1;//state.userinfo ? state.userinfo.user_level : 0;
  },
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
});
