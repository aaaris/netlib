<template>
  <div>
    <h1>我的分享</h1>
    <div class="container">
      <!-- 信息编辑区 -->
      <el-card class="edit-info-card">
        <div slot="header" class="clearfix">
          <span>Share Book</span>
        </div>
        <el-form
          ref="editformRef"
          :rules="rules"
          :model="editform"
          label-width="80px"
        >
          <el-form-item label="书本名称" prop="user_name">
            <el-input v-model="editform.book_name"></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="book_author">
            <el-input v-model="editform.book_author"></el-input>
          </el-form-item>
          <el-form-item label="出版社" prop="book_addr">
            <el-input v-model="editform.book_addr"></el-input>
          </el-form-item>
          <el-form-item label="出版日期" prop="book_date">
            <el-date-picker
              v-model="editform.book_date"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="书本简介" prop="book_info">
            <el-input type="textarea" v-model="editform.book_info"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('editformRef')"
              >分享</el-button
            >
            <el-button id="btu2" @click="resetForm('editformRef')"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
      <!-- 用户信息区 -->
      <el-card class="user-info-card">
        <h1>图书照片</h1>
        <el-upload
          class="upload-demo"
          drag
          :action="this.$http.defaults.baseURL + `/api/v1/img/book`"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editform: {
        book_name: "",
        book_author: "",
        book_date: "",
        book_addr: "",
        book_info: "",
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  methods: {
    onSubmit(formName) {},
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
