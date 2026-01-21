<template>
	<view class="wrapper">
		<!-- <common-wx-header name="交易广场" /> -->
		<view :style="'background-image: url('+ backImg +');background-size: 100% 100%;background-repeat: no-repeat;'"
			class="wrapper_back">
			<view class="wrapper_img">
				<image class="wrapper_i" :src="cdn + '/static/ad_banner.png'" />
			</view>
			<view class="wrapper_main">
				<view class="wrapper_main_t">
					请输入购买数量
				</view>
				<view class="wrapper_main_m">
					<input class="wrapper_main_m_i" placeholder="请输入数量" type="number" v-model="value" />
				</view>
				<mix-button style="width: 710rpx;" ref="confirmBtn" text="确  认" marginTop="37rpx"
					@onConfirm="handleBuy" />
			</view>
		</view>
		<mix-loading v-if="isLoading"></mix-loading>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MixButton from "../../components/mix-button/mix-button.vue";
	import CommonWxHeader from "../../components/common-wx-header/common-wx-header.vue";
	export default {
		components: {
			CommonWxHeader,
			MixButton
		},
		mixins: [MescrollMixin],
		data() {
			return {
				value: '',
				selIndex: 0,
				dataList: [], //商品列表
				upOption: {
					page: {
						size: 20
					},
					noMoreSize: 1,
					textNoMore: "我也是有底线的~",
					empty: {
						icon: '/static/images/empty/default.png'
					},
				},
				cdn: this.$cdn,
				backImg: this.$cdn + "/static/cash-back2.png",
			}
		},
		methods: {
			handleBuy() {
				if (!this.value) {
					this.$util.msg('请输入购买数量');
					this.$refs.confirmBtn.stop();
					return;
				}
				uni.showModal({
					title: '温馨提示',
					content: '下单之后可能会匹配多个商户卖单，您确认购买吗？',
					confirmColor: "#01CF79",
					showCancel: true,
					success: async (res) => {
						if (res.confirm) {
							let res = await this.$post('/ad-buy-order/buy', {amount: this.value, way: 1, role: 0});
							this.navTo('/pages/ad/adExchange?id=' + res.data, {
								login: true
							})
						}else{
							this.$refs.confirmBtn.stop();
						}
					}
				});
			},
			sel(index) {
				this.selIndex = index;
				this.mescroll.resetUpScroll();
			},
			check(id, flag) {
				uni.showModal({
					title: '温馨提示',
					content: flag ? '您确认通过吗？' : '您确认拒绝吗',
					confirmColor: "#FC5C39",
					success: async (res) => {
						if (res.confirm) {
							const result = await this.$post('/user/check', {
								id,
								flag
							});
							this.$util.msg('操作成功');
							this.mescroll.resetUpScroll();
						}
					}
				});
			},
			async loadDataList(e) {
				const res = await this.$get('/user/workers', {
					type: this.selIndex,
					currentPage: e.num,
					pageSize: e.size
				}, {
					showLoading: true
				}, () => {
					this.mescroll.endErr()
				});
				let curPageData = res.data.records;
				let curPageLen = curPageData.length;
				let totalSize = res.data.total;
				//设置列表数据
				if (e.num === 1) this.dataList = [];
				this.dataList = this.dataList.concat(curPageData);
				this.mescroll.endBySize(curPageLen, totalSize);
			},
		}
	}
</script>

<style scoped lang="scss">
	view,
	text {
		// line-height: 1.8;
	}

	page {
		background: $bg-color;
	}

	.wrapper {
		background: #fff;
		height: 100%;
		overflow: hidden;

		image {
			display: block;
			width: 100%;
		}

		.wrapper_back {
			width: 100%;
			height: 340rpx;
			padding-top: 25rpx;
		}

		.wrapper_img {
			width: 710rpx;
			height: 360rpx;
			// padding-top: 25rpx;
			border-radius: 10rpx;
			overflow: hidden;
			margin: 0 20rpx;

			.wrapper_i {
				width: 100%;
				height: 100%;
			}
		}

		.wrapper_main {
			.wrapper_main_t {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #010101;
				// line-height: 48rpx;
				margin-left: 22rpx;
				margin-top: 54rpx;
				margin-bottom: 34rpx;
			}

			.wrapper_main_m {
				width: 710rpx;
				height: 71rpx;
				background: #FFFFFF;
				border: 1px solid #C5C5C5;
				border-radius: 35rpx;
				margin: 0 auto;

				.wrapper_main_m_i {
					height: 100%;
					// width: 100%;
					margin: 0 34rpx;
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
				}
			}
		}
	}

	.title {
		background-color: #fff;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 20rpx;
		font-size: 30rpx;
		color: #666;
		font-weight: bold;
	}

	.top {
		padding-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.item {
		margin-bottom: 20rpx;
		width: 340rpx;
		border-radius: 10rpx;

		&.official {
			width: 500rpx;

			.subject {
				background-color: $base-color;
			}
		}

		.subject {
			background-color: orange;
			text-align: center;
			padding: 10rpx;
			font-size: 28rpx;
			color: #fff;
		}

		.desc {
			padding-bottom: 20rpx;
			background-color: #fff;
			border-radius: 0 0 40rpx 40rpx;
			text-align: center;
			line-height: 100rpx;
			font-size: 24rpx;
			color: #999;

			.btn {
				margin: 0 auto;
				width: 100rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				background-color: $base-color;
				color: #fff;
				border-radius: 40rpx;
				font-size: 24rpx;
			}
		}

	}

	.ads {
		padding: 20rpx;
		display: flex;
		flex-wrap: wrap;

		.item {
			margin-left: 30rpx;

			&:nth-child(2n + 1) {
				margin-left: 0;
			}

			.desc {
				.btn {
					background-color: orange;
				}
			}
		}
	}
</style>