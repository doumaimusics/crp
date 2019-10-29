<template>
    <div class="rankingDetails">
        <van-nav-bar :title="`第${$route.query.id}期邀请奖励榜`" :fixed="true" :border="false" left-arrow @click-left="goPreviousPage"/>
        <div class="main">
            <div class="tab_title">
                <div class="div1">排名</div>
                <div class="div2">手机号</div>
                <div class="div3">邀请人数</div>
                <div class="div4">获得奖励/CRP</div>
            </div>
            <div class="tab_list">
                <ul>
                    <li v-for="(item,index) in rankDetaList" :key="index">
                        <div class="div1">{{item.sort}}</div>
                        <div class="div2">{{item.mobile}}</div>
                        <div class="div3">{{item.inviteCount}}</div>
                        <div class="div4 colorW">{{item.wexCount}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'
export default {
    name:'rankingDetails',
    data() {
        return {
            rankDetaList:[]
        }
    },
    methods:{
        // 查询排行详情
        queryRankDetail(){
            this.$post('/rank/query_rank_detail',{
                periodId:this.$route.query.id
            }).then(res => {
                if(res.code == 10000){
                    this.rankDetaList = res.data;
                } else {
                    Toast({message:res.msg, duration: 1500});
                }
            })
        },
    },
    created() {
        this.queryRankDetail();
    },
}
</script>

<style lang="scss" scoped>
    .rankingDetails{
        position: relative;
        padding-top: 46px;
        background: #031B41;
        height: 100vh;
        .main{
            .tab_title{
                width: 100%;
                padding:25px;
                background: #021738;
                display: flex;
                color: #276DBD;
                font-size: 12px;
                text-align: center;
                 .div1{text-align: left;}
            }
            .tab_list{
                padding: 0 25px;
                background: #031B41;
                ul{
                    li{
                        display: flex;
                        text-align: center;
                        font-size: 13px;
                        color: #00D2FF;
                        line-height: 40px;
                        border-bottom: 1px solid #032C5F;
                        .div1{text-align: left;}
                        .colorW{
                            color: #fff;
                        }
                    }
                    li:nth-child(1){
                        .div1{
                            color: #FFC200;
                        }
                    }
                     li:nth-child(2){
                        .div1{
                            color: #FF781E;
                        }
                    }
                     li:nth-child(3){
                        .div1{
                            color: #FF4A27;
                        }
                    }
                }
            }
            .div1{width: 20%;}
            .div2{width: 35%;}
            .div3{width: 25%;}
            .div4{width: 30%;}
        }
    }
</style>