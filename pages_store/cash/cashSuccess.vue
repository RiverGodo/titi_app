<template>
	<view class="cs">
		<view :style="'background-image: url('+ backImg +');'" class="cs_top">
			<img class="cs_top_img" :src="successImg" alt="">
			<view class="cs_top_text">
				<text style="font-weight: bold;font-size: 36rpx;">兑换成功</text> </br>现金券已发放至【我的-现金券】</br>
				当前现金豆剩余：{{points}}
			</view>
			<view @click="navTo('/pages_store/cash/myCash/myCash',{login: true})" class="cs_top_btn">
				确认
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backImg: this.$cdn + "/static/cash-back2.png",
				successImg: this.$cdn + "/static/cash-success.png",
				points:0
			}
		},
		created() {
			this.init()
		},
		methods: {
			async init() {
				let res3 = await this.$get('/seller/wallet/balance');
				this.points = res3.data.bean
			},
		}
	}
</script>

<style lang="scss" scoped>
	.cs_top {
		width: 100%;
		height: 456rpx;
		background-size: 100% 100%;
		text-align: center;

		.cs_top_img {
			// margin-top: 36rpx;
			margin-bottom: 15rpx;
			width: 150rpx;
			height: 150rpx;
		}

		.cs_top_text {
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			color: #FFFFFF;
			line-height: 60rpx;
		}

		.cs_top_btn {
			width: 417rpx;
			height: 81rpx;
			background: #FFFFFF;
			border: 1px solid #E2E2E2;
			border-radius: 40rpx;
			font-size: 36rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #01CF79;
			line-height: 76rpx;
			margin: 0 auto;
			margin-top: 60rpx;
		}
	}
</style>