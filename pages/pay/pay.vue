<template>
	<view class="pay">
		<view :style="'background-image: url('+ backImg +');'" class="pay_t">
			<image class="pay_h" :src="cdn + shopData.logo"></image>
			<view class="pay_t_t">{{shopData.name}}</view>
			<view class="pay_m">
				<view class="pay_m_t w_flex_end">
					<text>￥</text>
					<view class="pay_m_t_i">
						<input placeholder-class="phcolor" placeholder="请输入支付金额" type="digit" v-model="price" />
					</view>
				</view>
				<view @click="jump" class="pay_m_b w_flex_center">
					<view class="pay_m_b_l w_flex_center">
						<text class="iconfont">&#xe63f;</text>
						现金券
					</view>
					<view class="pay_m_b_r w_flex_center">
						<view v-if="cardNumber" class="pay_m_b_r_c">
							-￥{{cardNumber}}
						</view>
						<view v-else class="pay_m_b_r_b">
							{{num}} 张可用
						</view>
						<text class="iconfont">&#xe601;</text>
					</view>
				</view>
			</view>
		</view>
		<view class="pay_b w_flex_center">
			<view class="pay_b_l w_flex_center">
				<text>合计：</text>
				<text style="color: #FC5531;font-size: 36rpx;">￥{{price - cardNumber < 0? 0: price - cardNumber}}</text>
				<text v-if="cardNumber"  style="color: #969696;font-size: 24rpx;margin-left: 10rpx;">已优惠￥{{cardNumber}}</text>
			</view>
			<view v-if="price" @click="confirm" class="pay_b_r">
				付款
			</view>
			<view v-else style="background: #969696;" @click="confirm"  class="pay_b_r">
				付款
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num: 0,
				cdn: this.$cdn,
				backImg: this.$cdn + '/static/order-back1.png',
				cardNumber: 0,
				price: '',
				sellerId: '',
				shopData:{},
				couponId: 0,
				unionId: '',
				openId: ''
			}
		},
		onShow(){
			let couponData = this.$store.state.couponData;
			if(couponData.id){
				this.cardNumber = couponData.price;
				this.couponId = couponData.id;
			}
		},
		async onLoad(options) {
			let code = options.code;
			if(code){
				let param = {
					code,
					platform: "mp"
				};
				const res = await this.$post('/user/getUnionId', param);
				let data = res.data;
				let arr = data.split(",");
				this.unionId = arr[0];
				this.openId = arr[1];
				this.sellerId = options.sellerId
				await this.getData()
			}else{
				location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+"wx3f3b8b0dc5a0ebbb"+"&redirect_uri=" +
						encodeURIComponent(location.href) +
						"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect&connect_redirect=1#wechat_redirect";
			}
		},
		methods: {
			async jump(){
				this.navTo('/pages/pay/selectCash?sellerId='+this.sellerId + '&u=' + this.unionId)
			},
			async getData(){
				let res = await this.$get('/seller/find', {id: this.sellerId});
				this.shopData = res.data
				let result = await  this.$get('/coupon/countSellerMine', {sellerId: this.sellerId, unionId: this.unionId});
				this.num = result.data;
			},
			async confirm(){
				if(!this.price){
					this.$util.msg("请输入支付金额");
					return;
				}
				let param = {sellerId: this.sellerId, amount: this.price, unionId: this.unionId, code: this.openId};
				if(this.couponId){
					param.couponId = this.couponId;
				}
				if(this.price <= this.cardNumber){
					await  this.$post('/coupon/pay', param);
					this.navTo("/pages/pay/paySuccess");
				}else{
					const res = await this.$post('/coupon/pay', param)
					this.onBridgeReady(res);
				}

			},
			onBridgeReady(res){
				let data = res.data;
				let param = {
					"appId":data.appId,     //公众号名称，由商户传入
					"timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数
					"nonceStr":data.nonceStr, //随机串
					"package":"prepay_id=" + data.prepayId,
					"signType":"RSA",         //微信签名方式：
					"paySign": data.paySign //微信签名
				}
				WeixinJSBridge.invoke(
						'getBrandWCPayRequest', param,
						(res) => {
							if(res.err_msg == "get_brand_wcpay_request:ok" ){
								this.navTo("/pages/pay/paySuccess");
							}else{
								this.$util.msg("支付失败");
							}
						});
			},

		}
	}
</script>

<style lang="scss" scoped>
	.pay_b {
		position: fixed;
		bottom: 20rpx;
		right: 0;
		left: 0;
		width: 711rpx;
		height: 99rpx;
		background: #FFFFFF;
		border: 1px solid #E2E2E2;
		border-radius: 49rpx;
		margin: 0 auto;
		justify-content: space-between;
		.pay_b_l {
			margin-left: 28rpx;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #000000;
		}
		.pay_b_r{
			width: 262rpx;
			height: 98rpx;
			background: #FC5531;
			border-radius: 0  49rpx 49rpx 0;
			font-size: 36rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #FFFFFF;
			text-align: center;
			line-height: 98rpx;
		}
	}

	.pay_t {
		height: 400rpx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		padding-top: 40rpx;

		.pay_m_b {
			justify-content: space-between;
			margin-top: 37rpx;

			.pay_m_b_l {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #000000;

				.iconfont {
					font-size: 40rpx;
					color: #FC5531;
					margin-right: 16rpx;
					width: 40rpx;
					height: 35rpx;
				}
			}

			.pay_m_b_r {
				.pay_m_b_r_b {
					height: 40rpx;
					background: #FC5531;
					border-radius: 10rpx;
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					text-align: center;
					line-height: 40rpx;
					padding: 0 20rpx;
					margin-right: 13rpx;
				}

				.pay_m_b_r_c {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FC5531;
					margin-right: 13rpx;
				}

				.iconfont {
					font-size: 16rpx;
				}
			}
		}

		.pay_h {
			width: 150rpx;
			height: 150rpx;
			border-radius: 50%;
			margin: 0 auto;
			display: block;
			margin-bottom: 22rpx;
		}

		.pay_t_t {
			font-size: 32rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #FFFFFF;
			text-align: center;
			margin-bottom: 42rpx;
		}

		.pay_m {
			background: #FFFFFF;
			border-radius: 17rpx;
			margin: 0 20rpx;
			padding: 0 70rpx;
			padding-top: 60rpx;
			padding-bottom: 40rpx;

			.pay_m_t {
				border-bottom: 1px solid #EEEEEE;
				padding-bottom: 30rpx;

				text {
					font-size: 36rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #FC5531;
					margin-right: 8rpx;
					margin-bottom: 10rpx;
				}
			}

			.pay_m_t_i {

				input {
					font-size: 66rpx;
					font-family: Arial;
					font-weight: bold;
					color: #FC5531;
					height: 53rpx;
				}
			}

			.phcolor {
				font-size: 56rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #969696;
			}
		}
	}
</style>