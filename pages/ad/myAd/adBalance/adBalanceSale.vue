<template>
	<view class="abg">
		<view :style="'background-image: url('+ backImg +');'" class="abg_t">
			<view class="abg_t_t">
				<view class="abg_t_t_t">{{balance}}</view>
				<view class="abg_t_t_b">可出售数量</view>
			</view>
			<view class="abg_t_m">
				<view style="margin: 0;" class="abg_t_m_s">
					<view class="abg_t_m_s_t">请输入数量</view>
					<view class="abg_t_m_s_i">
						<input placeholder="例：1000" type="number" v-model="number" />
					</view>
				</view>
			</view>
			<view @click="confirm" class="abg_t_b">
				确 定
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backImg: this.$cdn + '/static/order-back1.png',
				number: '',
			}
		},
		onLoad(option){
			this.balance = option.m;
		},
		methods: {
			async confirm(){
				if(!this.number){
					this.$util.msg("请输入出售数量");
					return;
				}
				let role = 0;
				let res = await this.$post("/ad-sale-order/sale", {amount: this.number, role});
				uni.redirectTo({
					url: "/pages/order/saleOrder/orderList"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.abg {
		.abg_t {
			width: 100%;
			height: 360rpx;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			padding-top: 40rpx;
		}

		.abg_t_t {
			text-align: center;

			.abg_t_t_t {
				font-size: 80rpx;
				font-family: Arial;
				font-weight: bold;
				color: #FFFFFF;
			}

			.abg_t_t_b {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #FFFFFF;
				margin-top: 25rpx;
			}
		}

		.abg_t_m {
			background: #FFFFFF;
			margin: 0 20rpx;
			border-radius: 20rpx;
			margin-top: 40rpx;
			margin-bottom: 60rpx;
			padding: 30rpx;

			.abg_t_m_s {
				margin-bottom: 36rpx;

				.abg_t_m_s_t {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #000000;
					margin-bottom: 18rpx;
				}

				.abg_t_m_s_i {
					width: 650rpx;
					height: 81rpx;
					background: #FFFFFF;
					border: 1px solid #EEEEEE;
					border-radius: 40rpx;

					input {
						height: 100%;
						margin: 0 36rpx;
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
					}
				}
			}
		}

		.abg_t_b {
			width: 710rpx;
			height: 80rpx;
			background: #01CF79;
			border-radius: 40rpx;
			margin: 0 auto;
			text-align: center;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #FFFFFF;
			line-height: 80rpx;
		}
	}
</style>