<template>
  <div style="display: flex">
    <el-menu
      background-color="#3f4d67"
      text-color="#ffffff"
      active-text-color="#ffd04b"
      class="el-menu-vertical-demo"
      router
      :style="showMenu ? `display:block` : `display:none`"
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
    <div class="menu-btu">
      <el-button
        type="text"
        :icon="showMenu ? `el-icon-arrow-left` : `el-icon-arrow-right`"
        style="
          background-color: rgba(204, 204, 204, 0.7);
          border-top-right-radius: 100%;
          border-bottom-right-radius: 100%;
          width: 30px;
          height: 70px;
        "
        @click="showMenu = !showMenu"
      >
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      showMenu: true,
    };
  },
  computed: {
    menu_data: {
      get() {
        return this.$store.state.menu_data;
      },
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo {
  width: 300px;
  box-shadow: 1px 0 20px 0 #3f4d67;
  height: 100%;
}
// 菜单按钮
.menu-btu {
  z-index: 1;
  display: none;
  margin: auto 0;
}

// 移动端适配
@media (max-width: 600px) {
  .menu-btu {
    display: block;
  }
}
</style>
