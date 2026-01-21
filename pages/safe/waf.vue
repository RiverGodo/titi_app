<template>
	<view class="wrapper">
		<image class="safe" mode="widthFix" :src="cdn + '/static/waf/safe.png'"/>
		<view class="title">疑似非法访问，如有问题，请联系客服~</view>
		<view class="btn" @click="jumpHome">正在返回首页，剩余时间：<text class="import">{{time}}</text> 秒</view>
	</view>
</template>

<script>
let timer = null;
	export default {
		data() {
			return {
				cdn: this.$cdn,
				time: 5,
			}
		},
		onLoad(){
			timer && clearInterval(timer);
			timer = setInterval(() => {
				this.time--;
				if(this.time <= 0){
					timer && clearInterval(timer);
					this.jumpHome();
				}
			}, 1000)
		},
		methods: {
			jumpHome(){
				uni.switchTab({url: '/pages/bar/home'})
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.wrapper {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.safe{
			width: 200rpx;
		}
		.title{
			font-size: 28rpx;
			color: #000;
			padding-top: 40rpx;
			padding-bottom: 100rpx;
		}
		.btn{
			color:#999;
			font-size: 24rpx;
			letter-spacing: 4rpx;
			border-radius: 10rpx;
			padding: 20rpx 40rpx;
			margin-bottom: 100rpx;
			.import{
				color: $base-color;
				font-size: 50rpx;
				padding: 0 10rpx;
			}
		}
	}

</style>