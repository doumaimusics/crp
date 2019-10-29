<template>
    <div class="tabber_box">
        <Item 
        class="tem_item"
        :txt="item.tabLabel"
        :page="item.pageName"
        @change="getVal"
        v-for="(item, index) in tabList" :key="index"
        :sel='selected'
        >
            <img :src="item.imgUrl" slot='normalImg'>
            <img :src="item.imgUrlSeleUrl" slot='activeImg'>
        </Item>
    </div>
</template>

<script>
import Item from './item.vue'
export default {
    props:['activeIcon'],
    data() {
        return {
            selected:this.activeIcon,
            tabList:[
                {
                    tabLabel:'首页',
                    imgUrl:require('../../assets/img/tab/icon_home2.png'),
                    imgUrlSeleUrl:require('../../assets/img/tab/icon_home1.png'),
                    pageName:'homePage'
                },
                {
                    tabLabel:'邀请',
                    imgUrl:require('../../assets/img/tab/icon_invite2.png'),
                    imgUrlSeleUrl:require('../../assets/img/tab/icon_invite1.png'),
                    pageName:'invitation'
                },
                {
                    tabLabel:'排行',
                    imgUrl:require('../../assets/img/tab/icon_ranking2.png'),
                    imgUrlSeleUrl:require('../../assets/img/tab/icon_ranking1.png'),
                    pageName:'ranking'
                },
                {
                    tabLabel:'我的',
                    imgUrl:require('../../assets/img/tab/icon_my2.png'),
                    imgUrlSeleUrl:require('../../assets/img/tab/icon_my1.png'),
                    pageName:'myPage'
                }
            ]
        }
    },
    methods:{
        getVal(res){
           this.selected = res;
        },
    },
    components:{
        Item
    }
}
</script>

<style lang="scss">
    .tabber_box{
        width: 100%;
        height: 50px;
        display: flex;
        background: #032C5F;
        position: fixed;
        bottom: 0;
        left: 0;
    }
</style>