<template>
  <div>
    <Header></Header>
    <div class="main-container">
      <!-- 书本基本介绍 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="header_name">{{ book.book_name }}</span>
          <div style="float: right; padding: 3px 0" type="text">
            <i class="el-icon-time">{{ book.book_date }}</i>
            <!-- <i class="el-icon-user">book.book_upload_user</i> -->
          </div>
        </div>
        <div style="display: flex; align-items: center">
          <img
            width="150px"
            :src="
              `http://localhost:8081/static/img/books/` +
              this.book.book_img_url.split('/').at(-1)
            "
            alt="书本图片"
          />
          <div style="margin-left: 50px">
            <span>书籍名称：《{{ book.book_name }}》</span> <br />
            <span>所属分类：{{ book.class_name }}</span
            ><br />
            <span>书籍作者：{{ book.book_author }}</span
            ><br />
            <span>书籍出版社：{{ book.book_addr }}</span
            ><br />
            <el-rate
              v-model="book_rate"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>
          </div>
        </div>
        <!-- 用户操作按钮 -->
        <div style="margin-top: 30px">
          <el-button
            style="width: 150px"
            icon="el-icon-download"
            @click="downloadBook"
            >下载</el-button
          >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="warning" icon="el-icon-star-off" @click="collectBook"
            >收藏</el-button
          >
        </div>
      </el-card>
      <!-- 内容简介 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="header_name">内容简介</span>
        </div>
        <div class="text item">
          <p>
            {{ book.book_info }}
          </p>
        </div>
      </el-card>
      <!-- 相关推荐(同类型+同作者) -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="header_name">相关推荐</span>
        </div>
        <div style="text-align: center">
          <div class="book_item" v-for="rb in recommendBooks">
            <a :href="`/book/` + rb.book_id">
              <img
                :src="
                  `http://localhost:8081/static/img/books/` +
                  rb.book_img_url.split('/').at(-1)
                "
                alt="书本图片"
              />
            </a>
          </div>
        </div>
      </el-card>
      <!-- 评论列表 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="header_name">评论列表</span>
        </div>
        <div class="text item">
          <p>
            {{ book.info }}
          </p>
        </div>
      </el-card>
      <!-- 发表评论 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="header_name">发表评论</span>
        </div>
        <div class="text item">
          <p>
            {{ book.info }}
          </p>
        </div>
      </el-card>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "../Header.vue";
import Footer from "../Footer.vue";
export default {
  components: { Header, Footer },
  async created() {
    const { data: res } = await this.$http.get(
      "/book/" + this.$route.params.book_id
    );
    this.book = res.data;
    console.log(this.book);
    // 从后端api初始化books data
    const { data: res2 } = await this.$http.get("/book" + `?limit=10`);
    this.recommendBooks = res2.data;
    console.log(this.recommendBooks);
  },
  data() {
    return {
      book: {
        book_addr: "",
        book_author: "",
        book_date: "",
        book_dl_count: "",
        book_id: "",
        book_img_url: "",
        book_info: "",
        book_name: "",
        book_score: "",
        class_name: "",
      },
      recommendBooks: [],
    };
  },
  computed: {
    // 计算评分 数据库数据范围是10，而组件范围是5
    book_rate: {
      get() {
        return this.book.book_score * 0.5;
      },
    },
  },
  methods: {
    // 下载图书
    downloadBook() {
      // 检查用户是否登陆
      if (!this.$store.isLogin) {
        this.$router.push("/login");
        return this.message.error("请先登陆");
      }
    },
    // 收藏图书
    collectBook() {
      if (!this.$store.isLogin) {
        this.$router.push("/login");
        return this.message.error("请先登陆");
      }
    },
  },
};
</script>
<style lang="less" scoped>
// 内容容器
.main-container {
  line-height: 30px;
  width: 75%;
  margin: 50px auto;
  // background-color: white;
  // box-shadow: 0 4px 14px 0 rgb(0 0 0 / 5%);
}

// 书本样式
.book_item {
  display: inline-block;
  width: 162px;
  height: 240px;
  padding: 8px;
  // box-sizing: border-box;
  border: 5px double wheat;
  img {
    height: 100%;
    width: 100%;
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.clearfix {
  color: #777;
  span {
    font-size: 20px;
  }
}

.box-card {
  // width: 480px;
  margin-top: 30px;
}

// 移动端适配
@media (max-width: 600px) {
  .main-container {
    margin: 30px auto;
    width: 90%;
    padding: 10px;
  }
}
</style>
