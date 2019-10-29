<template>
    <div class="rule_box">
        <van-nav-bar title="规则" :fixed="true" :border="false" left-arrow @click-left="goPreviousPage"/>
        <div class="main">
            <!-- crp发行 -->
            <div class="item_box">
                <div class="item">
                    <div class="item_title">CRP发行</div>
                    <div class="pre1">CRP总量1亿，永不增发通过节点销售获得的USDT与平台手续费持续回购并<span class="dfd">销毁</span>，CRP总量<span class="dfd">不断减少</span></div>
                    <div class="img_box"></div>
                </div>
            </div>

            <!-- 节点销售 -->
            <div class="item_box">
                <div class="item">
                    <div class="item_title">节点销售</div>
                    <div class="icon_box icon1"></div>
                    <!-- class="shuju" 的是后台返回的数据 -->
                    <div class="pre1">CRP销售总量8000万，已销售<span class="shuju">{{planRule.wexBuyCount}}万</span>
                        本期销售额度为<span class="shuju">{{planRule.initWexCount}}</span>CRP，共160期单个用户总购买限额为1500USDT</div>
                    <div class="linear-bg">第<span class="shuju">{{planRule.period}}</span>期已售罄，请等待下期{{nextPeriodTime}}抢购</div>

                    <div class="line_item">
                        <span class="text-decoration">本期 1 CRP ≈ <span class="shuju">{{planRule.wexPrice}}</span> USDT</span><br>
                        下期 1 CRP ≈<span>{{planRule.nextWexPrice}}</span> USDT<br>
                        当期交易价格 1 CRP ≈ <span class="shuju">{{planRule.crpUsdt}}</span> USDT
                    </div>

                </div>
            </div>

            <!-- 邀请奖励 -->
            <div class="item_box">
                <div class="item">
                    <div class="item_title">邀请奖励</div>
                    <div class="icon_box icon2"></div>
                    <h3>一级邀请奖励</h3>
                    <div class="pre2">获得被邀请人购买金额的20%的USDT和10%的CRP</div>
                    <h3>二级邀请奖励</h3>
                    <div class="pre2">获得被邀请人购买金额的10%的USDT和5%的CRP</div>
                    <div class="pre2">CRP邀请奖励总量{{planRule.inviteAwardWexTotal}}，已发放{{planRule.inviteAwardWex}}CRP</div>
                    <div class="urle_item">                        
                        <p> 奖励解锁条件：</p>
                        <p>1. 用户抢购CRP累计达到1500USDT</p>
                        <p>2. USDT奖励立即到账</p>
                        <p>3. CRP奖励每天解锁1/365</p>
                    </div>
                </div>
            </div>

            <!-- 排行奖励 -->
            <div class="item_box">
                <div class="item">
                    <div class="item_title">排行奖励</div>
                    <div class="icon_box icon3"></div>
                    <div class="pre2">推广额外奖励CRP 每七期发放一次发放数量为周期内CRP销售总额的5%当日系统将同时销毁回购的CRP</div>
                    <!-- <div class="linear-bg">8月3日释放第11期额外奖励</div> -->
                    <div class="pre3">奖励根据推广业绩分配，次日开始空投，分365天空投</div>
                    <div class="urle_item">                        
                        <p>分配规则：</p>
                        <p>1. 本轮有效邀请人数前20名用户按照对应的奖励比例进行分配。</p>
                        <p>2. 获奖资格：本轮有效邀请人数进入排行前20名。</p>
                        <p>3. 领奖资格：用户抢购CRP累计达到1500USDT。</p>
                        <p>4. 排行依据：根据邀请的有效邀请人数进行排名。</p>
                        <p>5. 有效邀请人定义：用户的邀请人抢购CRP，且首次达到1500USDT时，算本期内1次有效人数。</p>
                    </div>
                </div>
            </div>

            <!-- 合伙人计划 -->
            <div class="item_box">
                <div class="item">
                    <div class="item_title">合伙人计划</div>
                    <div class="icon_box icon4"></div>
                    <div class="slogan_box">
                        <div class="slogan">尊贵身份  十大权益</div>
                        <div class="slogan">利益捆绑  共创未来</div>
                    </div>
                    <div class="form_box">
                        <div class="s5p">
                            <div class="linear-bg">钻石合伙人</div>
                            <div class="text">持有20万枚CRP，限10名</div>
                        </div>
                        <div class="s5p">
                            <div class="linear-bg">金牌合伙人</div>
                            <div class="text">持有10万枚CRP，限10名</div>
                        </div>
                    </div>
                    <div class="look_defit">
                        <div class="look_btn">查看详情 > </div>
                    </div>
                </div>
            </div>

            <!-- 释放规则 -->
            <div class="item_box">
                <div class="item">
                    <div class="item_title">释放规则</div>
                    <div class="pre3" style="text-align: center;">用户购买得到的CRP每天释放1/365</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    name:'rule',
    data() {
        return {
            planRule:{}
        }
    },
    computed: {
        nextPeriodTime() {
            return moment(this.planRule.nextPeriodTime).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    methods:{
        getRuleData(){
            this.$post('/plan/rule',{
                uid:window.localStorage.userId
            }).then( res => {
                if(res.code == 10000){
                    this.planRule = res.data;
                }
            })
        }
    },
    created() {
        this.getRuleData()
    },
}
</script>

<style lang="scss" scoped>
    html{
        background: #031B41;
    }
    .rule_box{
        padding-top: 46px;
        .dfd{
            color: #00D4FD;
        }
        .main{
            background: url('../../assets/img/rule/img_title2.png') no-repeat #031B41;
            background-size: 100% 250px;
            padding: 250px 0 32px;
            position: relative;
            .item_box{
                background: #031B41;
                padding: 0 25px;
                margin-bottom: 80px;
                .item{
                    width: 100%;
                    background: url('../../assets/img/rule/wex-box-m.png') repeat-y;
                    background-size: 100% auto;
                    color: #fff;
                    position: relative;
                    padding: 48px 0 21px 0;
                    .item_title{
                        width: 81px;
                        height: 69px;
                        background: url('../../assets/img/rule/rule_title.png') no-repeat;
                        background-size: cover;
                        font-size: 15px;
                        color: #fff;
                        position: absolute;
                        left: 0;right: 0;
                        top: -40px;
                        margin: auto;
                        z-index: 11;
                        line-height: 58px;
                        text-align: center;
                        font-weight: bold;
                    }
                    .pre1,.pre2{
                        text-align: center;
                        font-size: 12px;
                        color: #fff;
                        padding: 0 66px;
                        margin-bottom: 24px;
                    }
                    .pre2{
                        padding: 0 35px; 
                    }
                    .pre3{
                        font-size: 12px;
                        color: #276DBD;
                        padding: 0 30px;
                        margin-bottom: 28px;
                    }
                    .icon_box{
                        width: 66px;
                        height: 67px;
                        margin: 0 auto;
                        margin-bottom: 14px;
                        background: #ccc;
                    }
                    .icon_box.icon1{
                        background: url('../../assets/img/rule/rule-icon-1.png') no-repeat;
                        background-size: cover;
                    }
                    .icon_box.icon2{
                        background: url('../../assets/img/rule/rule-icon-2.png') no-repeat;
                        background-size: cover;
                    }
                    .icon_box.icon3{
                        background: url('../../assets/img/rule/rule-icon-3.png') no-repeat;
                        background-size: cover;
                    }
                    .icon_box.icon4{
                        background: url('../../assets/img/rule/rule-icon-4.png') no-repeat;
                        background-size: cover;
                    }
                    .linear-bg{
                        width: 220px;
                        height: 25px;
                        margin: 0 auto 18px;
                        font-size: 12px;
                        color: #031B41;
                        line-height: 25px;
                        text-align: center;
                        background: linear-gradient(to right, #02FDCB, #00D2FF);
                    }
                    .line_item{
                        font-size: 12px;
                        text-align: center;
                        color: #fff;
                        margin-bottom: 15px;
                        .text-decoration{
                            text-decoration: line-through;
                            color: #276dbd;
                        }
                    }
                    h3{
                        font-size: 13px;
                        color: #00D2FF;
                        text-align: center;
                        font-weight: bold;
                    }
                    .urle_item{
                        padding: 0 35px;
                        color: #276DBD;
                        font-size: 12px;
                        margin-bottom: 15px;
                        p{
                            margin-bottom: 5px;
                        }
                    }
                    .slogan_box{
                        font-size: 13px;
                        font-weight: bold;
                        color: #fff;
                        margin-bottom: 23px;
                        text-align: center;
                        .slogan{
                            margin-bottom: 5px;
                        }
                    }
                    .form_box{
                        padding: 0 45px;
                        margin-bottom: 70px;
                        .s5p{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 10px;
                            .linear-bg{
                                width: 75px;
                                height: 24px;
                                text-align: center;
                                line-height: 24px;
                                font-size: 12px;
                                color: #031B41;
                                padding: 0 8px;
                                margin: 0;
                            }
                            .text{
                                font-size: 12px;
                                color: #276DBD;
                            }
                        }
                    }
                    .look_defit{
                        padding: 0 8px;
                        margin-bottom: 15px;
                        position: absolute;
                        left: 0;bottom:-15px;
                        width: 100%;
                        height: 52px;
                        z-index: 12;
                        .look_btn{
                            border-top: 1px solid #032C5F;
                            line-height: 52px;
                            text-align: center;
                            font-size: 12px;
                            color: #276DBD;
                        }
                    }
                    .img_box{
                        width: 247px;
                        height: 246px;
                        margin: 0 auto;
                        background: url('../../assets/img/rule/img_rule1.png') no-repeat;
                        background-size: cover;
                    }
                }
                .item:before {
                    content: '';
                    height: 30px;
                    position: absolute;
                    top: 0;
                    right: 0;
                    left: 0;
                    background: url('../../assets/img/rule/wex-box-t.png') no-repeat;
                    background-size: 100% auto;
                    z-index: 10;
                }
                .item:after {
                    content: '';
                    height: 30px;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    left: 0;
                    background: url('../../assets/img/rule/wex-box-b.png') no-repeat;
                    background-size: 100% auto;
                    z-index: 5;
                }
            }
            .item_box:last-child{
                margin-bottom: 0;
            }
        }
    }
</style>