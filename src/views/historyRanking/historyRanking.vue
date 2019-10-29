<template>
    <div class="historyRanking">
        <van-nav-bar title="历史排行" :fixed="true" :border="false" left-arrow @click-left="goPreviousPage"/>
        <div class="main">
            <!-- 进度条 产品暂时不需要 -->
            <!-- <div class="yff_ranking">
                <h3>已发放排行奖励</h3>
                <div class="speed_box">
                    <div class="speed"></div>
                </div>
                <div class="speed_num">
                    320,000WEX<span> / 4,000,000WEX</span>
                </div>
            </div> -->

            <!-- 列表 -->
            <div class="list_box">
                <div class="none_number" v-if="historyList.length == 0">
                    无人上榜
                </div>
                <ul v-else>
                    <li v-for="(item) in historyList" :key="item.period">
                        <div class="icon_box">第{{item.period}}期排名</div>
                        <div class="num_box">
                            <p>{{item.time | times}} 结算</p>
                            <p>本期总奖励<span>{{Number(item.awardTotal).toFixed(3)}}</span>CRP</p>
                        </div>
                        <div class="item_list">
                            <div class="item" v-for="(itemChild,index) in item.rank" :key="index">
                                <div class="item_bg"></div>
                                <div class="infor_box">
                                    <div class="phone">{{itemChild.mobile}}</div>
                                    <div class="inv_num">
                                        <p v-show="itemChild.inviteCount">邀请<span> {{itemChild.inviteCount}} </span>人</p>
                                        <p v-show="itemChild.wexCount">+{{itemChild.wexCount}}CRP</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="more_box" @click="goRankingDetails(item.period)">查看更多 ></div>
                        <div class="my_ranking">
                            <div class="text_box">
                                <div>我的本期排名</div>
                                <div class="rank">{{item.sort ? item.sort : '暂无排名'}}</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { Toast } from 'vant'
export default {
    name:'historyRanking',
    data() {
        return {
            historyList:[],
        }
    },
    filters: {
      times(val){
          return moment(val).format('MM-DD HH:mm')
      }  
    },
    methods:{
        getHistoryRank(){  // 历史排行
            const uid = localStorage.userId
            let objItsm={
                 mobile: "无人上榜",sort:0
            }
            this.$post('/rank/query_rank',{
                uid:window.localStorage.userId,                
            }).then(res => {
                if(res.code == 10000){
                    this.historyList = res.data;
                    this.historyList.forEach((item) => {
                        let str = [];
                        if(item.rank.length == 0){
                            item.rank.push(objItsm,objItsm,objItsm)
                        } else if(item.rank.length == 1){
                            item.rank.unshift(objItsm);
                            item.rank.push(objItsm);
                        } else if(item.rank.length == 2){
                            item.rank.push(objItsm);
                            str = item.rank.splice(1,1);
                            item.rank.unshift(str[0]);
                        } else {
                            str = item.rank.splice(1,1);
                            item.rank.unshift(str[0]);
                        }
                    })
                } else {
                    Toast({message:res.msg, duration: 1500});
                }
            })
        },
        goRankingDetails(id,title){    // 跳转详情
            this.$router.push({
                name:'rankingDetails',
                query:{
                    id:id
                }
            })
        }
    },
    created() {
        this.getHistoryRank()
    },
}
</script>

<style lang="scss" scoped>
    .historyRanking{
        position: relative;
        padding-top: 46px;
        background: #031B41;
        height: 100vh;
        .main{
            background: #031B41;
            padding: 70px 25px 22px;
            .yff_ranking{
                margin-bottom: 70px;
                h3{
                    font-size: 15px;
                    color: #00D2FF;
                    margin-bottom: 20px;
                }
                .speed_box{
                    width: 100%;
                    height: 4px;
                    border-radius: 2px;
                    background: #042B6A;
                    position: relative;
                    margin-bottom: 7px;
                    .speed{
                        width: 50px;
                        height: 100%;
                        position: absolute;
                        left: 0;
                        top: 0;
                        background: linear-gradient(to right, #FFFFFF, #02FDCB);
                        border-radius: 2px;
                    }
                }
                .speed_num{
                    font-size: 12px;
                    color: #fff;
                    text-align: right;
                    span{
                        color: #276DBD;
                    }
                }
            }
            .list_box{
                background: #031B41;
                ul{
                    li{
                        width: 100%;
                        height: 335px;
                        position: relative;
                        background:url('../../assets/img/rule/bg4.png') no-repeat;
                        background-size: cover;
                        padding: 39px 8px 0;
                        margin-bottom: 70px;
                        .icon_box{
                            width: 81px;
                            height: 69px;
                            background: url('../../assets/img/rule/rule_title.png') no-repeat;
                            background-size: cover;
                            position: absolute;
                            left: 0;right: 0;
                            top: -40px;
                            margin: auto;
                            z-index: 10;
                            font-size: 15px;
                            color:#fff;
                            text-align: center;
                            line-height: 59px;
                            font-weight: bold; 
                        }
                        .num_box{
                            text-align: center;
                            font-size: 12px;
                            font-weight: bold;
                            color: #276DBD;
                            margin-bottom: 10px;
                            span{
                                color: #fff;
                            }
                        }
                        .item_list{
                            display: flex;
                            justify-content: space-between;
                            align-items: baseline;
                            margin-bottom: 60px;
                            .item{
                                width: 100px;
                                font-size: 12px;
                                color: #276DBD;
                                text-align: center;
                                position: relative;
                                .infor_box{
                                    width: 100%;
                                    position: absolute;
                                    left: 0;
                                    bottom: -46px;
                                    .phone{
                                        color: #fff;
                                        margin-bottom: 10px;
                                    }
                                    span{
                                        color: #fff;
                                    }
                                }
                                
                            }
                            .item:nth-child(1){
                                .item_bg{
                                    height: 90px;
                                    background: url('../../assets/img/rule/2nd.png') no-repeat;
                                    background-size: cover;
                                }
                            }
                            .item:nth-child(2){
                                .item_bg{
                                    height: 100px;
                                     background: url('../../assets/img/rule/1st.png') no-repeat;
                                    background-size: cover;
                                }
                            }
                            .item:nth-child(3){
                                .item_bg{
                                    height: 85px;
                                     background: url('../../assets/img/rule/3rd.png') no-repeat;
                                    background-size: cover;
                                }
                            }
                        }
                        .more_box{
                            text-align: center;
                            font-size: 12px;
                            color: #276DBD;
                            line-height: 32px;
                            margin-bottom: 10px;
                        }
                        .my_ranking{
                           
                            padding: 0 8px;
                            .text_box{
                                padding: 10px 17px 0;
                                display: flex;
                                justify-content: space-between;
                                border-top: 1px solid #032C5F;
                                color: #276DBD;
                                font-size: 15px;
                                .rank{
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
                .none_number{
                    text-align: center;
                    color: #fff;
                }
            }
        }
    }
</style>