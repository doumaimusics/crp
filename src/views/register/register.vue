<template>
    <div class="bg_box register_bg">
        <van-nav-bar title="注册" :fixed="true" :border="false" left-arrow @click-left="goPreviousPage"/>        
        <div class="text_box">
            <div class="left_text">注册</div>
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
                    <input type="password" v-model="registerPawss" v-validate="'required|registerpws'" name="registerPawss" placeholder="请输入6~18位密码">
                </div>
            </div>

            <!-- 再次密码输入框 -->
            <div class="inputBox pass_box">
                <div class="icon_box"></div>
                <div class="phone_input">
                    <input type="password" v-model="registerPawss1" v-validate="'required|registerpws'" name="registerPawss" placeholder="再次输入6~18位密码">
                </div>
            </div>

            <!-- 邀请码 -->
            <div class="inputBox inv_box">
                <div class="icon_box"></div>
                <div class="phone_input"  v-if="this.$route.query.invCode">
                    <input type="text" v-validate="'required|invcode'"  name="invsCode" v-model="invCode" readonly="readonly"   placeholder="请输入邀请码（必填）">
                </div>
                <div class="phone_input" v-else>
                    <input type="text" v-validate="'required|invcode'"  name="invsCode" v-model="invCode"   placeholder="请输入邀请码（必填）">
                </div>
                
            </div>
        </div>
        <!-- 找回密码按钮 -->
        <div class="button_box btn_50" @click="registerFun">立即注册</div>
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    name:'register',
    data() {
        return {
            mobile:'',   // 手机号码
            registerPawss:'',   // 密码
            registerPawss1:'',  // 再次输入的密码
            authCode:'',   // 验证码
            invCode:'',   // 邀请码
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
        registerFun(){    // 注册
            this.$validator.validate().then(result => {
                if (!result) {
                    Toast({message:this.errors.all()[0], duration: 1500});  // ui框架的提示弹窗
                    return
                } else if(this.registerPawss !== this.registerPawss1){
                    Toast({message:'两次输入密码不一致', duration: 1500});  // ui框架的提示弹窗
                } else {
                    let obj = {
                        "pcode":this.invCode,
                        "vcode":this.authCode,
                        "password":this.registerPawss,
                        "mobile":this.mobile
                    }
                    this.$post('/user/register',obj).then((res) => {
                        if(res.code == 10000){
                            Toast({message:'注册成功', duration: 1500});  // ui框架的提示弹窗
                            if(this.$route.query.invCode){
                                this.$router.push({   // 扫码进来跳转下载页面
                                    name:'downloadPage'
                                })
                            } else {   // 跳转登录页面
                                this.$router.push({
                                    name:'login'
                                })
                            }
                            
                        } else {
                            Toast({message:res.msg, duration: 1500});
                        }
                    })
                }
            })
        },
    },
    created() {
        if(this.$route.query.invCode){
            this.invCode = this.$route.query.invCode
        }
    },
}
</script>