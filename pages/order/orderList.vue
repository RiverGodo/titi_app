<template>
	<view class="ol">
		<mix-tabs @changeTab="changeTab" :tabList="['全部','待付款','已完成','已取消']"></mix-tabs>
		<view class="ol_m">
			<mescroll-uni height="90%" :bottombar="false" ref="mescrollRef" @init="mescrollInit" @down="downCallback"
				@up="loadDataList" :up="upOption">
				<view v-for="(item,index) in 4" :key="index" @click="navTo('/pages/order/orderDetial?id=' + index, {login: true})" class="ol_m_s">
					<view class="ol_m_s_t w_flex_center">
						某某某牌匾店名
						<text v-if="index === 0">待付款</text>
						<text v-if="index === 1">待付款</text>
						<text v-if="index === 3">已取消</text>
						<text v-if="index === 4">已完成</text>
					</view>
					<view class="ol_m_s_m w_flex_center">
						<image class="ol_m_s_m_i" :src="backimage"></image>
						<view class="ol_m_s_m_r">
							<view class="ol_m_s_m_r_t">TT平台商户广告卡</view>
							<view class="ol_m_s_m_r_m">TT下单时间：2023-4-10 17:20</view>
							<view class="ol_m_s_m_r_e w_flex_center"><text>￥35</text>x1</view>
						</view>
					</view>
					<view class="ol_m_s_b">
						<view class="ol_m_s_b_b">
							继续付款
						</view>
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
				backimage: this.$cdn + '/demo/cash2.png',
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
			changeTab(item) {
				console.log(item);
			},
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
	.ol_m {
		margin: 0 20rpx;

		.ol_m_s {
			background: #FFFFFF;
			border-radius: 20rpx;
			margin-top: 22rpx;
			margin-bottom: 25rpx;
			padding: 25rpx;

			.ol_m_s_t {
				justify-content: space-between;
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #010101;
				border-bottom: 1px solid #E2E2E2;
				padding-bottom: 17rpx;

				text {
					color: #FC5531;
				}
			}

			.ol_m_s_m {
				margin: 25rpx 0;

				.ol_m_s_m_i {
					width: 200rpx;
					height: 150rpx;
					margin-right: 23rpx;
				}

				.ol_m_s_m_r {
					width: 66%;

					.ol_m_s_m_r_t {
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: bold;
						color: #000000;
						line-height: 48rpx;
					}

					.ol_m_s_m_r_m {
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #969696;
						margin-bottom: 46rpx;
					}

					.ol_m_s_m_r_e {
						font-size: 26rpx;
						font-family: Arial;
						font-weight: 400;
						color: #969696;
						justify-content: space-between;

						text {
							font-size: 28rpx;
							font-family: Source Han Sans CN;
							font-weight: bold;
							color: #FC5531;
						}
					}
				}
			}

			.ol_m_s_b {
				border-top: 1px solid #E2E2E2;
				padding-top: 12rpx;

				.ol_m_s_b_b {
					width: 164rpx;
					height: 52rpx;
					border: 2px solid #FC5531;
					border-radius: 25rpx;
					font-size: 24rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FC5531;
					text-align: center;
					line-height: 46rpx;
					margin-left: auto;
				}
			}
		}
	}
</style>