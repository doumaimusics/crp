<template>
    <div class="cashWithdrawal">
        <van-nav-bar
            title="提现"
            :fixed="true"
            :border="false"
            left-arrow
            @click-left="goPreviousPage"
        />
        <div class="main">
            <!-- 余额 -->
            <div class="balance_box">
                <div class="balance_title">我的余额</div>
                <div class="balance" v-if="$route.query.type == 'usdt'">
                    {{$route.query.balance}}
                    <span>USDT</span>
                </div>
                <div class="balance" v-else>
                    {{$route.query.balance}}
                    <span>CRP</span>
                </div>
            </div>
            <!-- 提现账号 -->
            <div class="input_box">
                <div class="input_title">提现账号</div>
                <div class="input_pack">
                    <input type="text" v-model="account" placeholder="请输入提现账号" />
                </div>
            </div>
            <!-- 提现数量 -->
            <div class="input_box">
                <div class="input_title">提现数量</div>
                <div class="input_pack">
                    <input type="text" v-model="numbers" placeholder="请输入提现数量" />
                </div>
            </div>
            <!-- 提现账号 -->
            <div class="input_box">
                <div class="input_title">手续费</div>
                <div class="input_pack">
                    <div class="sx_text">{{fee}}%</div>
                    <!-- <div class="company">USDT</div> -->
                </div>
            </div>
        </div>
        <div class="font_btn">
            <div class="button_box" @click="confirmation">确认提现</div>
        </div>

        <van-dialog
            id="pop_box"
            v-model="isPopUp"
            title="手机验证码"
            show-cancel-button
            confirm-button-color="#00D2FF"
            cancel-button-color="#276DBD"
            @confirm="confirmFun"
        >
            <div class="code_box">
                <div class="phone_input">
                    <input type="text" v-model="authCode" placeholder="请输入验证码" />
                </div>
                <button class="get_code" @click="getCode">获取验证码</button>
            </div>
        </van-dialog>
    </div>
</template>

<script>
import { Toast } from "vant";
import { mapState } from "vuex";
export default {
    name: "cashWithdrawal",
    data() {
        return {
            isPopUp: false,
            account: "", // 账户
            numbers: "", // 提现数量
            authCode: "", // 验证码
            fee: "" // 手续费
        };
    },
    computed: {
        ...mapState({
            count: state => state.accountData
        })
    },
    methods: {
        confirmation() {
            // 确认提现
            if (this.account == "") {
                Toast({ message: "请输入提现账号", duration: 1500 });
            } else if (this.numbers == "") {
                Toast({ message: "请输入提现数量", duration: 1500 });
            } else {
                if( Number(this.numbers) > Number(this.$route.query.balance)){
                    Toast({ message: "余额不足", duration: 1500 });
                } else {
                    this.isPopUp = true;
                }
            }
        },
        confirmFun() {
            // 弹出确认事件
            this.$post("/pay/withdraw", {
                type: this.$route.query.type, // 提现类型
                mobile: localStorage.mobile, // 提现手机号
                code: this.authCode, // 验证码
                to: this.account, // 提现地址
                amount: Number(this.numbers), // 提现数量
                uid: window.localStorage.userId // 用户id
            }).then(res => {
                if (res.code == 10000) {
                    Toast({ message: "提现成功", duration: 1500 });
                } else {
                    Toast({ message: res.msg, duration: 1500 });
                }
            });
        },
        getCode() {
            // 获取验证码  /user/sendCode
            let elem = document.querySelector(".get_code");
            this.$publicFun.sendCode(elem, 60); // 60秒倒计时
            this.$post("/user/sendCode", {
                mobile: localStorage.mobile
            }).then(res => {
                if (res.code == 10000) {
                    Toast({ message: "验证码已发送", duration: 1500 });
                } else {
                    Toast({ message: res.msg, duration: 1500 });
                }
            });
        },

        getWithdraw() {
            // 获取手续费
            this.$post("/pay/withdraw_fee", {}).then(res => {
                if (res.code == 10000) {
                    this.fee = res.data;
                }
            });
        }
    },
    created() {
        this.$store.dispatch("queryAccount");
        this.getWithdraw();
    }
};
</script>

<style lang="scss">
#pop_box {
    .van-dialog__header {
        color: #276dbd;
        margin-bottom: 30px;
    }
    .van-button--default {
        background: #032c5f;
    }
}
</style>

<style lang="scss" scoped>
.cashWithdrawal {
    position: relative;
    height: 100vh;
    background: #031b41;
    padding-top: 46px;
    .main {
        padding: 21px 25px 0;
        margin-bottom: 40px;
        .balance_box {
            width: 100%;
            height: 90px;
            background: url("../../assets/img/home/bg3.png") no-repeat;
            background-size: cover;
            margin-bottom: 31px;
            text-align: center;
            padding: 15px 0;
            .balance_title {
                font-size: 12px;
                color: #00d2ff;
                margin-bottom: 10px;
            }
            .balance {
                font-size: 25px;
                color: #fff;
                font-weight: bold;
                span {
                    font-size: 12px;
                    color: #276dbd;
                }
            }
        }
        .input_box {
            margin-bottom: 20px;
            .input_title {
                font-size: 15px;
                color: #00d2ff;
                margin-bottom: 20px;
            }
            .input_pack {
                width: 100%;
                height: 50px;
                border-radius: 3px;
                background: #021738;
                display: flex;
                justify-content: space-between;
                input {
                    width: 80%;
                    height: 100%;
                    border: none;
                    background: #021738;
                    padding-left: 20px;
                    font-size: 13px;
                    color: #fff;
                }
                .sx_text {
                    padding-left: 20px;
                    line-height: 50px;
                    color: #276dbd;
                }
                .company {
                    line-height: 50px;
                    font-size: 13px;
                    color: #276dbd;
                    padding-right: 20px;
                }
            }
        }
    }
    .font_btn {
        padding: 0 25px 25px;
        line-height: 40px;
        background: #031b41;
    }
    .van-dialog {
        background: #032c5f;
        .code_box {
            width: 270px;
            height: 50px;
            margin: 0 auto;
            background: #031b41;
            display: flex;
            justify-content: space-between;
            margin-bottom: 35px;
            padding-right: 10px;
            .phone_input {
                width: 50%;
                input {
                    height: 100%;
                    background: #031b41;
                    border: none;
                    padding-left: 10px;
                    color: #fff;
                }
            }
            .get_code {
                color: #00d2ff;
                 background: #031b41;
                border: none;
            }
        }
    }
}
</style>