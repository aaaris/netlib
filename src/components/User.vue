<template>
  <el-container class="page-container">
    <!-- 网页头部 -->
    <el-header class="page-header">
      <el-row type="flex" align="middle">
        <el-col :span="6">
          <a href="#/home" class="userlink">返回</a>
          <el-divider direction="vertical"></el-divider>
          <span>个人主页</span>
        </el-col>
      </el-row>
    </el-header>
    <!-- 网页主体 -->
    <el-container class="page-main-container">
      <!-- 侧边栏 -->
      <el-aside class="user-tabs-container">
        <!-- 用户头像 -->
        <div class="user-avatar-container">
          <img src="../assets/user/default.png" />
        </div>
        <!-- 用户信息 -->
        <div class="userItem">
          <h2>个人信息</h2>
          <span>账号: {{ user.user_id }}</span
          ><br />
          <span>用户名: {{ user.user_name }}</span>
        </div>
        <!-- 用户设置 -->
        <br /><br /><br />
        <el-button type="primary" plain @click="resetPwdDialogVisiable = true"
          >重设密码
        </el-button>
        <el-button type="danger" plain @click="logout">注销 </el-button>
        <el-dialog
          title="设置新密码"
          :visible.sync="resetPwdDialogVisiable"
          width="60%"
        >
          <el-form
            ref="resetPwdFormRef"
            :model="resetPwdForm"
            :rules="resetPwdFormRules"
            status-icon
            class="register_form"
          >
            <!-- username -->
            <el-form-item prop="username">
              <el-input
                v-model="resetPwdForm.username"
                prefix-icon="el-icon-user-solid"
                placeholder="username"
              >
              </el-input>
            </el-form-item>
            <!-- password -->
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="resetPwdForm.password"
                prefix-icon="el-icon-lock"
                placeholder="password"
              >
              </el-input>
            </el-form-item>
            <!-- 确认密码 -->
            <el-form-item prop="checkPw">
              <el-input
                type="password"
                prefix-icon="el-icon-lock"
                v-model="resetPwdForm.checkPw"
                placeholder="check password"
              ></el-input>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item class="btns">
              <el-button type="primary" @click="resetUserPwd('resetPwdFormRef')"
                >确定</el-button
              >
              <el-button
                type="info"
                @click="resetResetPwdForm('resetPwdFormRef')"
                >重置</el-button
              >
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-aside>
      <!-- 用户行为主体 -->
      <el-main class="user-main-contain">
        <el-tabs tab-position="top">
          <!-- 用户收藏 -->
          <el-tab-pane label="我的收藏">
            <el-table class="tableClass" :data="tableData">
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
                prop="book_author"
                align="center"
                label="作者"
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
              <!-- <el-table-column prop="book_dl_count" align="center" label="下载量" width="130px">
              </el-table-column> -->
              <el-table-column
                prop="book_info"
                align="center"
                label="描述性息"
                width="230px"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button
                    @click="deleteBookItem(scope.$index, scope.row)"
                    icon="el-icon-star-on"
                    circle
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 用户上传书籍 -->
          </el-tab-pane>
          <!-- 用户上传 -->
          <el-tab-pane label="我的上传">
            <el-button
              icon="el-icon-upload2"
              @click="uploadDialogVisiable = true"
            >
            </el-button>
            <!-- 上传弹窗 -->
            <el-dialog
              title="上传书籍"
              :visible.sync="uploadDialogVisiable"
              width="60%"
            >
              <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
            </el-dialog>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    //   验证输入用户名
    var validateUserName = (rule, value, callback) => {
      // if (value === "") {
      //   callback(new Error("请输入用户名"));
      // } else {
      callback();
      // }
    };
    // 验证输入密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (value.length < 6 || value.length > 15) {
        callback(new Error("长度在6到15个字符"));
      } else {
        if (this.registerForm.checkPw !== "") {
          this.$refs.registerFormRef.validateField("checkPw");
        }
        callback();
      }
    };
    // 验证再次输入的密码
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else if (value.length < 6 || value.length > 15) {
        callback(new Error("长度在6到15个字符"));
      } else {
        callback();
      }
    };
    return {
      // 用户信息对象
      user: {},
      // 重置密码表单
      resetPwdForm: {
        username: "",
        password: "",
        checkPw: "",
      },
      //   规则验证对象
      resetPwdFormRules: {
        username: [{ validator: validateUserName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPw: [{ validator: validatePass2, trigger: "blur" }],
      },
      // 收藏表格数据
      tableData: [],
      // 上传窗口
      uploadDialogVisiable: false,
      // 设置窗口
      resetPwdDialogVisiable: false,
    };
  },
  created() {
    let getUser = async () => {
      const { data: res } = await this.$http.get(
        "/user/" +
          this.$store.userinfo.user_id +
          "?access_token=" +
          this.$store.getters.getToken
      );
      this.user = res.data;
      // console.log(this.user)
    };
    getUser();
    // 从后端api初始化tableData
    let getCollections = async () => {
      const { data: res } = await this.$http.get(
        "/collection/" +
          this.$store.userinfo.user_id +
          "?access_token=" +
          this.$store.getters.getToken
      );
      this.tableData = res.data;
    };
    getCollections();
  },
  methods: {
    // 返回主页
    goBack() {
      this.$router.push("/home");
    },
    // 注销
    logout() {
      this.$confirm("亲，您确定要退出登录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        window.sessionStorage.removeItem("id");
        window.sessionStorage.removeItem("token");
        // console.log(window.sessionStorage.length)
        this.goBack();
      });
    },
    // 重新设置密码
    resetUserPwd(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return;
        // const { data: res } = await this.$http({
        //   method: "post",
        //   url:
        //     "/user",
        //   data: {
        //     user_name: this.resetPwdForm.username,
        //     user_password: this.resetPwdForm.password
        //   }
        // });
        // console.log(res)
        // this.$message({
        //   showClose: true,
        //   duration: 0,
        //   type: "success",
        //   message: "修改成功！请重新登录"
        // });
        // this.$router.push("/login");
      });
    },
    // 重置密码表单
    resetResetPwdForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 删除收藏书籍
    deleteBookItem(index, row) {
      // 弹窗询问
      this.$confirm("是否取消收藏该书籍", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 确定按钮逻辑
        // 向后台发送删除请求
        let delCollection = async () => {
          const { data: res } = await this.$http({
            method: "delete",
            url:
              "/collection?access_token=" +
              this.$store.getters.getToken,
            data: {
              user_id: this.user.user_id,
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
        };
        delCollection();
      });
    },
  },
};
</script>

<style lang="less" scoped>
//页头容器
.page-header {
  font-size: 18px;
  line-height: 20px;
  background-color: rgb(71, 70, 70);
  color: #f7f7f7;
  box-shadow: 0 4px 14px 0 rgb(0 0 0 / 5%);
  // 行垂直居中
  .el-row {
    height: 100%;
  }
  // 超链接
  .userlink {
    color: #f2f2f2;
    text-decoration: none;
  }
  .userlink:hover {
    color: #49afd0;
    text-decoration: underline;
  }
}

// 网页主体容器
.page-main-container {
  margin: 50px;
  height: 1000px;
  background-color: white;
}

// 侧边标签栏
.user-tabs-container {
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 14px 0 rgb(0 0 0 / 5%);
  // 头像容器
  .user-avatar-container {
    margin: 50px auto;
  }

  // 个人信息
  .userItem {
    font-size: 20px;
  }

  // 收藏部分容器
  .page-main-contain {
    width: 800px;
  }
}

// 用户主体区域容器
.user-main-contain {
  box-shadow: 0 4px 14px 0 rgb(0 0 0 / 5%);
}
</style>
