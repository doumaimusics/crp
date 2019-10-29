<template>
    <div class="yq_box">
        <!-- 头部 -->
        <van-nav-bar title="邀请" :fixed="true" :border="false" @click-right="onClickRight" >
            <van-icon name="question-o" slot="right"/>
        </van-nav-bar>
        <!-- 邀请码 -->
        <div class="inv_code_box">
            <div class="inv">
                <div class="inv_left">
                    我的邀请数：{{userInfor.inviteCount}}人
                </div>
                <div class="inv_right">
                    <div class="inv_btn" @click="goInvitation">邀请记录</div>
                </div>
            </div>
            <div class="inv">
                <div class="inv_left">
                    <p>我的邀请码：<span>{{userInfor.code}}</span></p>
                    <p class="p2">我的邀请者{{userInfor.pmobile}}</p>
                </div>
                <div class="inv_right">
                    <div class="inv_btn" id="copy_btn" :data-clipboard-text="userInfor.code" @click="copyFun">复制邀请码</div>
                </div>
            </div>
            <div class="inv">
                <div class="inv_left">
                    邀请二维码：
                    <div class="qrcode_box" id="qrcode" ref="qrcode" @click="showCode"></div>
                </div>
            </div>
        </div>

        <!-- 我的邀请 -->
        <div class="my_inv_box">
            <h3 class="title">我的邀请奖励</h3>
            <div class="my_inv">
                <div class="inv_box">
                    <div class="my_inv_text">
                        <div class="title_text">累计获得 USDT</div>
                        <div class="price_text">{{inviteData.inviteAward.totalUsdt || 0}}</div>
                    </div>
                    <div class="my_inv_text">
                        <div class="title_text">累计获得 CRP</div>
                        <div class="price_text">{{inviteData.inviteAward.totalWex || 0}}</div>
                        <!-- <div v-if="userInfor.isComplete == 1">
                            <p>已释放：{{inviteData.releaseUsdtCount }}</p>
                            <p>待释放：{{inviteData.waitReleaseUsdtCount }}</p>
                        </div> -->
                    </div>
                </div>
                <div class="p_text" v-if="userInfor.isComplete == 0">抢购1500USDT后即可解锁</div>
            </div>
            
        </div>

        <!-- 我的排行 -->
        <div class="my_ranking_box">
            <h3 class="title">我的排行奖励</h3>
            <div class="my_rank">
                <div class="jl_text">
                    <div class="title_text">上期获得奖励</div>
                    <div class="price_text">{{inviteData.rankAward.lastRankAward || 0}}</div>
                </div>
                <div class="jl_text">
                    <div class="title_text">累计获得奖励</div>
                    <div class="price_text">{{inviteData.rankAward.totalRankAward || 0}}</div>
                </div>
            </div>

            <!-- <div class="date_rank">本期排行 ></div> -->
        </div>
        
        <!-- 说明弹出层 -->
        <div class="explain_box">
             <van-popup
                v-model="explain"
                position="bottom"
                :closeable="true"
                :style="{ height: '320px' }"
                >
                <h3>说明</h3>
                <div class="body">
                    <p>1. 邀请码用于邀请好友获得奖励以及发展下级进行抽成，邀请用户成功购买节点后，将获得该用户投入USDT的20%，以及该用户获得BT的10%作为奖励；</p>
                    <p>2. 一旦您推荐的用户成功完成支付，USDT与BT奖励就会立刻返到您的BT账户；</p>
                    <p>3. 累计投入1500USDT	后才可解锁邀请奖励；</p>
                    <p>4. BT平台会定期根据用户完成的业绩情况以及当前BT的市值，释放一定比例的BT作为额外奖励回馈；</p>
                    <p>5. BT平台保留随时对邀请奖励规则进行调整的权利；</p>
                </div>
                </van-popup>
        </div>
       

        <!-- 二维码弹出层 -->
        <div class="code_pop">
            <van-popup v-model="popupShow">
                <div class="show_code_box" ref="showCodeBox"></div>
            </van-popup>
        </div>
        

        <tabBar activeIcon="invitation" class="bgActive"></tabBar>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2'    // 生成二维码
import { Toast } from 'vant';
import TabBar from '@/components/tabbar/tabbar.vue'
export default {
    name:'invitation',
    data() {
        return {
            inviteData:{
                inviteAward:{},
                rankAward:{}
            },
            explain:false,   // 说明弹出层
            popupShow:false,    // 二维码弹出层
            showCodeImg:'',    // 弹窗二维码地址
            userInfor:{}

        }
    },
    methods:{
        onClickRight(){    // 说明
            this.explain = true;
        },
        getUserInfo(){   // 用户信息
            this.$post('/user/get_userInfo',{
                uid:window.localStorage.userId
            }).then((res) => {
                if(res.code == 10000){
                    this.userInfor = res.data;
                    if(this.userInfor.code){
                        this.$nextTick(() => {
                            var qrcode = new QRCode(this.$refs.qrcode, {
                                text: 'http://www.richcrp.com/#/register?invCode=' + this.userInfor.code,
                                width: 22,
                                height: 22,
                                colorDark: '#000000',
                                colorLight: '#ffffff',
                                correctLevel: QRCode.CorrectLevel.H
                            });
                        }) 
                    }
                } else {
                    Toast({  message: res.msg,duration: 1500 }); 
                }
            })
        },
        getInvitation(){     // 获取邀请信息
            this.$post('/rank/query_award',{
                uid:window.localStorage.userId
            }).then(res => {
                if(res.code == 10000){
                    this.inviteData = res.data;
                } else {
                    Toast({  message: res.msg,duration: 1500 }); 
                }
            })
        },
        showCode(e){   // 二维码弹出
            this.popupShow = true;
            this.$nextTick(() => {
                var qrcode = new QRCode(this.$refs.showCodeBox, {
                    text:'http://www.richcrp.com/#/register?invCode=' + this.userInfor.code,
                    width: 180,
                    height: 180,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.H
                });
            }) 
            // this.showCodeImg = e.path[0].src;
        },
        copyFun(){    // 点击复制
            var clipboard = new this.clipboard('#copy_btn');   // 这里的dom要对应上标签里点击的按钮的dom
            clipboard.on('success', e => {  
                Toast({  message: '复制成功',duration: 1500 }); 
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
        goInvitation(){   // 跳转邀请记录
            this.$router.push({
                name:'invitRecord'
            })
        },
    },
    created() {
        this.getUserInfo();
        this.getInvitation();
    },
    components:{
        TabBar
    }    
}
</script>

<style lang="scss" scoped>
    .yq_box{
        position: relative;
        background: #031b41;
        height: 100vh;
        padding-top: 46px;
        .inv_code_box{
            background: #032C5F;
            padding: 0 25px;
            margin-bottom: 26px;
            .inv{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 21px 0;
                .inv_left{
                    font-size: 13px;
                    color: #fff;
                    .qrcode_box{
                        width: 22px;
                        height: 22px;
                        img{
                            width: 22px;
                            height: 22px;
                        }
                    }
                    
                }
                .inv_right{
                    .inv_btn{
                        padding: 5px;
                        border: 1px solid #276DBD;
                        border-radius: 4px;
                        color: #276DBD;
                        font-size: 12px;
                    }
                }
            }
            .inv:nth-child(2){
                border-top: 1px solid #133D83;
                border-bottom: 1px solid #133D83;
                padding: 12px 0;
                span{
                    font-size: 18px;
                }
                .p2{
                    font-size: 12px;
                    color: #276DBD;
                }
            }
            .inv:nth-child(3){
                .inv_left{
                    display: flex;
                }
            }
        }
        .title{
            text-align: center;
            color: #00D2FF;
            margin-bottom: 25px;
        }
        .inv_box,.my_rank{
            display: flex;
            justify-content: space-around;
            font-size: 12px;
            text-align: center;
            .title_text{
                color: #00D2FF;
                margin-bottom: 5px;
            }
            .price_text{
                font-size:25px;
                color: #fff; 
                margin-bottom: 4px;
                
            }
        }
        .p_text{
            text-align: center;
            color: #00D2FF;
            font-size: 12px;
            margin-top: 12px;
        }
        .my_inv_box{
            margin-bottom: 22px;
            padding: 0 25px;
            .my_inv{
                width: 100%;
                height: 125px;
                background: url('../../assets/img/home/bg_data1.png') no-repeat;
                background-size: cover;
                padding: 20px 0px;
                .my_inv_text{
                    p{
                        color:#276DBD;
                    }
                    
                }
            }
        }

        .my_ranking_box{
            padding: 0 25px;
            padding-bottom: 60px;
        background: #031b41;

            .my_rank{
                width: 100%;
                height: 85px;
                background: url('../../assets/img/home/bg_data2.png') no-repeat;
                background-size: cover;
                margin-bottom: 15px;
                padding-top: 20px;
            }
            .date_rank{
                text-align: right;
                font-size: 12px;
                color: #276DBD;
            }
        }
        .code_pop{
            .van-popup{
                background: transparent;
            }
        }
        
        .show_code_box{
            width: 190px;
            height: 190px;
            background: #032C5F;
            border-radius: 6px;
            padding: 5px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .explain_box{
            .van-popup{
                background: #032C5F;
                padding: 15px 24px;
                h3{
                    margin-bottom: 24px;
                    font-size: 16px;
                    color: #276DBD;
                    text-align: center;
                }
                p{
                    font-size: 13px;
                    color: #7DA6E0;
                    margin-bottom: 10px;  
                }
            }
        }
        
    }
</style>