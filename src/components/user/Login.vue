<template>
  <div class="login_container">
    <!-- 登录盒子 -->
    <div class="login_box">
      <div class="logo_name">
        <img class="logo_img" src="../../../public/logo.png" alt="" />
      </div>
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
        <a class="a_register" href="/regist">没有账号？点击注册</a>
        <!-- 按钮 -->
        <el-form-item class="btns">
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
        this.$message.success({
          message: "登录成功",
        });
        //将登录成功之后的token，保存到客户端的sessionStorage中
        window.sessionStorage.setItem("token", res.data.access_token);
        window.sessionStorage.setItem("id", this.loginForm.userId);
        this.$store.commit("setToken", res.data.access_token);
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
.login_container {
  height: 100%;
  background-image: url("../../../public/bg.jpg");
  background-size: 100% 100%;
}

.login_box {
  width: 500px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box {
  height: 130px;
  widows: 130px;
  border-bottom-right-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #2b4b6b;
  position: absolute;
  left: 0;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.3);

  img {
    width: 100%;
    height: 100%;
    border-bottom-right-radius: 50%;
  }
}

.logo_name {
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
  font-size: 30px;

  .logo_img {
    height: 100px;
  }

  // background-color: #2b4b6b;
}

.login_form {
  bottom: 0;
  width: 100%;
  padding: 28px 20px;
  box-sizing: border-box;
}

.a_register {
  text-decoration: none;
  color: blue;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
