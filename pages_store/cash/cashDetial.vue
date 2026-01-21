<template>
	<view class="cash_detial">
		<view class="cash_detial_b">
			<view class="cash_detial_m">
				<view class="s1 w_flex_end">
					<cash-back :price="item.price" class="s1_img"></cash-back>
					<view class="s1_right">
						<view class="s1_r_t">
							{{cashDetial.name}}
						</view>
						<view class="s1_r_b w_flex_center">
							<view class="s1_r_b_l">{{cashDetial.costBean}}现金豆</view>
							<view class="s1_r_b_r">已兑换：{{cashDetial.hadSale}}</view>
						</view>
					</view>
				</view>
				<view class="s_line w_flex_center">
					<view class="s_line_block block_l"></view>
					<view class="s_line_m"></view>
					<view class="s_line_block block_r"></view>
				</view>
				<view class="s2">
					<view class="s2_t1">
						<view style="margin-top: 8rpx;" class="s2_title">
							<view class="s2_title_l w_flex_center">
								<view class="s2_title_block">
									!
								</view>
								<view class="s2_title_text">
									须知
								</view>
							</view>
							<view class="s2_title_b">
								<view class="s2_title_b_s w_flex_center">
									<view class="s2_title_b_s_l">限制：</view>
									<view class="s2_title_b_s_r">一次只能使用一张</view>
								</view>
								<!-- <view class="s2_title_b_s w_flex_center">
									<view class="s2_title_b_s_l">可用时段：</view>
									<view class="s2_title_b_s_r">8:00-12:00 14:00-22:00</view>
								</view> -->
								<view class="s2_title_b_s w_flex_center">
									<view class="s2_title_b_s_l">数量：</view>
									<view v-if="cashDetial.total" class="s2_title_b_s_t">{{cashDetial.total}}张</view>
									<view v-else class="s2_title_b_s_t">不限</view>
								</view>
								<view class="s2_title_b_s w_flex_center">
									<view class="s2_title_b_s_l">剩余：</view>
									<view class="s2_title_b_s_t">{{cashDetial.total - cashDetial.hadSale}}张</view>
								</view>
							</view>
						</view>
					</view>
					<view class="s2_t1">
						<view class="s2_title w_flex_center">
							<view class="s2_title_l w_flex_center">
								<view class="s2_title_block">
									保
								</view>
								<view class="s2_title_text">
									保障
								</view>
							</view>
							<view class="s2_title_r">随时退</view>
						</view>
					</view>
					<view class="s2_t1">
						<view class="s2_title w_flex_center">
							<view class="s2_title_l w_flex_center">
								<view class="s2_title_block">
									限
								</view>
								<view class="s2_title_text">
									限制
								</view>
							</view>
							<view class="s2_title_r">每人可领{{cashDetial.perUserLimit}}张</view>
						</view>
					</view>
				</view>
				<view class="s3">
					<view class="s3_s">
						<view class="s3_s_t">
							适用门店
						</view>
						<view class="s3_s_m w_flex_start">
							<view class="s3_s_m_l">
								<img class="s3_img" :src="$cdn + shopData.logo" alt="">
							</view>
							<view class="s3_s_m_r">
								{{cashDetial.sellerName}}
							</view>
						</view>
					</view>
					<view class="s3_s">
						<view class="s3_s_t">
							营业时间：
						</view>
						<view class="s3_s_text">
							{{shopData.rangeTime}}
						</view>
					</view>
					<view class="s3_s">
						<view class="s3_s_t">
							店铺地址：
						</view>
						<view class="s3_s_text w_flex_start">
							{{shopData.address}}
							<view class="s3_s_text_r">
								<text class="s3_icon iconfont">&#xe96c;</text>
								<view class="s3_s_text_t">
									电话
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cash_detial_t w_flex_center">
				<view class="cash_detial_m_block"></view>
				<view class="cash_detial_m_text">购买<text style="color: #01C862;">须知</text></view>
			</view>
			<view class="cash_detial_e">
				<view class="cash_detial_m_s">
					<view class="cash_detial_m_s_t w_flex_center">
						<text class="cash_detial_m_s_t_icon iconfont">&#xe8c9;</text>
						<view class="cash_detial_m_s_t_t">现金券类型</view>
					</view>
					<view class="cash_detial_m_s_m">
						立减券
					</view>
				</view>
				<view class="cash_detial_m_s">
					<view class="cash_detial_m_s_t w_flex_center">
						<text class="cash_detial_m_s_t_icon iconfont">&#xe67c;</text>
						<view class="cash_detial_m_s_t_t">使用时间</view>
					</view>
					<view class="cash_detial_m_s_m">
						{{shopData.rangeTime}}
					</view>
				</view>
				<view class="cash_detial_m_s">
					<view class="cash_detial_m_s_t w_flex_center">
						<view class="s2_title_block">
							限
						</view>
						<view class="cash_detial_m_s_t_t">使用限制</view>
					</view>
					<view class="cash_detial_m_s_m">
						一次只能使用一张
					</view>
				</view>
				<!-- <view class="cash_detial_m_s">
					<view class="cash_detial_m_s_t w_flex_center">
						<text class="cash_detial_m_s_t_icon iconfont">&#xe96c;</text>
						<view class="cash_detial_m_s_t_t">使用范围</view>
					</view>
					<view class="cash_detial_m_s_m">
						部分商品可用
					</view>
				</view>
				<view class="cash_detial_m_s">
					<view class="cash_detial_m_s_t w_flex_center">
						<text class="cash_detial_m_s_t_icon iconfont">&#xe96c;</text>
						<view class="cash_detial_m_s_t_t">使用规则</view>
					</view>
					<view class="cash_detial_m_s_m">
						本单发票由商家提供，详情咨询商家仅限店内使用不 可叠加使用无需预约，消费高峰期可能需要等位酒水 饮料等问题可致电商家咨询
					</view>
				</view> -->
			</view>
			<mix-button class="confirmBtn" ref="confirmBtn" @onConfirm="handleConfirm()" text="立即兑换" />
			<view style="width: 100%;height: 22rpx;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cashID: '',
				cashDetial: {},
				shopData: {}
			}
		},
		onLoad(option) {
			this.cashID = option.id
			this.init(option.id)
		},
		methods: {
			handleConfirm() {
				this.navTo('/pages_store/cash/cashExchange?id=' + this.cashID)
			},
			async init(id) {
				let res = await this.$get('/seller/coupon/get', {
					id: id
				});
				let res2 = await this.$get('/seller/find', {
					id: res.data.sellerId
				});
				this.cashDetial = res.data
				this.shopData = res2.data
			}
		}
	}
</script>

<style scoped lang="scss">
	.s2_title_block {
		width: 30rpx;
		height: 30rpx;
		background: #969696;
		border-radius: 10rpx;
		text-align: center;
		line-height: 30rpx;
		font-size: 21rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #FFFFFF;
		margin-right: 10rpx;
	}

	.cash_detial_b {
		width: 750rpx;
		height: 178rpx;
		background: #01CF79;
	}

	.cash_detial_m {
		background: #ffffff;
		margin: 0 20rpx;
		border-radius: 20rpx;
	}

	.cash_detial_t {
		margin-left: 29rpx;
		margin-top: 28rpx;
		margin-bottom: 28rpx;

		.cash_detial_m_block {
			width: 5rpx;
			height: 27rpx;
			background: #000000;
			border-radius: 3rpx;
			margin-right: 16rpx;
		}

		.cash_detial_m_text {
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #000000;
		}
	}

	.s1 {
		padding-left: 34rpx;
		padding-top: 44rpx;
		padding-right: 43rpx;
		padding-bottom: 8rpx;

		.s1_img {
			width: 140rpx;
			height: 140rpx;
			margin-right: 36rpx;
		}

		.s1_right {
			width: 100%;

			.s1_r_t {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #000000;
				// margin-top: 26rpx;
			}

			.s1_r_b {
				justify-content: space-between;
				margin-bottom: 7rpx;
				margin-top: 55rpx;

				.s1_r_b_l {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #FC5531;
				}

				.s1_r_b_r {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #969696;
				}
			}
		}
	}

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

	.s2 {
		margin-top: 8rpx;
		border-bottom: 1px solid #F6F6F6;
		padding-bottom: 40rpx;

		.s2_title {
			justify-content: space-between;
			margin: 0 30rpx;
			margin-top: 26rpx;

			.s2_title_block {
				width: 30rpx;
				height: 30rpx;
				background: #969696;
				border-radius: 10rpx;
				text-align: center;
				line-height: 30rpx;
				font-size: 21rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #FFFFFF;
			}

			.s2_title_text {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #000000;
				margin-left: 8rpx;
			}

			.s2_title_r {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #000000;
			}

			.s2_title_b_s {
				justify-content: space-between;
				margin-bottom: 16rpx;
				margin-top: 24rpx;

				.s2_title_b_s_l {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					color: #969696;
				}

				.s2_title_b_s_r {
					font-size: 26rpx;
					font-family: Arial;
					font-weight: 400;
					color: #000000;
					background: #EEEEEE;
					border-radius: 10rpx;
					padding: 10rpx 14rpx;
				}

				.s2_title_b_s_t {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #000000;
				}
			}
		}
	}

	.s3 {
		margin: 27rpx 61rpx 0 34rpx;
		padding-bottom: 39rpx;

		.s3_s_t {
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #000000;
			margin-bottom: 33rpx;
		}

		.s3_s_m_l {
			margin-right: 26rpx;
		}

		.s3_s_m_r {
			font-size: 30rpx;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #000000;
			line-height: 48rpx;
		}

		.s3_img {
			width: 200rpx;
			height: 150rpx;
		}

		.s3_s {
			margin-top: 30rpx;

			.s3_s_text {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				color: #000000;
				line-height: 48rpx;
				justify-content: space-between;

				.s3_s_text_r {
					text-align: center;
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #969696;

					.s3_icon {
						font-size: 50rpx;
						color: #969696;
					}
				}
			}
		}

	}

	.cash_detial_e {
		background: #FFFFFF;
		border-radius: 20rpx;
		margin: 0 20rpx;
		padding: 34rpx 32rpx 42rpx 31rpx;
		margin-bottom: 22rpx;

		.cash_detial_m_s {
			margin-bottom: 32rpx;

			.cash_detial_m_s_t {
				margin-bottom: 19rpx;

				.cash_detial_m_s_t_icon {
					margin-right: 5rpx;
					font-size: 40rpx;
				}

				.cash_detial_m_s_t_t {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #000000;
					line-height: 48rpx;
				}
			}

			.cash_detial_m_s_m {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #969696;
				line-height: 48rpx;
			}
		}
	}

	.confirmBtn {
		width: 96%;
	}
</style>