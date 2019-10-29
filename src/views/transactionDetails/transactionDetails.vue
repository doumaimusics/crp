<template>
    <div class="transaction">
        <van-nav-bar title="交易明细" :fixed="true" :border="false" left-arrow @click-left="goPreviousPage"/>

        <!-- 列表 -->
        <div class="list_box">
            <van-cell :value="item.wexCount" v-for="(item,index) in detaileList" :key="index">
                <template slot="title">
                    <div class="icon_box icon_sf" v-if="item.type == 1"></div>
                    <div class="icon_box icon_rg" v-else-if="item.type == 2"></div>
                    <div class="icon_box icon_jl" v-else></div>

                    <div class="title_text">
                        <div class="text1" v-if="item.type == 1">释放</div>
                        <div class="text1" v-else-if="item.type == 2">认购</div>
                        <div class="text1"  v-else>奖励</div>
                        <div class="date_box">{{item.time | times}}</div>
                    </div>
                </template>
            </van-cell>
        </div>
        
        
    </div>
</template>

<script>
import moment from 'moment'
export default {
    name:'transactionDetails',
    data() {
        return {
            detaileList:[]
        }
    },
    filters:{
        times(val){
            return moment(val).format('MM'+'月'+'DD'+'日'+' HH:mm')
        }  
    },
    methods:{
        getList(){
            this.$post('/user/query_history',{
                uid:localStorage.userId
            }).then(res=>{
                if(res.code == 10000){
                    this.detaileList = res.data;
                }             
            })
        }
    },
    created() {
        this.getList()
    },
}
</script>

<style lang="scss" scoped>
.van-cell:not(:last-child)::after{
    border-bottom: none;
}
    .transaction{
        height: 100vh;
        background: #031B41;
        position: relative;
        padding-top: 46px;
        .list_box{
            background: #031B41;
            padding: 0 25px;
            .van-cell{
                background:  #031B41;
                border-bottom: 1px solid #032C5F;
                color:  #fff;
                .van-cell__title{
                    display: flex;
                    align-items: center;
                    .icon_box{
                        width: 30px;
                        height: 30px;
                        margin-right: 10px;
                    }
                    .icon_box.icon_rg{
                        background: url('../../assets/img/home/icon_rengou.png') no-repeat;
                        background-size: cover;
                    }
                    .icon_box.icon_sf{
                        background: url('../../assets/img/home/icon_shifang.png') no-repeat;
                        background-size: cover;
                    }
                    .icon_box.icon_jl{
                        background: url('../../assets/img/home/icon_jiangli.png') no-repeat;
                        background-size: cover;
                    }
                    .text1{
                        font-size: 15px;
                    }
                    .date_box{
                        font-size: 12px;
                        color: #276DBD;
                    }
                }
                .van-cell__value{
                    line-height: 50px;
                    font-size: 15px;
                    color: #fff;
                }
            }
        }
    }
</style>