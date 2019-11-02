  <template>
  <div class="details">
    <div class="Input-panel">
      <form class="form-horizontal">
        <div class="row">
          <div class="form-group md-4">
            <label class="md-4">发布时间</label>
            <div class="md-8">
              <input
                class="startat"
                type="date"
                @input="startat"
                v-model="startaT"
              />
            </div>
          </div>
          <div class="form-group md-4">
            <label class="md-4">&emsp;—</label>
            <div class="md-8">
              <input class="endat" type="date" @input="endat" v-model="endaT" />
            </div>
          </div>
          <div class="form-group md-4">
            <label class="md-4">类&emsp;&emsp;型</label>
            <select class=" md-8" v-model="typeIn">
              <option v-for="item in genres">{{ item.name }}</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="form-group md-4">
            <label class="md-4">状&emsp;&emsp;态</label>
            <select class=" md-8" v-model="statusIn">
              <option v-for="item in status">{{ item.name }}</option>
            </select>
          </div>
          <div class="form-group md-4">
            <label class="md-4">名&emsp;&emsp;称</label>
            <div class="md-8">
              <input v-model="Description" />
            </div>
          </div>
        </div>
        <div class="row form-flex">
          <div class="md-4 press-button">
            <button type="button" @click="empty">清空</button>
            <button type="button" @click="searck">搜索</button>
          </div>
        </div>
      </form>
    </div>
    <div class="Info-palette">
      <div class="panel-heading">
        <strong>Article管理</strong>
        <button type="button" @click="personal">+新增</button>
      </div>
      <div class="panel-body">
        <table class="panel-table" cellpadding="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>图片</th>
              <th>名称</th>
              <th>类型</th>
              <th>发布时间</th>
              <th>修改时间</th>
              <th>发布者</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in articleList" :key="index">
              <th>{{ index | indexFilter }}</th>
              <th><img class="img" :src="item.img" /></th>
              <th>{{ item.title }}</th>
              <th>{{ item.type | typeFilter }}</th>
              <th>
                <div>{{ item.createAt | timeFilter("yyyy-mm-dd") }}</div>
                <div>{{ item.createAt | timeFilter("hh:mm:ss") }}</div>
              </th>
              <th>
                <div>{{ item.updateAt | timeFilter("yyyy-mm-dd") }}</div>
                <div>{{ item.updateAt | timeFilter("hh:mm:ss") }}</div>
              </th>
              <th>{{ item.author }}</th>
              <th>{{ item.status | statusFilter }}</th>
              <th>
                <a type="button" @click="Uallm(item.id, item.status)">{{
                  item.status | updateStatus
                }}</a>
                <a type="button" @click="bianji(item.id)">编辑</a>
                <a type="button" @click="cancel(item.id)">删除</a>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <ul class="page-mode">
        <li>
          每页显示
          <input
            type="text"
            class="pristine"
            v-model="linage"
            size="2"
            maxlength="2"
            @input="pginput()"
          />
          条
        </li>
        <li><a @click="homePage" :class="{pitc:isActive==1}">首页</a></li>
        <li><a @click="goPage(page - 1)" v-if="isHavePrePage()"><</a></li>
        <li><a v-if="page > 3" class="pitc">...</a></li>
        <li v-for="n in pages" :key="n.id">
          <a
            @click="pageA(n)"
            :class="{ pitchon: isActive == n, }"
            v-if="pagination(n)"
            >{{ n }}</a
          >
        </li>
        <li><a v-if="page <= pages - 3" class="pitc">...</a></li>
        <li>
          <a @click="goPage(page + 1)" v-if="isHaveNextPage()">></a>
        </li>
        <li><a @click="lastPage" :class="{pitc:isActive==pages}">末页</a></li>
        <li>
          去第
          <input
            type="text"
            class="pristine"
            v-model="Pagesw"
            size="2"
            maxlength="2"
            @input="pginputTrue()"
          />
          页<a @click="confirm">确定</a>
        </li>
      </ul>
    </div>
  </div>
  
</template>

<script>
// import jlPopup from '@/components/popup.vue'
import axios from "axios";
import $ from "jquery";
import qs from "qs";

export default {
  name: "Details",
  data() {
    return {
      startaT: "", //输入的发布时间
      endaT: "", //输入的修改时间
      startatA: "", //转换后发布时间
      endatB: "", //转换后修改时间
      statusIn: "全部", //状态
      typeIn: "全部", //类型
      Pagesw: "", //要跳转页码输入框
      pages: "", //总页数
      linage: "", //列表数据显示行数输入框
      page: 1, //初始页数
      searchStatus: "", //获取保存数据
      // redact: "", //行数输入框上传
      gemer: "", //暂无
      total: "", //数据总条数
      params: "", //请求传参
      isActive: 1, //选中
      articleList: "", //数据循环
      Description: "", //名称输入框
      genres: [
        { name: "全部" },
        { name: "首页Banner" },
        { name: "找职位Banner" },
        { name: "找精英Banner" },
        { name: "行业大图" }
      ],
      status: [{ name: "全部" }, { name: "草稿" }, { name: "上线" }]
    };
  },
  created() {
    this.searchStatus = JSON.parse(sessionStorage.getItem("setData"));
    // console.log("初始保存", this.searchStatus.params);
    if (this.searchStatus != null) {
      var sea = this.searchStatus.params;
      this.isActive = sea.page;
      this.page=sea.page;
      this.linage = sea.size;
      // console.log("发布", sea.startAt);
      // console.log("修改", sea.endAt);
      console.log(sea)
      var aa = sea.type;
      var bb = sea.status;
      if (aa === ""||aa === undefined ) {
        let aa = 0;
      } else {
       aa++;
      }
      if (bb === "" || bb === undefined) {
        var bb = 0;
      }     
      if(sea.startAt!=null){
this.startaT = this.gotime(sea.startAt);
      }else{
        this.startaT='';
      }
      if(sea.endAt!=null){
this.endaT = this.gotime(sea.endAt);
      }else{
        this.endaT='';
      }
      
      this.Description = sea.title;
      this.typeIn = this.genres[aa].name;
      this.statusIn = this.status[bb].name;
      // console.log(this.startaT)
      // console.log(this.endaT)
    }
    this.mounted();

    this.gemer=this.$route.params.al
    if (this.gemer != "" && this.gemer != undefined) {
      //封装的弹窗组件
   this.$alert.show({
              modelTitle:"提示",
              modelContent:`<p class="modal">${this.gemer}成功</p>`,
              Flag:3
            })
            this.gemer=null;
    }
    // console.log(this.page)
  },
  filters: {
    indexFilter: function(index) {
      // ID序号
      return index + 1;
    },
    typeFilter: function(type) {
      // 类型
      if (type == 0) {
        return "首页banner ";
      } else if (type == 1) {
        return "找职位banner ";
      } else if (type == 2) {
        return "找精英banner";
      } else if (type == 3) {
        return "行业大图";
      }
    },
    statusFilter: function(status) {
      // 状态
      if (status == 1) {
        return "草稿";
      } else if (status == 2) {
        return "上线";
      }
    },
    updateStatus: function(status) {
      // 更新状态
      if (status == 1) {
        return "上线";
      } else if (status == 2) {
        return "下线";
      }
    },
    timeFilter: function(dateStr, time) {
      // 时间戳转换
      let date = new Date(dateStr); //把参数转换成日期和时间//时间戳为10位需*1000，时间戳为13位的话不需要*1000
      let y = date.getFullYear(); //获取年份
      // let MM = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      // let d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      // let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      // let mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getHours();
      // let ss =date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      let MM = date.getMonth() + 1; //获取月份
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate(); //获取日
      d = d < 10 ? "0" + d : d;
      let hh = date.getHours(); //获取小时数
      hh = hh < 10 ? "0" + hh : hh;
      let mm = date.getMinutes(); //获取分钟数
      mm = mm < 10 ? "0" + mm : mm;
      let ss = date.getSeconds(); //获取秒数
      ss = ss < 10 ? "0" + ss : ss;

      if (time && time === "yyyy-mm-dd") {
        return `${y}-${MM}-${d}`;
      } else if (time && time === "hh:mm:ss") {
        return `${hh}:${mm}:${ss}`;
      } else {
        return `${y}-${MM}-${d} ${hh}:${mm}:${ss}`;
      }
    }
  },
  methods: {
    gotime(st) {
      // 时间戳转换
      let date = new Date(st); //把参数转换成日期和时间//时间戳为10位需*1000，时间戳为13位的话不需要*1000
      let y = date.getFullYear(); //获取年份
      let MM = date.getMonth() + 1; //获取月份
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate(); //获取日
      d = d < 10 ? "0" + d : d;
      return `${y}-${MM}-${d}`;
    },
    mounted() {
     
      var that = this;
      if (this.searchStatus != "") {
        this.params = this.searchStatus;
      } else {
        this.params = {
          params: {
            page: this.page
          }
        };
      }
       
      console.log("初始传参", this.params);
      axios.get("/api/a/article/search", this.params).then(function(resp) {
        console.log("初始请求:", resp);
        that.articleList = resp.data.data.articleList;
        let size = resp.data.data.size;
        let total = resp.data.data.total;
        that.pages = Math.ceil(total / size); //算出总页数
        that.total = resp.data.data.total;
        // console.log("页数", that.pages);
      });
      this.isActive = this.page;
      // console.log(this.isActive)
    },
    startat() {
      // 发布时间
      if (this.endaT != "") {
        if (this.startaT > this.endaT) {
          this.endaT = this.startaT;
        }
      }
    },
    endat() {
      // 修改时间
      if (this.startaT != "") {
        if (this.endaT < this.startaT) {
          this.startaT = this.endaT;
        }
      }
    },
    empty() {
      //清空
      // this.startaT='';
      // this.endaT='';
      // this.statusIn='';
      // this.typeIn='';
      sessionStorage.removeItem("setData");
      location.reload();
      this.mounted();
    },
    searck() {
      //搜索
      // 数据类型转换
      // console.log(typeof this.startaT)
      // console.log(typeof this.endaT)
      // console.log(Number (this.startaT))
      // console.log(Number (this.endaT))
      // console.log(this.startaT)
      // console.log(this.endaT)
      if (this.startaT != ''&&this.startaT !=NaN) {
        var startatA = new Date(this.startaT).getTime(); //发布时间
        
      } else {
        var startatA = "";
      }
      if (this.endaT != ''&&this.endaT!=NaN) {
        var endatB = new Date(this.endaT).getTime() + (24*60*60*1000); //修改时间
        
      } else {
        var endatB = "";
      }
      if (this.typeIn != "全部") {
        let aa = ["首页Banner", "找职位Banner", "找精英Banner", "行业大图"];
        var typeIn = aa.indexOf(this.typeIn); //类型
      } else {
        var typeIn = "";
      }
      if (this.statusIn != "全部") {
        let bb = ["", "草稿", "上线"];
        var statusIn = bb.indexOf(this.statusIn); //状态
      } else {
        var statusIn = "";
      }
      this.isActive=this.page;
      this.params = {
        params: {
          page: this.page,
          startAt: startatA, //发布时间
          endAt: endatB, //修改时间
          type: typeIn, //类型
          status: statusIn, //状态
          title: this.Description, //名称
          size: this.linage
        }
      };
      console.log("搜索", this.params);
      var that = this;
      axios.get("/api/a/article/search", this.params).then(function(resp) {
        console.log("搜索请求:", resp);
        that.articleList = resp.data.data.articleList;
        let size = resp.data.data.size;
        let total = resp.data.data.total;
        that.pages = Math.ceil(total / size); //算出总页数
        that.total = resp.data.data.total;
        // console.log("页数", that.pages);
      });
      sessionStorage.setItem("setData", JSON.stringify(this.params));
    },
    personal() {
      //新增
      this.$router.push({
        path: "/Redact",
        query: {
          title: "新增"
        }
      });
    },
    isHavePrePage() {
      // 左
      if (this.page == "" || this.page == 1) {
        return false;
      } else {
        return true;
      }
    },
    isHaveNextPage() {
      // 右
      if (this.page == this.pages) {
        return false;
      } else {
        return true;
      }
    },
    pagination(c) {
      //最多显示5页，多余的按钮隐藏
      if (this.page == "") {
        if (c >= 1 && c <= 3) {
          return true;
        }
      } else if (c >= this.page && c < this.page + 3) {
        return true;
      } else if (c < this.page && c > this.page - 3) {
        return true;
      } else {
        return false;
      }
    },
    Uallr(id, status) {
      // 上下线请求
      var status = (status == 1) ? 2 : 1;
      var that = this;
      var obj = { id: id, status: status };
      var strngOdj = qs.stringify(obj);
      axios
        .put("/api/a/u/article/status", strngOdj)
        .then(function(res) {
          console.log("上下线", res);
          if (obj.status == 2) {
            // alert("上线操作成功");
            that.$alert.show({
              modelTitle:"提示",
              modelContent:`<p class="modal">上线成功</p>`,
              Flag:3
            })
          } else if (obj.status == 1) {
            // alert("下线操作成功");
             that.$alert.show({
              modelTitle:"提示",
             modelContent:`<p class="modal">下线成功</p>`,
              Flag:3
            })
          }
          that.mounted();
        })
        .catch(function(rtt) {
          console.log("上下修线", rtt);
          if (obj.status == 2) {
            // alert("上线操作失败，服务器爆炸");
             that.$alert.show({
              modelTitle:"提示",
              modelContent:`<p class="modal">下线操作失败，服务器爆炸</p>`,
              Flag:3
            })
          } else if (obj.status == 1) {
            // alert("下线操作失败，服务器爆炸");
            that.$alert.show({
              modelTitle:"提示",
              modelContent:`<p class="modal">上线操作失败，服务器爆炸</p>`,
              Flag:3
            })
          }
        });
    },
    Uallm(id, status) {//上下线状态判断
      if (status == 1) {
this.$alert.show({
          modelTitle:"操作提示",//标题
          modelContent:`<p class="title">上线后该图片将不展示轮播banner中。</p><p class="body">是否执行上线操作？</p>`,//内容
          callBack:()=>{  
            this.Uallr(id, status);         
          }  
        });
      } else if (status == 2) {
        this.$alert.show({
          modelTitle:"操作提示",//标题
          modelContent:`<p class="title">下线后该图片将不展示轮播banner中。</p><p class="body">是否执行下线操作？</p>`,//内容
          callBack:()=>{  
            this.Uallr(id, status);         
          }  
        });
      }
    },
    bianji(id) {
      // 编辑
      var thst = this;
      // sessionStorage.clear();
      this.$router.push({
        path: "/Redact",
        query: {
          id: id,
          title: "编辑"
        }
      });
    },
    cancel(id) {
      // 删除

      // console.log("id", id);
      var that = this;
         this.$alert.show({
          modelTitle:"提示",//标题
          modelContent:`<p class="modal">是否确认删除</p>`,//内容
          callBack:()=>{  
            axios
          .delete("/api/a/u/article/" + id)
          .then(function(res) {
            that.$alert.show({
              modelTitle:"提示",
              modelContent:`<p class="modal">删除成功</p>`,
              Flag:3
            })
            that.mounted();
          })
          .catch(function(res) {
            that.$alert.show({
              modelTitle:"提示",
              modelContent:`<p class="modal">删除未成功</p>`,
              Flag:3
            })
          });        
          }  
        });
        
      // }
    },
    homePage() {
      // 首页
      this.page = 1;
      this.searchs();
    },
    goPage(a) {
      // 向前或向后
      this.page = a;
      // console.log("增减", a);
      this.searchs();
    },
    pageA(serial) {
      // 页码
      this.page = serial;
      // console.log("点击下标2", this.page);
      this.searchs();
    },
    lastPage() {
      // 末页
      this.page = this.pages;
      // console.log("末", this.pagf);
      this.searchs();
    },
    confirm() {
      // 确认
      console.log(this.Pagesw)
      if(this.Pagesw!=undefined&&this.Pagesw!=''){
        this.page = Number(this.Pagesw);
        console.log(this.page)
        this.searchs();
      }else{
        this.searchs();
      }
    },
    pginput() {
      // 展示数量输入框
      var bb = this.linage.replace(/[^\d]/g, "");
      this.linage = bb <= this.total ? bb : "";
    },
    pginputTrue() {
      // 页码输入限制
      var aa = this.Pagesw.replace(/[^\d]/g, "");
      // console.log("aa", this.Pagesw);
      this.Pagesw = aa <= this.pages ? aa : "";
      console.log(this.Pagesw)
      console.log(this.pages)
    },
    searchs() {
      // 联动请求
      this.isActive = this.page;
      // 判断显示条数输入框不为空且小于等于总个数
      // console.log("保存",this.params)
      this.searchStatus = JSON.parse(sessionStorage.getItem("setData"));
console.log(this.searchStatus)
      if (this.searchStatus != ""&&this.searchStatus!=null) {
        this.searchStatus.params.page = this.page;
        this.searchStatus.params.size = this.linage;       
      } else {
        this.searchStatus = {
          params: {
            page: this.page,
            size: this.linage
          }
        };
      }

      this.params = this.searchStatus;
      // console.log("cc", this.params);
      var that = this;
      axios
        .get(
          "/api/a/article/search",this.params)
        .then(function(ttp) {
          // console.log("传参请求", ttp);
          that.articleList = ttp.data.data.articleList;
          let size = ttp.data.data.size;
          let total = ttp.data.data.total;
          that.pages = Math.ceil(total / size); //算出总页数
        });
      sessionStorage.setItem("setData", JSON.stringify(this.params));
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
a {
  cursor: pointer;
}
div,
th,
td,
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
button {
  border: 0;
  outline: none; 
}
form {
  input {
    display: block;
    outline: none;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    &:focus {
      border: 1px solid #feae45;
      border-radius: 5px;
      box-shadow: 0 0 4px #feae45;
    }
  }
}
label {
  // padding: 10px;
  padding-top: 6px;
  text-align: center;
}
select {
  border: 1px solid #ddd;
  height: 34px;
  outline: none;
  border-radius: 5px;
  &:focus {
    border: 1px solid #feae45;
    border-radius: 5px;
    box-shadow: 0 0 4px #feae45;
  }
}
table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  border-spacing: 0;
  th {
    padding: 0;
    padding: 8px;

    .img {
      width: 40px;
      height: 40px;
      vertical-align: middle;
    }
    a {
      color: #337ab7;
      text-decoration: none;
      padding: 5px 10px;
      &:hover {
        color: #23527c;
      }
    }
  }
}
tbody {
  tr {
    border-top: 1px solid #ddd;
    &:nth-child(odd) {
      background-color: #f5f5f5;
    }
  }
}
.details {
  font-size: 14px;
  line-height: 1.4;
  .Input-panel {
    // 头部表单
    background-color: #fff;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    .form-horizontal {
      padding: 15px;
      .press-button {
        display: flex;
        flex-direction: row-reverse;
        > :nth-child(1) {
          color: #fff;
          background-color: #d9534f;
          /* border-color: #d9534f; */
          // border: 0;
          border-radius: 5px;
          line-height: 34px;
          width: 54px;
          order: 1;
          margin: 0 5px;
        }
        > :nth-child(2) {
          color: #fff;
          background-color: #5cb85c;
          /* border-color: #d9534f; */
          // border: 0;
          border-radius: 5px;
          line-height: 34px;
          width: 54px;
        }
      }
    }
  }
}
.Info-palette {
  // 渲染数据
  border: 1px solid #ddd;

  .panel-heading {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    background-color: #f5f5f5;
    border-bottom: 1px solid#ddd;
    //  font-size:14px;
    button {
      color: #fff;
      background-color: #5cb85c;
      line-height: 20px;
      border-radius: 3px;
    }
  }
  .panel-body {
    background-color: #fff;
    padding: 15px;
    font-family: cursive;
    .panel-table {
      border: 1px solid #ddd;
      thead {
        border-bottom: 1px solid #ddd;
        > tr > th {
          padding: 8px;
        }
      }
    }
  }
}
.page-mode {
  // 分页
  display: block;
  float: right;
  margin: 20px 0;
  padding-left: 0;
  > :nth-child(1) {
    padding-right: 20px;
  }
  li {
    display: initial;
    .pristine {
      width: 50px;
      text-align: center;
      line-height: 28px;
      font-size: inherit;
    }
    a {
      &:hover {
        background-color: #eee;
      }
      margin: 0 5px;
      padding: 6px 12px;
      color: #337ab7;
      background-color: #fff;
      border: 1px solid #ddd;
    }
    .pitc:hover{
    
        background-color:#FFF;
        cursor: not-allowed !important;
      
    }
    .pitchon {
      &:hover{
        background-color:#337ab7;
        cursor: not-allowed !important;
      }
      color: #fff;
      background-color: #337ab7;
    }
  }
}
.form-group {
  padding: 0 15px;
  margin-bottom: 15px;
}
.row {
  display: flex;
}
.form-flex {
  display: flex;
  flex-direction: row-reverse;
  padding: 0 15px;
}
.md-4 {
  display: inherit;
  width: 33.33333333%;
}
.md-8 {
  display: inherit;
  width: 66.66666667%;
}
/* 控制编辑区域的 */
input[type="date"]::-webkit-datetime-edit {
  /* content: '起始时间'; */
  color: rgb(188, 188, 188);
  padding-left: 10px;
}
/* 控制年月日这个区域的 */
input[type="date"]::-webkit-datetime-edit-fields-wrapper {
  background-color: #eee;
}
/* 这是控制年月日之间的斜线或短横线的 */
input[type="date"]::-webkit-datetime-edit-text {
  color: blue;
  padding: 0 0.1em;
}
/* 控制年字 */
input[type="date"]::-webkit-datetime-edit-year-field {
  color: pink;
}
/* 控制月字 */
input[type="date"]::-webkit-datetime-edit-month-field {
  color: red;
}
/* 控制日字 */
input[type="date"]::-webkit-datetime-edit-day-field {
  color: purple;
}
/*控制下拉小箭头的*/
input[type="date"]::-webkit-calendar-picker-indicator {
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 1px solid #ccc;
  border-radius: 2px;
  box-shadow: inset 0 1px #fff, 0 1px #eee;
  background-color: #eee;
  background-image: -webkit-linear-gradient(top, #f0f0f0, #e6e6e6);
  color: #666;
}
/* 去掉date中上下小三角，但是保留input类型为number的小三角。 */
input[type="date"]::-webkit-inner-spin-button {
  visibility: hidden;
}
/*----------用来移除叉叉按钮 鼠标移上去还会显示----------*/
/* input[type="date"]::-webkit-clear-button{
         display:none;
        } */
</style>