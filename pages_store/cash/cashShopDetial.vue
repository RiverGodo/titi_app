<template>
	<view class="cash_shop_detial">
		<!-- <img class="cash_shop_back" :src="backImg" alt=""> -->
		<view :style="'background-image: url('+ backImg +');'" class="s_top">
			<view class="s_top_1 w_flex_center">
				<img class="s_top_1_i" :src="$cdn + shopData.logo" alt="">
				<view class="s_top_1_r">
					<view class="s_top_1_r_t">{{shopData.name}}</view>
					<view @click="navTo('/pages_store/cash/shopDetial?id=' + shopData.id)" class="s_top_1_r_b">查看详情</view>
				</view>
			</view>
			<view class="s_top_2 w_flex_center">
				<view class="s_top_2_l">
					<view class="s_top_2_l_t">
						<text style="color:#969696">营业时间：</text>
						{{shopData.rangeTime}}
					</view>
					<view class="s_top_2_l_b">
						{{shopData.address}}
					</view>
				</view>
				<view class="s_top_2_r">
					<text class="s_top_2_r_icon iconfont">&#xe96c;</text>
					<view class="s_top_2_r_t">电话</view>
				</view>
			</view>
		</view>

		<view class="s_main">
			全部<text style="color: #FC5531;">现金券</text>
		</view>

		<view class="s_list">
			<mescroll-uni height="65%" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="loadDataList"
				:up="upOption">
				<view v-for="(item,index) in cashList" :key="index" 
					class="s_list_s w_flex_center">
					<cash-back @click="navTo('/pages_store/cash/cashDetial?id=' + item.id)" :price="item.price" class="s_list_s_i"></cash-back>
					<view @click="navTo('/pages_store/cash/cashDetial?id=' + item.id)" class="s_list_s_m">
						<view class="s_list_s_m_t">
							{{item.name}}
						</view>
						<view class="s_list_s_m_m w_flex_center">
							<view class="s_list_s_m_m_s">
								一次只能使用一张
							</view>
							<view class="s_list_s_m_m_s">
								{{item.total - item.hadSale}}张
							</view>
						</view>
						<view class="s_list_s_m_e">
							{{item.costBean}}现金豆
						</view>
					</view>
					<view @click="navTo('/pages_store/cash/cashExchange?id=' + item.id, {login: true})" class="s_list_s_r">
						兑换
					</view>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js"
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
				backImg: this.$cdn + '/static/cash-back1.png',
				iconImg: this.$cdn + '/logo.png',
				sellerId:'',
				shopData:{},
				cashList:[]
			}
		},
		onLoad(options) {
			this.sellerId = options.id
			this.init(options.id);
		},
		methods: {
			async init(id){
				let shop = await this.$get('/seller/find',{
					id:id
				})
				this.shopData = shop.data
			},
			async loadDataList(e) {
				const res = await this.$get('/coupon/listSellerCoupon', {
					currentPage: e.num,
					pageSize: e.size,
					sellerId:this.sellerId
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
			}
		}
	}
</script>

<style scoped lang="scss">
	.cash_shop_detial {
		height: 100%;
		width: 100%;
		overflow: hidden;
	}

	.s_top {
		width: 100%;
		height: 340rpx;
		background-size: 100% 100%;

		.s_top_1 {
			margin-left: 38rpx;
			padding-top: 20rpx;

			.s_top_1_i {
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
			}

			.s_top_1_r {
				margin-left: 22rpx;

				.s_top_1_r_t {
					font-size: 36rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #FFFFFF;
					margin-bottom: 35rpx;
				}

				.s_top_1_r_b {
					width: 150rpx;
					height: 44rpx;
					background: #FFFFFF;
					border-radius: 22rpx;
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #01CF79;
					text-align: center;
					line-height: 44rpx;
				}
			}
		}

		.s_top_2 {
			background: #FFFFFF;
			border-radius: 20rpx;
			margin: 0 20rpx;
			margin-top: 60rpx;
			padding-top: 26rpx;
			padding-left: 32rpx;
			padding-bottom: 29rpx;

			.s_top_2_l {
				margin-right: 89rpx;
			}

			.s_top_2_l_t {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #000000;
				margin-bottom: 20rpx;
			}

			.s_top_2_l_b {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #000000;
				line-height: 48rpx;
				width: 468rpx;
			}

			.s_top_2_r {
				text-align: center;

				.s_top_2_r_icon {
					color: #969696;
					// margin-bottom: 20rpx;
				}

				.s_top_2_r_t {
					margin-top: 10rpx;
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #969696;
				}
			}
		}
	}

	.s_main {
		margin-top: 87 + 31rpx;
		margin-left: 20rpx;
		margin-bottom: 31rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #000000;
	}

	.s_list {
		margin: 0 20rpx;
		padding-bottom: 100rpx;

		.s_list_s {
			width: 711rpx;
			height: 199rpx;
			background: rgb(255, 255, 255);
			// border: 1px solid #C5C5C5;
			border-radius: 20rpx;
			margin-bottom: 21rpx;
			// justify-content: space-between;

			.s_list_s_i {
				width: 140rpx;
				height: 140rpx;
				margin-left: 20rpx;
				margin-right: 20rpx;
			}

			.s_list_s_r {
				width: 100rpx;
				height: 50rpx;
				background: #FC5531;
				border-radius: 25rpx;
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
				text-align: center;
				line-height: 48rpx;
				margin-right: 35rpx;
				margin-left: auto;
			}

			.s_list_s_m_t {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #000000;
				line-height: 48rpx;
			}

			.s_list_s_m_e {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FC5531;
				margin-top: 30rpx;
			}

			.s_list_s_m_m_s {
				border: 1px solid #FC5531;
				border-radius: 10rpx;
				font-size: 20rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FC5531;
				text-align: center;
				padding: 6rpx 19rpx;
				margin-right: 10rpx;
			}
		}
	}
</style>