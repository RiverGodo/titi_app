<template>
	<view class="ai">
		<view :style="'background-image: url('+ backImg +');'" class="ai_t">
			<view class="ai_t_t">
				广告卡余额（张）
			</view>
			<view class="ai_t_m">
				899600
			</view>
			<view class="ai_t_b w_flex_center">
				<view class="ai_t_b_s">
					累计消耗 <text>198</text>（张）
				</view>
				<view class="line"></view>
				<view class="ai_t_b_s">
					今日消耗 <text>14</text>（张）
				</view>
			</view>
		</view>
		<view class="ai_m">
			<view class="home_t_3">
				<view class="home_t_3_t">今天</view>
				<view class="home_t_3_m">
					<view class="home_t_3_s">
						<view class="home_t_3_s_t">曝光量</view>
						<view class="home_t_3_s_b">1009 <text>（次）</text></view>
					</view>
					<view class="home_t_3_s">
						<view class="home_t_3_s_t">增加曝光时长</view>
						<view class="home_t_3_s_b">1089 <text> (秒)</text></view>
					</view>
					<view class="home_t_3_s">
						<view class="home_t_3_s_t">购买量</view>
						<view class="home_t_3_s_b">10 <text>（次）</text></view>
					</view>
					<view class="home_t_3_s">
						<view class="home_t_3_s_t">平均点击率</view>
						<view class="home_t_3_s_b">10%</view>
					</view>
					<view class="home_t_3_s">
						<view class="home_t_3_s_t">点击量</view>
						<view class="home_t_3_s_b">200 <text>（次）</text></view>
					</view>
					<view class="home_t_3_s">
						<view class="home_t_3_s_t">消耗广告卡</view>
						<view class="home_t_3_s_b">14 <text>（张）</text></view>
					</view>
				</view>
			</view>
			<view class="home_t_3">
				<view class="home_t_3_t">曝光量</view>
				<view class="home_t_3_m">
					<view class="home_t_3_s">
						<view class="home_t_3_s_t">曝光量</view>
						<view class="home_t_3_s_b">1009 <text>（次）</text></view>
					</view>
					<view class="home_t_3_s">
						<view class="home_t_3_s_t">增加曝光时长</view>
						<view class="home_t_3_s_b">1089 <text> (秒)</text></view>
					</view>
					<view class="home_t_3_s">
						<view class="home_t_3_s_t">购买量</view>
						<view class="home_t_3_s_b">10 <text>（次）</text></view>
					</view>
					<view class="home_t_3_s">
						<view class="home_t_3_s_t">平均点击率</view>
						<view class="home_t_3_s_b">10%</view>
					</view>
					<view class="home_t_3_s">
						<view class="home_t_3_s_t">点击量</view>
						<view class="home_t_3_s_b">200 <text>（次）</text></view>
					</view>
					<view class="home_t_3_s">
						<view class="home_t_3_s_t">消耗广告卡</view>
						<view class="home_t_3_s_b">14 <text>（张）</text></view>
					</view>
				</view>
			</view>
		</view>
		<view class="ai_b">
			<view @click="navTo('/pages_store/ad/myAd/adInfo/adRechargeList', {login: true})" class="ai_b_s w_flex_center">
				<text class="ai_b_s_l iconfont">&#xe62f;</text>
				<text class="ai_b_s_t">充值记录</text>
				<text class="ai_b_s_r iconfont">&#xe601;</text>
			</view>
			<view @click="navTo('/pages_store/ad/myAd/adInfo/adDeductionList', {login: true})" class="ai_b_s w_flex_center">
				<text class="ai_b_s_l iconfont">&#xe62f;</text>
				<text class="ai_b_s_t">扣款记录</text>
				<text class="ai_b_s_r iconfont">&#xe601;</text>
			</view>
			<!-- <view class="ai_b_s w_flex_center">
				<text class="ai_b_s_l iconfont">&#xe62f;</text>
				<text class="ai_b_s_t">广告资质管理</text>
				<text class="ai_b_s_r iconfont">&#xe601;</text>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backImg: this.$cdn + "/static/ad-back1.png",
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.ai {
		margin: 0 20rpx;

		.ai_t {
			background-size: 100% 100%;
			background-repeat: no-repeat;
			height: 250rpx;
			padding-top: 51rpx;
			padding-left: 53rpx;
			padding-bottom: 30rpx;

			.ai_t_t {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
				margin-bottom: 20rpx;
			}

			.ai_t_m {
				font-size: 72rpx;
				font-family: Arial;
				font-weight: bold;
				color: #FFFFFF;
				margin-bottom: 20rpx;
			}

			.ai_t_b {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;

				.line {
					width: 1rpx;
					height: 30rpx;
					background: #EEEEEE;
					margin: 0 25rpx;
				}
			}
		}

		.ai_b {
			.ai_b_s {
				height: 150rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				margin-top: 36rpx;
				padding: 0 40rpx;

				.ai_b_s_l {
					font-size: 60rpx;
					margin-right: 28rpx;
				}

				.ai_b_s_t {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #000000;
				}

				.ai_b_s_r {
					margin-left: auto;
					font-size: 10rpx;
				}
			}
		}
	}

	.home_t_3 {
		.home_t_3_t {
			width: 132rpx;
			height: 40rpx;
			border-radius: 10rpx;
			background: #FFFFFF;
			margin-top: 25rpx;
			margin-bottom: 23rpx;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #969696;
			line-height: 40rpx;
			padding-left: 13rpx;
			border: 1px solid #f3f3f3;
		}

		.home_t_3_m {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;

			.home_t_3_s {
				width: 218rpx;
				// height: 121rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				border: 1px solid #f3f3f3;
				margin-bottom: 29rpx;

				.home_t_3_s_t {
					margin-top: 30rpx;
					margin-left: 34rpx;
					margin-bottom: 20rpx;
					font-size: 24rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #969696;
				}

				.home_t_3_s_b {
					font-size: 32rpx;
					font-family: Arial;
					font-weight: bold;
					color: #000000;
					margin-left: 34rpx;
					padding-bottom: 23rpx;

					text {
						font-size: 16rpx;
					}
				}
			}
		}
	}
</style>