<template>
	<view class="bankCard-page">
		<view class="bankCard-me" v-if="bankCard">
			<view class="bankCard-me-title">当前绑定银行卡</view>
			<view class="bankCard-me-info">
				<text class="bankCard-me-info-name">{{bankCard.name}}</text>
				<text class="bankCard-me-info-number">{{bankCard.number}}</text>
			</view>
			<text class="bankCard-me-unbind" @click.stop="del">解绑</text>
		</view>
    <view class="bankCard-add" v-else>
      <text class="iconfont">&#xe607;</text>
      <view class="bankCard-add-btn" @click="navTo('/pages/money/bankAdd', {login: true})">
        <text class="bankCard-add-btn-txt">+&nbsp;添加银行卡</text>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bankCard: null,
			}
		},
		onShow() {
      this.getData();
    },
		methods: {
			async getData() {
				const res = await this.$get('/user-bank/get', {});
				this.bankCard = res.data;
			},
			del() {
				uni.showModal({
					title: '温馨提示',
					content: '您确认解绑银行卡吗？',
          confirmColor: "#FC5C39",
					success: (res) => {
						if (res.confirm) {
							this.unbind();
						}
					}
				});
			},
			async unbind() {
				await this.$post("/user-bank/del");
        this.$util.msg("解绑成功");
				await this.getData();
			}
		}
	}
</script>

<style scoped lang="scss">
	view,text{line-height: 1.8;}
page{
  background: #fff;
}
	.bankCard-page {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
	}
	.bankCard-add {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
		width: 100vw;
		background-color: #ffffff;
		padding: 60rpx 40rpx 60rpx 40rpx;
		.iconfont {
			font-size: 200rpx;
      color: #ccc;
		}
		.bankCard-add-btn {
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 120rpx;
			margin-top: 60rpx;
			border: 2rpx solid transparent;
			border-radius: 10rpx;
			background: linear-gradient(white, white) padding-box, repeating-linear-gradient(-45deg, #ccc 0, #ccc 0.5em, white 0, white 0.75em);
			.bankCard-add-btn-txt {
				text-align: center;
				color: $base-color;
				font-size: 30rpx;
			}
		}
	}
	.bankCard-me {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
		width: 100vw;
		background-color: #ffffff;
		padding: 30rpx 40rpx;
		.bankCard-me-title {
			text-align: left;
			color: #444;
      width:100%;
      margin-top: 40rpx;
			font-size: 30rpx;
		}
		.bankCard-me-info {
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
			width: 100%;
			background-color: #E1C86E;
			margin-top: 40rpx;
      border-radius: 20rpx;
			padding: 40rpx 30rpx 40rpx 30rpx;
			.bankCard-me-info-name {
				width: 100%;
				color: #ffffff;
				text-align: left;
				font-size: 30rpx;
			}
			.bankCard-me-info-number {
				width: 100%;
				color: #fff;
				text-align: center;
				font-size: 40rpx;
				font-weight: bold;
				padding: 80rpx 0rpx 20rpx 0rpx;
			}
		}
		.bankCard-me-unbind {
			text-align: center;
			color: $base-color;
			font-size: 28rpx;
			margin-top: 40rpx;
			border-bottom: 1rpx solid $base-color;
		}
	}
</style>