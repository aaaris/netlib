<template>
  <div class="page-body">
    <!-- 头部 -->
    <Header></Header>
    <!-- 书本显示主体 -->
    <el-container class="main-container">
      <!-- logo -->
      <el-header class="logo-container" height="100px">
        <a href="javascript:;"><img src="../../public/logo.png" alt="" /> </a>
      </el-header>
      <!-- 搜索框 -->
      <el-autocomplete
        placeholder="搜索书本类型，名称，出版社，描述"
        v-model="searchText"
        class="input-with-select"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        @select="handleSelect"
      >
        <template slot-scope="{ item }">
          {{ item }}
        </template>
        <el-button
          type="primer"
          slot="append"
          icon="el-icon-search"
          @click="searchBookItem"
        ></el-button>
      </el-autocomplete>
      <!-- 显示书本部分 -->
      <el-main>
        <div class="divider">
          <h1>&nbsp;&nbsp;&nbsp;最受欢迎的</h1>
          <el-divider></el-divider>
        </div>
        <!-- 书本信息表格 -->
        <!-- 信息部分 -->
      </el-main>
    </el-container>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./Footer.vue";
import Header from "./Header.vue";
export default {
  components: { Footer, Header },
  data() {
    return {
      // 查询建议
      suggestionArray: [],
      searchText: "",
      // 查询排行榜表单数据
      tableData: [],
    };
  },
  // async created() {
  //   // 从后端api初始化tableData
  //   const { data: res } = await this.$http.get("/book");
  //   this.tableData = res.data;
  //     this.$store.state.userinfo = res.data;
  //   }
  // },
  methods: {
    // 选择搜索建议
    handleSelect(item) {
      if (this.select == "") {
        this.select = "book_name";
      }
      this.searchText = item;
    },
    // 获取搜索建议
    async querySearch(queryString, cb) {
      // console.log(str)
      // 发送后台请求获取搜索建议
      const { data: res } = await this.$http({
        method: "get",
        url:
          "/book/suggestion?queryKey=" +
          (this.select != "" ? this.select : "book_name") +
          "&queryVal=" +
          queryString,
      });
      console.log(res.data);
      // 调用callback返回建议的数据
      cb(res.data);
    },

    // 收藏书本按钮事件
    async takeBookItem(index, row) {
      // 检验用户登录
      if (this.$store.getters.getToken === null) {
        return this.$message.error("请先登录！");
      }
      // 请后后台，收藏书籍
      const { data: res } = await this.$http({
        method: "post",
        url: "/collection?access_token=" + this.$store.getters.getToken,
        data: {
          user_id: Number(this.$store.state.userinfo.user_id),
          book_id: row.book_id,
        },
      });
      if (res.code === 200) {
        this.$message.success("收藏成功");
      } else {
        this.$message("已收藏");
      }
    },
    // 寻找书本
    async searchBookItem() {
      if (this.select === "") {
        return this.$message.error("请选择搜索类别");
      } else if (this.searchText === "") {
        return this.$message.error("请输入搜索内容");
      }
      const { data: res } = await this.$http({
        method: "get",
        url: "/book" + "?" + this.select + "=" + this.searchText,
      });
      if (res.code === 200) {
        this.tableData = res.data;
        this.$message.success("搜索成功");
      } else {
        this.$message.error("搜索失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
// 内容容器

.main-container {
  line-height: 30px;
  width: 75%;
  padding: 20px;
  margin: 50px auto;
  background-color: white;
  box-shadow: 0 4px 14px 0 rgb(0 0 0 / 5%);
  box-sizing: border-box;
}

// logo样式
.logo-container {
  text-align: center;
  margin-bottom: 20px;
  img {
    width: 300px;
    height: 100px;
  }
}

// 移动端适配
@media (max-width: 600px) {
  .main-container {
    margin: 30px auto;
    width: 90%;
    padding: 10px;
  }
  .logo-container {
    margin-bottom: 0px;
    img {
      width: 200px;
      height: 70px;
    }
  }
  .divider {
    h1 {
      font-size: 20px;
    }
  }
}

// 设置分割线
.divider {
  margin-top: 25px;
  color: #49afd0;
  font-size: 16pt;
  // 分割线容器
  .el-divider {
    background-color: #49afd0;
  }
}
</style>
