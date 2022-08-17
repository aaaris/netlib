import Vue from "vue";
import Router from "vue-router";
import Login from "./components/user/Login.vue";
import Regist from "./components/user/Regist.vue";
import Home from "./components/Home.vue";
import User from "./components/User.vue";
import Index from "./components/manager/Index.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/regist",
      component: Regist,
    },
    {
      path: "/home",
      component: Home,
    },
    // {
    //   path: "/user",
    //   component: User,
    // },
    {
      path: "/index",
      name: "index",
      redirect: "/index/Profile",
      component: Index,
      // 路由嵌套
      children: [
        {
          path: "/index/profile",
          component: () => import("./components/manager/Profile.vue"),
        },
        {
          path: "/index/collection",
          component: () => import("./components/manager/Collection.vue"),
        },
        {
          path: "/index/share",
          component: () => import("./components/manager/Share.vue"),
        },
      ],
    },
  ],
});
