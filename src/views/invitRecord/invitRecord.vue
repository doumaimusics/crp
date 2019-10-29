<template>
    <div class="invitRecord">
        <van-nav-bar title="邀请记录" :fixed="true" :border="false" left-arrow @click-left="goPreviousPage"/>
        <div class="main">
            <div class="tab_box">
                <div class="tab" @click="tabChange(0)" :class="{active:tabIndex==0}">一级邀请</div>
                <div class="tab" @click="tabChange(1)" :class="{active:tabIndex==1}">二级邀请</div>
            </div>

            <!-- 一级邀请列表 -->
            <div class="tab_list_box" v-if="tabIndex == 0">
                <ul>
                    <li v-for="(item,index) in invitList" :key="index">
                        <div class="list_left">
                            <div class="phone">{{item.mobile}}</div>
                            <div class="invit_type">{{ item.time | times}} 成功邀请</div>
                        </div>
                        <div class="list_right">
                            <div class="state">
                                <span>已支付</span>{{item.usdtCountTotal}} USDT
                            </div>
                            <div class="state">
                                 <span>已抢购</span>{{Number(item.wexCountTotal).toFixed(3)}} CRP
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- 二级邀请列表 -->
            <div class="tab_list_box" v-else>
                <ul>
                    <li v-for="(item,index) in invitList" :key="index">
                        <div class="list_left">
                            <div class="phone">{{item.mobile}}</div>
                            <div class="invit_type">{{item.pmobile}}邀请</div>
                        </div>
                        <div class="list_right">
                            <div class="state">
                                <span>已支付</span>{{item.usdtCountTotal}} USDT
                            </div>
                            <div class="state">
                                 <span>已抢购</span>{{Number(item.wexCountTotal).toFixed(3)}} CRP
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
import moment from 'moment'
export default {
    name:'invitRecord',
    data() {
        return {
            tabIndex:0,   // tab切换
            invitList:[]
        }
    },
    methods: {
        tabChange(n){
            if(n == 0){
                this.tabIndex = 0;
                this.getInvitRecord()
            } else {
                this.tabIndex = 1;
                this.getInvitRecord()
            }
        },
        getInvitRecord(){    // 邀请记录
            this.$post('/invite/query_invite',{
                uid:window.localStorage.userId
            }).then((res) => {
                if(res.code == 10000){
                    if(this.tabIndex == 0){
                        this.invitList = res.data.levelOne;
                    } else {
                        this.invitList = res.data.levelTow;
                    }
                } else {
                    Toast({ message: res.msg,duration: 1500 })
                }
            })
        }
    },
    filters: {
      times(val){
          return moment(val).format('MM -DD HH:mm')
      }  
    },
    created() {
        this.getInvitRecord()
    },
}
</script>

<style lang="scss" scoped>
    .invitRecord{
        position: relative;
        height: 100vh;
        background: #031B41;
        padding-top: 46px;
        .main{
            position: relative;
            .tab_box{
                width: 100%;
                height: 60px;
                background: #021738;
                display: flex;
                justify-content: space-around;
                font-size: 15px;
                color: #276DBD;
                .tab{
                    height: 100%;
                    line-height: 60px;
                }
                .tab.active{
                    /* 文字颜色渐变 */
                    background-image:linear-gradient(0deg,#02FDCB 0%, #00D2FF 100%);
                    -webkit-background-clip:text;
                    -webkit-text-fill-color:transparent;
                    /* 底边框颜色渐变 */
                    border:2px solid #fff;
                    border-image: -webkit-linear-gradient(90deg,#00D2FF,#02FDCB) 0 0 2 0;
                    border-image: -moz-linear-gradient(90deg,#00D2FF,#02FDCB) 0 0 2 0;
                    border-image: linear-gradient(90deg,#00D2FF,#02FDCB) 0 0 2 0;
                }
            }
            .tab_list_box{
                padding: 15px 25px;
                ul{
                    li{
                        border-bottom: 1px solid #032C5F;
                        display: flex;
                        justify-content: space-between;
                        padding: 13px 0;
                        color:  #fff;
                        font-size: 12px;
                        .phone{
                            font-size: 15px;
                            margin-bottom: 8px;
                        }
                        .invit_type{
                            color: #276DBD;
                        }
                        .state{
                            margin-bottom: 8px;
                            span{
                                color: #276DBD;
                                margin-right: 5px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>