<template>
  <div>
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
    return {};
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
  height: 100%;
  width: 300px;
}
</style>
