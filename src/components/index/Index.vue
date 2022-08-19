<template>
  <div class="container">
    <el-container style="height: 100%" direction="vertical">
      <Header></Header>
      <el-container>
        <Aside :style="showMenu ? `display:block` : `display:none`"></Aside>
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
        <el-main><router-view></router-view></el-main>
      </el-container>
      <Footer></Footer>
    </el-container>
  </div>
</template>
<script>
import Footer from "../Footer.vue";
import Aside from "../Aside.vue";
import Header from "../Header.vue";
export default {
  components: { Footer, Aside, Header },
  data() {
    return {
      showMenu: true,
    };
  },
};
</script>
<style lang="less" scoped>
.container {
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
