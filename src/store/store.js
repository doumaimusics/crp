import Vue from 'vue'
import Vuex from 'vuex'
import { Toast } from 'vant'

import { stat } from 'fs';

Vue.use(Vuex)
//把如下代码加入main.js
import {
  post,
  fetch,
  patch,
  put
} from '../../config/axios'

const state = {
  user: null,    // 用户信息
  isLogin:'0',  // 是否登录 0为登录，1已登录
  mobile:'',   // 手机号码
  userId:'',  // 用户id
  userName:'',  // 用户名
  token: '', // token
  userAmount:'',  // 个人用户的钱
  rechargeAddress:'',   // 充值地址
  accountData: {},    // 账户信息
  sendCode:'',  // 验证码
}

export default new Vuex.Store({
  state,
  getters:{
    getStorage(state) {
      if (!state.user) {
        state.user = JSON.parse(localStorage.getItem(user));
        state.isLogin = JSON.parse(localStorage.getItem(isLogin));
        state.mobile = JSON.parse(localStorage.getItem(mobile));
        state.userId = JSON.parse(localStorage.getItem(userId));
        state.userName = JSON.parse(localStorage.getItem(userName));
        state.token = JSON.parse(localStorage.getItem(token));
        state.userAmount = JSON.parse(localStorage.getItem(userAmount));
        state.rechargeAddress = JSON.parse(localStorage.getItem(rechargeAddress));
      }
      return state.user
    }
  },
  mutations: {
    $_setUser(state,value){    // 设置用户信息本地存储
      state.user = value;
      localStorage.setItem('user', JSON.stringify(value));
    },
    $_setLogin(state,value){   // 设置是否登录
      state.isLogin = value;
      localStorage.setItem('isLogin', value);
    },
    $_setMobile(state,value){    // 设置手机号
      state.mobile = value;
      localStorage.setItem('mobile', value);
    },
    $_setUserId(satte,value){   // 用户id
      state.userId = value;
      localStorage.setItem('userId', value);
    },
    $_setUserName(state,value){   // 用户名
      state.userName = value;
      localStorage.setItem('userName', value);
    },
    $_setToken(state,value){   // 设置token
      state.token = value;
      localStorage.setItem('token', value)
    },
    $_removeStorage(state, value) { // 删除本地存储
      state.user = null;
      localStorage.removeItem('isLogin');
      localStorage.removeItem('token');
    },
    $_setUserAmount(state,value){    // 设置个人钱
      state.userAmount = value;
      localStorage.setItem('userAmount', value);
    },
    $_setRechargeAddress(state,value){   // 设置地址
      state.rechargeAddress = value;
      localStorage.setItem('rechargeAddress', value);
    },
    $_setAccount(state,value){   // 设置账户信息
      for(const key in value){
        if(key == 'toAddress'){
          continue
        }
        if(value.hasOwnProperty(key)){
          let el = value[key];
          el = (Math.abs(Number(el))).toFixed(3);
          value[key] = el;
        }
      }
      state.accountData = value;
    },
    $_setSendCode(state,value){    // 设置验证码
      state.sendCode = value;
    }
  },
  actions: {
    queryAccount({commit}){    // 账户查询
      const uid = localStorage.userId;
      post('/user/query_account',{
        uid
      }).then(res => {
        if(res.code == 10000){
          commit('$_setAccount',res.data)
        } else {
          Toast({ message: res.msg,duration: 1500 });
        }
      })
    },
    getSendCode({
        commit
      }, mobile) { // 获取验证码
      post('/user/sendCode',{
        mobile: mobile,
      }).then(res => {
        if (res.code == 10000) {
          commit('$_setSendCode', res.data);
           Toast({
             message: '发送成功',
             duration: 1500
           });
        } else {
          Toast({ message: res.msg,duration: 1500});
        }
      })

    }
  }
})
