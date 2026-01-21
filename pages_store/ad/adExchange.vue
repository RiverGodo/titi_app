<template>
	<view class="round_head">
		<view class="round_head_m">
			<view v-for="(item,index) in orders" :key="index" class="ae_s">
				<view class="ae_s_t w_flex_start">
					<image class="ae_s_t_i" :src="cdn + item.pic" alt="">
						<view class="ae_s_t_r">
							<view class="ae_s_t_r_t">{{item.name}}</view>
							<view class="ae_s_t_r_b">
								<view class="ae_s_t_r_s">数量：<text style="color: #000000;">{{item.number}}</text></view>
								<view class="ae_s_t_r_s">单价：<text style="color: #000000;">￥{{item.price}}</text></view>
							</view>
						</view>
				</view>
				<view class="ae_s_b">
					<text>小计：</text>
					<text style="color: #FC5531;font-weight: 400;font-size: 30rpx;">￥{{item.money}}</text>
				</view>
			</view>
			<view @click="showPopup()" class="ae_s w_flex_center">
				<view class="ae_s_l">支付方式</view>
				<view class="ae_s_r w_flex_center">
					<view v-if="payType === ''">请选择支付方式</view>
					<view class="w_flex_center" style="color: #000000;" v-if="payType === 0"><img class="ae_s_r_i"
																																												:src="$cdn + '/static/money.png'" alt="">余额支付</view>
					<view class="w_flex_center" style="color: #000000;" v-if="payType === 1"><img class="ae_s_r_i"
																																												:src="$cdn + '/static/wx-pay.png'" alt="">微信支付</view>
					<view class="w_flex_center" style="color: #000000;" v-if="payType === 4"><img class="ae_s_r_i"
																																												:src="$cdn + '/static/zfb-pay.png'" alt="">支付宝支付</view>
					<text class="iconfont">&#xe601;</text>
				</view>
			</view>
			<view class="ex_btn w_flex_center">
				<view class="ex_btn_l">
					合计：
					<text style="color: #FC5531;font-size: 36rpx;">￥{{money}}</text>
				</view>
				<view class="ex_btn_m">共{{orders.length}}件</view>
				<view @click="handlePay()" class="ex_btn_r" :class="payType === ''? '': 'active'">提交订单</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup_m">
				<view class="popup_m_t">
					<view class="popup_m_t_t">请选择支付方式</view>
					<view @click="payType=item; $refs.popup.close()" v-for='item in payWays' :key="item" style="border: none;"
								class="popup_m_t_s w_flex_center">
						<img class="popup_m_t_s_i" :src="cdn + '/static/'+getPayMsg(item).img+'.png'" alt="">
						{{getPayMsg(item).name}}
					</view>
				</view>
				<view @click="$refs.popup.close()" class="popup_m_b">
					取 消
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			payWays: [],
			cdn: this.$cdn,
			payType: '',
			id: 0,
			money: '--',
			orders: []
		}
	},
	onLoad(option){
		this.id = option.id;
		this.getOrder();
	},
	methods: {
		async getOrder(){
			let res = await this.$get('/ad-buy-order/getBuyMsg', {id: this.id});
			this.orders = res.data.orders;
			this.money = res.data.money;
			this.payWays = res.data.payWays;
		},
		showPopup(type) {
			// this.popupStatus = type
			this.$refs.popup.open()
		},
		getPayMsg(item){
			if(item == 0){return {img: 'money', name: '余额支付'};}
			if(item == 1){return {img: 'wx-pay', name: '微信支付'};}
			if(item == 4){return {img: 'zfb-pay', name: '支付宝支付'};}
		},
		async handlePay() {
			if (this.$util.isEmpty(this.payType)) {
				this.$util.msg('请选择支付方式');
				return;
			}
			let res = await this.$post('/ad-buy-order/pay', {payWay: this.payType, id: this.id});
			if(this.payType === 0){
				uni.redirectTo({
					url: '/pages_store/ad/adSuccess?id='+ this.id
				})
			}else{
				//其他支付方式
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.popup_m {
	.popup_m_t {
		width: 710rpx;
		// height: 115.2rpx;
		background: #FFFFFF;
		margin: 0 auto;
		border-radius: 20rpx;

		.popup_m_t_t {
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #969696;
			// line-height: 31rpx;
			text-align: center;
			padding-top: 31rpx;
			margin-bottom: 24rpx;
		}

		.popup_m_t_s {
			justify-content: center;
			border-bottom: 1px solid #E2E2E2;
			padding-bottom: 30rpx;
			padding-top: 30rpx;

			.popup_m_t_s_i {
				width: 50rpx;
				height: 50rpx;
				margin-right: 10rpx;
			}
		}
	}

	.popup_m_b {
		width: 710rpx;
		height: 115.2rpx;
		background: #FFFFFF;
		margin: 0 auto;
		margin-bottom: 11rpx;
		margin-top: 21rpx;
		border-radius: 20rpx;
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #FC5531;
		line-height: 115.2rpx;
		text-align: center;
	}
}

.round_head {
	background: #01CF79;
	overflow: auto;
}

.round_head_m {
	padding: 30rpx 20rpx;
	height: 100%;
}

.ae_s {
	background: rgba(255, 255, 255, 0.5);
	border: 1px solid #C5C5C5;
	border-radius: 20rpx;
	padding: 25rpx;
	margin-bottom: 26rpx;
	justify-content: space-between;

	.ae_s_l {
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #000000;
	}

	.ae_s_r {
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #969696;

		.ae_s_r_i {
			width: 50rpx;
			height: 50rpx;
			margin-right: 14rpx;
		}
	}

	.ae_s_t {
		margin-bottom: 25rpx;

		.ae_s_t_i {
			width: 201rpx;
			height: 151rpx;
			margin-right: 22rpx;
		}

		.ae_s_t_r {
			.ae_s_t_r_t {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #000000;
				line-height: 48rpx;
				margin-bottom: 14rpx;
			}

			.ae_s_t_r_b {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #969696;

				.ae_s_t_r_s {
					margin-bottom: 14rpx;
				}
			}
		}
	}

	.ae_s_b {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		border-top: 1px solid #E2E2E2;
		padding-top: 17rpx;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #000000;
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
		&.active{
			background: $base-color;
		}
	}
}
</style>