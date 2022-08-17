<template>
  <div class="page-body">
    <!-- 头部 -->
    <Header></Header>
    <!-- 书本显示主体 -->
    <el-container class="main-container">
      <!-- logo -->
      <el-header class="logo-container" height="150px">
        <a href="javascript:;"><img src="../../public/logo.png" alt="" /> </a>
      </el-header>
      <!-- 搜索框 -->
      <el-autocomplete
        placeholder="请输入查找内容"
        v-model="searchText"
        class="input-with-select"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        @select="handleSelect"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择类别">
          <el-option label="类型" value="class_name"></el-option>
          <el-option label="书名" value="book_name"></el-option>
          <el-option label="作者" value="book_author"></el-option>
          <el-option label="出版社" value="book_addr"></el-option>
          <el-option label="描述信息" value="book_info"></el-option>
        </el-select>
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
        <!--书本表格主体部分-->
        <div class="divider">
          <h1>&nbsp;&nbsp;&nbsp;最受欢迎的</h1>
          <el-divider></el-divider>
        </div>
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
              <el-button
                type="warning"
                icon="el-icon-star-off"
                circle
                @click="takeBookItem(scope.$index, scope.row)"
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
          <el-form
            :model="editDialogForm"
            label-width="80px"
            ref="editDialogForm"
          >
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
      // 登录状态
      isLogin: false,
      // 查询建议
      suggestionArray: [],
      // 查询排行榜表单数据
      tableData: [],
      searchText: "",
      select: "",
      //编辑界面数据
      curEditIndex: 0,
      editDialogFormVisible: false,
      editDialogForm: {},
    };
  },
  created() {
    // 从后端api初始化tableData
    let getBooks = async () => {
      const { data: res } = await this.$http.get("/book");
      this.tableData = res.data;
    };
    getBooks();
    this.isLogin = window.sessionStorage.getItem("token") != null;
  },
  methods: {
    handleSelect(item) {
      if (this.select == "") {
        this.select = "book_name";
      }
      this.searchText = item;
    },
    // 获取搜索建议
    querySearch(queryString, cb) {
      // console.log(str)
      // 发送后台请求获取搜索建议
      let getSuggestion = async () => {
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
      };
      getSuggestion();
    },

    // 寻找书本
    searchBookItem() {
      if (this.select === "") {
        return this.$message.error("请选择搜索类别");
      } else if (this.searchText === "") {
        return this.$message.error("请输入搜索内容");
      }
      let sbi = async () => {
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
      };
      sbi();
    },
    gotoUesr() {
      // 检验用户登录
      if (window.sessionStorage.getItem("token") === null) {
        return this.$confirm("请先登录！", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "返回",
          type: "warning",
        }).then(() => {
          this.$router.push("/login");
        });
      }
    },
    // 下载书本
    downloadBookItem(index, row) {
      // 检验用户登录
      if (window.sessionStorage.getItem("token") === null) {
        return this.$message.error("请先登录！");
      }
      // 下载
      // let downloadURL = this.$http.defaults.baseURL + "/books/download/" + row.link + ".txt"
      let downloadURL = row.book_img_url;
      row.book_dl_count++;
      window.open(downloadURL, "_blank");
    },
    // 编辑书本信息
    editBookItem(index, row) {
      // 检验用户登录
      if (window.sessionStorage.getItem("token") === null) {
        return this.$message.error("请先登录！");
      }
      // 获取表单信息，弹出编辑对话框
      this.curEditIndex = index;
      this.editDialogFormVisible = true;
      this.editDialogForm = Object.assign({}, row);
    },
    // 编辑对话框对话表单提交
    editDialogFormSubmit() {
      // 向后台提交编辑请求
      let edfs = async () => {
        const { data: res } = await this.$http({
          method: "put",
          url:
            "/book/" +
            this.editDialogForm.book_id +
            "?access_token=" +
            window.sessionStorage.getItem("token"),
          data: this.editDialogForm,
        });
        this.takeData.splice(this.curEditIndex, 1, res.data);
      };
      edfs();
      // 渲染页面,只修改页面上单个修改的书籍,不再向后端请求所有书籍
      // this.tableData.splice(this.curEditIndex, 1, this.editDialogForm);
      this.editDialogFormVisible = false;
      this.$message.success("修改成功");
    },
    // 收藏书本按钮事件
    takeBookItem(index, row) {
      // 检验用户登录
      if (window.sessionStorage.getItem("token") === null) {
        return this.$message.error("请先登录！");
      }
      // 请后后台，收藏书籍
      let tbi = async () => {
        const { data: res } = await this.$http({
          method: "post",
          url:
            "/collection?access_token=" +
            window.sessionStorage.getItem("token"),
          data: {
            user_id: Number(window.sessionStorage.getItem("id")),
            book_id: row.book_id,
          },
        });
        if (res.code === 200) {
          this.$message.success("收藏成功");
        } else {
          this.$message("已收藏");
        }
      };
      tbi();
    },
  },
};
</script>

<style lang="less" scoped>
// 内容容器
.main-container {
  width: 75%;
  line-height: 30px;
  margin: 20px auto;
  background-color: white;
  box-shadow: 0 4px 14px 0 rgb(0 0 0 / 5%);
}

// logo样式
.logo-container {
  text-align: center;
  margin: 30px auto;
  img {
    height: 100%;
  }
}

//搜索框样式
.input-with-select {
  margin: 30px auto;
  width: 70%;
  // height: 10%;
}
// 搜索框选择列表样式
.el-input {
  .el-select {
    width: 130px;
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
