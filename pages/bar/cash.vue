<template>
	<view class="cash">
		<view v-show="statusWin" @click="statusWin = !statusWin" class="cash_list_win"></view>
		<view v-show="statusWin">
			<view ref="maskContent" class="cash_list_win_m">
				<view class="cash_list_win_m_s">
					<view class="cash_list_win_m_s_t">
						全部分类：
					</view>
					<view @click="linkageVisible = true" class="cash_list_win_m_s_b">
						<view class="cash_list_win_m_s_b_input">
							<view v-if="cateName" class="cash_list_win_m_s_b_input_l">{{cateName}}</view>
							<view v-else class="cash_list_win_m_s_b_input_l">全部</view>
							<view class="cash_list_win_m_s_b_input_r">
								<text class="cash_list_win_m_s_b_input_i iconfont">&#xe605;</text>
							</view>
						</view>
					</view>
				</view>
				<view class="cash_list_win_m_s">
					<view class="cash_list_win_m_s_t">
						排序：
					</view>
					<view class="cash_list_win_m_s_b">
						<view class="cash_list_win_m_s_b_input">
							<picker style="width: 100%;" @change="bindPickerChange" :value="sort" :range="array">
								<view class="uni-input">{{array[sort]}}</view>
							</picker>
							<!-- <view class="cash_list_win_m_s_b_input_r">
								<text class="cash_list_win_m_s_b_input_i iconfont">&#xe605;</text>
							</view> -->
						</view>
					</view>
				</view>
				<view class="cash_list_win_b">
					<view @click="handleReload" class="cash_list_win_b_l b_btn">
						重置
					</view>
					<view @click="handleSearch" class="cash_list_win_b_r b_btn">
						完成
					</view>
				</view>
			</view>
		</view>
		<view class="cash_t w_flex_center">
			<view class="cash_t_1 w_flex_center">
				<text class="cash_t_1_l iconfont">&#xe622;</text>
				<input @input="handleSearch" v-model="shopName" class="cash_t_1_i" placeholder-class="phcolor"
					placeholder="请输入商家或现金券名称" type="text">
			</view>
			<view @click="statusWin = true" class="cash_t_2">
				筛选
			</view>
			<view @click="statusWin = true" class="cash_t_2">
				<text class="cash_t_2_i iconfont">&#xe636;</text>
			</view>
		</view>
		<view class="cash_m">
			<mescroll-uni height="90%" :bottombar="false" ref="mescrollRef" @init="mescrollInit" @down="downCallback"
				@up="loadDataList" :up="upOption">
				<view v-for="(item,index) in cashList" :key="index" class="cash_m_s">
					<view @click="navTo('/pages/cash/cashShopDetial?id=' + item.id)"
						class="cash_m_s_t w_flex_start">
						<view class="cash_m_s_t_l">
							<img class="cash_m_s_t_l_im" :src="$cdn + item.logo" alt="">
						</view>
						<view class="cash_m_s_t_r">
							<view class="cash_m_s_t_r_t">{{item.name}}</view>
							<view class="cash_m_s_t_r_b">已兑换：{{item.couponSaleNum}}</view>
						</view>
					</view>
					<view :style="item.id === showCashId ? 'height:auto;overflow: unset;' : ''"
						class="cash_m_s_b w_flex_start">
						<view class="cash_m_s_b_l ">
							<view v-for="(item2,index2) in item.couponList" :key="index2"
								class="cash_m_s_b_l_s w_flex_center">
								<view class="cash_m_s_b_l_s_l w_flex_start">
									<view class="cash_m_s_b_l_s_l_l">¥{{item2.price}}</view>
									<view class="cash_m_s_b_l_s_l_r">{{item2.name}}</view>
								</view>
								<view class="cash_m_s_b_l_s_r">{{item2.costPoints}}积分</view>
							</view>
						</view>
						<text v-show="item.id !== showCashId" @click="showCash(item.id)"
							class="cash_t_1_l iconfont">&#xe605;</text>
						<text v-show="item.id === showCashId" @click="showCash(-1)"
							class="cash_t_1_l iconfont">&#xe604;</text>
					</view>
				</view>
			</mescroll-uni>
		</view>
		<w-picker :visible.sync="linkageVisible" mode="linkage" :value="defaultRegion1" :options="options" :level="3"
			default-type="id" themeColor="#FC5C39" :default-props="defaultProps1" @confirm="onConfirm($event)"
			ref="linkage">
		</w-picker>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				array: ['智能排序', '销量排序'],
				statusWin: false,
				sort: 0,
				cateName: '',
				shopName: '',
				cashList: [],
				linkageVisible: false,
				defaultRegion1: [],
				defaultProps1: {
					label: "name",
					value: "id",
					children: "children"
				},
				options: [],
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
				cateId: '',
				showCashId: -1
			}
		},
		created() {
			this.listCate()
		},
		methods: {
			showCash(id) {
				this.showCashId = id
			},
			onConfirm(event) {
				this.cateId = event.value[2]
				this.cateName = event.result
			},
			async listCate() {
				let res1 = await this.$get("/seller/category/list", {
					type: 0
				})
				let res2 = await this.$get("/seller/category/list", {
					type: 1
				})
				this.options = [{
						name: '普通公司',
						id: 0,
						children: res1.data
					},
					{
						name: '创业公司',
						id: 1,
						children: res2.data
					}
				]
			},
			handleReload() {
				this.statusWin = false
				this.cateName = ''
				this.sort = 0
				this.shopName = ''
				this.cateId = ''
				this.$util.debounce(() => {
					this.loadDataList({
						num: 1,
						size: 10
					})
				})
			},
			handleSearch() {
				this.statusWin = false
				this.$util.debounce(() => {
					this.loadDataList({
						num: 1,
						size: 10
					})
				})
			},
			bindPickerChange(value) {
				this.sort = value.detail.value
			},
			async loadDataList(e) {
				// console.log(e);
				const res = await this.$get('/coupon/list', {
					currentPage: e.num,
					pageSize: e.size,
					sort: this.sort,
					keyword: this.shopName,
					cateId: this.cateId
					// ...this.serachData
				}, {
					showLoading: true
				}, () => {
					this.mescroll.endErr()
				});
				let curPageData = res.data.records;
				let curPageLen = curPageData.length;
				let totalSize = res.data.total;
				// //设置列表数据
				if (e.num === 1) this.cashList = [];
				this.cashList = this.cashList.concat(curPageData);
				this.mescroll.endBySize(curPageLen, totalSize);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cash_t {
		justify-content: space-between;
		background: #FFFFFF;
		// padding-bottom: 33rpx;
		padding: 33rpx 20rpx;

		.cash_t_1 {
			width: 590rpx;
			height: 71rpx;
			background: #FFFFFF;
			border: 1px solid #EFEFEF;
			border-radius: 35rpx;
			font-size: 26rpx;

			.cash_t_1_l {
				margin-left: 31rpx;
				margin-right: 14rpx;
				color: #969696;
			}

			.cash_t_1_i {
				font-size: 26rpx;
				width: 80%;
			}

			.phcolor {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #969696;
			}
		}

		.cash_t_2 {
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #000000;

			.cash_t_2_i {
				font-size: 37rpx;
			}
		}
	}

	.cash_m {
		.cash_m_s {
			background: #FFFFFF;
			margin: 0 20rpx;
			margin-top: 30rpx;
			margin-bottom: 28rpx;
			border: 1px solid #EEEEEE;
			border-radius: 20rpx;

			.cash_m_s_t {
				border-bottom: 1px solid #EEEEEE;
				margin-top: 24rpx;
				padding-bottom: 25rpx;

				.cash_m_s_t_l {
					width: 200rpx;
					height: 150rpx;
					margin-left: 20rpx;
					margin-right: 30rpx;

					.cash_m_s_t_l_im {
						width: 100%;
						height: 100%;
					}
				}

				.cash_m_s_t_r {
					.cash_m_s_t_r_t {
						width: 418rpx;
						// height: 73rpx;
						font-size: 30rpx;
						font-family: Source Han Sans CN;
						font-weight: 500;
						color: #000000;
						line-height: 40rpx;
						overflow: hidden;
						margin-bottom: 38rpx;
						-webkit-line-clamp: 2;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						min-height: 86rpx;
					}

					.cash_m_s_t_r_b {
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #969696;
					}
				}
			}

			.cash_m_s_b {
				justify-content: flex-end;
				margin-top: 20rpx;
				margin-bottom: 24rpx;
				margin-right: 34rpx;
				height: 46rpx;
				overflow: hidden;

				.cash_m_s_b_l {
					margin-right: 76rpx;

					.cash_m_s_b_l_s {
						margin-bottom: 10rpx;

						.cash_m_s_b_l_s_l_l {
							// width: 76rpx;
							height: 41rpx;
							background: #FC5531;
							border: 1px solid #FC5531;
							border-radius: 10rpx;
							font-size: 14rpx;
							font-family: Source Han Sans CN;
							font-weight: 400;
							color: #FFFFFF;
							text-align: center;
							line-height: 38rpx;
							padding: 0 20rpx;
						}

						.cash_m_s_b_l_s_l {
							border: 1px solid #CBCBCB;
							border-radius: 10rpx;
						}

						.cash_m_s_b_l_s_l_r {
							width: 161zrpx;
							height: 41rpx;
							font-size: 20rpx;
							font-family: Source Han Sans CN;
							font-weight: 400;
							color: #969696;
							border-left: none;
							text-align: center;
							line-height: 38rpx;
							padding: 0 20rpx;
						}
					}
				}

				.cash_m_s_b_l_s_r {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #FC5531;
					margin-left: 16rpx;
				}

				.cash_t_1_l {
					font-size: 20rpx;
					margin-top: 14rpx;
				}
			}
		}
	}

	.cash_list_win {
		position: fixed;
		top: 112*2rpx;
		bottom: 0;
		right: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
	}

	.cash_list_win_m {
		background: #FFFFFF;
		position: absolute;
		top: 67*2rpx;
		bottom: 0;
		right: 0;
		left: 0;
		width: 100vw;
		height: 430rpx;
		z-index: 999;

		.cash_list_win_m_s {
			margin-left: 31rpx;
			margin-right: 31rpx;
			margin-bottom: 40rpx;

			.cash_list_win_m_s_t {
				font-size: 30rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #000000;
				margin-bottom: 31rpx;
			}

			.cash_list_win_m_s_b {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.cash_list_win_m_s_b_s {
					width: 200rpx;
					height: 52rpx;
					border: 1px solid #EAEAEA;
					border-radius: 6rpx;
					text-align: center;
					line-height: 52rpx;
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #969696;
				}

				.active {
					background: #FFF5F5;
					border: 1px solid $base-color-admin;
					color: $base-color-admin;
				}
			}
		}

		.cash_list_win_m_s_b_input {
			width: 100%;
			height: 60rpx;
			border: 1px solid #EAEAEA;
			border-radius: 30rpx;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			padding-left: 31rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.phcolor {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #969696;
			}

			.cash_list_win_m_s_b_input_i {
				font-size: 20rpx;
				margin-right: 31rpx;
			}
		}

	}

	.cash_list_win_b {
		display: flex;
		align-items: center;
		box-shadow: 0rpx 0rpx 2rpx 0rpx #DADADA;
		padding-top: 28rpx;
		padding-bottom: 32rpx;

		.cash_list_win_b_l {
			margin-left: auto;
			border: 1px solid #EAEAEA;
			color: #303133;
		}

		.cash_list_win_b_r {
			background: $base-color-admin;
			color: #FFFFFF;
			margin-left: 29rpx;
			margin-right: 30rpx;
		}

		.b_btn {
			width: 150rpx;
			height: 56rpx;
			border-radius: 8rpx;
			text-align: center;
			line-height: 56rpx;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
		}
	}
</style>