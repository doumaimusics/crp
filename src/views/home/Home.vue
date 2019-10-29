<template>
    <div class="home">
        <!-- 头部 -->
        <van-nav-bar title="CRP抢购" :fixed="true" :border="false"/>
        <div class="top">
            <div class="btn-rule" @click="goRule">抢购规则</div>
            <div class="img-box"></div>
            <div class="title-text">购入节点空投CRP · 坐等升值</div> 
        </div>

        <!-- 进度条 -->
        <div class="progress_box">
            <div class="progress_bar">
                <div class="progress" :style="'width:' + ((queryData.leftWexCount / queryData.initWexCount) * 100) + '%'"></div>
            </div>
            <div class="progress_text" v-if="queryData.state == 0">本期抢购已结束</div>
            <div class="progress_text" v-else-if="queryData.state == 1">本期剩余抢购量：<span>{{queryData.leftWexCount}}CRP ≈ {{parseFloat(queryData.leftWexCount*queryData.wexPrice).toFixed(3)}}USDT</span></div>
            <div class="progress_text" v-else>下期抢购时间: {{timeCount}}</div>
        </div>

        <!-- 价格 -->
        <div class="price_box">
            <div class="price">
                <p>本期 1 CRP ≈ {{Number(queryData.wexPrice).toFixed(3)}} USDT</p>
                <p>下期 1 CRP ≈ {{Number(queryData.tomorrowWexPrice).toFixed(3)}} USDT</p>
                <p>{{queryData.crpUsdt}}</p>
            </div>
        </div>

        <!-- 购买部分 -->
        <div class="purchase_box">
            <div class="title">选择购买金额</div>
            <div class="money_box">
                <div class="money_item" :class="(defalutActive)?'active':''" @click="checkAmount('1500',null)">
                    <div>
                        1500 USDT
                    </div>    
                </div>
                <div class="money_sele" @click="isMoneySele"> 其他金额 </div>
            </div>

            <div class="qt_money_box" v-show="isMoneyShow">
                <div v-for="(item,index) in purchaseList" :key="index" :class="(item.isActive)?'active':''" class="money_item" @click="checkAmount(item.amount,index)">
                    <div>{{item.amount}} USDT</div>
                </div>
            </div>
        </div>

        <!-- 购买 -->
        <div class="buy_box" :class="{mbActive:isMoneyShow}">
            <p>剩余可购额度  {{surplusBalance}} USDT</p>
            <div class="button_box btn_40" @click="purchaseFun">{{loadingBuy ? '购买中' : '立即购买'}}</div>
            <p>可获得 {{Number(getAmount/queryData.wexPrice).toFixed(3)}} CRP，累计投入1500USDT激活节点全部权限</p>
        </div>
        <!-- 底部按钮 -->
        <tabBar activeIcon="homePage" class="bgActive"></tabBar>
    </div>
</template>

<script>
import { Toast } from 'vant'
import TabBar from '@/components/tabbar/tabbar.vue'
import { mapState } from 'vuex'
const formatTime = (dateTime) => {   //时间转换  "2019-10-12 16:44:20"格式
  let date = new Date(dateTime)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()
  function s (t) {
    return t < 10 ? '0' + t : t
  }
  return year + '-' + s(month) + '-' + s(day) + ' ' + s(hours) + ':' + s(minutes) + ':' + s(seconds)
}
export default {
    name:'homePage',
    data() {
        return {
            queryData:{}, // 最新请购计划数据
            isMoneyShow:false,   // 是否显示其他金额
            defalutActive:true,   // 默认选择的金额
            purchaseList:[     // 其他金额
                {
                amount:'1000',
                isActive:false
                },
                {
                amount:'500',
                isActive:false
                },
                {
                amount:'100',
                isActive:false
                }
            ],
            getAmount:1500,   // 选取的金额，传给后端
            timeCount:'',   // 倒计时数据
            timeSetInt:null,   // 倒计时
            surplusBalance:'', // 剩余可购额度
            willGetWex:0,
            loadingBuy:false
        }
    },
    computed: {
        ...mapState({
            count:state => state.accountData    // 账户信息
        })
    },
    methods:{
        goRule() {   // 跳转规则
            this.$router.push({
                name:'rule'
            })
        },
        isMoneySele(){    // 是否显示其他金额
            this.isMoneyShow = !this.isMoneyShow
        },
        checkAmount(amount,index){ // 选择购买金额
            this.purchaseList.forEach(el => {
                if(el.isActive){
                    el.isActive = false
                }
            });
            if(index!=null){
                this.purchaseList[index].isActive = true
                this.defalutActive = false
                this.getAmount = amount
            }else{
                this.defalutActive = true
                this.getAmount = 1500
            }
          this.willGetWex= parseFloat(amount*this.queryData.wexPrice).toFixed(3);
        },

        queryNewest(){    // 查询最新抢购计划
            this.$post('/plan/query_newest',{}).then( res => {
                if(res.code == 10000){
                    this.queryData = res.data;
                } else {
                    Toast({message:res.msg, duration: 1500});
                }
                
            })
        },
        queryBalance(){    // 剩余可购额度
            this.$post('/user/query_balance',{
                uid:window.localStorage.userId
            }).then( res => {
                if(res.code == 10000) {
                    this.surplusBalance = res.data.enableBalance
                } else {
                    Toast({message:res.msg, duration: 1500});
                }  
            }) 
        },

         
        // queryAccount(){  // 查询账户
        //     this.$post('/user/query_account',{
        //         uid:window.localStorage.userId
        //     }).then(res => {
        //         if(res.code == 10000){
        //             this.accountData = res.data;
        //             this.$store.commit('$_setRechargeAddress', res.data.toAddress)
        //         } else {
        //             Toast({message:res.msg, duration: 1500});
        //         }
        //     })
        // },

        purchaseFun(){   // 立即购买
            if(this.loadingBuy){
                return
            }
            let usdtCount =  Number(this.getAmount);   // 选择的金额
            if(this.count.usdtAmount < usdtCount){
                Toast({message:'请先充值', duration: 1500});
                this.$router.push({name:'recharge'});
                return;
            }
            this.loadingBuy = true;
            this.$post('/shopping/direct_buy',{
                uid:window.localStorage.userId,
                usdtCount:usdtCount,
                planId:this.queryData.planId
            }).then(res =>{
                if(res.code == 10000){
                    this.queryNewest();   // 查询最新抢购计划
                    this.queryBalance();   // 剩余可购额度
                    this.$store.dispatch('queryAccount');  // 账户信息接口
                    Toast({message:"购买成功，请去个人页查看", duration: 1500});
                    this.loadingBuy = false;
                } else {
                    Toast({message:res.msg, duration: 1500});
                    this.loadingBuy = false;
                }
            }).catch(e => {
                this.loadingBuy = false;
            })
        },
        

        // 已售罄状态倒计时
        countdown () {
                // const end = this.queryData.nextTime
                const end = 1278782378272232
                const now = Date.parse(new Date())
                const msec = end - now
                if(msec>0){
                // 计算时分秒数
                let day = parseInt(msec / 1000 / 60 / 60 / 24)
                let hr = parseInt(msec / 1000 / 60 / 60 % 24)
                let min = parseInt(msec / 1000 / 60 % 60)
                let sec = parseInt(msec / 1000 % 60)
                // 个位数前补零
                hr = hr > 9 ? hr : '0' + hr
                // hr = hr>0 ? hr :''
                min = min > 9 ? min : '0' + min
                sec = sec > 9 ? sec : '0' + sec
                // 控制台打印
                this.timeCount = hr>0 ?`${day}天 ${hr}:${min}:${sec}`:`${hr}:${min}:${sec}`
                }else{
                    this.timeCount = `00:00:00`
                }
        }

    },
    created() {
        this.queryNewest();   // 查询最新抢购计划
        this.queryBalance();   // 剩余可购额度
        this.$store.dispatch('queryAccount');  // 账户信息接口
        if(this.queryData.state == 2 && this.queryData.nextTime){ // 显示倒计时
            this.timeSetInt = setInterval(() => {    
                this.countdown();
            },1000)
        }
    },
    destroyed () {
      clearInterval(this.timeSetInt)  
    },
    filters: {
        
    },
    components:{
        TabBar
    }    
}
</script>

<style lang="scss" scoped>
    .home{
        position: relative;
        background: #031b41;
        height: 100vh;
        padding-top: 46px;
        padding-bottom: 10px;
        .top{
            width: 100%;
            background: url('../../assets/img/home/wex-bg.png') no-repeat;
            background-size: 100% auto;
            padding: 0 0 15px;
            text-align: center;
            position: relative;
            overflow: hidden;
            .btn-rule{
                width: 60px;
                height: 24px;
                border:1px solid #00D2FF;
                border-radius: 4px;
                position: absolute;
                right: 15px;
                top: 15px;
                font-size: 12px;
                color: #00D2FF;
                line-height: 24px;
                text-align: center;
            }
            .img-box{
                width: 325px;
                height: 60px;
                background: url('../../assets/img/home/wex-title.png') no-repeat;
                background-size: cover;
                margin: 60px auto 0px auto;
            }
            .title-text{
                font-size: 13px;
                color: #fff;
                text-align: center;
            }
        }
        .progress_box{
            padding: 0 25px;
            margin-bottom: 29px;
            .progress_bar{
                width: 100%;
                height: 4px;
                border-radius: 2px;
                background: #042B6A;
                position: relative;
                margin-bottom: 7px;
                .progress{
                    height: 100%;
                    position: absolute;
                    left: 0;top:0;
                    background: linear-gradient(to right, #FFFFFF, #02FDCB);
                    border-radius: 2px; 
                }
            }
            .progress_text{
                text-align: center;
                font-size: 12px;
                color: #276DBD;
                span{
                    color: #fff;
                }
            }
        }
        .price_box{
            padding: 0 25px;
            margin-bottom: 25px;
            .price{
                width: 100%;
                height: 120px;
                background: url('../../assets/img/home/wex-price.png') no-repeat;
                background-size: cover;
                font-size: 13px;
                color: #fff;
                padding-top: 28px;
                text-align: center;
                p{
                    margin-bottom: 5px;
                }
            }
        }
        .purchase_box{
            position: relative;
            background: #031b41;
            .title{
                font-size: 13px;
                color: #fff;
                text-align: center;
                margin-bottom: 23px;
            }
            .money_box{
                // display: flex;
                // padding-left: 100px;
                position: relative;
                .money_item{
                    width: 100px;
                    height: 40px;
                    margin: 0 auto;
                    border-radius: 4px;
                    border:1px solid #133D83;
                    font-size: 15px;
                    color: #fff;
                    line-height: 40px;
                    text-align: center;
                }
                .money_sele{
                    padding-right: 10px;
                    line-height: 40px;
                    font-size: 12px;
                    color: #276DBD;
                    background: url('../../assets/img/home/btn_more.png') no-repeat;
                    background-size: 8px 6px;
                    background-position: center right;
                    position: absolute;
                    top:0;bottom: 0;
                    right: 50px;
                    margin: auto;
                }
            }
            .qt_money_box{
                width: 100%;
                height: 87px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                background: url('../../assets/img/home/bg_more.png') no-repeat;
                background-size: cover;
                // position: absolute;
                // left: 0;
                // top: 85px;
                .money_item{
                    padding:0 5px;
                    height: 40px;
                    border-radius: 4px;
                    border:1px solid #133D83;
                    font-size: 15px;
                    color: #fff;
                    line-height: 40px;
                    text-align: center;
                }
            }
            .money_item.active{
                background: linear-gradient(to right, #02FDCB, #00D2FF);
                border-radius: 4px;
                padding: 1px;
                div{ 
                    width: 100%;
                    height: 100%;
                    line-height: 40px;
                    background-color: #024067;
                    border-radius: 4px;
                    margin: 0 auto;
                    padding: 0 5px;
                }
            }
        }
        .buy_box{
            padding:21px 20px 50px;
            background: #031b41;
            p{
                font-size: 12px;
                color: #276DBD;
                text-align: center;
                margin-bottom: 9px;
            }
            .btn_40{
                line-height: 40px;
                margin-bottom: 12px;
            }
        }
        .buy_box.mbActive{
            padding-bottom: 100px;
        }
    }
</style>