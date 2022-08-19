<template>
  <div>
    <h1>书本管理</h1>
    <!-- 书本信息表格 -->
    <!-- 信息部分 -->
    <el-table :data="tableData" height="650px">
      <el-table-column
        prop="class_name"
        align="center"
        label="类型"
        width="130px"
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
        prop="book_addr"
        align="center"
        label="出版社"
        width="200px"
      >
      </el-table-column>
      <el-table-column
        prop="book_info"
        align="center"
        label="描述信息"
        width="230px"
        show-overflow-tooltip
      >
        <!-- 操作部分 -->
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="downloadBookItem(scope.$index, scope.row)"
            icon="el-icon-download"
            circle
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editBookItem(scope.$index, scope.row)"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--编辑界面-->
    <el-dialog
      title="编辑书籍"
      :visible.sync="editDialogFormVisible"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
      <!--editDialogForm表单提交的数据-->
      <el-form :model="editDialogForm" label-width="80px" ref="editDialogForm">
        <el-form-item label="类型" prop="class_name">
          <el-input
            v-model="editDialogForm.class_name"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="book_name">
          <el-input
            v-model="editDialogForm.book_name"
            auto-complete="off"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="描述信息" prop="book_info">
          <el-input
            type="textarea"
            v-model="editDialogForm.book_info"
            autosize
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogFormSubmit"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 查询建议
      suggestionArray: [],
      searchText: "",
      // 查询排行榜表单数据
      tableData: [],
      //编辑界面数据
      curEditIndex: 0,
      editDialogFormVisible: false,
      editDialogForm: {},
    };
  },
  async created() {
    // 从后端api初始化tableData
    const { data: res } = await this.$http.get("/book");
    this.tableData = res.data;
    if (this.isLogin) {
      const { data: res } = await this.$http.get(
        "/book/" + this.$store.state.userinfo.userid
      );
      console.log(res);
      this.$store.state.userinfo = res.data;
    }
  },
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
      // 调用callback返回建议的数据
      cb(res.data);
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
    // 下载书本
    downloadBookItem(index, row) {
      let downloadURL = row.book_img_url;
      row.book_dl_count++;
      window.open(downloadURL, "_blank");
    },
    // 编辑书本信息
    editBookItem(index, row) {
      // 获取表单信息，弹出编辑对话框
      this.curEditIndex = index;
      this.editDialogFormVisible = true;
      this.editDialogForm = Object.assign({}, row);
    },
    // 编辑对话框对话表单提交
    async editDialogFormSubmit() {
      // 向后台提交编辑请求
      const { data: res } = await this.$http({
        method: "put",
        url:
          "/book/" +
          this.editDialogForm.book_id +
          "?access_token=" +
          this.$store.getters.getToken,
        data: this.editDialogForm,
      });
      this.takeData.splice(this.curEditIndex, 1, res.data);
      this.editDialogFormVisible = false;
      this.$message.success("修改成功");
    },
  },
};
</script>
<style lang="less" scoped></style>
