<template>
	<view class="wrapper">
		<common-wx-header name="等待审核" />
		<view class="box">
			<view class="iconfont">&#xe72e;</view>
			<view class="content">
				提交申请成功，请耐心等待审核！
			</view>
		</view>
		<view class="tips">
			<view class="item">
				审核过程中业务员会联系您 <text class="important">{{mobile}}</text>的手机号，请注意来自东莞100开头的电话；
			</view>
			<view class="item">
				审核通过后您可登录系统发布广告优惠等；
			</view>
		</view>
		<view class="btn">
			<mix-button ref="confirmBtn" text="我已知晓" marginTop="40rpx" @onConfirm="confirm"></mix-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: ''
			}
		},
		onLoad(data) {
			this.mobile = data.mobile
		},
		methods: {
			confirm() {
				this.$refs.confirmBtn.stop();
				uni.switchTab({
					url: "/pages/bar/mine"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	view,text{line-height: 1.8;}
	page {
		background: $bg-color;
	}

	.wrapper {
		.box {
			background: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;

			.iconfont {
				color: green;
				font-size: 150rpx;
			}

			.content {
				padding-bottom: 40rpx;
			}
		}

		.tips {
			color: #333;
			margin-top: 20rpx;
			background: #fff;

			.item {
				font-size: 28rpx;
				margin-bottom: 30rpx;
			}

			.important {
				font-size: 36rpx;
				padding: 0 20rpx;
				color: $base-color;
			}

			padding: 40rpx 30rpx;
		}
	}
</style>