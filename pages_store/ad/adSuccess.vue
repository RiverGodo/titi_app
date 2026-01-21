<template>
	<view class="cs">
		<view :style="'background-image: url('+ backImg +');'" class="cs_top ">
			<view class="cs_top_m w_flex_center">
				<img class="cs_top_img" :src="successImg" alt="">
				<view class="cs_top_text">
					<text style="font-weight: bold;font-size: 36rpx;">支付成功!</text> </br>感谢您的购买
				</view>
			</view>
			<view @click="jumpOrder" class="cs_top_btn">
				查看订单
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
			id: 0,
		}
	},
	onLoad(option){
		this.id = option.id
	},
	methods: {
		jumpOrder(){
			let url = '/pages_store/order/buyOrder/orderDetial?id=' + this.id;
			uni.redirectTo({url})
		}
	}
}
</script>

<style lang="scss" scoped>
.cs_top_m {
	justify-content: center;
	padding-top: 88rpx;
}

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
		margin-right: 12rpx;
	}

	.cs_top_text {
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		color: #FFFFFF;
		line-height: 48rpx;
		text-align: center;
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
		margin-top: 150rpx;
	}
}
</style>