<template>
    <div class="itemWarp" @click="changePage">
        <span v-show="!bol" class="item_icon">
            <slot name="normalImg"></slot>
        </span>
        <span v-show="bol" class="item_icon">
            <slot name="activeImg"></slot>
        </span>
        <span v-text="txt" :class="{colorActive:bol}" class="teb_label"></span>
    </div>
</template>

<script>
export default {
    name:'item',
    props:{
        txt:{
            type:String
        },
        page:{
            type:String
        },
        sel:{
            type:String
        }
    },
    computed:{
        bol(){
            if(this.sel == this.page){
                return true
            } 
            return false
        }
    },
    methods:{
        changePage(){
            this.$router.push('/'+this.page);
            this.$emit('change',this.page)
        }
    }
}
</script>

<style lang="scss">
    .itemWarp{
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: center;
        flex-direction: column;
	}
	.itemWarp span{
		font-size: 12px;
    }
    .teb_label{
        color:#276DBD;
    }
    .colorActive{
        color: #00D2FF;
    }
</style>