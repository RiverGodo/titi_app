<template>
	<view class="round_head">
		<view class="round_head_m">
			<view class="ex">
				<view class="ex_t w_flex_center">
					<cash-back :price="cashDetial.price" class="ex_t_l"></cash-back>
					<view class="ex_t_r">
						<view class="ex_t_r_t">{{cashDetial.name}}</view>
						<view class="ex_t_r_m w_flex_center">
							每人限制兑换{{cashDetial.perUserLimit}}张
							<text @click="showPopup(1)" class="ex_t_r_m_icon iconfont">&#xe8c8;</text>
						</view>
						<view class="ex_t_r_b w_flex_center">
							{{cashDetial.costPoints}}积分
							<mix-number-box :min="1" @eventChange="eventChange" :max="cashDetial.perUserLimit"
								:inputDisabled="true"></mix-number-box>
						</view>
					</view>
				</view>
				<view class="ex_m w_flex_center">
					<view class="ex_m_l w_flex_center">
						积分兑换
						<text @click="showPopup(2)" class="ex_t_r_m_icon iconfont">&#xe8c8;</text>
						<text v-if="points >= cashDetial.costPoints * cashNumber"
							style="color: #969696;">（{{points}}积分）</text>
						<text v-else style="color: #969696;">（当前积分不足）</text>
					</view>
				</view>
				<view class="ex_e">
					小计（积分）：
					<text style="color: #FC5531;font-size: 32rpx;">{{cashDetial.costPoints * cashNumber}}</text>
				</view>
			</view>
			<view class="ex_btn w_flex_center">
				<view class="ex_btn_l">
					合计：
					<text style="color: #FC5531;font-size: 36rpx;">{{cashDetial.costPoints * cashNumber}}积分</text>
				</view>
				<view class="ex_btn_m">共{{cashNumber}}件</view>
				<view v-if="points >= cashDetial.costPoints" style="background: #FC5531;" @click="handleCreateOrder()"
					class="ex_btn_r">提交订单</view>
				<view v-else  @click="handleCreateOrder()" class="ex_btn_r">提交订单</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup_m">
				<view v-show="popupStatus === 1">
					<view class="popup_m_title">购买须知</view>
					<view class="popup_m_s">
						<view class="popup_m_s_t w_flex_center">
							<text class="ex_t_r_m_icon iconfont">&#xe8c9;</text>
							<text class="ex_t_r_m_text">现金券类型</text>
						</view>
						<view class="popup_m_s_b">立减券</view>
					</view>
					<view class="popup_m_s">
						<view class="popup_m_s_t w_flex_center">
							<text class="ex_t_r_m_icon iconfont">&#xe67c;</text>
							<text class="ex_t_r_m_text">使用时间</text>
						</view>
						<view class="popup_m_s_b">{{shopData.rangeTime}}</view>
					</view>
					<view class="popup_m_s">
						<view class="popup_m_s_t w_flex_center">
							<view class="s2_title_block">
								限
							</view>
							<text class="ex_t_r_m_text">使用限制</text>
						</view>
						<view class="popup_m_s_b">一次只能使用一张</view>
					</view>
				<!-- 	<view class="popup_m_s">
						<view class="popup_m_s_t w_flex_center">
							<text class="ex_t_r_m_icon iconfont">&#xe8c8;</text>
							<text class="ex_t_r_m_text">使用范围</text>
						</view>
						<view class="popup_m_s_b">部分商品可用</view>
					</view>
					<view class="popup_m_s">
						<view class="popup_m_s_t w_flex_center">
							<text class="ex_t_r_m_icon iconfont">&#xe8c8;</text>
							<text class="ex_t_r_m_text">使用规则</text>
						</view>
						<view class="popup_m_s_b">本单发票由商家提供，详情咨询商家仅限店内使用不可 叠加使用无需预约，消费高峰期可能需要等位酒水饮料 等问题可致电商家咨询</view>
					</view> -->
				</view>
				<view v-show="popupStatus === 2">
					<view class="popup_m_title">如何获得积分</view>
					<view class="popup_m_m">
						<view class="popup_m_m_t w_flex_center">
							<img class="popup_m_m_t_1" :src="cashTitle1" alt="">
							<img class="popup_m_m_t_2" :src="lineImg" alt="">
							<img class="popup_m_m_t_1" :src="cashTitle2" alt="">
							<img class="popup_m_m_t_2" :src="lineImg" alt="">
							<img class="popup_m_m_t_1" :src="cashTitle3" alt="">
						</view>
						<view class="popup_m_m_b w_flex_center">
							<view class="popup_m_m_b_s">1.看广告送积分</view>
							<view class="popup_m_m_b_s">2.买广告卡送积分</view>
							<view class="popup_m_m_b_s">3.分享送积分</view>
						</view>
					</view>
					<view class="popup_m_l">
						<view class="popup_m_l_t">积分如何使用?</view>
						<view class="popup_m_l_s">
							1.梯梯助手积分与现金按照100:1的比例兑换</br>
							2.现金券可用积分全额兑换，普通商品积分抵扣金额不可超过该订单总金额的10%</br>
							3.每人每天只可使用1次积分用于购买时抵扣现金</br>
							4.每个用户仅限使用1个账号参与积分活动(同设备、微信号、支付账号均为1个账号)</br>
							5.活动过程中存在不诚信行为，梯梯助手有权取消用户或商户的活动资格</br>
						</view>
					</view>
				</view>
				<view @click="$refs.popup.close()" class="popup_btn">我知道了</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cashTitle1: this.$cdn + '/static/cash-title1.png',
				cashTitle2: this.$cdn + '/static/cash-title2.png',
				cashTitle3: this.$cdn + '/static/cash-title3.png',
				lineImg: this.$cdn + '/static/line.png',
				popupStatus: 0,
				cashID: '',
				cashDetial: {},
				shopData: {},
				points: 0,
				cashNumber: 1
			}
		},
		onLoad(option) {
			this.cashID = option.id
			this.init(option.id)
		},
		methods: {
			showPopup(type) {
				this.popupStatus = type
				this.$refs.popup.open()
			},
			async init(id) {
				let res = await this.$get('/seller/coupon/get', {
					id: id
				});
				let res2 = await this.$get('/seller/find', {
					id: res.data.sellerId
				});
				let res3 = await this.$get('/wallet/balance');
				this.cashDetial = res.data
				this.shopData = res2.data
				this.points = res3.data.points
			},
			async handleCreateOrder() {
				let swap = await this.$get('/coupon/swap', {
					id: this.cashID,
					num: this.cashNumber,
					payType: 2,
					role: 0
				});
				this.navTo("/pages/cash/cashSuccess",{login:true})
			},
			eventChange(data) {
				this.cashNumber = data.number
			}
		}
	}
</script>

<style lang="scss" scoped>
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
	.round_head {
		background: #01CF79;
		overflow: auto;
	}

	.round_head_m {
		padding: 30rpx 20rpx;
		overflow: auto;
		height: 100%;
	}

	.ex {
		background: rgba(255, 255, 255, 0.5);
		border: 1px solid #C5C5C5;
		border-radius: 20rpx;
		padding: 25rpx;

		.ex_t {
			border-bottom: 1px solid #E2E2E2;
			padding-bottom: 17rpx;

			.ex_t_l {
				width: 140rpx;
				height: 140rpx;
				margin-right: 34rpx;
			}

			.ex_t_r {
				width: 100%;

				.ex_t_r_t {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #000000;
					line-height: 48rpx;
				}

				.ex_t_r_b {
					font-size: 28rpx;
					font-family: Arial;
					font-weight: bold;
					color: #FC5531;
					justify-content: space-between;
					margin-top: 42rpx;
				}

				.ex_t_r_m {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #969696;
				}

				.ex_t_r_m_icon {
					font-size: 30rpx;
					display: block;
					margin-left: 10rpx;
				}
			}
		}

		.ex_m {
			border-bottom: 1px solid #E2E2E2;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #000000;
			justify-content: space-between;
			padding-bottom: 20rpx;
			margin-top: 20rpx;

			.ex_t_r_m_icon {
				font-size: 30rpx;
				color: #FC5531;
				display: block;
				margin-left: 10rpx;
			}
		}

		.ex_e {
			text-align: right;
			margin-top: 26rpx;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #969696;
		}
	}

	.ex_btn {
		position: fixed;
		bottom: 32rpx;
		left: 20rpx;
		right: 20rpx;
		background: #FFFFFF;
		border: 1px solid #E2E2E2;
		border-radius: 49rpx;
		width: 711rpx;
		height: 99rpx;
		justify-content: space-between;

		.ex_btn_l {
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #000000;
			margin-left: 28rpx;
		}

		.ex_btn_m {
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #969696;
		}

		.ex_btn_r {
			width: 262rpx;
			height: 98rpx;
			background: #969696;
			border-radius: 0 49rpx 49rpx 0;
			font-size: 36rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #FFFFFF;
			text-align: center;
			line-height: 98rpx;
		}
	}

	.popup_m {
		background: #FFFFFF;
		border-radius: 30rpx 30rpx 0 0;
		padding: 0 20rpx;
		padding-bottom: 22rpx;
		padding-top: 39rpx;

		.popup_btn {
			width: 100%;
			height: 80rpx;
			background: #FC5531;
			border-radius: 40rpx;
			// margin: 0 20rpx;
			font-size: 32rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #FFFFFF;
			line-height: 80rpx;
			text-align: center;
			margin-top: 40rpx;
		}

		.popup_m_title {
			font-size: 36rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #000000;
			margin-bottom: 38rpx;
		}

		.popup_m_s {
			margin-bottom: 26rpx;

			.popup_m_s_t {
				.ex_t_r_m_icon {
					font-size: 40rpx;
					margin-right: 5rpx;
					color: #969696;
				}

				.ex_t_r_m_text {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #000000;
					line-height: 48rpx;
				}
			}

			.popup_m_s_b {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #969696;
				line-height: 48rpx;
			}
		}

		.popup_m_l {
			margin-top: 61rpx;

			.popup_m_l_t {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #000000;
				margin-bottom: 30rpx;
			}

			.popup_m_l_s {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				color: #000000;
				line-height: 60rpx;
			}
		}

		.popup_m_m {
			.popup_m_m_b {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #FC5531;
				justify-content: space-between;
			}

			.popup_m_m_t {
				margin-bottom: 35rpx;
				justify-content: space-between;
				margin-left: 48rpx;
				margin-right: 48rpx;

				.popup_m_m_t_1 {
					width: 80rpx;
					height: 80rpx;
				}

				.popup_m_m_t_2 {
					height: 4rpx;
					width: 155rpx;
				}
			}
		}
	}
</style>