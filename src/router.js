import Vue from "vue";
import Router from "vue-router";
import Login from "./components/user/Login.vue";
import Regist from "./components/user/Regist.vue";
import Home from "./components/Home.vue";
import Index from "./components/index/Index.vue";
import store from "./store/store";
import Book from "./components/books/Book.vue";

Vue.use(Router);

const routes = [
  {
    path: "/index",
    component: Index,
    // redirect: "/index/profile",
    // 路由嵌套
    children: [],
    meta: { requireAuth: true, roles: ["admin", "user"] },
  },
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/login",
    component: Login,
    meta: { requireAuth: false, roles: ["admin", "user"] },
  },
  {
    path: "/regist",
    component: Regist,
    meta: { requireAuth: false, roles: ["admin", "user"] },
  },
  {
    path: "/home",
    component: Home,
    meta: { requireAuth: false, roles: ["admin", "user"] },
  },
  {
    path: "/book/:book_id",
    component: Book,
    meta: { requireAuth: false, roles: ["admin", "user"] },
  },
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

let oRoutes = router.options.routes;

// 生成动态路由
const buildRouter = () => {
  let data = store.state.menu_data;
  data.forEach((item) => {
    item.child.forEach((child) => {
      let new_router = {
        path: child.path,
        component: () => import("./components" + child.componentPath),
      };
      oRoutes[0].children.push(new_router);
    });
  });
  router.addRoutes(oRoutes);
};

router.beforeEach((to, from, next) => {
  // 判断路由是否已经加载过
  let isLoadRoute = store.state.isLoadRoute;
  if (!isLoadRoute) {
    // axios.get("/menuList").then((res) => {
    //   store.commit("setMeunData", res.data, menu_data);
    // });
    const menu_data = [
      {
        name: "USER",
        icon: "el-icon-user",
        child: [
          {
            name: "个人信息",
            icon: "el-icon-document",
            path: "/index/profile",
            componentPath: "/index/user/Profile.vue",
          },
          {
            name: "我的收藏",
            icon: "el-icon-collection",
            path: "/index/collection",
            componentPath: "/index/user/Collection.vue",
          },
          {
            name: "我的分享",
            icon: "el-icon-share",
            path: "/index/share",
            componentPath: "/index/user/Share.vue",
          },
        ],
      },
      {
        name: "MORE",
        icon: "el-icon-more",
        child: [
          {
            name: "联系我们",
            icon: "el-icon-chat-dot-square",
            path: "/index/contact",
            componentPath: "/index/more/Contact.vue",
          },
          {
            name: "小程序服务",
            icon: "el-icon-mobile",
            path: "/index/more",
            componentPath: "/index/more/Contact.vue",
          },
        ],
      },
    ];
    // 获取用户角色
    let user_level = store.getters.getUserLevel;
    // 如果用户为管理员则添加数据后台
    if (user_level == 1) {
      menu_data.splice(1, 0, {
        name: "DATA&TABLE",
        icon: "el-icon-s-data",
        child: [
          {
            name: "用户管理",
            icon: "el-icon-user-solid",
            path: "/index/userManager",
            componentPath: "/index/manager/UserManager.vue",
          },
          {
            name: "书本管理",
            icon: "el-icon-reading",
            path: "/index/bookManager",
            componentPath: "/index/manager/BookManager.vue",
          },
        ],
      });
    }
    store.commit("setMeunData", menu_data);
    // 生成动态路由
    buildRouter();
    // 设置已经加载过的标记
    store.commit("setLoadRoute", true);
  }
  if (to.matched.some((m) => m.meta.requireAuth)) {
    // 需要登录
    if (window.localStorage.token && window.localStorage.isLogin === "1") {
      next();
    } else if (to.path !== "/login") {
      let token = window.localStorage.token;
      if (token === "null" || token === "" || token === undefined) {
        next({ path: "/login" });
        Vue.prototype.$message({
          message: "检测到您还未登录,请登录后操作！",
          type: "error",
          duration: 1500,
        });
      } else {
        next();
      }
    } else {
      next();
    }
  } else {
    // 不需要登陆
    next();
  }
});

export default router;
