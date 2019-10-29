<template>
    <div class="bg_box login_bg">
        <div class="text_box">
            <div class="left_text">登录</div>
            <!-- <div class="right_text" @click="loginMode">{{loginText}}</div> -->
        </div>

        <!-- 输入框 -->
        <div class="inpu_box">
            <!-- 手机输入框 -->
            <div class="inputBox phone_box">
                <div class="icon_box"></div>
                <!-- <div class="text_box">+86</div>
                <div class="sanjiao"></div>
                <div class="xian"></div> -->
                <div class="phone_input">
                    <input type="tel" v-model="mobile" v-validate="'required|phone'" name="mobile" placeholder="请输入手机号">
                </div>
            </div>
            <!-- 密码输入框 -->
            <div class="inputBox pass_box wjmima" v-show="loginType == 0">
                <div class="icon_text_box">
                    <div class="icon_box"></div>
                    <div class="phone_input">
                        <input type="password" v-model="loginPwd" v-validate="'required|logpwd'" name="loginPwd" placeholder="请输入密码">
                    </div>
                </div>
                
                <div class="inpu_btn forget_pass_btn" @click="goRetrievePass">忘记密码？</div>
            </div>

            <!-- 验证码输入框 -->
            <div class="inputBox code_box" v-show="loginType == 1">
                <div class="icon_box"></div>
                <div class="phone_input">
                    <input type="text" v-model="authCode" v-validate="'required|code'" name="authCode" placeholder="请输入验证码">
                </div>
                <button class="inpu_btn get_code" @click="getCode">获取验证码</button>
            </div>
        </div>

        <!-- 登录按钮 -->
        <div class="button_box btn_50" @click="loginFun">登录</div>

        <!-- 去注册 -->
        <div class="go_box" @click="goRegister">
            <p><span>没有账号？</span>去注册</p>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    name:'login',
    data() {
        return {
            mobile:'',   // 手机号码
            loginPwd:'',   // 密码
            authCode:'',   // 验证码
            loginText:'手机验证码登录',   // 登录方式文字
            loginType:0,   // 登录方式：0：密码登录，1验证码登录
        }
    },
    methods:{
        loginMode(){    // 登录方式切换
            if(this.loginType == 0){
                this.loginType = 1;
                this.loginText = "密码登录 "
            } else {
                this.loginType = 0;
                this.loginText = "手机验证码登录";
            }
        },
        goRetrievePass(){   // 条状忘记密码
            this.$router.push({
                name:'retrievePass'
            })
        },
        goRegister(){   // 跳转注册页面
            this.$router.push({
                name:'register'
            })
        },
        getCode(){   // 获取验证吗
            this.$validator.validate().then(result => {
                if(!result){
                    if(this.errors.has('mobile')){
                        Toast({message:this.errors.collect('mobile')[0], duration: 1500});
                        return
                    } else {
                       let elem = document.querySelector('.get_code');
                        this.$publicFun.sendCode(elem,60);   // 60秒倒计时 
                    } 
                }
            })
        },
        loginFun(){   // 点击登录
            this.$validator.validate().then(result => {
                if(!result){
                    if (this.errors.has('mobile')) {
                        Toast({message:this.errors.collect('mobile')[0], duration: 1500});
                        return
                    }
                    if(this.loginType == 0){    // 密码登录
                        if (this.errors.has('loginPwd')) {
                            Toast({message:this.errors.collect('loginPwd')[0], duration: 1500});
                            return
                        }
                    } else {
                        if (this.errors.has('authCode')) {
                            Toast({message:this.errors.collect('authCode')[0], duration: 1500});
                            return
                        }
                    }
                    this.getLogin()
                } else {
                    this.getLogin()
                }
            })
        },
        getLogin(){
            this.$post('/user/login',{
                mobile:this.mobile,
                password:this.loginPwd
            }).then(res=>{
                if(res.code == 10000){
                    let userInfor = res.data;
                    this.$store.commit('$_setUser',{user: this.mobile})
                    this.$store.commit('$_setLogin','1');
                    this.$store.commit('$_setMobile', userInfor.mobile);
                    this.$store.commit('$_setUserId', userInfor.id);
                    this.$store.commit('$_setToken',userInfor.token);
                    this.$store.commit('$_setUserAmount',userInfor.usdtAmount);
                    Toast({message:'登录成功', duration: 1500});
                    this.$router.push({
                        name:'homePage'
                    })
                } else {
                    Toast({message:res.msg, duration: 1500});
                }
            })
        }
        
    },
    created() {
        this.mobile = window.localStorage.getItem('mobile')
    },

}
</script>

<style lang="scss" scopde>
.pass_box{
    display: flex;
    .icon_text_box{
        display: flex;
    }
}
.pass_box.wjmima{
    justify-content: space-between;
}
    .forget_pass_btn{
        margin-left: 0;
    }
</style>