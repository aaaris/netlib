<template>
  <div class="register_container">
    <div class="register_box">
      <img src="../../../public/logo.png" alt="" />
      <!-- 注册表单区域 -->
      <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerFormRules"
        status-icon
        class="register_form"
      >
        <!-- username -->
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            prefix-icon="el-icon-user-solid"
            placeholder="username"
          ></el-input>
        </el-form-item>
        <!-- password -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="registerForm.password"
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
            v-model="registerForm.checkPw"
            placeholder="check password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="register('registerFormRef')"
            >注册</el-button
          >
          <el-button type="info" @click="resetregisterForm('registerFormRef')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    //   验证输入用户名
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    // 验证输入密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
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
      registerForm: {
        username: "",
        password: "",
        checkPw: "",
      },
      //   规则验证对象
      registerFormRules: {
        username: [{ validator: validateUserName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPw: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    //   注册
    register(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http({
          method: "post",
          url: "/user",
          data: {
            user_name: this.registerForm.username,
            user_password: this.registerForm.password,
          },
        });
        // console.log(res)
        this.$message({
          showClose: true,
          duration: 0,
          type: "success",
          message: "注册成功！您的账号:" + res.data.user_id,
        });
        this.$router.push("/login");
      });
    },
    // 重置注册表单
    resetregisterForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.register_container {
  height: 100%;
  background-image: url("../../../public/bg.jpg");
  background-size: 100% 100%;
}

.register_box {
  text-align: center;
  padding-top: 15px;
  width: 500px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  line-height: 30px;
  transform: translate(-50%, -50%);
  img {
    height: 100px;
  }
}

@media (max-width: 600px) {
  .register_box {  
    width: 95%; 
  }
}

.register_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 28px 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
