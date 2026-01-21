<template>
	<view class="moneyWithdraw-page">
		<view class="moneyWithdraw-num">
			<text class="moneyWithdraw-num-tip">提现数量</text>
			<view class="moneyWithdraw-num-input">
				<input class="moneyWithdraw-num-input-input" type="number"
               :placeholder="'最小提现数量：' + params.min"  v-model="num" />
				<text class="moneyWithdraw-num-input-all" @click="allAction">全部</text>
			</view>
		</view>
		<view class="moneyWithdraw-rate">
			<text>可提现数量：{{params.cash}}</text>
			<text>手续费：{{params.fee | percent}}</text>
		</view>
		<view class="moneyWithdraw-code">
			<text class="moneyWithdraw-code-tip">验证码</text>
			<view class="moneyWithdraw-code-input">
				<input class="moneyWithdraw-code-input-input" type="number" maxlength="6"
               placeholder="请输入验证码" v-model="code" />
        <mix-code :validBind="false"/>
			</view>
		</view>
    <mix-button ref="confirmBtn" text="确定" marginTop="60rpx" @onConfirm="confirm"></mix-button>

    <text class="log" @click="navTo('/pages_store/money/withdrawLog')">提现记录</text>
  </view>
</template>

<script>
	export default {
    components: {},

    data() {
			return {
				params: {min: '--', cash: '--', fee: 0},
				num: '',
				code: ''
			}
		},
		onLoad() {
      this.getParams();
    },
		methods: {
			async getParams() {
				const res = await this.$get("/seller/seller-withdraw-log/withdrawParams");
				this.params = res.data;
			},
			allAction() {
				this.num = this.params.cash + "";
			},
			async confirm() {
				if (this.$util.isEmpty(this.num)) {
					this.$util.msg('请填写提现数量');
          this.$refs.confirmBtn.stop();
          return;
				}
        if(this.num * 1 < this.params.min *1) {
          this.$util.msg('最小提现数量为：' + this.params.min);
          this.$refs.confirmBtn.stop();
          return;
        }
				if (this.$util.isEmpty(this.code)) {
          this.$util.msg('请输入验证码');
          this.$refs.confirmBtn.stop();
          return;
				}
				const res = await this.$post("/seller/seller-withdraw-log/withdraw", {
					amount: this.num,
					code: this.code,
				});
        this.$util.msg("提现申请已提交");
				setTimeout(() => {
          this.navTo('/pages_store/money/withdrawLog');
        }, 1000);
			}
		}
	}
</script>

<style scoped lang="scss">
	view,text{line-height: 1.8;}
  .log{
    font-size: 28rpx;
    text-decoration: underline;
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    color:$base-color;
    margin-top: 40rpx;
  }
	.moneyWithdraw-page {
		position: relative;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100vw;
		height: 100vh;
		background-color: #f8f8f8;
	}
	.moneyWithdraw-num {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: flex-start;
		width: 100%;
		padding: 20rpx 30rpx 20rpx 30rpx;
		background-color: #ffffff;
		.moneyWithdraw-num-tip {
			width: 100%;
			font-size: 28rpx;
			color: $base-color;
			text-align: left;
		}
		.moneyWithdraw-num-input {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			width: 100%;
			padding: 10rpx 0rpx 0rpx 0rpx;
			border-bottom: 1rpx solid $line-color;
			.moneyWithdraw-num-input-input {
				flex-grow: 1;
        font-size: 26rpx;
				height: 88rpx;
				padding-right: 20rpx;
			}
			.moneyWithdraw-num-input-all {
				font-size: 30rpx;
				font-weight: bold;
				color: $base-color;
        border-bottom: 1px solid $base-color;
        text-align: center;
			}
		}
	}
	.moneyWithdraw-rate {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		background-color: #ffffff;
    margin-bottom: 20rpx;
		padding: 0rpx 30rpx 20rpx 30rpx;
		text {
			&:nth-child(1) {
				flex-grow: 1;
				text-align: left;
				color: #333333;
				font-size: 24rpx;
			}
			&:nth-child(2) {
				flex-grow: 1;
				text-align: right;
				color: #333333;
				font-size: 24rpx;
			}
		}
	}
	.moneyWithdraw-code {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: flex-start;
		width: 100%;
		padding: 20rpx 30rpx 20rpx 30rpx;
		background-color: #ffffff;
		.moneyWithdraw-code-tip {
			width: 100%;
			font-size: 28rpx;
			color: $base-color;
			text-align: left;
		}
		.moneyWithdraw-code-input {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			width: 100%;
			padding: 10rpx 0rpx 0rpx 0rpx;
			border-bottom: 1rpx solid $line-color;
			.moneyWithdraw-code-input-input {
				flex-grow: 1;
				height: 88rpx;
        font-size: 28rpx;
				padding-right: 20rpx;
			}
		}
	}
</style>
