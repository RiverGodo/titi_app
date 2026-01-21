<template>
	<view class="abl">
		<view class="abl_t w_flex_center">
			<view class="abl_t_s ablts_l">
				<view class="abl_t_s_t">8600</view>
				<view class="abl_t_s_b">本月累计</view>
			</view>
			<view class="abl_t_s ablts_r">
				<view class="abl_t_s_t">10000</view>
				<view class="abl_t_s_b">总充值</view>
			</view>
		</view>
		<view class="abl_m">
			<view class="abl_m_m">
				<mescroll-uni height="80%" :bottombar="false" ref="mescrollRef" @init="mescrollInit"
					@down="downCallback" @up="loadDataList" :up="upOption">
					<view v-for="(item,index) in 10" :key="index" class="abl_m_m_s w_flex_center">
						<view class="abl_m_m_s_l">
							<view class="abl_m_m_s_t w_flex_center">
								微信充值   购买10张广告卡
							</view>
							<view style="margin-bottom: 19rpx;" class="abl_m_m_s_b w_flex_center">
								<text>订单号：654765757635716</text>
							</view>
							<view class="abl_m_m_s_b w_flex_center">
								<text>2023-3-10   18:60</text>
							</view>
						</view>
						<view class="abl_m_m_s_r">
							￥100.00
						</view>
					</view>
				</mescroll-uni>
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
		methods: {
			async loadDataList(e) {
				// const res = await this.$get('/coupon/list', {
				// 	currentPage: e.num,
				// 	pageSize: e.size,
				// 	sort: this.sort
				// 	// ...this.serachData
				// }, {
				// 	showLoading: true
				// }, () => {
				// 	this.mescroll.endErr()
				// });
				// let curPageData = res.data.records;
				// let curPageLen = curPageData.length;
				// let totalSize = res.data.total;
				// // //设置列表数据
				// if (e.num === 1) this.cashList = [];
				// this.cashList = this.cashList.concat(curPageData);
				// this.mescroll.endBySize(curPageLen, totalSize);
				this.mescroll.endBySize(1, 1);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.abl {
		margin: 0 20rpx;
		padding-top: 20rpx;
		.abl_m_m_s_r{
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #FC5531;
		}
		.abl_m {
			margin-top: 46rpx;

			.abl_m_m_s {
				padding: 34rpx 40rpx;
				margin-bottom: 27rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				justify-content: space-between;
				.abl_m_m_s_t {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #000000;
					margin-bottom: 22rpx;
				}

				.abl_m_m_s_b {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #969696;
				}
			}
		}

		.abl_t {
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

			.ablts_l {
				border-right: 1px solid rgba(255, 255, 255, 0.4);
			}

			.ablts_r {
				border-left: 1px solid rgba(255, 255, 255, 0.4);
			}
		}
	}
</style>