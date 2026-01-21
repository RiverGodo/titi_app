<template>
	<view class="wrapper">
		<view class="top">
			<input placeholder="购买数量" type="number" v-model="amount" />
			<view class="msg">
				<view>
					单价：¥{{price}}
				</view>
				<view>
					<text>总花费：</text>
					<text class="cost">¥{{total}}</text>
				</view>
			</view>
			<mix-button ref="confirmBtn" text="购买广告卡" marginTop="20rpx" @onConfirm="buy" />
		</view>
	</view>
</template>

<script>
	import MixButton from "../../components/mix-button/mix-button.vue";
	export default {
		components: {
			MixButton
		},
		data() {
			return {
				price: 0,
				total: 0,
				amount: '',
			}
		},
		onLoad() {
			this.getData();
		},
		watch: {
			price(number) {
				this.total = (this.amount ? this.amount : 0) * number;
			},
			amount(number) {
				this.total = this.price * number;
			},
		},
		methods: {
			async getData() {
				const res = await this.$get('/ad/price');
				this.price = res.data;
			},
			async buy() {
				if (this.$util.isEmpty(this.amount)) {
					this.$util.msg("请填写购买数量");
					this.$refs.confirmBtn.stop();
					return;
				}
				const res = await this.$post("/ad-buy-order/buy", {
					amount: this.amount
				});
				this.$util.msg("下单成功");
				setTimeout(() => {
					uni.redirectTo({
						url: "/pages/ad/pay?id=" + res.data
					})
				}, 1000)
			}
		}
	}
</script>

<style scoped lang="scss">
	view,text{line-height: 1.8;}
	page {
		background-color: #fff;
		height: 100%;
	}

	.top {
		padding-top: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		background-color: #fff;

		input {
			text-align: center;
			padding: 0 10rpx;
			font-size: 28rpx;
			color: #111;
			border-radius: 50rpx;
			background-color: $bg-color;
			width: 200rpx;
			height: 80rpx;
		}
	}

	.msg {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #666;
		font-size: 26rpx;
		width: 550rpx;
		margin-top: 30rpx;

		.cost {
			color: $base-color;
			font-size: 32rpx;
		}
	}
</style>