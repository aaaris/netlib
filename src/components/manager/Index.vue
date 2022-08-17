<template>
  <div class="container">
    <el-container style="height: 100%">
      <Header></Header>
      <el-container>
        <el-aside width="300px"><Aside></Aside></el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
      <el-footer><Footer></Footer></el-footer>
    </el-container>
  </div>
</template>
<script>
import Footer from "../Footer.vue";
import Aside from "../Aside.vue";
import Header from "../Header.vue";
export default {
  components: { Footer, Aside, Header },
};
</script>
<style lang="less" scoped></style>
