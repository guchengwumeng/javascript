// 导入组件
import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome.vue'
import List from '@/components/List.vue'
import Redact from '@/components/Redact.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'login',
    component: () => import('./views/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('./components/home.vue'),
    children: [
      {
        path: '/Welcome',
        name: 'Welcome',
        component: Welcome
      }, {
        path: '/List',
        name: 'List',
        component: List
      },
      {
        path: '/Redact',
        name: 'Redact',
        component: Redact
      }
    ]
  }
  ]
})
