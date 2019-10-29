<template>
    <div class="download_box">
        <div class="btn">
            <!--  -->
            <a href="itms-services://?action=download-manifest&url=https://www.richcrp.com/d.plist">苹果版下载</a> 
        </div>
        <div class="btn" >
            <!-- https://wvs.oss-cn-shanghai.aliyuncs.com/wvsinapk/wvsin.apk -->
            <a href="http://app.richcrp.com/crp.apk">安卓版下载</a>
        </div>
    </div>
</template>

<script>
export default {
    name:'downloadPage',
    data() {
        return {
        }
    },
    methods: {
        sendJump(e){   // 跳转下载市场
            window.location.href=e
            // var u = navigator.userAgent;
            // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
            // if (isiOS) document.getElementById('download').href = 'http://iso.mywvs.com/'
            // var screenWidth = window.screen.width
            // var screenHeight = window.screen.height
            // document.getElementById('wrap').style.height = screenHeight + 'px'
            // document.getElementById('wrap').style.width = screenWidth + 'px'
            // document.getElementById('btn').style.top = '52%'
        }
    },
}
</script>

<style lang="scss" scoped>
    
    .download_box{
        width: 100%;
        height: 100vh;
        background: url('../../assets/img/home/img_download.png') no-repeat;
        background-size: 100% 100%;
        padding-top: 400px;
        .btn{
            width: 220px;
            height: 60px;
            margin: 0 auto;
            margin-bottom: 25px;
            background: url('../../assets/img/home/btn_download.png') no-repeat;
            background-size: cover;
            font-size: 18px;
            text-align: center;
            line-height: 60px;
            a{
                display: block;
                width: 100%;
                height: 100%;
                color: #fff;
            }
        }
    }
</style>