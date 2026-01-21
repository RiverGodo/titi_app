<template>
	<view class="uc">
		<view :style="'background-image: url('+ backImg +');'" class="uc_m">
			<view class="uc_m_hey">Hey</view>
			<view class="uc_m_welcom">欢迎使用梯递助手</view>
			<view class="uc_m_m">
				<view class="uc_m_m_t w_flex_center">
					<img class="uc_m_m_t_i" :src="$cdn+ sellerLogo" alt="">
					<view class="uc_m_m_t_r">
						<view class="uc_m_m_t_r_t">
							{{cashDetial.name}}
						</view>
						<view class="uc_m_m_t_r_b">
							券码：{{cashDetial.couponNo}}
						</view>
					</view>
				</view>
				<view class="uc_m_m_m">
					<uqrcode class="ercode" :text="cashDetial.couponNo" :size="250"/>
					<view class="uc_m_m_m_t">{{cashDetial.couponNo}}</view>
				</view>
				<view class="uc_m_m_b">保存二维码到相册</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backImg: this.$cdn + '/static/cash-back3.png',
				cashID:'',
				cashDetial:{}
			}
		},
		onLoad(option) {
			this.cashID = option.id
			this.init(option.id)
		},
		methods: {
			async init(id){
				let res = await this.$get('/coupon/detail', {id: id});
				this.cashDetial = res.data
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uc {
		width: 100%;
		height: 100%;
		background: #01CF79;
		overflow: hidden;
	}

	.uc_m {
		width: 100%;
		height: 900rpx;
		.uc_m_hey{
			font-size: 48rpx;
			font-family: Arial;
			font-weight: bold;
			color: #FFFFFF;
			padding-top: 100rpx;
			margin-left: 37rpx;
			margin-bottom: 18rpx;
		}
		.uc_m_welcom{
			font-size: 48rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #FFFFFF;
			margin-left: 37rpx;
			margin-bottom: 44rpx;
		}
		.uc_m_m{
			background: #FFFFFF;
			border-radius: 60rpx;
			margin: 0 35rpx;
			padding-bottom: 24rpx;
			.uc_m_m_t{
				padding-top: 26rpx;
				padding-bottom: 38rpx;
				border-bottom: 1px solid #EEEEEE;
				.uc_m_m_t_i{
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					margin-left: 41rpx;
					margin-right: 52rpx;
				}
			}
			.uc_m_m_t_r_t{
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #000000;
				margin-bottom: 28rpx;
			}
			.uc_m_m_t_r_b{
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #000000;
			}
			.uc_m_m_m{
				.ercode{
					margin: 0 auto;
					margin-top: 101rpx;
					margin-bottom: 52rpx;
					display: block;
					width: 500rpx;
					height: 500rpx;
				}
				.uc_m_m_m_t{
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #000000;
					text-align: center;
				}
			}
			.uc_m_m_b{
				width: 629rpx;
				height: 100rpx;
				background: linear-gradient(180deg, #01D584, #02C15F);
				border-radius: 50rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #FFFFFF;
				line-height: 100rpx;
				text-align: center;
				margin: 0 auto;
				margin-top: 97rpx;
			}
		}
	}
</style>