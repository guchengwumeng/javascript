<template>
  <div class="home">
    <header>
      <h3>萝卜多后台管理系统</h3>
      <div>
        <a><span>管理员</span></a>
        <a
          ><span>{{ gamer }}</span></a
        >
        <a><img src="../assets/f398_07.png" @click="out()"/></a>
      </div>
    </header>
    <aside>
      <ul class="asideMenu">
        <div class="greet" @click="welcome()">
          <img src="../assets/42_03.png" /><span>欢迎页</span>
        </div>
        <li v-for="(item, index) in menuList" :key="item.id">
          <!--设置循环遍历数组item等同于menuList-->
          <div
            class="drop-down"
            @click="showToggle(item, index)"
            :class="{ active:inde==index,croci:shor==index }"
          >
            <img src="../assets/250a.png" />
            <span>{{ item.name }}</span>
            <span></span>
          </div>
          <ul v-show="item.show">
            <li v-for="subItem in item.subItems" :key="index.id">
              <div
                class="oneMenuChild"
                @click="details(subItem.name, index)"
                :class="{ croci: Suboption == subItem.name }"
              >
                {{ subItem.name }}
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
    <div class="module">
      <router-view></router-view>
    </div>
  </div>
</template>
       
<script>
export default {
  name: "hoem",
  data() {
    return {
      gamer: "",
      Suboption: "",
      inde:5,
      shor:5,
      top:"上线",
      menuList: [
        {
          name: "后台管理",
          show: false,
          subItems: [
            { name: "账号管理", status: false },
            { name: "角色管理", status: false },
            { name: "修改密码", status: false },
            { name: "模块管理", status: false }
          ]
        },
        {
          name: "信息管理",
          show: false,
          subItems: [
            { name: "公司信息", status: false },
            { name: "职位信息", status: false }
          ]
        },
        {
          name: "内容管理",
          show: false,
          subItems: [{ name: "Article管理", status: false }]
        }
      ],

    };
  },
  mounted() {
    let query = JSON.parse(sessionStorage.getItem("query"));

    if (query != null) {
      this.gamer = query;
      // console.log(query);
    }
    // params传参，但刷新时参数会丢失
    //   this.gamer=this.$route.params.name;//获取登陆页面跳转传递的参数
    //   console.log(this.$route.params.name)
    // 还有一种路由配置传参方法
    // this.menuList[2].show = true;

    let status=JSON.parse(sessionStorage.getItem("status"));
    console.log("jos",status)
    if(status!=''&&status!=undefined){
    //   status={}
    this.inde=status.name;
    this.menuList[this.inde].show=true;
    this.Suboption=status.subItem;
    }
  },
  methods: {
    out() {
      sessionStorage .clear();
      this.$router.push({ path: "/" });
    },
    details(name, index) {
      this.Suboption = name;
      console.log("cb", index);
      this.inde=index;
      this.shor=5;
      let status={
        name: this.inde,
        subItem:name
      }
      console.log(status);
      sessionStorage.setItem("status", JSON.stringify(status));
      if (index == 2) {
        //通过条件判断所在数组下标
        this.$router.push({
          path: "/List"
        });
      }else{
        this.$router.push({
          path:"/home"
        })
       
      }
    },
    welcome() {
      //跳转到欢迎页

      this.$router.push({ path: "/Welcome" });
    }, 
    //点击展开折叠菜单事件
    showToggle: function(item, index) {
      // this在方法里指当前vue实例
      this.inde = index;
      this.shor=index
      console.log("点击:", index);
      this.menuList.forEach(i => {
        // 判断如果数据中的menuList[i]的show属性不等于当前数据的show属性那么menuList[i]等于false
        if (i.show !== this.menuList[index].show) {
          i.show = false;
        }
      });
      item.show = !item.show; //取反
      console.log("选中：", item.name);
      console.log("状态", item.show);
      console.log("33",item)

    }
  }
};
</script>
<style lang="scss" scoped>
// .pull-down {
//   //点击后小于号样式
//   transform: rotate(-45deg) !important;
// }
.active {
  //选中样式
  border-left: solid white !important;
  >:nth-child(3){transform: rotate(-45deg) !important;}
}
.croci {
        background-color: #feae45;
      }

.home {
  background: url(../assets/orange.jpg) no-repeat center;
  background-size: cover;
  overflow: hidden;
  min-height: 100vh;

  header {
    display: flex;
    justify-content: space-between;
    line-height: 1rem;
    // box-shadow: 0 0 6px #ddd;
    // border-color: #ddd;
    border-bottom: 1px solid #ddd;
    background-color: #fff;

    h3 {
      margin: 0;
      line-height: 3rem;
      background-color: #f5a350;
      color: #fff;
      width: 12rem;
      padding-left: 1rem;
      border-bottom: 0.01rem solid #fff;
    }

    div {
      width: 14rem;
      display: flex;
      justify-content: space-around;
      align-items: center;

      & > :hover {
        padding: 15px;
        text-decoration: none;
        background-color: #eee;
      }
      a {
        color: #337ab7;
        padding: 15px;
      }
      img {
        width: 15px;
      }
    }
  }

  aside {
    width: 13rem;
    color: #fff;
    float: left;
    ul {
      margin: 0;
      padding: 0;
    
    }
    .asideMenu {
      position: relative;

      .greet {
        position: relative;
        padding: 10px;
        border-left: solid transparent;
        &:hover {
          background-color: #feae45;
        }
        img {
          width: 32px;
          height: 28px;
        }
        span {
          position: absolute;
          padding-left: 5px;
          top: 13px;
        }
      }
      li {
        position: relative;

        .drop-down {
          &:hover {
            background-color: #feae45;
          }
          position: relative;
          padding: 10px;
          border-left: solid transparent;
          > :nth-child(1) {
            width: 32px;
            padding-right: 5px;
          }
          > :nth-child(2) {
            position: absolute;
            top: 16px;
          }
          > :nth-child(3) {
            width: 13px;
            height: 13px;
            border-left: 2px solid #fff;
            border-bottom: 2px solid #fff;
            transform: rotate(45deg);
            position: absolute;
            right: 20px;
            top: 20px;
          }
        }
        .oneMenuChild {
          &:hover {
            background-color: #feae45;
          }
          padding: 5px 0px 5px 70px;
          height: 40px;
          line-height: 40px;
        }
      }
    }
  }
  .module {
    padding: 30px 30px 3000px 30px;
    width: calc(100% - 16.76rem);
    margin-bottom: -3000px;
    float: left;
    background-color: #f5f5f5;
  }
}
</style>