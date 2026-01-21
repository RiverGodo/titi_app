<template>
	<view class="main">
		<image class="logo" :src="cdn + '/logo.png'" mode="widthFix"></image>
		<text class="title">友惠见</text>
		<text
			class="content">中国1000多万部电梯拥有6亿乘梯族，为保证出行最后100米的安全，帮助国家电梯安全维保政务数据化，友惠见-梯梯助手通过免费为写字楼提供电梯无纸化维保设备做突破口，获取3亿写字楼刚需高频的手机用户，通过上班必扫获取商家优惠促销奖励活动，以友惠见APP加电梯广告屏为载体，通过虚拟人助理为写字楼商户提供工作生活支持，利用时空聚集优势持续优化互联者的价值，最终实现一个千亿市值以上的平台。</text>
		<view class="main_center">
			<view @click="navTo('/pages/announce/detail?id=1')" class="main_center_s">
				用户协议
				<text class="iconfont">&#xe601;</text>
			</view>
			<view @click="navTo('/pages/announce/detail?id=2')" class="main_center_s">
				隐私政策
				<text class="iconfont">&#xe601;</text>
			</view>
			<view @click="navTo('/pages/announce/detail?id=3')" class="main_center_s">
				商家入驻服务协议
				<text class="iconfont">&#xe601;</text>
			</view>
		<!-- 	<view style="border: none;" class="main_center_s">
				给我评分
				<text class="iconfont">&#xe601;</text>
			</view> -->
		</view>
		<view class="main_b">Copyright@2022-2023梯梯助手51uhj.com 版权所有</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cdn: this.$cdn
			}
		},
		methods: {

		},
		onLoad() {},
	}
</script>

<style scoped lang="scss">
	.main_center {
		background: #FFFFFF;
		border: 1px solid #EEEEEE;
		border-radius: 20rpx;
		width: 711rpx;
		margin-top: 106rpx;

		.main_center_s {
			border-bottom: 1px solid #EEEEEE;
			padding: 37rpx 34rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}

	page {
		background-color: #fff;
	}

	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.title {
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #000000;
		margin-bottom: 39rpx;
	}

	.logo {
		background: #fff;
		// margin: 30rpx;
		width: 150rpx;
		height: 130rpx;
		margin-top: 100rpx;
		margin-bottom: 53rpx;
	}

	.content {
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #000000;
		line-height: 48rpx;
		margin: 0 50rpx;
	}

	.main_b {
		text-align: center;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #000000;
		line-height: 48rpx;
		padding-top: 260rpx;
	}
</style>