<template>
  <div class="page-header">
    <el-header>
      <el-row type="flex" align="middle">
        <el-col :span="12" style="text-align: left">
          <a href="/home" class="userlink">NETLIB</a>
        </el-col>
        <el-col :span="12" style="text-align: right">
          <a :href="this.isLogin ? `/index` : `/login`" class="userlink">
            <i class="el-icon-user"></i>&nbsp;{{
              this.isLogin
                ? "欢迎" + this.$store.state.userinfo.user_name
                : "游客 去登陆"
            }}
          </a>
          <a
            href="/home"
            class="userlink"
            v-if="this.isLogin == true"
            @click="logout"
            >退出</a
          >
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    isLogin: {
      get() {
        return this.$store.getters.getLoginState;
      },
    },
  },
  methods: {
    logout() {
      this.$store.state.token = "";
      this.$store.mutations.clearState;
    },
  },
};
</script>
<style lang="less" scoped>
// 头部设置
.page-header {
  font-size: 18px;
  line-height: 20px;
  background-color: rgb(71, 70, 70);
  box-shadow: 0 4px 14px 0 rgb(0 0 0 / 5%);
  //   行内元素垂直居中
  .el-row {
    height: 100%;
  }
}
//用户容器样式
.userlink {
  color: #f2f2f2;
  text-decoration: none;
}
.userlink:hover {
  color: #49afd0;
  text-decoration: underline;
}
</style>
