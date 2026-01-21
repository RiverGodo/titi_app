<template>
	<view class="od">
		<view :style="'background-image: url('+ backImg[type] +');'" class="od_t">
			<view class="od_t_t w_flex_center">
				<text class="iconfont">&#xe619;</text>
				<view class="od_t_t_r">
					<view style="font-size: 36rpx;margin-bottom: 20rpx;font-weight: bold;">已取消</view>
					订单已取消，欢迎再次购买
				</view>
			</view>
			<view class="od_t_m">
				<view class="od_t_m_t w_flex_center">
					<image class="od_t_m_t_i" :src="backImg[type]"></image>
					<view class="od_t_m_t_r">
						<view class="od_t_m_t_r_t">TT平台商户广告卡</view>
						<view class="od_t_m_t_r_b w_flex_center">单价 <text>￥10</text></view>
					</view>
				</view>
				<view class="od_t_m_b">
					小计：<text>￥10.00</text>
				</view>
			</view>
			<view class="od_t_e">
				<view class="od_t_e_t">订单信息</view>
				<view class="od_t_e_m">
					<view class="od_t_e_m_s w_flex_center">
						<view class="od_t_e_m_s_l">订单编号:</view>
						<view class="od_t_e_m_s_c">456465455707540441165</view>
						<view class="od_t_e_m_s_r">复制</view>
					</view>
					<view class="od_t_e_m_s w_flex_center">
						<view class="od_t_e_m_s_l">下单时间:</view>
						<view class="od_t_e_m_s_c">2023-02-18 10:01</view>
					</view>
					<view class="od_t_e_m_s w_flex_center">
						<view class="od_t_e_m_s_l">数 量:</view>
						<view class="od_t_e_m_s_c">1</view>
					</view>
					<view class="od_t_e_m_s w_flex_center">
						<view class="od_t_e_m_s_l">合 计:</view>
						<view class="od_t_e_m_s_c"> <text>￥10</text> </view>
					</view>
				</view>
				<view class="od_t_e_e">
					应付金额：<text>￥10.06</text>
				</view>
			</view>
		</view>
		<view class="od_b w_flex_center">
			<view @click="$refs.popup.open()" class="od_b_b b_b_l">取消订单</view>
			<view class="od_b_b b_b_r">去支付</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup_m">
				<view class="popup_m_t">取消订单</view>
				<view class="popup_m_d">请选择取消订单的原因（必选）：</view>
				<view class="popup_m_m">
					<view class="popup_m_m_s">
						<radio-group @change="radioChange">
							<view class="od_radio">
								<radio color="#FC5C39" value="0" ><text>不想要了</text></radio>
							</view>
							<view class="od_radio">
								<radio color="#FC5C39" value="1" ><text>商品错选/多选</text></radio>
							</view>
							<view class="od_radio">
								<radio color="#FC5C39" value="2" ><text>加个高了</text></radio>
							</view>
							<view class="od_radio">
								<radio color="#FC5C39" value="3" ><text>没用/少用/错用优惠</text></radio>
							</view>
						</radio-group>
					</view>
				</view>
				<view class="popup_m_b">提 交</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backImg: [
					this.$cdn + '/static/order-back1.png',
					this.$cdn + '/static/order-back2.png',
					this.$cdn + '/static/order-back3.png'
				],
				type: 0
			}
		},
		onLoad(option) {
			this.type = option.type ? option.type : 0
		},
		methods: {
			radioChange(event) {
				console.log(event);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup_m {
		background: #FFFFFF;
		border-radius: 30rpx 30rpx 0 0;
		padding: 0 20rpx;
		padding-top: 48rpx;
		padding-bottom: 22rpx;

		.popup_m_t {
			font-size: 36rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #000000;
			margin-bottom: 27rpx;
			margin-left: 10rpx;
		}

		.popup_m_d {
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #969696;
			margin-bottom: 47rpx;
			margin-left: 10rpx;
		}
		
		.popup_m_m{
			margin-left: 10rpx;
		}

		.popup_m_b {
			width: 710rpx;
			height: 79rpx;
			background: #FC5531;
			border-radius: 39rpx;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #FFFFFF;
			line-height: 79rpx;
			text-align: center;
			margin-top: 56rpx;
		}

		.od_radio {
			margin-bottom: 39rpx;
			text{
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #000000;
				margin-left: 22rpx;
			}
		}
	}

	.od_t {
		width: 100%;
		height: 230rpx;
		background-repeat: no-repeat;
		background-size: 100% 100%;

		.od_t_t {
			margin: 0 20rpx;
			padding-top: 45rpx;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			color: #ffffff;

			.iconfont {
				font-size: 77rpx;
				margin-right: 28rpx;
			}
		}

		.od_t_m {
			background: #FFFFFF;
			border-radius: 20rpx;
			padding: 25rpx;
			margin: 0 20rpx;
			margin-top: 36rpx;

			.od_t_m_t_i {
				width: 200rpx;
				height: 150rpx;
				background: #FFFFFF;
				border-radius: 10rpx;
				margin-right: 35rpx;
				min-width: 200rpx;
			}

			.od_t_m_t_r {
				width: 100%;

				.od_t_m_t_r_t {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #000000;
					height: 87rpx;
				}

				.od_t_m_t_r_b {
					justify-content: space-between;
					font-size: 20rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #969696;

					text {
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: bold;
						color: #FC5531;
					}
				}
			}

			.od_t_m_b {
				text-align: right;
				border-top: 1px solid #E2E2E2;
				padding-top: 26rpx;
				margin-top: 25rpx;
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #000000;

				text {
					color: #FC5531;
				}
			}
		}

		.od_t_e {
			background: #FFFFFF;
			border-radius: 20rpx;
			padding: 30rpx;
			margin: 0 20rpx;
			margin-top: 31rpx;

			.od_t_e_t {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #000000;
				margin-bottom: 32rpx;
			}

			.od_t_e_m {
				.od_t_e_m_s {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					color: #000000;
					margin-bottom: 30rpx;

					.od_t_e_m_s_l {
						margin-right: 20rpx;
					}

					.od_t_e_m_s_c {
						text {
							color: #FC5531;
						}
					}

					.od_t_e_m_s_r {
						margin-left: auto;
						width: 90rpx;
						height: 39rpx;
						background: #EEEEEE;
						border: 2px solid #D1D1D1;
						border-radius: 6rpx;
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #969696;
						line-height: 30rpx;
						text-align: center;
					}
				}
			}
		}

		.od_t_e_e {
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #000000;
			text-align: right;
			border-top: 1px solid #E2E2E2;
			padding-top: 30rpx;

			text {
				color: #FC5531;
			}
		}
	}

	.od_b {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0rpx 5rpx 8rpx 0rpx #000000;
		padding: 8rpx 0;

		.od_b_b {
			width: 223rpx;
			height: 82rpx;
			border-radius: 40rpx;
			text-align: center;
			line-height: 76rpx;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
		}

		.b_b_l {
			margin-left: auto;
			border: 2px solid #EEEEEE;
			color: #969696;
		}

		.b_b_r {
			background: #FC5531;
			border: 2px solid #FC5531;
			color: #FFFFFF;
			margin-right: 20rpx;
			margin-left: 7rpx;
		}

	}
</style>