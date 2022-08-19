<template>
  <div>
    <el-footer class="footer">
      <el-row type="flex" justify="center" align="middle">
        <el-col :span="25"
          ><span
            >本网站图书资源来源于<a href="https://book.douban.com">豆瓣</a
            >，如有侵权行为，请联系邮箱2997600742@qq.com</span
          ></el-col
        >
      </el-row>
    </el-footer>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>

.footer {
  font-size: 18px; 
}

// 移动端适配
@media (max-width: 600px) {
  .footer {
    font-size: 15px;
    line-height: 25px;
  }
}
</style>
