import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueQuillEditor from 'vue-quill-editor'
// import jlPopup from '@/components/popup.vue'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
// Vue.component('jlPopup', jlPopup)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // console.log(0)
  var query = JSON.parse(sessionStorage.getItem('query')) // 登陆成功保存的值
  if ((query !== '' && query !== null) || to.name === 'login') {
    // console.log(1)
    next()// 可以依次跳转
  } else {
    // console.log(2)
    next({ name: 'login' })// 没登录跳转到登陆页面
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
