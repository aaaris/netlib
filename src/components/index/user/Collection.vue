<template>
  <div>
    <h1>我的收藏</h1>
    <el-table class="tableClass" :data="tableData">
      <el-table-column
        prop="class_name"
        align="center"
        label="类型"
        width="200px"
      >
      </el-table-column>
      <el-table-column
        prop="book_name"
        align="center"
        label="名称"
        width="200px"
      >
      </el-table-column>
      <el-table-column
        prop="book_author"
        align="center"
        label="作者"
        width="200px"
      >
      </el-table-column>
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="searchText"
            size="mini"
            placeholder="输入关键字搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            @click="deleteBookItem(scope.$index, scope.row)"
            icon="el-icon-star-on"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 移动端表格 -->
    <el-table class="tableMobileClass" :data="tableData">
      <el-table-column
        prop="book_name"
        align="center"
        label="名称"
        width="150px"
      >
      </el-table-column>
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <el-input v-model="searchText" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button
            @click="deleteBookItem(scope.$index, scope.row)"
            icon="el-icon-star-on"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Collection",
  data() {
    return {
      // 收藏表格数据
      tableData: [],
      // 搜索内容
      searchText: "",
    };
  },
  async created() {
    // 从后端api初始化tableData
    const { data: res } = await this.$http.get(
      "/collection/" +
        this.$store.state.userinfo.user_id +
        "?access_token=" +
        this.$store.getters.getToken
    );
    this.tableData = res.data;
  },
  methods: {
    // 删除收藏书籍
    deleteBookItem(index, row) {
      // 弹窗询问
      this.$confirm("是否取消收藏该书籍", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        // 确定按钮逻辑
        // 向后台发送删除请求
        const { data: res } = await this.$http({
          method: "delete",
          url: "/collection?access_token=" + this.$store.getters.getToken,
          data: {
            user_id: Number(this.$store.state.userinfo.user_id),
            book_id: row.book_id,
          },
        });
        if (res.code === 200) {
          // 删除页面上表单
          this.tableData.splice(index, 1);
          // 删除成功提示
          this.$message({
            type: "success",
            message: "已不再收藏该书籍!",
          });
        } else {
          // 删除失败提示
          this.$message({
            type: "error",
            message: res.data,
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.tableClass {
  width: 100%;
}
.tableMobileClass {
  width: 100%;
  display: none;
}
@media (max-width: 600px) {
  .tableClass {
    display: none;
  }
  .tableMobileClass {
    display: block;
  }
}
</style>
