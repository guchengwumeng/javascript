<template>
  <div class="login">
    <div class="note">
      <h2>后台登录</h2>
      <div class="user">
        <img src="../assets/user.png" />
        <input type="text" v-model="accoun" placeholder="用户名" />
      </div>
      <div class="user">
        <img src="../assets/cipher.png" />
        <input
          type="password"
          v-model="cipher"
          placeholder="密码"
          @keyup.enter="press"
        />
      </div>
      <P>{{ hint }}</P>
      <button @click="login()">登陆</button>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      accoun: "",
      cipher: "",
      hint: ""

    };
  },
  methods: {
    login() {
      // 登陆接口请求
      var _this = this;
      axios
        .post(
          "/api/a/login",
          qs.stringify({
            name: this.accoun, // 登录名
            pwd: this.cipher // 登录密码
          })
        )
        .then(function(res) {
          let code = res.data.code; // 获取状态码
          let message = res.data.message; // 获取返回文本

          let query=_this.accoun;
          sessionStorage.setItem("query",JSON.stringify(query));
          if (code == 0) {
           
            _this.$router.push({//页面跳转传参
            path:'/Welcome'
              // path:'/home/${this.person.name}',
              // query:{
              //   que: _this.accoun// 登录名
              // }
            });
          } else {
            _this.hint = message;
          }
        });
    },
    press() {
      // 回车跳转
      // var that = this;
      this.login();
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  background: {
    image: url(../assets/wallhaven-nm8669.jpg);
    size: 100% 100%;
    repeat: no-repeat;
  }
}

.note {
  width: 18em;
  height: 18em;
  background: RGBA(255, 255, 255, 0.7);
  border: 1px solid #000;
  border-radius: 10px;

  h2 {
    color: #1e90ff;
    text-align: center;
  }

  .user {
    width: 80%;
    height: 40px;
    margin-left: 10%;
    background-color: #fff;
    margin-bottom: 20px;
    border-radius: 5px;

    img {
      width: 24px;
      height: 22px;
      margin: 0 7px;
      position: relative;
      top: 8px;
    }

    input {
      border: 0;
      border-left: 1px solid #e1e5e7;
      height: 23px;
      padding: 0 6px;
      outline: none;
      position: relative;
      top: 3px;
    }
  }

  p {
    height: 22px;
    color: red;
    margin-left: 10%;
    margin: 0 0 10px 10%;
  }

  button {
    width: 80%;
    height: 40px;
    padding: 0;
    margin: 0;
    background-color: #1e90ff;
    border: 0;
    border-radius: 8px;
    outline: none;
    margin-left: 10%;
    line-height: 40px;
    font-size: 19px;
  }
}
</style>
