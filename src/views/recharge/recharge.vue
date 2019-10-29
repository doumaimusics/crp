<template>
    <div class="recharge">
        <van-nav-bar title="充值" :fixed="true" :border="false" left-arrow @click-left="goPreviousPage"/>
        <div class="main_box">
            <div class="main">
                <div class="title_box">充值钱包地址</div>
                <div class="address_box">
                    <div class="address">{{ count }}</div>
                    <div class="copy_btn button_box" :data-clipboard-text="count" @click="copyFun">复制钱包地址</div>
                </div>
            </div>

            <div class="main">
                <div class="title_box">充值钱包地址</div>
                <div class="address_box">
                    <div id="qrcode" class="qr_code" ref="qrcode"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'
import Clipboard from 'clipboard';   // 复制
import QRCode from 'qrcodejs2'    // 生成二维码
import { mapState } from 'vuex'
export default {
    name:'recharge',
    data() {
        return {
            count:''
        }
    },
    computed: {
    },
    methods: {
        copyFun(){    // 复制
            var clipboard = new Clipboard('.copy_btn')  
            clipboard.on('success', e => {  
                Toast({
                    message: '复制成功',
                    duration: 1500
                }); 
                // 释放内存  
                clipboard.destroy()  
            })  
            clipboard.on('error', e => {  
                // 不支持复制  
                console.log('该浏览器不支持自动复制')  
                // 释放内存  
                clipboard.destroy()  
            })  
        },

        getAddress(){  // 查询账户
            const uid = localStorage.userId;
            this.$post('/user/query_account',{
                uid
            }).then(res => {
                if(res.code == 10000){
                    this.count = res.data.toAddress;
                    this.$nextTick(()=>{
                        var qrcode = new QRCode(this.$refs.qrcode, {
                            text: this.count,
                            width: 120,
                            height: 120,
                            colorDark: '#000000',
                            colorLight: '#ffffff',
                            correctLevel: QRCode.CorrectLevel.H
                        });
                    })
                        
                } else {
                     Toast({ message: res.msg,duration: 1500 });
                }
            })
                
            
        },
    },
    mounted(){
        
    },
    created() {
        this.getAddress();
    },
}
</script>

<style lang="scss" scoped>
    .recharge{
        position: relative;
        height: 100vh;
        padding-top: 46px;
        background: #031B41;
        .main_box{
            padding: 22px 25px 0;
            .main{
                margin-bottom: 21px;
                .title_box{
                    font-size: 15px;
                    color: #00D2FF;
                    margin-bottom: 20px;
                }
                .address_box{
                    border: 1px solid #032C5F;
                    background: #021738;
                    padding: 20px 24px;
                    .address{
                        font-size: 13px;
                        color: #276DBD;
                        margin-bottom: 20px;
                        word-wrap: break-word;
                        word-break: normal;
                    }
                    .copy_btn{
                        line-height: 40px;
                        width: 120px;
                        font-size: 15px;
                        color: #031B41;
                        margin: 0 auto;
                    }
                    .qr_code{
                        width: 130px;
                        height: 130px;
                        padding: 5px;
                        background: #fff;
                        margin: 0 auto;
                        text-align: center;
                        img{
                            width: 100%!important;
                        }
                    }
                }
            }
        }
    }
</style>