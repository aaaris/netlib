<template>
  <div style="height: 100%">
    <el-menu
      background-color="#545c64"
      text-color="#ffffff"
      active-text-color="#ffd04b"
      class="el-menu-vertical-demo"
      router
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span>NETLIB</span>
      </el-menu-item>
      <el-submenu
        index="javascript:;"
        v-for="item in menu_data"
        :key="item.name"
      >
        <template slot="title"
          ><i :class="item.icon"></i><span>{{ item.name }}</span></template
        >
        <el-menu-item
          :index="child.path"
          v-for="child in item.child"
          :key="child.name"
        >
          <i :class="child.icon"></i>{{ child.name }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      menu_data: [
        {
          name: "USER",
          icon: "el-icon-user",
          child: [
            {
              name: "个人信息",
              icon: "el-icon-document",
              path: "/index/profile",
            },
            {
              name: "我的收藏",
              icon: "el-icon-collection",
              path: "/index/collection",
            },
            {
              name: "我的分享",
              icon: "el-icon-share",
              path: "/index/share",
            },
          ],
        },
        {
          name: "DATA&TABLE",
          icon: "el-icon-s-data",
          child: [
            {
              name: "用户管理",
              icon: "el-icon-user-solid",
              path: "/index/userManager",
            },
            {
              name: "书本管理",
              icon: "el-icon-reading",
              path: "/index/bookManager",
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
              path: "index/contact",
            },
            {
              name: "小程序服务",
              icon: "el-icon-mobile",
              path: "index/more",
            },
          ],
        },
      ],
    };
  },
  methods: {
    logout() {
      console.log("logout");
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo {
  height: 100%;
}
</style>
