<template>
  <div class="login_container">
    <!-- 登录盒子 -->
    <div class="login_box">
      <img class="logo_img" src="../../../public/logo.png" alt="" />
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        class="login_form"
      >
        <!-- accout -->
        <el-form-item prop="userId">
          <el-input
            v-model="loginForm.userId"
            prefix-icon="el-icon-user-solid"
            placeholder="user accout"
          >
          </el-input>
        </el-form-item>
        <!-- password -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            placeholder="password"
          >
          </el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <a class="a_register" href="/regist">没有账号？点击注册</a>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //登录表单的数据绑定对象
      loginForm: {
        userId: "",
        password: "",
      },
      // 表单的验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        userId: [
          { required: true, message: "请输入登录账号名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 登录
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        // 发送登录
        var targetURL =
          "?userid=" +
          this.loginForm.userId +
          "&password=" +
          this.loginForm.password;
        const { data: res } = await this.$http({
          method: "get",
          url: "/user" + targetURL,
        });
        if (res.code != 200)
          return this.$message.error("登录失败! " + res.data);
        //将登录成功之后的token，保存到客户端的sessionStorage中
        this.$store.commit("setToken", res.data.access_token);
        this.$message.success({
          message: "登录成功",
        });
        // 拉取用户信息
        const { data: res2 } = await this.$http.get(
          "/user/" +
            this.loginForm.userId +
            "?access_token=" +
            res.data.access_token
        );
        if (res2.code != 200)
          return this.$message.error("拉取用户信息失败！" + res2.data);
        // 将用户信息保存到store,localStorage中
        this.$store.commit("setUserInfo", JSON.stringify(res2.data));
        // 跳转到后台主页
        this.$router.push("/home");
      });
    },
    // 重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
// 登录body容器
.login_container {
  height: 100%;
  background-image: url("../../../public/bg.jpg");
  background-size: 100% 100%;
}

// 登录盒子
.login_box {
  text-align: center;
  width: 500px;
  height: 400px;
  padding-top: 15px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  img {
    height: 100px;
  }
}

// 登录表单区域
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 28px 20px;
  box-sizing: border-box;
}

// 按钮区域
.btns {
  display: flex;
  justify-content: flex-start;
}

// 注册超链接
.a_register {
  margin: auto;
  text-decoration: none;
  color: blue;
  margin-right: 150px;
}

// 移动端适配
@media (max-width: 600px) {
  .login_box {
    width: 95%;
  }
  .login_form {
    bottom: 30px;
  }
  .a_register {
    margin-right: 20px;
    font-size: 16px;
  }
}
</style>
