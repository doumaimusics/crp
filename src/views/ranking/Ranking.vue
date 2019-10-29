<template>
    <div class="rankimg">
        <van-nav-bar title="排行" :fixed="true" :border="false"/>
        <!-- 顶部 -->
        <div class="ran_top">
            <div class="rank_list_btn" @click="goHistoryRanking">历史排行 ></div>
            <!-- 前三名 -->
            <div class="top_box">
                <div class="ran3_box" v-for="(item,index) in topThree" :key="index">
                    <div class="phone">{{item.mobile}}</div>
                    <div class="ran_num" v-show="item.inviteCount">邀请 <span>{{item.inviteCount}}</span> 人 </div>
                    <div class="ran_num"><span>{{item.wexCount}}</span></div>
                </div>
            </div>
        </div>

        <!-- 4名之后列表 -->
        <div class="list_box">
            <div class="tab_title">
                <div class="div1">排名</div>
                <div class="div2">手机号码</div>
                <div class="div3">邀请人数</div>
                <div class="div4">获得奖励/CRP</div>
            </div>
            <div class="ul_list_box">
                <div class="none_number" v-if="rankList.length == 0 || rankList.length <= 3">
                    无人上榜
                </div>
                <ul class="ul_list" v-else>
                    <li v-for="(item,index) in rankList.slice(3)" :key="index">
                        <div class="div1">{{item.sort}}</div>
                        <div class="div2">{{item.mobile}}</div> 
                        <div class="div3">{{item.inviteCount}}</div> 
                        <div class="div4">{{item.wexCount}}</div> 
                    </li>
                </ul>
                
            </div>

            
        </div>

        <!-- 我的排行 -->
        <div class="my_ranking_box">
            <div class="my_text">我的排行</div>
            <div class="my_rank_num">{{mySort ? mySort : '暂无排行'}}</div>
        </div>
        
        <tabBar activeIcon="ranking" class="bgActive"></tabBar>
    </div>
</template>

<script>
import TabBar from '@/components/tabbar/tabbar.vue'
import { Toast } from 'vant'
export default {
    name:'ranking',
    data() {
        return {
            rankList:[],
            topThree:[], // 前三条数据
            mySort:0
        }
    },
    
    methods: {
            
        getQueryRank(){  // 本期邀请榜
            this.$post('/rank/query_award',{
                uid:window.localStorage.userId,
            }).then(res => {
                if(res.code == 10000){
                    this.rankList = res.data.rank;
                    // this.rankList = [  //测试数据
                    //     {
                    //         mobile:'13777813234',
                    //         inviteCount:'121',
                    //         wexCount:'121',
                    //         sort:1
                    //     }
                    // ];
                    let itemObj = {
                        // inviteCount:'暂无邀请',
                        // wexCount: '暂无奖励',
                        mobile:'无人上榜'
                    }
                    let str = [];
                    if(this.rankList.length == 0){
                        this.rankList.push(itemObj,itemObj,itemObj);
                        this.topThree = this.rankList;
                    } else if(this.rankList.length == 1){
                        this.rankList.unshift(itemObj);
                        this.rankList.push(itemObj);
                        this.topThree = this.rankList;
                    } else if(this.rankList.length == 2){
                        this.rankList.push(itemObj);
                        this.topThree = this.rankList;
                        str = this.topThree.splice(1,1); // 截取前三条的第二条数据
                        this.topThree.unshift(str[0]);   // 将第二条数据放在第一位
                    } else {
                        this.topThree = this.rankList.slice(0,3);   // 截取前三条
                        str = this.topThree.splice(1,1); // 截取前三条的第二条数据
                        this.topThree.unshift(str[0]);   // 将第二条数据放在第一位
                    }
                   
                    this.mySort = res.data.sort;   // 本期我的排名
                } else {
                    Toast({message:res.msg, duration: 1500});
                }
            })
        },
        goHistoryRanking(){    // 跳转历史排行
            this.$router.push({
                name:'historyRanking'
            })
        }
    },
    created() {
        this.getQueryRank();   // 获取列表
    },
    components:{
        TabBar
    }    
}
</script>

<style lang="scss" scoped>
    .rankimg{
        padding-top: 46px;
        position: relative;
        height: 100vh;
        background: #021738;
        .ran_top{
            padding: 15px 25px;
            position: relative;
            background: #031B41;
            .rank_list_btn{
                width: 20%;
                font-size: 12px;
                color: #276DBD;
                text-align: right;
                position: absolute;
                top: 30px;
                right: 25px;
                z-index: 11;
            }
            .top_box{
                width: 100%;
                height: 241px;
                background: url('../../assets/img/home/img_ranking.png') no-repeat;
                background-size: 100%;
                position: relative;
                padding:173px 25px 0;
                display: flex;
                justify-content: space-between;
                color: #fff;
                .ran3_box{
                    font-size: 12px;
                    text-align: center;
                    .phone{
                        margin-bottom: 3px;
                    }
                    .ran_num{
                        color: #276DBD;
                        margin-bottom: 5px;

                        span{
                            color: #fff;
                        }
                    }
                }
            }
        }
        .list_box{
            background: #031B41;
            .div1{
                width: 20%;
            }
            .div2{
                width: 35%;
            }
            .div3{
                width: 25%;
            }
            .div4{
                width: 30%;
            }
            .tab_title{
                display: flex;
                font-size: 12px;
                color: #276DBD;
                background: #021738;
                line-height: 40px;
                text-align: center;
                padding: 0 25px;
                
            }
            .ul_list_box{
                height: 200px;
                overflow: hidden;
                padding: 0 25px;
            }
            .ul_list{
                background: #031B41;
                overflow-y:scroll;
                height: 100%;
                li{
                    display: flex;
                    text-align: center;
                    font-size: 13px;
                    color: #00D2FF;
                    border-bottom: 1px solid #032C5F;
                    line-height: 40px;
                    .div4{
                        color: #fff;
                    }
                }
            }
            .none_number{
                text-align: center;
                padding-top: 30px;
                color: #fff;
            }
        }
        .my_ranking_box{
            background: #021738;
            padding: 0 25px 50px;
            display: flex;
            justify-content: space-between;
            line-height: 40px;
            .my_text{
                color: #276DBD;
            }
            .my_rank_num{
                color: #fff;
            }
        }
    }
</style>