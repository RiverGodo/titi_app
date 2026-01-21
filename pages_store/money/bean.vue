<template>
	<view class="abl">
		<view class="abl_t w_flex_center">
			<view class="abl_t_s ablts_l">
				<view class="abl_t_s_t">{{wallet.bean}}</view>
				<view class="abl_t_s_b">可用现金豆</view>
			</view>
		</view>
		<view class="abl_m">
			<view class="abl_m_t">现金豆明细</view>
			<view class="abl_m_m">
				<mescroll-uni height="69%" :bottombar="false" ref="mescrollRef" @init="mescrollInit"
					@down="downCallback" @up="loadDataList" :up="upOption">
					<view v-for="(item,index) in dataList" :key="index" class="abl_m_m_s">
						<view class="abl_m_m_s_t w_flex_center">
							<view class="txt">
								{{item.note}}
							</view>
							<text>{{item.usable >= 0? ("+" + item.usable): item.usable}}</text>
						</view>
						<view class="abl_m_m_s_b w_flex_center">
							<text>交易时间：{{new Date(item.createTime) | friendDate}}</text>
							<text>余额:{{item.latestUsable}}</text>
						</view>
					</view>
				</mescroll-uni>
			</view>
		</view>
		<view class="abl_b" v-if="wallet.type === 1">
			<view class="abl_b1" @click="navTo('/pages_store/money/bean/beanGive?m=' + wallet.bean)">
				<view class="abl_b1_m">
					赠送现金豆
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				wallet: {
					bean: '--',
					type: 0
				},
				dataList: [],
				upOption: {
					page: {
						size: 10
					},
					noMoreSize: 1,
					textNoMore: "我也是有底线的~",
					empty: {
						icon: '/static/images/empty/default.png'
					},
				}
			}
		},
		onShow() {
			this.getMoney();
			this.mescroll && this.mescroll.resetUpScroll(false);
		},
		methods: {
			async getMoney() {
				const res = await this.$get('/seller/wallet/balance');
				console.log(res.data);
				this.wallet = res.data;
			},
			async loadDataList(e) {
				const res = await this.$get('/seller/seller-money-log/listBeanLog', {
					currentPage: e.num,
					pageSize: e.size,
				}, {}, () => {
					this.mescroll.endErr()
				});
				let curPageData = res.data.records;
				let curPageLen = curPageData.length;
				let totalSize = res.data.total;
				if (e.num === 1) this.dataList = [];
				this.dataList = this.dataList.concat(curPageData);
				this.mescroll.endBySize(curPageLen, totalSize);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.abl {
		margin: 0 20rpx;
		padding-top: 20rpx;

		.abl_b {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 98rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 3rpx 0rpx rgba(0, 0, 0, 0.14);
			display: flex;
			align-items: center;
			justify-content: center;

			.abl_b1_m {
				width: 711rpx;
				height: 81rpx;
				background: #01CF79;
				border: 1px solid #EEEEEE;
				border-radius: 40rpx;
				text-align: center;
				line-height: 80rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #FFFFFF;
				overflow: hidden;
			}

			.abl_b2_m {
				width: 711rpx;
				height: 81rpx;
				background: #FFFFFF;
				border: 1px solid #EEEEEE;
				border-radius: 40rpx;
				text-align: center;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				overflow: hidden;

				.abl_b2_m_l {
					width: 50%;
					color: #01CF79;
				}

				.abl_b2_m_r {
					width: 50%;
					background: #01CF79;
					height: 100%;
					color: #FFFFFF;
					align-items: center;
					justify-content: center;
					display: flex;
				}
			}
		}

		.abl_m {
			padding-bottom: 120rpx;
			margin-top: 46rpx;

			.abl_m_t {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #000000;
				margin-bottom: 19rpx;
			}

			.abl_m_m {
				background: #FFFFFF;
				border: 1px solid #eee;
				border-radius: 20rpx;
			}

			.abl_m_m_s {
				border-bottom: 1px solid #EEEEEE;
				padding: 0 30rpx;
				padding-bottom: 30rpx;
				margin-top: 36rpx;

				.abl_m_m_s_t {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #000000;
					justify-content: space-between;
					margin-bottom: 22rpx;

					.txt {
						padding-right: 20rpx;
						line-height: 40rpx;
					}

					text {
						font-size: 26rpx;
						font-family: Arial;
						font-weight: bold;
						color: #FC5531;
					}
				}

				.abl_m_m_s_b {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #969696;
					justify-content: space-between;
				}
			}
		}

		.abl_t {
			// margin-top: 20rpx;
			width: 710rpx;
			height: 240rpx;
			background: #01CF79;
			border-radius: 20rpx;
			justify-content: space-around;
			text-align: center;

			.abl_t_s {
				width: 50%;

				.abl_t_s_t {
					font-size: 56rpx;
					font-family: Arial;
					font-weight: bold;
					color: #FFFFFF;
					margin-bottom: 35rpx;
				}

				.abl_t_s_b {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
				}

			}

		}
	}
</style>