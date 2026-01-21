<template>
	<view class="sc" v-if="init">
		<view class="sc_t">
			可使用现金券 <text> {{total}}张</text>
		</view>
		<view class="sc_m">
			<mescroll-uni height="70%" :bottombar="false" ref="mescrollRef" @init="mescrollInit" @down="downCallback"
				@up="loadDataList" :up="upOption">
				<view v-for="item in dataList" :key="item.id" @click="handleSelect(item)" class="sc_m_s w_flex_center">
					<cash-back :price="item.price" class="sc_m_s_l"></cash-back>
					<view class="sc_m_s_m">
						<view class="sc_m_s_m_t">
							{{item.name}}
						</view>
						<view class="sc_m_s_m_e">
							一次只能使用一张
						</view>
					</view>
					<view v-if="activeIndex === item.id" style="background: #FC5531;" class="sc_m_s_r">
						√
					</view>
					<view v-else class="sc_m_s_r">
					</view>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				activeIndex: '',
				total: 0,
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
				},
				sellerId: 0,
				init: false
			}
		},
		onLoad(option) {
			this.sellerId = option.sellerId;
			this.unionId = option.u;
			this.init = true
		},
		methods: {
			handleSelect(item) {
				this.activeIndex = item.id;
				this.$store.commit('setCouponData', item);
				this.back();
			},
			async loadDataList(e) {
				const res = await this.$get('/coupon/listSellerMine', {
					currentPage: e.num,
					pageSize: e.size,
					unionId: this.unionId,
					sellerId: this.sellerId
				}, {}, () => {
					this.mescroll.endErr()
				});
				let curPageData = res.data.records;
				let curPageLen = curPageData.length;
				let totalSize = res.data.total;
				this.total = totalSize;
				if (e.num === 1) this.dataList = [];
				this.dataList = this.dataList.concat(curPageData);
				this.mescroll.endBySize(curPageLen, totalSize);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sc {
		margin: 0 20rpx;
		padding: 52rpx 0;

		.sc_t {
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #000000;
			margin-bottom: 40rpx;

			text {
				color: #FC5531;
				margin-left: 10rpx;
			}
		}

		.sc_m {
			.sc_m_s {
				background: #FFFFFF;
				border: 1px solid #EEEEEE;
				border-radius: 20rpx;
				margin-bottom: 31rpx;
				padding: 30rpx 20rpx;

				.sc_m_s_l {
					width: 140rpx;
					height: 140rpx;
					margin-right: 20rpx;
				}

				.sc_m_s_m {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					height: 140rpx;

					.sc_m_s_m_t {
						width: 279rpx;
						height: 71rpx;
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 500;
						color: #000000;
						line-height: 48rpx;
					}

					.sc_m_s_m_e {
						font-size: 20rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FC5531;
					}
				}

				.sc_m_s_r {
					margin-left: auto;
					margin-right: 40rpx;
					width: 51rpx;
					height: 51rpx;
					border: 1px solid #FC5531;
					border-radius: 25rpx;
					text-align: center;
					line-height: 51rpx;
					color: #FFFFFF;
				}
			}
		}
	}
</style>