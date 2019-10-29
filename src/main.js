import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import axios from 'axios'

Vue.config.productionTip = false
import './vantUi'    // 按需引入vant
import 'vant/lib/index.css';
import '@/assets/style/public.css'   // 引入公用样式
import './utils/validate'    // 表单验证

import PublicFun from './utils/publicFun'    // 引入公用的方法

import Clipboard from 'clipboard'    // 复制插件


router.beforeEach((to, from, next) => { // 登录信息跳转
  if (to.matched.some(m => m.meta.requireAuth)) {

    if (window.localStorage.token && window.localStorage.isLogin === '1') {
      next();
    } else if (to.path !== '/login') {
      let token = window.localStorage.token;
      let isLogin = window.localStorage.isLogin;
      if ((token === 'null' && isLogin === '0') || (token === '' && isLogin === '0') || (token === undefined && isLogin === undefined)) {
        next({
          path: '/login'
        })
        Toast({
          message: '检测到您还未登录,请登录后操作！',
          duration: 1500
        })
      }
    } else {
      next()
    }
  } else {
    next();
  }
  window.scroll(0, 0); // 页面跳转回到顶部
  if (to.meta.title) { // 页面标题
    document.title = to.meta.title
  }
  next()
})

//把如下代码加入main.js
import { post,fetch,patch,put } from '../config/axios'
//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;

Vue.prototype.$publicFun = PublicFun  // 挂在全局方法
Vue.prototype.clipboard = Clipboard // 挂载复制插件

Vue.prototype.goPreviousPage =() => router.go(-1)   // 全局方法返回上一页


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
