<template>
	<view class="cash_list">
		<view style="height: 100%;" class="cash_list_m round_head_m">
			<view @click="statusWin = !statusWin" class="cash_list_m_t">
				<view class="cash_list_m_t_s statusflex">
					<text v-show="serachData.status === ''">状态</text>
					<text v-show="serachData.status === 0">在线</text>
					<text v-show="serachData.status === 1">下线</text>
					<text class="icon iconfont">&#xe636;</text>
				</view>
				<!-- 	<view class="cash_list_m_t_s dis">
					现售价
				</view> -->
				<view class="cash_list_m_t_s">
					<text v-show="!serachData.name">现金券名称</text>
					<text v-show="serachData.name">{{serachData.name}}</text>
				</view>
			</view>
			<view v-show="statusWin" @click="statusWin = !statusWin" class="cash_list_win"></view>
			<view v-show="statusWin">
				<view ref="maskContent" class="cash_list_win_m">
					<view class="cash_list_win_m_s">
						<view class="cash_list_win_m_s_t">
							状态：
						</view>
						<view class="cash_list_win_m_s_b">
							<view @click="changeStatus('')"
								:class="status === '' ? 'cash_list_win_m_s_b_s active' : 'cash_list_win_m_s_b_s'">
								全部
							</view>
							<view @click="changeStatus(0)"
								:class="status === 0 ? 'cash_list_win_m_s_b_s active' : 'cash_list_win_m_s_b_s'">
								在线
							</view>
							<view @click="changeStatus(1)"
								:class="status === 1 ? 'cash_list_win_m_s_b_s active' : 'cash_list_win_m_s_b_s'">
								下线
							</view>
						</view>
					</view>
					<!-- 	<view class="cash_list_win_m_s">
						<view class="cash_list_win_m_s_t">
							现售价：
						</view>
						<view class="cash_list_win_m_s_b">
							<view class="cash_list_win_m_s_b_input">
								<input placeholder-class="phcolor" placeholder="输入价格" type="number" value="" />
							</view>
						</view>
					</view> -->
					<view class="cash_list_win_m_s">
						<view class="cash_list_win_m_s_t">
							现金券名称：
						</view>
						<view class="cash_list_win_m_s_b">
							<view class="cash_list_win_m_s_b_input">
								<input placeholder-class="phcolor" placeholder="输入现金券名称" type="text" v-model="name" />
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

			<mescroll-uni height="90%" v-show="cashList.length" ref="mescrollRef" @init="mescrollInit"
				@down="downCallback" @up="loadDataList" :up="upOption">
				<view class="cash_list_m_list">
					<uni-swipe-action>
						<view style="margin-bottom: 24rpx;" v-for="(item,index) in cashList" :key="index">
							<uni-swipe-action-item>
								<view
									@click="navTo('/pages_store/merchant/cash/cashDetial?id=' + item.id,{login: true})"
									class="cash_list_m_l_s">
									<view class="cash_list_m_l_s_t">
										<text class="cash_list_m_l_s_t_l">
											ID：{{item.id}}
										</text>
										<view
											:style="{borderRightColor:item.status === 0 || item.status === 2 ? '#FC5C39' : '#969696'}"
											class="cash_list_m_l_s_t_r"></view>
										<text class="r_text">立减券</text>
									</view>
									<view class="cash_list_m_l_s_m">
										<view class="cash_list_m_l_s_m_l">
											<!-- <mix-price-view :price="item.price"></mix-price-view> -->
											￥{{item.price}}
										</view>
										<view class="cash_list_m_l_s_m_l_c">
											<view class="cash_list_m_l_s_m_l_c_t">{{item.name}}</view>
											<view class="cash_list_m_l_s_m_l_c_c">
												售价：<text class="single_clolor">￥{{item.price}} </text>
												<!-- <text class="single_clolor_none"> 原价：￥{{item.originalCost}}</text> -->
											</view>
											<view class="cash_list_m_l_s_m_l_c_b">
												现金券总量：{{item.total ? item.total : '不限'}}
											</view>
										</view>
										<view class="cash_list_m_l_s_m_r">
											<view
												:style="{background:item.status === 0 || item.status === 2 ? '#00CE26' : '#969696'}"
												class="cone"></view>
											<text
												:style="{color:item.status === 0 || item.status === 2 ? '#00CE26' : '#969696'}"
												class="cash_list_m_l_s_m_r_t">
												<text v-if="item.status === 0">在线</text>
												<text v-if="item.status === 2">待上线</text>
												<text v-if="item.status === 1">已下线</text>
												<text v-if="item.status === 4">已作废</text>
											</text>
										</view>
									</view>
									<view class="cash_list_m_l_s_b">
										<view
											@click="navTo('/pages_store/merchant/cash/usageRecord?id=' + item.id,{login: true})"
											class="cash_list_m_l_s_b_r">
											查询使用记录
										</view>
									</view>
								</view>
								<template v-slot:right>
									<!-- <view v-if="item.status === 1" class="swipe swipe-left">
										<text>上线</text>
									</view>
									<view v-if="item.status === 1" class="swipe swipe-right">
										<text>作废</text>
									</view> -->
									<view v-if="item.status === 0 && item.isFirst === false"
										@click="handleChangeStatus(item.id)" class="swipe swipe-single">
										<text>下线</text>
									</view>
								</template>
							</uni-swipe-action-item>
						</view>
					</uni-swipe-action>
				</view>
			</mescroll-uni>
			<emptyData v-show="!cashList.length"></emptyData>
			<mix-button @onConfirm="navTo('/pages_store/merchant/cash/addCash',{login: true})" class="confirmBtn"
				ref="confirmBtn" text="添加现金券" />
		</view>
	</view>
</template>

<script>
	import emptyData from './components/emptyData.vue'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		components: {
			emptyData
		},
		data() {
			return {
				statusWin: false,
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
				cashList: [],
				status: '',
				name: '',
				serachData: {
					status: '',
					name: ''
				}
			}
		},
		methods: {
			async loadDataList(e) {
				console.log(e);
				const res = await this.$get('/seller/coupon/list', {
					currentPage: e.num,
					pageSize: e.size,
					...this.serachData
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
			changeStatus(status) {
				this.status = status
			},
			handleSearch() {
				this.serachData.status = this.status
				this.serachData.name = this.name
				this.loadDataList({
					num: 1,
					size: 10
				})
				this.statusWin = false
			},
			handleReload() {
				this.serachData.status = ''
				this.serachData.name = ''
				this.status = ''
				this.name = ''
				this.loadDataList({
					num: 1,
					size: 10
				})
				this.statusWin = false
			},
			async handleChangeStatus(id) {
				const res = await this.$post("/seller/coupon/offline", {
					id: id
				});
				this.$util.msg('下线成功');
				this.loadDataList({
					num: 1,
					size: 10
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cash_list {
		background: #FFFFFF;
		// height: 100%;
		min-height: 100%;
		.cash_list_m {
			padding-top: 33rpx;
			position: relative;

			.cash_list_m_t {
				display: flex;
				align-items: center;
				justify-content: space-around;
				margin-bottom: 41rpx;

				.cash_list_m_t_s {
					width: 320rpx;
					height: 56rpx;
					background: #FFFFFF;
					border: 1px solid #FC4A5B;
					border-radius: 6rpx;
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: $base-color-admin;
					text-align: center;
					line-height: 56rpx;

					.icon {
						font-size: 30rpx;
						margin-left: 9rpx;
					}
				}

				.statusflex {
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.dis {
					background: #F7F7F7;
					color: #303133;
					border: 1px solid #F7F7F7;
				}
			}
		}
	}

	.confirmBtn {
		background: $base-color-app;
		width: 710rpx;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 24rpx;
		margin: auto;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #FFFFFF;
		border-radius: 40rpx;
		z-index: 2;
	}

	.cash_list_m_list {
		.cash_list_m_l_s {
			border: 1px solid #EFEFEF;
			border-radius: 20rpx;
			margin: 0 20rpx;
			// margin-bottom: 24rpx;
			position: relative;
			overflow: hidden;

			.cash_list_m_l_s_t {
				border-bottom: 1px solid #E9E9E9;
				padding-bottom: 18rpx;
				padding-top: 21rpx;
			}

			.cash_list_m_l_s_t_l {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #000000;
				margin-left: 25rpx;
			}

			.cash_list_m_l_s_t_r {
				position: absolute;
				right: 0;
				top: 0;
				// background: #FFFFFF;
				border-right: 110rpx solid #FC5531;
				border-bottom: 70rpx solid transparent;
			}

			.r_text {
				display: block;
				transform: rotate(33deg);
				font-size: 20rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
				position: absolute;
				right: 0;
				top: 14rpx;
				z-index: 1;
			}

			.cash_list_m_l_s_m {
				display: flex;
				align-items: center;
				// justify-content: space-between;
				padding-top: 24rpx;
				padding-bottom: 24rpx;

				.cash_list_m_l_s_m_l {
					width: 140rpx;
					height: 140rpx;
					background: $base-color-admin;
					border: 1px solid #EFEFEF;
					border-radius: 20rpx;
					text-align: center;
					line-height: 140rpx;
					font-size: 31rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #FFFFFF;
					margin-left: 24rpx;
					margin-right: 28rpx;
				}

				.cash_list_m_l_s_m_l_c {
					width: 335rpx;

					.cash_list_m_l_s_m_l_c_t {
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: bold;
						color: #000000;
						text-overflow: ellipsis;
						overflow: hidden;
						-webkit-line-clamp: 2;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						line-height: 1.2;
					}

					.cash_list_m_l_s_m_l_c_c {
						font-size: 24rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #000000;
						margin-top: 13rpx;
						margin-bottom: 13rpx;

						.single_clolor {
							color: #FE2E00;
							margin-right: 10rpx;
						}

						.single_clolor_none {
							color: #969696;
							text-decoration: line-through;
						}
					}

					.cash_list_m_l_s_m_l_c_b {
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #000000;
					}
				}

				.cash_list_m_l_s_m_r {
					display: flex;
					align-items: center;
					margin-left: 48rpx;

					.cone {
						width: 10rpx;
						height: 10rpx;
						background: #00CE26;
						border-radius: 50%;
						margin-right: 12rpx;
					}

					.cash_list_m_l_s_m_r_t {
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #00CE26;
					}
				}
			}

			.cash_list_m_l_s_b {
				border-top: 1px solid #E9E9E9;
				padding-top: 15rpx;
				padding-bottom: 21rpx;
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #000000;
				text-align: right;
				padding-right: 34rpx;
			}
		}

		.swipe {
			width: 77rpx;
			height: 100%;
			margin-bottom: 12px;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: space-around;
			background: linear-gradient(88deg, #FA8065 0%, #FB7153 100%);
			margin-right: 21rpx;
		}

		.swipe-single {
			border-radius: 20rpx;
		}

		.swipe-left {
			margin-right: 0;
			border-radius: 20rpx 0 0 20rpx;
		}

		.swipe-right {
			background: linear-gradient(88deg, #969696 0%, #969696 100%);
			border-radius: 0 20rpx 20rpx 0;
		}
	}

	.cash_list_win {
		position: fixed;
		top: 203rpx;
		bottom: 0;
		right: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background: rgba(0, 0, 0, 0.5);
		z-index: 3;
	}

	.cash_list_win_m {
		background: #FFFFFF;
		position: absolute;
		top: 115rpx;
		bottom: 0;
		right: 0;
		left: 0;
		width: 100vw;
		height: 430rpx;
		z-index: 3;

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

			.phcolor {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #969696;
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