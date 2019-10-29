<template>
    <div class="my_page">
        <van-nav-bar title="我的" :fixed="true" :border="false"/>
        <div class="main_box">
            <div class="top_box">
                账户：{{account}}
            </div>
            <!-- usdt -->
            <div class="usdt_box">
                <div class="title_box">
                    <div class="left">
                    <span class="title">USDT</span> 
                    </div>
                    <div class="right">
                        <div class="price">{{count.usdtAmount}}</div> 
                        <div class="right_btn">余额</div>
                    </div>
                    
                </div>
                <div class="my_btn_box">
                    <div class="my_btn" @click="goPage('recharge')">充值</div>
                    <div class="my_btn" @click="goPage('cashWithdrawal','usdt',count.usdtAmount)">提现</div>
                </div>
            </div>

            <div class="crp_box">
                <div class="title_box no_margin">
                    <div class="left">
                    <span class="title">CRP</span> 
                    </div>
                    <div class="right">
                        <div class="price">{{count.wexAmount}}</div> 
                        <div class="right_btn">余额</div>
                    </div>
                </div>
                <div class="title_box no_padding">
                    <div class="left">
                    <span class="title small_title">明日释放：{{count.tomorrowReleaseWexCount}}</span> 
                    </div>
                    <div class="right">
                        <div class="price">{{count.waitReleaseWexCount}}</div> 
                        <div class="right_btn">锁仓</div>
                    </div>
                </div>
                <div class="my_btn_box">
                    <div class="my_btn" @click="goPage('recharge')">充值</div>
                    <div class="my_btn" @click="goPage('cashWithdrawal','crp',count.wexAmount)">提现</div>
                </div>
            </div>

            <!-- 列表 -->
            <div class="list_box">
                <ul>
                    <li @click="goPage('transactionDetails')">
                        <van-cell title="交易明细" is-link />
                    </li>
                    <li @click="goPage('retrievePass')">
                        <van-cell title="修改密码" is-link />
                    </li>
                </ul>
            </div>
        </div>
            <!-- 退出登录 -->
            <div class="return_btn_box">
                <div class="return_btn" @click="returnLogin">退出登录</div>
            </div>
        <tabBar activeIcon="myPage" class="bgActive"></tabBar>
    </div>
</template>

<script>
import { Dialog,Toast } from 'vant';
import { mapState } from 'vuex'
import TabBar from '@/components/tabbar/tabbar.vue'
export default {
    name:'myPage',
    data() {
        return {
            account:'',   // 账户
        }
    },
    computed: {
        ...mapState({
            count:state => state.accountData
        })
    },
    methods: {
        goPage(name,type,balance){    // 页面跳转:传对应页面的name值
            this.$router.push({
                name:name,
                query:{
                    type,
                    balance
                }
            })
        },
        returnLogin(){   // 退出登录
            Dialog.confirm({
                message: '是否要退出登录'
            }).then(() => {
                this.$store.commit('$_removeStorage');
                this.$router.push({
                    name:'login'
                });
                Toast({message:'退出成功', duration: 1500});
            }).catch(() => {
            });
        }
    },
    created() {
        this.$store.dispatch('queryAccount');  // 账户信息接口
        this.account = localStorage.mobile;   // 账户
    },
    components:{
        TabBar
    }    
}
</script>

<style lang="scss" scoped>
    .my_page{
        position: relative;
        padding: 46px 0 ;
        background: #031B41;
        height: 100vh;
        .top_box{
            font-size: 12px;
            color: #00D2FF;
            padding: 20px 0;
        }
        .main_box{
            padding: 0 25px;
        }
        .usdt_box{
            width: 100%;
            height: 125px;
            background: url('../../assets/img/home/bg_my1.png') no-repeat;
            background-size: cover;
            margin-bottom: 25px;
        }
        .crp_box{
            width: 100%;
            height: 155px;
            background: url('../../assets/img/home/bg_my2.png') no-repeat;
            background-size: cover;
            margin-bottom: 20px;
        }
        .usdt_box, .crp_box{
            .title_box{
                padding: 20px 15px 0 20px;
                display: flex;
                justify-content: space-between;
                margin-bottom: 15px;
                font-size: 24px;
                font-weight: bold;
                .left{
                    .title{
                        color: #00D2FF;
                    }
                    .title.small_title{
                        font-size: 12px;
                        color: #276DBD;
                    }
                }
                .right{
                    display: flex;
                    align-items: center;
                    .price{
                        color: #fff;
                        margin-right: 10px;
                    }
                    .right_btn{
                        width: 40px;
                        height: 18px;
                        background: url('../../assets/img/home/bg_tag.png') no-repeat;
                        background-size: cover;
                        text-align: center;
                        font-size: 12px;
                        color: #276DBD;
                        line-height: 18px;
                    }
                }
            }
            .title_box.no_padding{
                padding-top: 0;
            }
            .title_box.no_margin{
                margin-bottom: 0;
            }
            .my_btn_box{
                display: flex;
                justify-content: space-between;
                padding: 0 33px;
            }
            .my_btn{
                width: 120px;
                height: 40px;
                background: url('../../assets/img/home/btn1.png') no-repeat;
                background-size: 100%;
                text-align: center;
                line-height: 40px;
                font-size: 15px;
                color: #031B41;
            }
        }
        
        
        .list_box{
            margin-bottom: 30px;
            ul{
                li{
                    border-bottom: 1px solid #032C5F;
                    .van-cell{
                        background: #031B41;
                        color: #00D2FF;
                        .van-cell__right-icon{
                            color: #00D2FF;                        
                        }
                    }
                }
            }
        }
        .return_btn_box{
            width: 100%;
            display: flex;
            justify-content: center;
            padding-bottom: 100px;
            background: #031B41;
            .return_btn{
                line-height: 40px;
                padding: 0 30px;
                border-radius: 20px;
                background: #032C5F;
                font-size: 15px;
                color: #276DBD;
            }
        }
    }
</style>