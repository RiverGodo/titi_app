<template>
	<view class="cal">
		<mix-tabs @changeTab="changeTab" :tabList="['全部','待使用','已使用']"></mix-tabs>
		<view class="cal_m">
			<mescroll-uni height="93%" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="loadDataList"
				:up="upOption">
				<view v-for="(item,index) in cashList" :key="index"
					@click="navTo('/pages_store/cash/myCash/myCashDetial?id=' + item.id,{login:true})" class="cal_m_s">
					<view class="cal_m_s_t w_flex_center">
						<img class="cal_m_s_t_i" :src="$cdn + item.sellerLogo" alt="">
						<view class="cal_m_s_t_c">{{new Date(item.createTime).getTime() | friendDate}}</view>
						<view :style="item.status === 1 ? 'color:#969696':''" class="cal_m_s_t_r">{{item.statusStr}}</view>
					</view>
					<view class="cal_m_s_m w_flex_center">
						<cash-back :price="item.price" class="cal_m_s_m_i"></cash-back>
						<view class="cal_m_s_m_r">
							<view class="cal_m_s_m_r_1">
								{{item.name}}
							</view>
							<view class="cal_m_s_m_r_2">
								x{{item.num}}
							</view>
							<view class="cal_m_s_m_r_3 w_flex_center">
								<view class="cal_m_s_m_r_3_l">
									{{item.money}}现金豆
								</view>
								<view @click="navTo('/pages_store/cash/myCash/useCash?id=' + item.id,{login:true})"
									class="cal_m_s_m_r_3_r">
									查看券码
								</view>
							</view>
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
				selIndex: '',
				cashList: []
			}
		},
		methods: {
			changeTab(index) {
				this.selIndex = index === 1 ? 0 : index === 2 ? 1 : '';
				this.$util.debounce(() => {
					this.loadDataList({
						num: 1,
						size: 10
					})
				})
			},
			async loadDataList(e) {
				// console.log(e);
				const res = await this.$get('/coupon/listMine', {
					currentPage: e.num,
					pageSize: e.size,
					role: 1,
					status: this.selIndex
				}, {
					showLoading: true
				}, () => {
					this.mescroll.endErr()
				});
				let curPageData = res.data.records;
				let curPageLen = curPageData.length;
				let totalSize = res.data.total;
				//设置列表数据
				if (e.num === 1) this.cashList = [];
				this.cashList = this.cashList.concat(curPageData);
				this.mescroll.endBySize(curPageLen, totalSize);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.cal_m {
		.cal_m_s {
			background: #FFFFFF;
			border: 1px solid #EEEEEE;
			border-radius: 20rpx;
			margin: 30rpx 19rpx;
			padding: 0 25rpx;
			padding-top: 13rpx;
			padding-bottom: 29rpx;

			.cal_m_s_t {
				border-bottom: 1px solid #E2E2E2;
				padding-bottom: 11rpx;

				.cal_m_s_t_i {
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
					margin-right: 16rpx;
				}

				.cal_m_s_t_c {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #000000;
				}

				.cal_m_s_t_r {
					margin-left: auto;
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FC5531;
				}
			}

			.cal_m_s_m {
				margin-top: 35rpx;

				.cal_m_s_m_i {
					width: 140rpx;
					height: 140rpx;
					margin-right: 25rpx;
					min-width: 140rpx;
				}

				.cal_m_s_m_r {
					width: 100%;

					.cal_m_s_m_r_1 {
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: bold;
						color: #000000;
						margin-bottom: 16rpx;
					}

					.cal_m_s_m_r_2 {
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #969696;
					}

					.cal_m_s_m_r_3 {
						width: 100%;
						justify-content: space-between;
						margin-top: 28rpx;

						.cal_m_s_m_r_3_l {
							font-size: 28rpx;
							font-family: Arial;
							font-weight: bold;
							color: #FC5531;
						}

						.cal_m_s_m_r_3_r {
							width: 146rpx;
							height: 50rpx;
							background: #FC5531;
							border-radius: 25rpx;
							font-size: 26rpx;
							font-family: Source Han Sans CN;
							font-weight: 400;
							color: #FFFFFF;
							line-height: 48rpx;
							text-align: center;
						}
					}
				}
			}
		}
	}
</style>