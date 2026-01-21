<template>
	<view class="abg">
		<view :style="'background-image: url('+ backImg +');'" class="abg_t">
			<view class="abg_t_t">
				<view class="abg_t_t_b">可赠送数量</view>
				<view class="abg_t_t_t">{{balance}}</view>
			</view>
			<view class="abg_t_m">
				<view class="abg_t_m_s">
					<view class="abg_t_m_s_t">请输入数量</view>
					<view class="abg_t_m_s_i">
						<input type="number" placeholder="请输入数量" v-model="number" />
					</view>
				</view>
				<view style="margin: 0;" class="abg_t_m_s">
					<view class="abg_t_m_s_t">请选择赠送商户</view>
					<view class="abg_t_m_s_i" @click="openSellers">
						<input placeholder="请选择商户" disabled  v-model="sellerName" />
					</view>
				</view>
			</view>
			<view @click="confirm" class="abg_t_b">
				赠 送
			</view>
		</view>
		<w-picker v-if="items.length > 0"
				:visible.sync="visible"
				mode="selector"
				:default-props="defaultProps"
				:options="items"
				@confirm="onConfirm($event,'selector')"
				ref="selector"
		></w-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				visible: false,
				defaultProps: {
					label: "name",
					value: "id"
				},
				items: [],
				cate: [],
				backImg: this.$cdn + '/static/bean-give.png',
				number: '',
				sellerId: '',
				sellerName: ''
			}
		},
		onLoad(options){
			this.balance = options.m;
			this.listSellers();
		},
		methods: {
			openSellers(){
				if(this.items.length === 0){
					this.$util.msg("您暂无推广的商家，暂无商家可转赠");
					return;
				}
				this.$refs.selector.show()
			},
			onConfirm(data){
				this.sellerId = data.value;
				this.sellerName = data.result
			},
			async listSellers(){
				let res = await this.$get('/seller/ad-gave-order/listSellers');
				this.items = res.data;
			},
			async confirm(){
				if(!this.number){
					this.$util.msg("请输入数量");
					return;
				}
				if(!this.sellerId){
					this.$util.msg("请指定商家");
					return;
				}
				let res = await this.$post('/seller/bean-gave-order/send', {sellerId: this.sellerId, amount: this.number})
				this.$util.msg("转赠成功");
				setTimeout(() => {
					this.back();
				}, 1000)
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
			padding-left: 30rpx;
			text-align: left;

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
				padding-bottom: 25rpx;
			}
		}

		.abg_t_m {
			background: #FFFFFF;
			margin: 0 20rpx;
			border-radius: 20rpx;
			margin-top: 100rpx;
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
					&.disabled{
						background: #eee;
					}
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
			background: #FC5531;
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