import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 定义会话状态
const state = {
  // access_token
  token: "",
  // 用户信息
  userinfo: {
    user_id: 0,
    user_name: "aris",
    user_level: 0,
  },
  // 菜单导航
  menu_data: [],
  //  加载动态路由标志
  isLoadRoute: false,
};

// 定义行为方法
const mutations = {
  // 设置授权密钥
  setToken(state, token) {
    state.token = token;
    // 更新userinfo
    let getUser = async () => {
      const { data: res } = await this.$http.get(
        "/user/" +
          window.sessionStorage.getItem("id") +
          "?access_token=" +
          token
      );
      this.user = res.data;
      // console.log(this.user)
    };
    // getUser();
  },
  // 设置用户信息
  setUserInfo(state, data) {
    state.userinfo = JSON.parse(data);
  },
  //  设置菜单导航
  setMeunData(state, data) {
    state.menu_data = data;
  },
  //   设置加载路由标志
  setLoadRoute(state, data) {
    state.isLoadRoute = data;
  },
  //   清空会话状态
  clearState(state) {
    state = {
      token: "",
      userinfo: {
        user_id: 0,
        user_name: "",
        user_level: 0,
      },
      menu_data: [],
      isLoadRoute: false,
    };
  },
};

// 定义获取加工方法
const getters = {
  // 获取用户登录信息
  getLoginState(state) {
    return state.token != "";
  },
  // 获取用户角色
  getUserLevel(state) {
    let data;
    if (state.userState == 0) {
      data = "用户";
    } else {
      data = state.userState + "管理员";
    }
    return data;
  },
  //   获取用户授权密钥
  getToken(state) {
    return state.token;
  },
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
});
