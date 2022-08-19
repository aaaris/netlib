<template>
  <div>
    <h1>我的信息</h1>
    <div class="container">
      <!-- 信息编辑区 -->
      <el-card class="edit-info-card">
        <div slot="header" class="clearfix">
          <span>Edit Info</span>
        </div>
        <el-form
          ref="editformRef"
          :rules="rules"
          :model="editform"
          label-width="80px"
        >
          <el-form-item label="用户名称" prop="user_name">
            <el-input
              v-model="editform.user_name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="user_email">
            <el-input v-model="editform.user_email"></el-input>
          </el-form-item>
          <el-form-item label="旧密码" prop="user_password">
            <el-input
              type="password"
              v-model="editform.user_password"
              placeholder="请输入原密码"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="checkpassword">
            <el-input
              type="password"
              v-model="editform.checkpassword"
              placeholder="请输入新密码"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="个人简介" prop="user_info">
            <el-input type="textarea" v-model="editform.user_info"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('editformRef')"
              >更新信息</el-button
            >
            <el-button id="btu2" @click="resetForm('editformRef')"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
      <!-- 用户信息区 -->
      <el-card class="user-info-card">
        <img
          src="../../../assets/user/default.png"
          alt="用户头像"
          width="100px"
          height="100px"
        />
        <div>
          <!-- 账号 -->
          <h4>账号：{{ this.$store.state.userinfo.user_id }}</h4>
          <!-- 用户名 -->
          <p>用户名：{{ this.$store.state.userinfo.user_name }}</p>
          <!-- 邮箱 -->
          <p>{{ this.$store.state.userinfo.user_name }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 验证输入密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6 || value.length > 15) {
        callback(new Error("长度在6到15个字符"));
      } else {
        if (this.editform.checkpassword !== "") {
          this.$refs.editformRef.validateField("checkpassword");
        }
        callback();
      }
    };
    // 验证再次输入的密码
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.editform.user_password) {
        callback(new Error("两次输入密码不一致!"));
      } else if (value.length < 6 || value.length > 15) {
        callback(new Error("长度在6到15个字符"));
      } else {
        callback();
      }
    };
    return {
      editform: {
        user_name: "",
        user_email: "",
        user_password: "",
        checkpassword: "",
        user_info: "",
      },
      rules: {
        user_name: [
          { require: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur" },
        ],
        user_password: [{ validator: validatePass, trigger: "blur" }],
        checkpassword: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  created() {
    if (this.$store.state.userinfo) {
      let userinfo = this.$store.state.userinfo;
      this.editform.user_name = userinfo.user_name;
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(async (isValid) => {
        if (!isValid) return false;
        else {
          console.log("submit sucess");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
//  内容区容器
.container {
  display: flex;
}

.clearfix:before,
.clearfix:after {
  display: table;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  border-left: 5px solid rgb(58, 152, 234);
  padding: 1px 25px;
}

// 用户信息编辑卡片
.edit-info-card {
  flex: 2;
  margin-right: 30px;
}

// 用户信息卡片
.user-info-card {
  flex: 1;
  text-align: center;
  height: 400px;
  display: flex;
  justify-content: center;
  // align-items: center;
}

// 适配手机端
@media (max-width: 600px) {
  .container {
    flex-direction: column-reverse;
  }
  .edit-info-card {
    flex: 1;
    margin-right: 30px;
  }
  .user-info-card {
    flex: 1;
    margin-bottom: 30px;
    margin-right: 30px;
  }
  #btu2 {
    margin-top: 20px;
  }
}
</style>
