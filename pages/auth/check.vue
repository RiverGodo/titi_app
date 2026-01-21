<template>
	<view class="app" v-if="init">
		<common-wx-header name="审核结果" />
		<view class="container">
			<view class="back-btn" @click="navBack">
				<text class="iconfont">&#xe629;</text>
			</view>
			<view class="iconfont wait" v-if="!reason">&#xe6d5;</view>
			<view class="iconfont wait" v-if="reason">&#xe7d0;</view>
			<view class="tip" v-if="reason">
				<view>您的申请不通过，理由如下：</view>
				<view class="reason">{{reason}}</view>
				<view class="btn" @click="reply">重新申请</view>
			</view>
			<view class="tip" v-if="!reason">您的申请正在审核中，请耐心等待～</view>
		</view>
	</view>
</template>

<script>
	import CommonWxHeader from "../../components/common-wx-header/common-wx-header.vue";

	export default {
		components: {
			CommonWxHeader
		},
		data() {
			return {
				init: false,
				reason: ""
			}
		},
		onLoad(options) {
			this.reason = options.r;
			this.init = true;
		},
		methods: {
			navBack() {
				this.back();
			},
			reply() {
				// uni.redirectTo({
				// 	url: "/pages/merchant/apply/shop_select_category"
				// })
				this.navTo('/pages/merchant/apply/shop_select_category', {
					login: true
				})
			}
		}
	}
</script>

<style scoped lang='scss'>
	view,
	text {
		line-height: 1.8;
	}

	.app {
		height: 100vh;
		background: #fff;
		display: flex;
		flex-direction: column;
	}

	.container {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.tip {
		view {
			line-height: 1.8;
		}

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		color: #333;
		padding: 0rpx 10rpx 100rpx;

		.reason {
			color: red;
		}

		.btn {
			margin-top: 20rpx;
			background: $base-color;
			width: 120rpx;
			height: 60rpx;
			border-radius: 10rpx;
			line-height: 60rpx;
			text-align: center;
			color: #fff;
			font-size: 24rpx;
		}
	}

	.wait {
		font-size: 100rpx;
		color: #999;
		margin-bottom: 30rpx;
	}

	.back-btn {
		position: absolute;
		top: 30rpx;
		left: 30rpx;
		z-index: 99;
		background: rgba(0, 0, 0, .5);
		width: 60rpx;
		height: 60rpx;
		border-radius: 30rpx;
		align-items: center;
		display: flex;
		justify-content: center;

		.iconfont {
			font-size: 36rpx;
			color: #fff;
		}
	}
</style>