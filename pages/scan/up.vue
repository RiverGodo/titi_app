<template>
	<view class="app">
		<view :style="'background-image: url('+ backImg1 +');'" class="app_top">
			<mqtt-component @sendData='sendData' ref="mqtt" />
			<!-- <view class="wait" v-html="floorHtml"></view> -->
			<view class="wait_m">
				<image class="wait_m_i" :src="up1"></image>
				<jyf-parser class="wait" :html="floorHtml" />
			</view>

			<view class="center">
				<!-- <image mode="widthFix" :src="cdn + '/demo/ad.jpg'" /> -->
				<banner :width="'710rpx'" :list="banner2"></banner>
			</view>
		</view>
		<view class="cash">
			<view class="cash_t">
				<view class="cash_t_1 w_flex_center">
					<text class="cash_t_1_l iconfont">&#xe622;</text>
					<input @input="handleSearch" v-model="shopName" class="cash_t_1_i" placeholder-class="phcolor"
						placeholder="请输入商家或现金券名称" type="text">
				</view>
			</view>
			<view class="app_cash_m">
				<mescroll-uni height="48%" :bottombar="false" ref="mescrollRef" @init="mescrollInit"
					@down="downCallback" @up="loadDataList" :up="upOption">
					<view @click="navTo('/pages/cash/cashShopDetial?id=' + item.sellerId)"
						v-for="(item,index) in cashList" :key="index" class="app_cash_m_s w_flex_center">
						<img class="app_cash_m_s_l" :src="$cdn + item.sellerLogo" alt="">
						<view class="app_cash_m_s_m">
							<view class="app_cash_m_s_m_t">{{item.sellerName}}</view>
							<view class="app_cash_m_s_m_c">{{item.name}}
							</view>
							<view class="app_cash_m_s_m_e w_flex_center">￥{{item.price}}
								<view class="line"></view>{{item.costPoints}}积分
								<!-- <view class="line"></view>{{item.costBean}}现金豆 -->
							</view>
						</view>
						<view @click="navTo('/pages/cash/cashExchange?id=' + item.id,{login:true})"
							class="app_cash_m_s_r">
							兑换
						</view>
					</view>
				</mescroll-uni>
			</view>
		</view>
		<uni-popup @change="handleChange" ref="popup" type="bottom">
			<view class="popup_m">
				<!-- <img class="popup_m_t" :src="cdn + '/demo/ad.jpg'" alt=""> -->
				<banner :width="'710rpx'" :list="banner3"></banner>
				<view :style="'background-image: url('+ backImg +');'" class="popup_m_b">
					<img class="popup_m_i" :src="$cdn + prizeData.productImg" alt="">
					<view class="popup_m_text">恭喜您获得“{{prizeData.productTypeStr}}”{{prizeData.productName}}</view>
					<view class="popup_m_b_b w_flex_center">
						<view @click="$refs.popup.close()" class="popup_m_b_b_s">取 消</view>
						<view class="popup_m_b_b_s">分享好友</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				backImg1: this.$cdn + '/static/order-back1.png',
				index: '-',
				floorHtml: ``,
				inviteCode: '',
				cdn: this.$cdn,
				backImg: this.$cdn + '/static/up-back.png',
				up1: this.$cdn + '/static/up1.png',
				prizeData: {},
				banner2: [],
				banner3: [],
				shopName: '',
				cashList: [],
				upOption: {
					page: {
						size: 3
					},
					noMoreSize: 1,
					textNoMore: "我也是有底线的~",
					empty: {
						icon: '/static/images/empty/default.png'
					},
				},
			}
		},
		async onLoad(options) {
			const res = await this.$get('/user/session');
			this.getBanner(options.b);
			let session = res.data;
			let ranges = options.c.split(",");
			let random = Math.floor(Math.random() * (ranges.length));
			this.$nextTick(async () => {
				const prize = await this.$get('/lottery/getLottery');
				if (prize.data) {
					this.prizeData = prize.data
					this.$refs.popup.open()
				}
				this.$refs.mqtt.randomDevice = ranges[random];
				let userId = session.id ? session.id : this.$store.state.deviceId;
				await this.$refs.mqtt.connect(userId);
				this.floorHtml = `<view>电梯调度中，请稍候！</view>`
				let send = {
					reqTimestamp: undefined,
					userId,
					currentFloor: Number(options.f),
					targetFloor: Number(options.t),
					signToken: 'test',
					requestType: 17, //todo这个是啥
					isCancelQueueUp: false
				}
				this.$refs.mqtt.subscribe().then(() => {
					this.$refs.mqtt.publish(send)
				})
			})
		},
		async onUnload() {
			this.$refs.mqtt.unSubscribe();
			this.$refs.mqtt.unConnect();
		},
		methods: {
			handleSearch() {
				this.$util.debounce(() => {
					this.loadDataList({
						num: 1,
						size: 10
					})
				})
			},
			async loadDataList(e) {
				// console.log(e);
				const res = await this.$get('/coupon/listHome', {
					currentPage: e.num,
					pageSize: e.size,
					keyword: this.shopName
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
			},
			async handleChange(e) {
				console.log(e);
			},
			async getBanner(bid) {
				let res2 = await this.$get("/ad/getAdBanner", {
					buildingId: bid,
					flag: 2
				});
				let res3 = await this.$get("/ad/getAdBanner", {
					buildingId: bid,
					flag: 3
				});
				this.banner2 = res2.data
				this.banner3 = res3.data
			},
			sendData(res) {
				let jsonRes = JSON.parse(res)
				if (jsonRes.dataType === 20) { //用户请求乘梯下发数据
					if (jsonRes.elevatorNum === -1) { //调度失败
						this.floorHtml = `<view class="error">非常抱歉，调度失败了</view>`
						if (jsonRes.scheduleFailType === 5) {
							this.$util.msg("您取消了乘梯")
						} else if (jsonRes.scheduleFailType === 1) {
							this.$util.msg("暂无可用电梯")
						} else if (jsonRes.scheduleFailType === 2) {
							this.$util.msg("电梯故障")
						} else if (jsonRes.scheduleFailType === 3) {
							this.$util.msg("电梯维修中")
						} else if (jsonRes.scheduleFailType === 4) {
							this.$util.msg("电梯满员")
						} else if (jsonRes.scheduleFailType === 4) {
							this.$util.msg("出发楼层错误")
						} else {
							this.$util.msg("调度失败")
						}
					}
				} else if (jsonRes.dataType === 21) { //电梯到达指令下发数据
					if (jsonRes.isInitialFloor) { //到达起始楼层
						this.floorHtml =
							`<view>电梯已到达${jsonRes.currentFloor}楼，请上 <text  class="tip">${jsonRes.elevatorNum}</text>号电梯！</view>`
					} else { //到达目标楼层
						this.floorHtml = `<view>电梯已到达目标楼层：<text  class="tip">${jsonRes.floorNum}</text>楼，欢迎下次乘坐！</view>`
					}
				} else if (jsonRes.dataType === 22) { //电梯状态数据下发
					if (jsonRes.elevatorStatus === 0) {
						this.floorHtml = `<view>电梯已到达<text  class="tip">${jsonRes.currentFloor}</text>楼，正在停止中</view>`
					} else if (jsonRes.elevatorStatus === 1) {
						this.floorHtml = `<view>电梯已到达<text  class="tip">${jsonRes.currentFloor}</text>楼，正在启动中</view>`
					} else if (jsonRes.elevatorStatus === 2) {
						this.floorHtml = `<view>电梯已到达<text  class="tip">${jsonRes.currentFloor}</text>楼，正在上行中</view>`
					} else if (jsonRes.elevatorStatus === 3) {
						this.floorHtml = `<view>电梯已到达<text  class="tip">${jsonRes.currentFloor}</text>楼，正在下行中</view>`
					} else {
						this.floorHtml = `<view>电梯已到达<text  class="tip">${jsonRes.currentFloor}</text>楼，正在等待乘客中</view>`
					}
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.app {
		background: #fff;
	}

	.wait_m {
		padding-top: 68rpx;
		margin-bottom: 71rpx;

		.wait_m_i {
			text-align: center;
			width: 90rpx;
			height: 90rpx;
			margin: 0 auto;
			text-align: center;
			display: block;
			margin-bottom: 26rpx;
		}
	}

	.app_top {
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 100%;
		height: 540rpx;
	}

	page {
		background-color: $bg-color;
	}

	.center {
		// background: #ccc;

		image {
			width: 100%;
		}
	}

	.wait {
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #FFFFFF;
		text-align: center;
	}

	.title {
		background-color: #fff;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 20rpx;
		font-size: 28rpx;
		color: #111;
		font-weight: bold;
	}

	.popup_m {
		.popup_m_t {
			width: 710rpx;
			height: 360rpx;
			border-radius: 10rpx;
			display: block;
			margin: 0 auto;
			margin-bottom: 45rpx;
		}

		.popup_m_b {
			width: 100%;
			height: 849rpx;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			position: relative;
			margin-top: 45rpx;

			.popup_m_b_b {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 22rpx;
				justify-content: space-around;

				.popup_m_b_b_s {
					width: 345rpx;
					height: 70rpx;
					text-align: center;
					background: rgb(208, 63, 49);
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 64rpx;
					border-radius: 20rpx;
					border: 2px solid #FFFFFF;
				}
			}
		}

		.popup_m_i {
			width: 270rpx;
			height: 270rpx;
			position: absolute;
			left: 0;
			right: 0;
			top: -36rpx;
			bottom: 0;
			margin: auto;
			border-radius: 10rpx;
		}

	}

	.popup_m_text {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 190rpx;
		margin: auto;
		text-align: center;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #5C160D;
	}

	.cash_t {
		justify-content: space-between;
		padding: 33rpx 20rpx;
		margin-top: 110rpx;

		.cash_t_1 {
			width: 100%;
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

	}
	.app_cash_m {
		.app_cash_m_s {
			background: #FFFFFF;
			border: 1px solid rgba(197, 197, 197, 0.5);
			border-radius: 20rpx;
			padding: 26rpx;
			margin: 0 20rpx;
			margin-top: 31rpx;
			margin-bottom: 31rpx;
			
	
			.app_cash_m_s_l {
				width: 200rpx;
				height: 150rpx;
				margin-right: 31rpx;
			}
	
			.app_cash_m_s_m {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
	
				.app_cash_m_s_m_t {
					width: 277rpx;
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #000000;
					line-height: 48rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					-webkit-line-clamp: 1;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					margin-bottom: 14rpx;
				}
	
				.app_cash_m_s_m_c {
					width: 160rpx;
					height: 36rpx;
					border: 1px solid #FC5531;
					border-radius: 10rpx;
					font-size: 20rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FC5531;
					text-align: center;
					line-height: 30rpx;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					padding: 0 20rpx;
				}
	
				.app_cash_m_s_m_e {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FC5531;
					margin-top: 30rpx;
	
					.line {
						width: 1rpx;
						height: 21rpx;
						background: #000000;
						border: 1px solid #E2E2E2;
						margin: 0 20rpx;
					}
				}
	
			}
	
			.app_cash_m_s_r {
				width: 100rpx;
				height: 50rpx;
				background: #FC5531;
				border-radius: 25rpx;
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
				text-align: center;
				line-height: 50rpx;
				margin-left: 45rpx;
			}
		}
	}
</style>