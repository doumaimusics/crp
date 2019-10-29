<template>
    <div class="bg_box pass_bg">
        <van-nav-bar title="找回密码" :fixed="true" :border="false" left-arrow @click-left="goPreviousPage"/>        
        <div class="text_box">
            <div class="left_text">找回密码</div>
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

            <!-- 验证码输入框 -->
            <div class="inputBox code_box">
                <div class="icon_box"></div>
                <div class="phone_input">
                    <input type="text" v-model="authCode" v-validate="'required|code'" name="authCode" placeholder="请输入验证码">
                </div>
                <button class="inpu_btn get_code" @click="getCode">获取验证码</button>
            </div>

            <!-- 密码输入框 -->
            <div class="inputBox pass_box">
                <div class="icon_box"></div>
                <div class="phone_input">
                    <input type="password" v-model="loginPwd" v-validate="'required|logpwd'" name="loginPwd" placeholder="输入6~18位密码">
                </div>
            </div>
        </div>



        <!-- 找回密码按钮 -->
        <div class="button_box btn_50" @click="retrieveFun">立即找回</div>

        <!-- 去登录 -->
        <div class="go_box" @click="goLogin">
            <p><span>没有账号？</span>去登录</p>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
import { mapState } from 'vuex'

export default {
    name:'retrievePass',
    data() {
        return {
            mobile:'',   // 手机号码
            loginPwd:'',   // 密码
            authCode:'',   // 验证码
        }
    },
    methods:{
        getCode(){   // 获取验证吗
            this.$validator.validate().then(result => {
                if(!result){
                    if(this.errors.has('mobile')){
                        Toast({message:this.errors.collect('mobile')[0], duration: 1500});
                        return
                    } else {
                        let elem = document.querySelector('.get_code');
                        this.$publicFun.sendCode(elem,60);   // 60秒倒计时
                        this.$post('/user/sendCode',{
                            mobile: this.mobile,
                        }).then(res => {
                            if (res.code == 10000) {
                                Toast({ message: "验证码已发送",duration: 1500});
                            } else {
                                Toast({ message: res.msg,duration: 1500});
                            }
                        }) 
                    } 
                }
            })
        },
        retrieveFun(){    // 立即找回
            this.$validator.validate().then(result => {
                if (!result) {
                    Toast({message:this.errors.all()[0], duration: 1500});  // ui框架的提示弹窗
                    return
                } else {
                    let obj = {
                        mobile:this.mobile,
                        code:this.authCode,
                        password:this.loginPwd
                    }
                    this.$post('/user/forget_password',obj).then( res => {
                        if(res.code == 10000){
                          Toast({message:'找回成功', duration: 1500});  
                          this.$router.go(-1);
                        }
                    })
                }
            })
        },
        goLogin(){   // 跳转登录页
            this.$router.push({
                name:'login'
            })
        },
        
    }
}
</script>