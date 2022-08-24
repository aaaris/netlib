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
        <div class="book_info">
          <img
            width="150px"
            :src="
              `http://localhost:8081/static/img/books/` +
              this.book.book_img_url.split('/').at(-1)
            "
            alt="书本图片"
          />
          <div class="book_info_text">
            书籍名称：<span style="color: #333">《{{ book.book_name }}》</span>
            <br />
            所属分类： <span style="color: #333">{{ book.class_name }}</span
            ><br />
            书籍作者：<span style="color: #333">{{ book.book_author }}</span
            ><br />
            书籍出版社： <span style="color: #333">{{ book.book_addr }}</span
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
        <div class="comment-item" v-if="this.comments.length === 0">
          😊 暂无评论，快来抢沙发吧~
        </div>
        <div class="comment-item" v-for="comment in this.comments">
          <div style="padding-bottom: 10px; display: flex; align-items: center">
            <img
              style="border-radius: 50%; margin-right: 10px"
              :src="`http://localhost:8081` + comment.user_img_url"
              height="22px"
              alt=""
            />
            <span style="color: #4e86bd">{{ comment.user_name }}</span>
            <span style="color: #777; margin-left: 20px; margin-right: 20px">
              {{ comment.create_time }}
            </span>
            <el-popconfirm
              title="这是一段内容确定删除吗？"
              @confirm="delComment(comment.comment_id)"
            >
              <el-button
                slot="reference"
                type="text"
                style="color: #777"
                v-if="comment.user_id === $store.getters.getUserId"
                icon="el-icon-delete"
              ></el-button>
            </el-popconfirm>
          </div>
          <div>{{ comment.comment_text }}</div>
        </div>
      </el-card>
      <!-- 发表评论 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="header_name">发表评论</span>
        </div>
        <div class="text item">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 5 }"
            placeholder="请输入内容"
            v-model="input_comment"
            maxlength="50"
            show-word-limit
          >
          </el-input>
          <el-button
            style="width: 150px; margin-top: 20px"
            icon="el-icon-s-comment"
            type="primary"
            @click="sendComment"
            >发布</el-button
          >
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
    // console.log(this.book);
    // 从后端api初始化books data
    const { data: res2 } = await this.$http.get("/book" + `?limit=10`);
    this.recommendBooks = res2.data;
    // console.log(this.recommendBooks);
    // 从后端api初始化comment data
    this.getComments();
  },
  data() {
    return {
      // post页图书
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
      // 推荐图书集
      recommendBooks: [],
      // 评论集合
      comments: [],
      // 输入评论
      input_comment: "",
    };
  },
  computed: {
    // 计算评分 数据库数据范围是10，而组件范围是5
    book_rate: {
      get() {
        return this.book.book_score * 0.5;
      },
      set(newValue) {},
    },
  },
  methods: {
    // 下载图书
    downloadBook() {
      // 检查用户是否登陆
      if (!this.$store.state.isLogin) {
        this.$router.push("/login");
        return this.$message.error("请先登陆");
      }
      alert("只有图片捏！");
    },
    // 收藏图书
    async collectBook() {
      if (!this.$store.state.isLogin) {
        this.$router.push("/login");
        return this.$message.error("请先登陆");
      }
      const { data: res } = await this.$http({
        method: "post",
        url: "/collection?access_token=" + this.$store.getters.getToken,
        data: {
          user_id: this.$store.getters.getUserId,
          book_id: this.book.book_id,
        },
      });
      if (res.code == 200) {
        this.$message.success("收藏成功！");
      } else {
        alert(res.data);
      }
    },
    // 获取评论
    async getComments() {
      const { data: res3 } = await this.$http.get(
        "/comment/" + this.book.book_id
      );
      this.comments = res3.data;
      console.log(this.comments);
    },
    // 发布评论
    async sendComment() {
      // 验证登录
      if (!this.$store.state.isLogin) {
        this.$router.push("/login");
        return this.$message.error("请先登陆");
      }
      // 评论语句不为空
      if (this.input_comment === "") {
        alert("评论不能为空");
        return;
      }
      // 发送请求
      const { data: res } = await this.$http({
        method: "post",
        url: "/comment?access_token=" + this.$store.getters.getToken,
        data: {
          user_id: this.$store.getters.getUserId,
          book_id: this.book.book_id,
          comment_text: this.input_comment,
        },
      });
      // console.log(res);
      if (res.code === 200) {
        this.input_comment = "";
        this.$message.success("评论发表成功！");
        this.getComments();
      } else {
        this.$message.error(res.data);
      }
    },
    // 删除自己的评论
    async delComment(comment_id) {
      // 发送请求
      const { data: res } = await this.$http({
        method: "delete",
        url:
          "/comment/" +
          comment_id +
          "?access_token=" +
          this.$store.getters.getToken,
      });
      if (res.code === 200) {
        this.$message.success("删除成功！");
        this.getComments();
      } else {
        this.$message.error(res.data);
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
  color: #666;
  span {
    font-size: 20px;
  }
}

.box-card {
  // width: 480px;
  margin-top: 30px;
}

.book_info {
  display: flex;
  align-items: center;
}

.book_info_text {
  margin-left: 50px;
  color: #888;
}

.comment-item {
  margin-bottom: 30px;
}
.comment-item::after {
  margin-bottom: 0px;
}

// 移动端适配
@media (max-width: 600px) {
  .main-container {
    margin: 30px auto;
    width: 90%;
    padding: 10px;
  }
  .book_info {
    flex-direction: column;
  }
  .book_info_text {
    margin-top: 10px;
  }
}
</style>
