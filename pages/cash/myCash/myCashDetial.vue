<template>
	<view class="mcd">
		<view :style="'background-image: url('+ backImg +');background-repeat: no-repeat;'" class="mcd_b">
			<view class="mcd_t w_flex_center">
				<text class="mcd_t_l iconfont">&#xe669;</text>
				<view class="mcd_t_r">
					<text style="font-weight: bold;font-size: 36rpx;">{{cashDetial.statusStr}}</text></br>
					<text v-if="cashDetial.status === 1">欢迎下次再次使用哦</text>
					<text v-if="cashDetial.status === 0">请抓紧时间使用哦</text>
				</view>
			</view>
			<view class="mcd_m1">
				<view class="mcd_m1_t w_flex_start">
					<img class="mcd_m1_t_l" :src="$cdn + cashDetial.sellerLogo" alt="">
					<view class="mcd_m1_t_r">
						<view class="mcd_m1_t_r_t">{{cashDetial.name}}</view>
						<view class="mcd_m1_t_r_m">每人限制兑换{{cashDetial.perUserLimit}}张</view>
						<view class="mcd_m1_t_r_b">{{cashDetial.money}}积分</view>
					</view>
				</view>
				<view class="mcd_m1_b">
					小计（积分）：<text style="color: #FC5531;font-size: 32rpx;">{{cashDetial.money}}</text>
				</view>
			</view>
			<view class="mcd_m2">
				<view class="mcd_m2_t w_flex_center">
					<view class="mcd_m2_t_l">券码信息：</view>
					<view class="mcd_m2_t_r">
						<uqrcode class="ercode" :text="cashDetial.couponNo" :size="75"/>
					</view>
				</view>
				<view class="s_line w_flex_center">
					<view class="s_line_block block_l"></view>
					<view class="s_line_m"></view>
					<view class="s_line_block block_r"></view>
				</view>
				<view class="mcd_m2_m">
					<view class="mcd_m2_m_t w_flex_center">
						<view class="mcd_m2_m_t_l">券码：</view>
						<!-- <view class="mcd_m2_m_t_r">收起<text class="mcd_m2_m_t_r_i iconfont">&#xe605;</text></view> -->
					</view>
					<view class="mcd_m2_m_m">
						<view class="mcd_m2_m_m_s w_flex_center">
							<view class="mcd_m2_m_m_s_l">{{cashDetial.couponNo}}</view>
							<view class="mcd_m2_m_m_s_r">{{cashDetial.statusStr}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="mcd_m3">
				<view class="mcd_m3_s w_flex_start">
					<view class="mcd_m3_s_l">适用门店：</view>
					<view class="mcd_m3_s_r">{{shopDetial.name}}</view>
				</view>
				<view class="mcd_m3_s w_flex_start">
					<view class="mcd_m3_s_l">营业时间：</view>
					<view class="mcd_m3_s_r">{{shopDetial.rangeTime}}</view>
				</view>
				<view style="margin: 0;" class="mcd_m3_s w_flex_start">
					<view class="mcd_m3_s_l">店铺地址：</view>
					<view class="mcd_m3_s_r">{{shopDetial.address}}703号房</view>
				</view>
			</view>
			<view class="mcd_m3">
				<view class="mcd_m3_t">
					温馨提示
				</view>
				<view class="mcd_m3_s w_flex_start">
					<view class="mcd_m3_s_l">使用时间：</view>
					<view class="mcd_m3_s_r">{{shopDetial.rangeTime}}</view>
				</view>
				<view class="mcd_m3_s w_flex_start">
					<view class="mcd_m3_s_l">使用限制：</view>
					<view class="mcd_m3_s_r">一周只能使用一次</view>
				</view>
				<!-- <view style="margin: 0;" class="mcd_m3_s w_flex_start">
					<view class="mcd_m3_s_l">使用规则：</view>
					<view class="mcd_m3_s_r">
						本单发票由商家提供，详情咨询商家</br>仅限店内使用</br>不可叠加使用</br>无需预约，消费高峰期可能需要等位酒水</br>饮料等问题可致电商家咨询</view>
				</view> -->
			</view>
			<view class="mcd_m3">
				<view class="mcd_m3_t">
					订单信息
				</view>
				<view class="mcd_m3_s w_flex_start">
					<view class="mcd_m3_s_l">订单编号：</view>
					<view class="mcd_m3_s_r">{{cashDetial.orderNo}}</view>
					<view class="mcd_m3_s_b" @click="copy(cashDetial.orderNo)">复制</view>
				</view>
				<view class="mcd_m3_s w_flex_start">
					<view class="mcd_m3_s_l">下单时间：</view>
					<view class="mcd_m3_s_r">{{cashDetial.updateTime}}</view>
				</view>
				<view class="mcd_m3_s w_flex_start">
					<view class="mcd_m3_s_l">支付方式：</view>
					<view class="mcd_m3_s_r">积分兑换</view>
				</view>
				<view class="mcd_m3_s w_flex_start">
					<view class="mcd_m3_s_l">数量：</view>
					<view class="mcd_m3_s_r">{{cashDetial.num}}</view>
				</view>
				<view class="mcd_m3_s w_flex_start">
					<view class="mcd_m3_s_l">合计：</view>
					<view class="mcd_m3_s_r">{{cashDetial.money}}(积分)</view>
				</view>
				<view class="mcd_m3_s w_flex_start">
					<view class="mcd_m3_s_l">兑换时间：</view>
					<view class="mcd_m3_s_r">{{cashDetial.updateTime}}</view>
				</view>
				<view class="mcd_m3_b">
					应付积分：<text style="color: #FC5531;">{{cashDetial.money}}</text>
				</view>
			</view>
			<view style="width: 100%;height: 25rpx;" class="bottom"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backImg: this.$cdn + '/static/cash-back4.png',
				cashDetial: {},
				shopDetial: {}
			}
		},
		onLoad(option) {
			this.cashID = option.id
			this.init(option.id)
		},
		methods: {
			async init(id) {
				let res = await this.$get('/coupon/detail', {
					id: id
				});
				let res2 = await this.$get('/seller/find', {
					id: res.data.sellerId
				});
				this.cashDetial = res.data
				this.shopDetial = res2.data
			},
			copy(text){
				uni.setClipboardData({
					data: text,
					success: () => {
						this.$util.msg('复制成功');
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.s_line {
		justify-content: space-between;

		.s_line_m {
			width: 100%;
			height: 1rpx;
			background: #F6F6F6;
		}

		.s_line_block {
			width: 40rpx;
			height: 40rpx;
			background: #F6F6F6;
		}

		.block_l {
			border-radius: 0 50% 50% 0;
			margin-left: -20rpx;
		}

		.block_r {
			border-radius: 50% 0 0 50%;
			margin-right: -20rpx;
		}
	}

	.mcd_b {
		width: 100%;
		height: 380rpx;
		padding-top: 40rpx;

		.mcd_t {
			margin-left: 35rpx;
			margin-bottom: 35rpx;

			.mcd_t_l {
				font-size: 77rpx;
				color: #FFFFFF;
				margin-right: 27rpx;
			}

			.mcd_t_r {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				color: #FFFFFF;
				line-height: 48rpx;
			}
		}

		.mcd_m1 {
			background: #FFFFFF;
			border-radius: 20rpx;
			margin: 0 20rpx;
			padding: 0 25rpx;
			padding-top: 33rpx;
			padding-bottom: 27rpx;

			.mcd_m1_t {
				border-bottom: 1px solid #E2E2E2;
				padding-bottom: 20rpx;

				.mcd_m1_t_l {
					width: 140rpx;
					height: 140rpx;
					margin-right: 27rpx;
				}

				.mcd_m1_t_r {
					.mcd_m1_t_r_t {
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: bold;
						color: #000000;
						margin-bottom: 20rpx;
					}

					.mcd_m1_t_r_m {
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #969696;
						margin-bottom: 40rpx;
					}

					.mcd_m1_t_r_b {
						font-size: 28rpx;
						font-family: Arial;
						font-weight: bold;
						color: #FC5531;
					}
				}
			}

			.mcd_m1_b {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #969696;
				text-align: right;
				margin-top: 25rpx;
			}
		}

		.mcd_m2 {
			background: #FFFFFF;
			border-radius: 20rpx;
			// padding: 0 25rpx;
			margin: 0 20rpx;
			margin-top: 29rpx;

			.mcd_m2_t {
				justify-content: space-between;
				padding-top: 30rpx;
				margin-left: 33rpx;
				margin-right: 23rpx;

				.mcd_m2_t_l {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #000000;
				}

				.mcd_m2_t_r {
					width: 150rpx;
					height: 150rpx;
				}
			}

			.mcd_m2_m {
				margin: 0 33rpx;
				margin-top: 20rpx;
				padding-bottom: 40rpx;

				.mcd_m2_m_t {
					justify-content: space-between;
					margin-bottom: 27rpx;

					.mcd_m2_m_t_l {
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: bold;
						color: #000000;
					}

					.mcd_m2_m_t_r {
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #01CF79;

						// line-height: 48rpx;
						.mcd_m2_m_t_r_i {
							margin-left: 14rpx;
						}
					}
				}

				.mcd_m2_m_m {
					.mcd_m2_m_m_s {
						justify-content: space-between;

						.mcd_m2_m_m_s_l {
							font-size: 26rpx;
							font-family: Source Han Sans CN;
							font-weight: 400;
							// text-decoration: line-through;
							color: #000000;
							line-height: 48rpx;
						}

						.is_use {
							color: #969696;
							text-decoration: line-through;
						}

						.mcd_m2_m_m_s_r {
							font-size: 26rpx;
							font-family: Source Han Sans CN;
							font-weight: 400;
							color: #000000;
							line-height: 48rpx;
						}
					}
				}
			}
		}

		.mcd_m3 {
			background: #FFFFFF;
			border-radius: 20rpx;
			margin: 0 20rpx;
			margin-top: 30rpx;
			padding: 38rpx 48rpx 36rpx 38rpx;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #000000;

			.mcd_m3_t {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #000000;
				margin-bottom: 36rpx;
			}

			.mcd_m3_s {
				margin-bottom: 37rpx;

				.mcd_m3_s_l {
					line-height: 48rpx;
					width: 152rpx;
				}

				.mcd_m3_s_r {
					line-height: 48rpx;
					width: 480rpx;
				}

				.mcd_m3_s_b {
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

			.mcd_m3_b {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #000000;
				// line-height: 60rpx;
				text-align: right;
				border-top: 1px solid #E2E2E2;
				padding-top: 24rpx;
			}
		}
	}
</style>