import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/*
vue - router≥ 3.0 版本回调形式以及改成promise api的形式了， 返回的是一个promise， 
如果没有捕获到错误， 控制台始终会出现如图的警告， 针对于路由跳转相同的地址， 目前的解决方案: this.$router.push('/location').catch(err => {
})
或者如下代码
*/
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

/*
requireAuth 判断是否需要登录
*/

export default new Router({
  mode:'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: {
        name: 'homePage'
      }
    },
    {    // 登录
      path:'/login',
      name:'login',
      component:() => import('@/views/login/login.vue'),
      meta:{
        title:'登录',
        requireAuth: false
      }
    },
    {     // 注册
      path:'/register',
      name:'register',
      component:() => import('@/views/register/register.vue'),
      meta:{
        title:'注册',
        requireAuth: false
      }
    },
    {     // 找回密码
      path:'/retrievePass',
      name: 'retrievePass',
      component: () => import('@/views/password/retrievePass.vue'),
      meta:{
        title:'找回密码',
        requireAuth: false
      }
    },
    {    // 首页
      path:'/homePage',
      name:'homePage',
      component:() => import('@/views/home/Home.vue'),
      meta:{
        title:'首页',
        requireAuth:true
      }
    },
    { // 邀请
      path: '/invitation',
      name: 'invitation',
      component: () => import('@/views/invitation/Invitation.vue'),
      meta: {
        title: '邀请',
        requireAuth: true
      }
    },
    { // 排行
      path: '/ranking',
      name: 'ranking',
      component: () => import('@/views/ranking/Ranking.vue'),
      meta: {
        title: '排行',
        requireAuth: true
      }
    },
    { // 我的
      path: '/myPage',
      name: 'myPage',
      component: () => import('@/views/myPage/MyPage.vue'),
      meta: {
        title: '我的',
        requireAuth: true
      }
    },
    {    // 交易明细
      path: '/transactionDetails',
      name: 'transactionDetails',
      component: () => import('@/views/transactionDetails/transactionDetails.vue'),
      meta: { 
        title: '交易明细',
        requireAuth: true
      }
    },
    {    // 充值
      path: '/recharge',
      name: 'recharge',
      component: () => import('@/views/recharge/recharge.vue'),
      meta: {
        title: '充值',
        requireAuth: true
      }
    },
    {    // 提现
      path: '/cashWithdrawal',
      name: 'cashWithdrawal',
      component: () => import('@/views/cashWithdrawal/cashWithdrawal.vue'),
      meta: {
        title:'提现',
        requireAuth: true
      }
    },
    {    // 邀请记录
      path: '/invitRecord',
      name: 'invitRecord',
      component: () => import('@/views/invitRecord/invitRecord.vue'),
      meta: {
        title: '邀请记录',
        requireAuth: true
      }
    },
    { // 规则
      path: '/rule',
      name: 'rule',
      component: () => import('@/views/rule/rule.vue'),
      meta: {
        title: '规则',
        requireAuth: true
      }
    }, 
    { // 历史排行 
      path: '/historyRanking',
      name: 'historyRanking',
      component: () => import('@/views/historyRanking/historyRanking.vue'),
      meta: {
        title: '历史排行',
        requireAuth: true
      }
    }, 
    { // 排行详情 
      path: '/rankingDetails',
      name: 'rankingDetails',
      component: () => import('@/views/rankingDetails/rankingDetails.vue'),
      meta: {
        title: '历史排行',
        requireAuth: true
      }
    },
    {    // 下载页面
      path:'/downloadPage',
      name:'downloadPage',
      component: () => import('@/views/downloadPage/downloadPage.vue'),
      meta: {
        title:'',
        requireAuth: false
      }
    }
    
  ]
})
