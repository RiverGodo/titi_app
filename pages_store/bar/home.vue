<template>
	<view class="home">
		<view :style="'background-image: url('+ backImg +');background-repeat: no-repeat;background-size:100% 100%'"
			class="home_top">
			<view class="home_t_t">
				<view class="home_t_t1">
					Helloin
				</view>
				<view class="home_t_t2 w_flex_center">
					欢迎入驻梯递助手
					<view class="home_t_t2_r" @click="navTo('/pages_store/ad/adAdd')">
						我要做广告
					</view>
				</view>
			</view>
			<view class="home_t_2 w_flex_center">
				<view class="home_t_2_s">
					<view class="home_t_2_s_t">广告卡余额</view>
					<view class="home_t_2_s_b">{{data.usable}}<text style="font-size: 16rpx;">张卡</text></view>
				</view>
				<view class="line"></view>
				<view class="home_t_2_s">
					<view class="home_t_2_s_t">累计消耗</view>
					<view class="home_t_2_s_b">{{data.totalCost}}<text style="font-size: 16rpx;">张卡</text></view>
				</view>
				<view class="line"></view>
				<view class="home_t_2_s">
					<view class="home_t_2_s_t">今日消耗</view>
					<view class="home_t_2_s_b">{{data.todayCost}}<text style="font-size: 16rpx;">张卡</text></view>
				</view>
			</view>
			<view class="home_t_3 w_flex_center">
				<view class="home_t_3_i w_flex_center">
					<text class="iconfont">&#xe622;</text>
					<input type="text" placeholder="输入名称搜索" v-model="name" @input="handleSearch" />
				</view>
				<view @click="$refs.popup.open()" class="home_t_3_t">筛选</view>
				<text @click="$refs.popup.open()" class="iconfont">&#xe636;</text>
			</view>
			<view class="home_list">
				<mescroll-uni height="60%" :bottombar="false" ref="mescrollRef" @init="mescrollInit"
					@down="downCallback" @up="loadDataList" :up="upOption">
					<view v-for="(item,index) in cashList" :key="item.id"
						@click="navTo('/pages_store/ad/adDetial?id=' + item.id, {login: true})" class="home_list_s">
						<view class="home_l_s_t">{{item.name}}</view>
						<view v-if="item.status === 0" class="home_l_s_flex colortype2">{{item.statusStr}}</view>
						<view v-if="item.status === 1" class="home_l_s_flex">{{item.statusStr}}</view>
						<view v-if="item.status === 2" class="home_l_s_flex colortype2">{{item.statusStr}}</view>
						<view v-if="item.status === 3" class="home_l_s_flex colortype2">{{item.statusStr}}</view>
						<view class="home_l_s_m">
							<view class="home_l_s_m_s">
								<view class="home_l_s_m_s_t">
									曝光量
								</view>
								<view class="home_l_s_m_s_b">
									{{item.seeTimes}} <text>（次）</text>
								</view>
							</view>
							<view class="home_l_s_m_s">
								<view class="home_l_s_m_s_t">
									点击量
								</view>
								<view class="home_l_s_m_s_b">
									{{item.clickTimes}} <text>（次）</text>
								</view>
							</view>
							<view class="home_l_s_m_s">
								<view class="home_l_s_m_s_t">
									点击率
								</view>
								<view class="home_l_s_m_s_b">
									{{item.clickTimes / item.seeTimes | percent}}
								</view>
							</view>
							<view class="home_l_s_m_s">
								<view class="home_l_s_m_s_t">
									预付广告卡
								</view>
								<view class="home_l_s_m_s_b">
									{{item.adCardNum}} <text>（张）</text>
								</view>
							</view>
							<view class="home_l_s_m_s">
								<view class="home_l_s_m_s_t">
									消耗广告卡
								</view>
								<view class="home_l_s_m_s_b">
									{{item.costAdCardNum}} <text>（张）</text>
								</view>
							</view>
							<view class="home_l_s_m_s">
								<view class="home_l_s_m_s_t">
									曝光时长
								</view>
								<view class="home_l_s_m_s_b">
									{{item.costTime}} <text> (秒) </text>
								</view>
							</view>
						</view>
						<view class="home_l_s_c w_flex_center">
							<view class="progress">
								<view class="bar"
									:style="'width:' + (parseFloat(item.costAdCardNum/item.adCardNum * 100).toFixed(2)) + '%'">
								</view>
								<view :class="item.costAdCardNum/item.adCardNum>0.5? 'tip_half': 'tip'" :style="item.costAdCardNum/item.adCardNum>0.5? calLeft((parseFloat(item.costAdCardNum/item.adCardNum * 100).toFixed(2)) + '%'):
         {left: (parseFloat(item.costAdCardNum/item.adCardNum * 100).toFixed(2)) + '%'}">
									{{item.costAdCardNum/item.adCardNum | percent}}</view>
							</view>
						</view>
						<view class="home_l_s_b w_flex_center">
							<view class="home_l_s_b_s" v-if="item.status === 1" @click.stop="over(item.id)">终止订单</view>
							<view class="home_l_s_b_s" @click.stop="navTo('/pages_store/ad/adAdd?id=' + item.id)">再来一单
							</view>
						</view>
					</view>
				</mescroll-uni>
			</view>
		</view>
		<uni-popup ref="popup" type="top">
			<view class="popup_m">
				<view class="home_t_3 w_flex_center">
					<view class="home_t_3_i w_flex_center">
						<text class="iconfont">&#xe622;</text>
						<input type="text" placeholder="输入名称搜索" v-model="name" value="" />
					</view>
					<view @click="$refs.popup.open()" class="home_t_3_t">筛选</view>
					<text @click="$refs.popup.open()" class="iconfont">&#xe664;</text>
				</view>
				<view class="popup_m_s">
					<view class="popup_m_s_t">按状态搜索：</view>
					<view @click="visible = true" class="popup_m_s_m w_flex_center">
						<view class="popup_m_s_m_t">{{selelctValue}}</view>
						<text class="iconfont">&#xe605;</text>
					</view>
				</view>
				<view class="popup_m_b w_flex_center">
					<view @click="reset" class="popup_m_b_s b_s_l">
						重置
					</view>
					<view @click="search" class="popup_m_b_s b_s_r">
						完成
					</view>
				</view>
			</view>
		</uni-popup>
		<w-picker :visible.sync="visible" mode="selector" :value="selelctValue" default-type="name"
			:default-props="defaultProps" :options="selectorList" @confirm="onConfirm($event)"
			ref="selector"></w-picker>
		<tabbar ref="tabbars" index="0"></tabbar>
	</view>
</template>

<script>
	import tabbar from "@/pages_store/components/tabbar/tabbar.vue"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		components: {
			tabbar
		},
		data() {
			return {
				cashList: [],
				data: {},
				status: '',
				name: '',
				backImg: this.$cdn + "/static/cash-back2.png",
				selectorList: [{
						name: '待审核',
						id: 0
					},
					{
						name: '投放中',
						id: 1
					},
					{
						name: '投放结束',
						id: 2
					},
					{
						name: '未通过',
						id: 3
					}
				],
				selelctValue: '全部',
				visible: false,
				defaultProps: {
					label: "name",
					value: "id"
				},
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
		onLoad() {
			this.getData();
		},
		mounted() {
			// #ifdef H5
			// 隐藏头部返回按钮
			let ad = document.getElementsByClassName('uni-page-head-hd')[0]
			ad.style.display = 'none'
			// #endif
		},
		methods: {
			handleSearch(){
				this.$util.debounce(() => {
					this.loadDataList({
						num: 1,
						size: 10
					})
				})
			},
			async over(id) {
				uni.showModal({
					title: '温馨提示',
					content: '您的广告正在投放中，确定现在终止订单吗？',
					confirmColor: "#01CF79",
					showCancel: true,
					success: async (res) => {
						if (res.confirm) {
							let res = await this.$post('/ad-operation/over', {
								id
							});
							this.$util.msg("操作成功！")
							this.getData();
							this.mescroll && this.mescroll.resetUpScroll();
						}
					}
				});
			},
			calLeft(percent) {
				return {
					left: `calc(${percent} - 120rpx)`
				}
			},
			search() {
				this.$refs.popup.close();
				this.mescroll && this.mescroll.resetUpScroll();
			},
			reset() {
				this.name = '';
				this.selelctValue = '全部';
				this.status = '';
			},
			onConfirm(event) {
				this.selelctValue = event.obj.name
				this.status = event.value;
			},
			async getData() {
				let role = 1;
				let res = await this.$get("/ad-operation/listMineAdMsg", {
					role
				});
				this.data = res.data;
			},
			async loadDataList(e) {
				let param = {
					currentPage: e.num,
					pageSize: e.size,
					role: 1
				}
				if (this.status !== '') {
					param['status'] = this.status;
				}
				if (this.name !== '') {
					param['name'] = this.name;
				}
				const res = await this.$get('/ad-operation/listMine', param, {
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

<style lang="scss" scoped>
	.popup_m {
		background: #fff;

		.popup_m_b {
			padding: 30rpx;
			margin-top: 47rpx;
			border-top: 1px solid #DADADA;

			.popup_m_b_s {
				width: 150rpx;
				height: 56rpx;
				border: 1px solid #EAEAEA;
				border-radius: 8rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #303133;
				text-align: center;
				line-height: 56rpx;
			}

			.b_s_l {
				margin-left: auto;
				margin-right: 30rpx;
			}

			.b_s_r {
				background: #FC5C39;
				color: #FFFFFF;
				border: 1px solid #FC5C39;
			}
		}

		.popup_m_s {
			.popup_m_s_t {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #000000;
				margin-left: 27rpx;
				margin-bottom: 32rpx;
			}

			.popup_m_s_m {
				width: 687rpx;
				height: 60rpx;
				border: 1px solid #EAEAEA;
				border-radius: 30rpx;
				margin: 0 auto;

				.popup_m_s_m_t {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #000000;
					margin-left: 30rpx;
					margin-right: auto;
				}

				.iconfont {
					font-size: 20rpx;
					margin-right: 30rpx;
				}
			}
		}

	}

	.home {
		.home_list {
			.home_list_s {
				background: #FFFFFF;
				border-radius: 20rpx;
				margin: 30rpx 20rpx;
				position: relative;

				.home_l_s_flex {
					position: absolute;
					right: 0;
					top: 0;
					width: 141rpx;
					height: 51rpx;
					background: linear-gradient(180deg, #01D584, #02C15F);
					border-radius: 0rpx 20rpx 0rpx 20rpx;
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					text-align: center;
					line-height: 50rpx;
				}

				.colortype2 {
					background: #FC5937;
				}

				.home_l_s_t {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #000000;
					padding: 30rpx;
				}

				.home_l_s_m {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					justify-content: space-between;
					margin: 0 30rpx;

					.home_l_s_m_s {
						width: 200rpx;
						height: 121rpx;
						background: #FFFFFF;
						border: 1px solid #EEEEEE;
						border-radius: 20rpx;
						margin-bottom: 29rpx;
						padding-top: 25rpx;
						padding-left: 30rpx;

						.home_l_s_m_s_t {
							font-size: 24rpx;
							font-family: Source Han Sans CN;
							font-weight: 400;
							color: #969696;
							margin-bottom: 21rpx;
						}

						.home_l_s_m_s_b {
							font-size: 32rpx;
							font-family: Arial;
							font-weight: bold;
							color: #000000;

							text {
								font-size: 16rpx;
							}
						}
					}

				}
			}
		}

		.home_l_s_c {
			margin: 0 30rpx;
			padding-bottom: 20rpx;

			//.home_l_s_c_l {
			//	font-size: 24rpx;
			//	font-family: Source Han Sans CN;
			//	font-weight: 400;
			//	color: #000000;
			//	margin-right: 20rpx;
			//	text {
			//		color: #FC5937;
			//	}
			//}
			.progress {
				width: 100%;
				height: 20rpx;
				border-radius: 10rpx;
				background: #ccc;
				margin: 50rpx 0rpx 20rpx 0rpx;
				position: relative;

				.bar {
					position: absolute;
					top: 0;
					left: 0;
					width: 0%;
					height: 20rpx;
					border-radius: 10rpx;
					background: linear-gradient(360deg, rgba($base-color-admin, 1) 0%, rgba($base-color-admin, .5) 100%);
					;
					z-index: 1;
				}

				.tip {
					background: linear-gradient(360deg, rgba($base-color-admin, 1) 0%, rgba($base-color-admin, .5) 100%);
					font-size: 24rpx;
					padding: 0rpx 10rpx;
					height: 44rpx;
					line-height: 44rpx;
					border-radius: 10rpx 10rpx 10rpx 0rpx;
					color: white;
					position: absolute;
					top: -58rpx;
					left: 0%;
					z-index: 10;

					&:before {
						display: block;
						content: "";
						border-width: 6rpx;
						border-color: $base-color-admin white white $base-color-admin;
						position: absolute;
						top: 44rpx;
						border-style: solid;
						left: 0rpx;
					}
				}

				.tip_half {
					background: linear-gradient(360deg, rgba($base-color-admin, 1) 0%, rgba($base-color-admin, .5) 100%);
					font-size: 24rpx;
					height: 44rpx;
					line-height: 44rpx;
					text-align: center;
					width: 120rpx;
					border-radius: 10rpx 10rpx 0rpx 10rpx;
					color: white;
					position: absolute;
					top: -58rpx;
					left: 0rpx;
					z-index: 10;

					&:before {
						display: block;
						content: "";
						border-width: 6rpx;
						border-color: $base-color-admin $base-color-admin white white;
						position: absolute;
						top: 44rpx;
						border-style: solid;
						right: 0rpx;
					}
				}
			}
		}

		.home_t_3 {
			background: #FFFFFF;
			padding: 33rpx 20rpx;
			// margin-top: 28rpx;

			.home_t_3_i {
				width: 590rpx;
				height: 71rpx;
				background: #FFFFFF;
				border: 1px solid #EFEFEF;
				border-radius: 35rpx;

				.iconfont {
					color: #969696;
					margin-left: 31rpx;
					margin-right: 6rpx;
				}

				input {
					width: 100%;
					margin-right: 20rpx;
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
				}
			}

			.home_t_3_t {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #000000;
				margin-left: 21rpx;
				margin-right: 8rpx;
			}
		}


		.home_l_s_b {
			border-top: 1px solid #EEEEEE;
			padding: 17rpx 0;
			// margin-top: 22rpx;
			padding-right: 31rpx;
			display: flex;
			justify-content: flex-end;

			.home_l_s_b_s {
				width: 162rpx;
				height: 51rpx;
				border: 1px solid #FC5937;
				border-radius: 25rpx;
				font-size: 24rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FC5937;
				text-align: center;
				line-height: 50rpx;
				margin-left: 20rpx;
			}
		}

		.home_top {
			height: 280rpx;

			.home_t_t {
				margin: 0 25rpx;

				.home_t_t1 {
					font-size: 48rpx;
					font-family: Arial;
					font-weight: bold;
					color: #fff;
					margin-bottom: 28rpx;
				}

				.home_t_t2 {
					font-size: 48rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #fff;
					justify-content: space-between;

					.home_t_t2_r {
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
						width: 164rpx;
						height: 46rpx;
						background: #FC5531;
						border-radius: 23rpx;
						text-align: center;
						line-height: 46rpx;
					}
				}
			}

			.home_t_2 {
				background: #FFFFFF;
				border-radius: 30rpx;
				margin: 0 25rpx;
				margin-top: 55rpx;
				padding: 40rpx 50rpx;
				justify-content: space-around;
				border: 1px solid #f3f3f3;
				margin-bottom: 28rpx;

				.home_t_2_s {
					.home_t_2_s_t {
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #000000;
						margin-bottom: 25rpx;
					}

					.home_t_2_s_b {
						font-size: 36rpx;
						font-family: Arial;
						font-weight: bold;
						color: #FC5531;
					}
				}

				.line {
					width: 1rpx;
					height: 84rpx;
					background: #f3f3f3;
				}
			}

		}
	}
</style>