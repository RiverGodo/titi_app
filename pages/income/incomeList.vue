<template>
	<view class="il">
		<view class="il_l">
			<mescroll-uni height="100%" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="loadDataList"
				:up="upOption">
				<view v-for="(item,index) in incomeList" :key="index" class="il_l_s">
					<view class="il_l_s_t w_flex_center">
						<image class="il_l_s_t_i" :src="$cdn + '/static/mine-logo.png'"></image>
						<view class="il_l_s_t_r">
							<view class="il_l_s_t_r_t">
								{{item.role}}
							</view>
							<view class="il_l_s_t_r_b">
								收益起始日：<text>{{item.awardStartDate}}</text>
							</view>
						</view>
					</view>
					<view class="il_l_s_m w_flex_center">
						<view class="il_l_s_m_s">
							<view class="il_l_s_m_s_t">
								{{item.awardDay}}
							</view>
							<view class="il_l_s_m_s_b">
								收益天数
							</view>
						</view>
						<view class="il_l_s_m_s">
							<view class="il_l_s_m_s_t">
								{{item.historyAward}}
							</view>
							<view class="il_l_s_m_s_b">
								历史收益总额
							</view>
						</view>
						<view class="il_l_s_m_s">
							<view class="il_l_s_m_s_t">
								1.92
							</view>
							<view class="il_l_s_m_s_b">
								当日收益额
							</view>
						</view>
					</view>
					<view @click="navTo('/pages/income/incomeDetial?t=' + item.awardType,{login: true})"
						class="il_l_s_e">
						查看详情
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
				incomeList: []
			}
		},
		methods: {
			async loadDataList(e) {
				// console.log(e);
				const res = await this.$get('/partner/awardInfos', {
					currentPage: e.num,
					pageSize: e.size,
					...this.serachData
				}, {
					showLoading: true
				}, () => {
					this.mescroll.endErr()
				});
				let curPageData = res.data.partnerAwardList;
				let curPageLen = curPageData.length;
				let totalSize = res.data.total;
				//设置列表数据
				if (e.num === 1) this.incomeList = [];
				this.incomeList = this.incomeList.concat(curPageData);
				this.mescroll.endBySize(curPageLen, totalSize);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.il {
		.il_l_s {
			background: #FFFFFF;
			border-radius: 20rpx;
			margin: 32rpx 20rpx;
			padding: 0 25rpx;
			padding-top: 35rpx;
			padding-bottom: 20rpx;

		}

		.il_l_s_t_i {
			width: 80rpx;
			height: 80rpx;
			margin-right: 27rpx;
		}

		.il_l_s_t_r {
			.il_l_s_t_r_t {
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #000000;
				line-height: 46rpx;
			}

			.il_l_s_t_r_b {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #969696;
				line-height: 46rpx;

				text {
					color: #000000;
				}
			}
		}

		.il_l_s_m {
			height: 120rpx;
			background: rgba(107, 237, 182, 0.1);
			border-radius: 20rpx;
			justify-content: space-around;
			text-align: center;
			margin-top: 22rpx;

			.il_l_s_m_s_t {
				font-size: 32rpx;
				font-family: Arial;
				font-weight: bold;
				color: #000000;
				margin-bottom: 12rpx;
			}

			.il_l_s_m_s_b {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #969696;
			}
		}

		.il_l_s_e {
			width: 181rpx;
			height: 61rpx;
			border: 1px solid #969696;
			border-radius: 30rpx;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #969696;
			line-height: 56rpx;
			text-align: center;
			margin-left: auto;
			margin-top: 20rpx;
		}
	}
</style>