<template>
  <div>
    <h1>我的分享</h1>
    <el-button icon="el-icon-upload2" @click="uploadDialogVisiable = true">
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
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 上传窗口
      uploadDialogVisiable: false,
    };
  },
};
</script>

<style lang="less" scoped></style>
