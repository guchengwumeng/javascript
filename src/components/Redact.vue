<template>
  <div class="Info-palette">
    <div class="panel-heading">{{ titlell }}Article</div>
    <div class="panel-body">
      <div class="form-group">
      
        <label class="md-2 lab"><b v-if="wa.title==''">&#8226;</b>&emsp;标题名称</label>
        <div class="md-8"><input v-model="wa.title" /></div>
      </div>
      <div class="form-group">
        <label class="md-2 lab"><b v-if="wa.type=='请选择'">&#8226;</b>&emsp;类&emsp;&emsp;型</label>
        <select class="md-2" v-model="wa.type">
          <option v-for="item in genres">{{ item.name }}</option>
        </select>
        <select class="md-2" v-if="wa.type === '行业大图'" v-model="job">
          <option v-for="item in status">{{ item.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label class="md-2 lab"><b v-if="explain===''">&#8226;</b>&emsp;说&emsp;&emsp;明</label>
        <!-- 富文本编辑器 -->
         <quill-editor
          class="md-8 editor"
          v-model="explain"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        >
        </quill-editor> 
        <!-- <editor v-model="plan"></editor> -->
      </div>
      <div class="form-group">
        <label class="md-2 lab"><b v-if="wa.url==''">&#8226;</b>&emsp;跳转链接</label>
        <div class="md-8"><input v-model="wa.url" /></div>
      </div>
      <!-- 图片预览操作、上传、删除 -->
      <div class="form-group">
        <label class="md-2 lab"><b v-if="wa.img==''">&#8226;</b>&emsp;配&emsp;&emsp;图</label>
        <div class="md-8">
          <div class="md-12">
            <label for="file2" class="btu-file">选择文件</label>
            <input
              type="file"
              id="file2"
              ref="uploadFile"
              style="display:none"
              accept="image/*"
              @change="upload"
            />
          </div>
          <div class="md-12">
            <img alt="配图预览" :src="wa.img" />
          </div>
          <div class="md-12">
            <table class="md-12">
              <thead>
                <tr>
                  <th>图片名</th>
                  <th>文件大小</th>
                  <th>进度</th>
                  <th>操作</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody v-bind:style="{ display: reveal }">
                <tr>
                  <td>
                    <strong>{{ fileName }}</strong>
                  </td>
                  <td>{{ size }}</td>
                  <!-- 进度条 -->
                  <td style="white-space:nowrap;">
                    <div class="progress">
                      <div
                        class="progress-bar"
                        :style="{ width: proBar + '%' }"
                      ></div>
                    </div>
                    <div>{{ proBar + "%" }}</div>
                  </td>
                  <td>
                    <span v-if="feedback == 1">&#10004;</span>
                    <span v-if="feedback == 2">&#10006;</span>
                    <span v-if="feedback == 3"></span>
                  </td>
                  <td style="white-space:nowrap;">
                    <button
                      :class="[errorClass, content ? connnt : '']"
                      @click="click"
                    >
                      上传
                    </button>
                    <button class="cancel" @click="expurgate">删除</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="md-2"></div>
        <div class="md-8">
          <button type="button" @click="Rollout(2)" :class="classObject">
            立即上线</button
          ><button type="button" @click="Rollout(1)" :class="classObject">
            存为草稿</button
          ><button type="button" class="btu-default" @click="cancel">
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import axios from "axios";
import $ from "jquery";
import qs from "qs";
import Quill from "quill";
import { quillEditor } from "vue-quill-editor";
// import editor from '@/components/editor.vue';

export default {
  name: "Redact",
  data() {
    return {
      titlell: "", //表格标题
      caption: "", //编辑传参
      // typeIn: "请选择", //类型
      job: "请选择", //行业
      explain: "", //说 明
      // jumpLink: "", //跳 转链接
      startaT: "", //创建时间
      // imgUrl: "", //预览图片链接url
      img: "", //文件file对象
      imgName: "", //file格式转换
      fileData: "", //上传图片参数
      params: "", //上传参数
      proBar: 0, //进度条
      size: "", //预览图片大小
      filet: "", //状态
      fileName: "", //图片名称
      curSor: "true", //禁用符号
      reveal: "", //tbody的显示隐藏
      feedback: "3", //符号显示
      content: false, //上传按钮样式切换
      wa: {
        title: "", //名称
        img: "", //图片
        url: "", //链接
        type: "请选择" //类型
      },
      connnt: "uplding",
      errorClass: "uploading",
      editorOption: {
        //富文本工具栏
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            // ["blockquote", "code-block"], //引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], //列表
            // [{ script: "sub" }, { script: "super" }], // 上下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            // [{ direction: "rtl" }], // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
            ["image", "video"] //上传图片、上传视频
          ]
        },
        theme: "snow"
      },
      feedat: false,
      classObject: {
        cursor: false,
        "btu-success": true
      },
      genres: [
        { name: "请选择" },
        { name: "首页Banner" },
        { name: "找职位Banner" },
        { name: "找精英Banner" },
        { name: "行业大图" }
      ],
      status: [
        { name: "请选择" },
        { name: "移动互联网" },
        { name: "电子商务" },
        { name: "企业服务" },
        { name: "020" },
        { name: "教育" },
        { name: "金融" },
        { name: "游戏" }
      ]
    };
  },
  mounted() {
    var thst = this;
    console.log("传参", this.$route.query.id);
    this.caption = this.$route.query.id;
    var id = this.$route.query.id;
    this.titlell = this.$route.query.title;
    if (id != " " && id != undefined) {
      axios.get(`/api/a/article/${id}`).then(function(res) {
        // console.log("编辑渲染", res.data.data.article);
        let edit = res.data.data.article;
        thst.wa.title = edit.title; //名称
        thst.wa.type = thst.genres[edit.type + 1].name; //类型
        thst.explain = edit.content; //说明
        thst.wa.url = edit.url; //链接
        thst.wa.img = edit.img; //图片
        thst.job = thst.status[edit.industry + 1].name;
      });
    }
  },
  watch: {
    wa: {
      handler(wa) {
        if (
          wa.title !== "" &&
          wa.img !== "" &&
          wa.url !== "" &&
          wa.type !== "请选择"
        ) {
          this.classObject = {
            cursor: true,
            "btu-success": false
          };
          if (wa.type == "行业大图" && this.job == "请选择") {
            this.classObject = {
              cursor: false,
              "btu-success": true
            };
          }
        }
      },
      deep: true
    }
  },
  methods: {
    onEditorBlur({editor}) {
      //失去焦点事件

    },
    onEditorFocus({editor}) {
      //获得焦点事件
    },
    onEditorChange({ editor, html, text }) {
      //编辑器文本发生变化
      //this.content可以实时获取到当前编辑器内的文本内容
      this.filetl();
    },
    click() {
      //  上传
      var thst = this;
      // console.log("aa", this.fileData);
      if (!this.content) {
        let config = {
          onUploadProgress(progressEvent) {
            thst.proBar =
              ((progressEvent.loaded / progressEvent.total) * 100) | 0;
            // console.log(thst.proBar);
          }
        };
        //  console.log("oo",this.fileData)
        axios
          .post("/api/a/u/img/task", this.fileData, config)
          .then(function(resp) {
            console.log("初始请求:", resp);
            thst.feedback = 1;
            thst.wa.img = resp.data.data.url; //图片链接
            thst.content = true;
            thst.filetl();
            // console.log(resp.data.data.url);
          })
          .catch(function(ttp) {
            // console.log(ttp);
            thst.content = false;
            thst.feedback = 2;
            thst.proBar = 0;
          });
      }
    },
    expurgate() {
      // 删除
      this.proBar = 0; //进度条
      this.reveal = ""; //tbody表格显示隐藏
      this.content = false; //上传按钮样式切换
      this.size = ""; //预览图片大小
      this.fileName = ""; //图片名称
      this.feedback = 3; //操作符号
    },
    filetl() {
      // 必填选项判断

      if (this.wa.type != "请选择") {
        var genres = ["首页Banner", "找职位Banner", "找精英Banner", "行业大图"];
        var type = genres.indexOf(this.wa.type);
        // console.log("名称", type);
      }
      if (this.job != "请选择") {
        var status = [
          "移动互联网",
          "电子商务",
          "企业服务",
          "020",
          "教育",
          "金融",
          "游戏"
        ];
        var stry = status.indexOf(this.job);
        // console.log("行业", stry);
      }
      if (this.imgUrl != "") {
        this.params = {
          title: this.wa.title, //名称
          type: type, //类型
          status: this.filet, //状态
          img: this.wa.img, //图片
          content: this.explain, //说明
          url: this.wa.url, //链接
          industry: stry, //行业
          createAt: this.startaT //创建时间
        };
      }
      // console.log("上传",this.params)
    },
    upload(event) {
      console.log("qq", event);
      this.reveal = "contents";
      // 获取到文件的js 对象
      let files = event.target.files || event.dataTransfer.files;
      let file = files[0];
      let that = this;
      this.wa.img='';
      this.content = false;
      this.imgName = new FileReader(); //用来把文件读入内存，并且读取文件中的数据
      this.imgName.readAsDataURL(file); //把读取的数据转化为对象所引用的地址
      this.imgName.onload = function() {
        //页面加载完成后立即执行
        let fileData = new FormData();
        fileData.append("file", file);
        that.fileData = fileData;
        console.log("that", that.fileData);
      };
      console.log("name", this.imgName);

      if (!files.length) {
        this.fileName = "";
        return;
      }
      this.fileName = files[0].name; //获取名称
      let bytes = files[0].size;
      this.unit(bytes);

      //   // 获取上传文件js对象，转换成预览图地址
      //   this.filet = files[0].type;
      // 不需要上传显示预览图片
      //   var url = URL.createObjectURL(file);
      //   this.imgUrl = url;

      //   console.log("名称", this.fileName);
      //   console.log("大小", this.size);
      //   console.log("类型", this.filet);
      // console.log("url", this.imgUrl);
    },
    unit(bytes) {
      // 文件大小单位转换
      var unitArr = new Array(
        "Bytes",
        "KB",
        "MB",
        "GB",
        "TB",
        "PB",
        "EB",
        "ZB",
        "YB"
      );
      var index = 0,
        srcsize = parseFloat(bytes);
      index = Math.floor(Math.log(srcsize) / Math.log(1024));
      var size = srcsize / Math.pow(1024, index);
      //  保留的小数位数
      size = size.toFixed(2);
      this.size = size + unitArr[index];
    },
    Rollout(sty) {
      //  立即上线/存为草稿
      if (this.classObject.cursor == true) {
        this.filet = sty;
        let date = new Date();
        this.startaT = date.valueOf();
        // console.log("时间", this.startaT);
        this.filetl();
        var params = this.params;
        console.log("上传", params);
        // console.log("状态", this.filet);
        // console.log(this.caption);
        if (this.caption == "" || this.caption == undefined) {
          var thst = this;
          // console.log("上传参数",params)
          axios
            .post("/api/a/u/article", qs.stringify(params))
            .then(function(res) {
              console.log(res);
              thst.$router.push({
                name: "List",
                params: {
                  al: thst.titlell
                }
              });
            });
        } else {
          this.roout();
        }
      }
    },
    roout() {
      var thst = this;
      console.log("编辑上传", this.caption);
      var id = this.caption;
      var params = qs.stringify(this.params);
      axios.put(`/api/a/u/article/${id}`, params).then(function(res) {
        thst.$router.push({
          name: "List",
          params: {
            al: thst.titlell
          }
        });
      });
    },
    cancel() {
      //取消新增图片，返回上一级
      this.$router.push({
        path: "/List"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
b{color:#c9302c;}
button {
  border: 0;
  outline: none;
}
div {
  padding: 0;
  margin: 0;
}
label {
  padding-top: 6px;
}
select {
  border: 1px solid #ddd;
  height: 34px;
  outline: none;
  border-radius: 5px;
  margin-right: 30px;
  &:focus {
    border: 1px solid #feae45;
    border-radius: 5px;
    box-shadow: 0 0 4px #feae45;
  }
}
.cursor {
  // 光标样式
  &:hover {
    background-color: #449d44;
  }
  color: #fff;
  cursor: pointer;
  background-color: #5cb85c;
  border: 1px solid #4cae4c;
  margin-right: 5px;
  font-size: 14px;
  padding: 6px 12px;
  opacity: 1;
  border-radius: 5px;
}
.btu-success {
  // pointer-events:none;
  opacity: 0.65;
  color: #fff;
  background-color: #5cb85c;
  border: 1px solid #4cae4c;
  margin-right: 5px;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: not-allowed !important;
}
.lab {
  text-align: right;
  padding-right: 30px;
}
.editor {
  // 富文本样式
  > :nth-child(2) {
    height: 60px;
    border-color: #ccc;
  }
}
// div.ql-container.ql-snow{
//     height: px2rem(100);
//   }
// div.ql-editor.ql-blank{
//     height: px2rem(50);
//   }
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
.progress {
  height: 20px;
  width: 50%;
  float: left;
  overflow: hidden;
  background-color: #f5f5f5;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  .progress-bar {
    float: left;
    width: 0;
    height: 100%;
    font-size: 12px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    background-color: #337ab7;
    -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
    -webkit-transition: width 0.6s ease;
    -o-transition: width 0.6s ease;
    transition: width 0.6s ease;
  }
}
.md-2 {
  float: left;
  width: 16.66666667%;
}
.md-8 {
  float: left;
  width: 66.66666667%;
}
.md-10 {
  //   display: inherit;
  width: 83.33333333%;
}
.md-12 {
  // display: inherit;
  width: 100%;
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
  .btu-file {
    padding: 7px 12px;
    font-size: 14px;
    color: #fff;
    background-color: #337ab7;
    line-height: 34px;
    border-radius: 5px;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
    margin-bottom: 15px;
    thead {
      // border-bottom:2px solid #ccc;
      > tr > th {
        padding: 8px;
        border-bottom: 2px solid #ddd;
      }
    }
    tbody {
      display: none;
      > tr > td {
        padding: 8px;
        text-align: center;
        vertical-align: middle !important;
        max-width: 180px;
        word-wrap: break-word;
        word-break: break-all;

        span {
          font-size: 20px;
          font-family: serif;
        }
        button {
          padding: 1px 5px;
          color: #fff;
          font-size: 12px;
          line-height: 1.5;
          border-radius: 3px;
          cursor: pointer;
        }
        .uploading {
          &:hover {
            background-color: #449d44;
          }
          background-color: #5cb85c;
          margin-right: 5px;
        }
        .uplding {
          cursor: not-allowed;
          opacity: 0.65;
          background-color: #449d44;
          margin-right: 5px;
        }
        .cancel {
          &:hover {
            background-color: #c9302c;
          }
          background-color: #d9534f;
        }
      }
    }
  }
}
.Info-palette {
  // 渲染数据
  border: 1px solid #ddd;
  font-size: 14px;
  line-height: 1.4;
  .panel-heading {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    background-color: #f5f5f5;
    border-bottom: 1px solid#ddd;
    //  font-size:14px;
  }
  .panel-body {
    background-color: #fff;
    padding: 15px;
    font-family: unset;
    .form-group {
      display: flex;
      //   align-items: center;
      margin-bottom: 20px;

      .btu-default {
        padding: 6px 12px;
        font-size: 14px;
        float: right;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
    }
  }
}
</style>