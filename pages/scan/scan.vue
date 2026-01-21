<template>
	<view class="app" v-show="init">
		<view :style="'background-image: url('+ backImg +');'" class="app_top">
			<view style="padding-top: 32rpx;" class="center">
				<banner :width="'710rpx'" :list="banner"></banner>
			</view>
		</view>
		<view style="margin-top: 185rpx;" class="box">
			<view class="title">您前往的住层：<text>{{resFloors[selIndex]}}楼</text></view>
			<view v-if="pendingArr" class="pending">
				<text>努力查询中，请稍后</text>
				<text class="iconfont">&#xe7ba;</text>
			</view>
			<view style="padding: 0;" v-else class="content flex">
				<view class="item" v-for="(item, index) in resFloors" @click="sel(index)" :key="index"
					:style="index == selIndex? 'color: #FFFFFF;background-image: url('+ scan2 +');': 'color: #969696;background-image: url('+ scan1 +');'">
					<view class="inner">{{item}}</view>
				</view>
			</view>
		</view>
		<view v-if="isVisitor" class="line"></view>
		<view v-if="isVisitor" class="box box-des">
			<view style="padding-bottom: 13rpx;" class="title">您是访客/商家身份，您可以输入乘梯码乘坐电梯：</view>
			<view style="overflow: hidden;" class="content">
				<view class="c_input">
					<vcode-input ref="code_input" :isAutoComplete="true" @vcodeInput="getCode"
						borderActiveColor="#FC5C39" />
				</view>
				<view class="c_box">
					<view @click="paste" class="paste iconfont">&#xeb4e;</view>
					<view @click="fresh" class="iconfont">&#xe60b;</view>
				</view>
			</view>
			<view class="tip">
				<view class="rule" @click="navTo('/pages/announce/detail?id=1')"><view class="iconfont">&#xe8c8;</view>乘梯码规则?</view>
				<view v-if="isVisitor" class="login">已有员工账号，去<text @click="navTo('/pages/auth/login')">登录</text></view>
			</view>
		</view>
		<view class="blovk"></view>
		<mix-button class="scan_btn" ref="confirmBtn" :text="btnText" @onConfirm="confirm" />
	</view>
</template>

<script>
	import VcodeInput from "../../components/vcode-input/vcode-input.vue";
	let initFloors = [];
	let time = 5;
	let timer = null;
	export default {
		components: {
			VcodeInput
		},
		data() {
			return {
				backImg: this.$cdn + '/static/order-back1.png',
				scan1: this.$cdn + '/static/scan1.png',
				scan2: this.$cdn + '/static/scan2.png',
				banner: [], //banner图
				btnText: "确认",
				init: false,
				selIndex: 0,
				bid: 0,
				from: 0,
				cid: 0,
				resFloors: [],
				isVisitor: false,
				pendingArr: false,
				code: '',
				cdn: this.$cdn,
				propertyCode: '',
				tempCode: '',
				duration: 0,
				durationInterval: null
			}
		},
		onShow() {
			let that = this
			this.durationInterval = setInterval(function() {
				that.duration += 1
			}, 1000);
		},
		onUnload() {
			this.calTime();
		},
		onHide() {
			this.calTime();
		},
		async onLoad(options) {
			let code, propertyCode;
			if (options.q) {
				this.bid = this.$util.getLocationParams(decodeURIComponent(options.q), 'b'); //楼栋id
				this.from = this.$util.getLocationParams(decodeURIComponent(options.q), 'f'); // 身处几楼
				code = this.$util.getLocationParams(decodeURIComponent(options.q), 'i'); // 公司临时码
				propertyCode = this.$util.getLocationParams(decodeURIComponent(options.q), 'p'); // 物业拜访码
			} else {
				this.bid = options.b; //楼栋id
				this.from = options.f; // 身处几楼
				code = options.i; //公司临时码
				propertyCode = options.p; //物业拜访码
			}
			let res = await this.$get('/scan/getHallAdList', {
				id: this.bid
			});
			this.cid = res.data;
			if (code) this.tempCode = code;
			if (propertyCode) this.propertyCode = propertyCode;
			this.getMsg();
			this.getBanner();
		},
		methods: {
			async getBanner() {
				let res3 = await this.$get("/ad/getAdBanner", {
					buildingId: this.bid,
					flag: 1
				});
				this.banner = res3.data
			},
			async calTime() {
				clearInterval(this.durationInterval);
				this.banner = this.$util.forMateTimes(this.duration, 5, this.banner)
				let ratingId = []
				let times = []
				this.banner.forEach((element, index) => {
					if (element.id) {
						ratingId.push(element.id)
						times.push(element.times)
					}
				})
				console.log(ratingId, times);
				let res2 = await this.$post("/ad/calTime", {
					data: this.$util.encrypt(this.$store.state.deviceId, JSON.stringify(ratingId), JSON
						.stringify(times))
				}, {
					notToast: true
				});
			},
			sel(index) {
				let floor = this.resFloors[index];
				if (this.from == floor) {
					this.$util.msg("您现在已经在" + floor + "楼了");
					this.$refs.confirmBtn.stop();
					return;
				}
				this.selIndex = index;
			},
			fresh() {
				this.$refs.code_input.clearValue();
			},
			async getCode(code) {
				let result = JSON.parse(JSON.stringify(initFloors));
				this.resFloors = result;
				this.selIndex = 0;
				this.code = code;
				const res = await this.$post("/scan/getCompanies", {
					code,
					bid: this.bid
				});
				let data = res.data;
				data.forEach((item) => {
					let arr = item.floor.split(",");
					for(let i = 0; i < arr.length; i++){
						result.push(arr[i]);
					}
				})
				this.selIndex = result.length - 1;
				this.resFloors = result;
				this.countDown();
			},
			countDown() {
				this.clearTime();
				this.btnText = "确认（" + time + "）";
				timer = setInterval(() => {
					time--;
					this.btnText = "确认（" + time + "）";
					if (time === 0) {
						this.confirm();
					}
				}, 1000)
			},
			clearTime() {
				timer && clearInterval(timer);
				time = 5;
				this.btnText = "确认";
			},
			paste() {
				uni.getClipboardData({
					success: (res) => {
						console.log(res.data, res.data.length)
						if (res.data.length == 6) {
							this.$refs.code_input.value = res.data
						} else {
							this.$util.msg("粘贴的乘梯码不正确");
						}
					},
					fail: (err) => {
						console.log(err)
					}
				});
			},
			async getMsg() {
				let param = {
					id: this.bid
				};
				if (this.propertyCode) {
					param.propertyCode = this.propertyCode;
				}
				let isSureVisitor = false;
				// #ifdef MP-WEIXIN
				isSureVisitor = true
				// #endif
				param['isSureVisitor'] = isSureVisitor;
				const res = await this.$get("/scan/isVisitor", param);
				let data = res.data;
				initFloors = data.floors;
				this.resFloors = data.floors;
				this.isVisitor = data.isVisitor;
				if (data.initFloor) {
					this.initFloor = data.initFloor;
					data.floors.forEach((item, i) => {
						if (this.initFloor === item) {
							this.selIndex = i;
						}
					})
					this.countDown();
				}
				this.init = true;
				if (this.tempCode && this.isVisitor) {
					this.$nextTick(() => {
						this.$refs.code_input.value = this.tempCode;
					})
				}
			},
			async confirm() {
				if (this.resFloors.length === 0) {
					this.$util.msg("当前乘梯码无效");
					this.$refs.confirmBtn.stop();
					return;
				}
				let floor = this.resFloors[this.selIndex];
				if (this.from == floor) {
					this.$util.msg("当前已经处在目标楼层");
					this.$refs.confirmBtn.stop();
					return;
				}
				this.$refs.confirmBtn.stop();
				this.clearTime();
				this.navTo("/pages/scan/up?b=" + this.bid + "&f=" + this.from + "&c=" + this.cid + "&t=" + floor);
			},
		}
	}
</script>

<style scoped lang="scss">
	.blovk{
		width: 100%;
		height: 135rpx;
	}
	.scan_btn{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 31rpx;
		background: linear-gradient(0deg, #2BC55A 0%, #18D573 100%);
	}
	.line{
		width: 100%;
		height: 20rpx;
		background: #F6F6F6;
		margin-top: 53rpx;
		margin-bottom: 40rpx;
	}
	.app_top {
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 100%;
		height: 240rpx;
	}

	page {
		background-color: #fff;
	}

	.center {
		// background: #ccc;

		image {
			width: 100%;
		}
	}

	.pending {
		display: flex;
		font-size: 24rpx;
		color: #999;
		align-items: center;
		justify-content: center;

		.iconfont {
			font-size: 40rpx;
			padding-left: 10rpx;
		}
	}

	.tip {
		// height: 80rpx;
		display: flex;
		align-items: self-start;
		justify-content: space-between;
		// font-size: 24rpx;
		padding: 30rpx 30rpx;
		// color: $base-color;
		margin-top: 75rpx;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #EC0000;
		.rule{
			display: flex;
			align-items: center;
		}

		.login {
			color: #999;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #969696;
			text {
				color: #EC0000;
			}
		}
	}

	.box {
		.title {
			// height: 80rpx;
			// line-height: 80rpx;
			// font-size: 28rpx;
			// background-color: $bg-color;
			padding: 30rpx 20rpx;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #000000;
			padding-top: 0;
			text {
				font-size: 36rpx;
				color: #F60000;
				font-family: SourceHanSansCN-Bold;
				font-weight: Bold;
			}
		}

		.res {
			height: 80rpx;
			line-height: 80rpx;
			background-color: $bg-color;
			padding: 0rpx 30rpx;
		}

		.res_box {
			padding: 20rpx;

			.item {
				color: #666;
				border-bottom: 1px solid $line-color;
				height: 70rpx;
				font-size: 24rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.iconfont {
					color: #000;
					font-size: 36rpx;
				}

				.floor {
					color: $base-color;
					font-size: 50rpx;
				}

				&.active {
					.iconfont {
						color: $base-color;
					}
				}
			}

			.empty {
				font-size: 24rpx;
				color: #999;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
			}
		}

		.content {
			&.flex {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
			}

			.item {
				// box-sizing: content-box;
				// margin-bottom: 40rpx;
				overflow: hidden;
				&.active {
					// background-color: rgb(54, 139, 229);
				}

				// border: 10rpx solid rgb(136, 136, 136);
				width: 81rpx;
				border-radius: 20rpx;
				height: 81rpx;
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 20rpx 22rpx;
				font-size: 36rpx;
				font-family: Arial;
				font-weight: bold;
				color: #969696;
				background-size: 100% 100%;
				background-repeat: no-repeat;

				.inner {
					// background-color: rgb(136, 136, 136);
					// background: #EEEEEE;
					width: 81rpx;
					height: 81rpx;
					text-align: center;
					line-height: 80rpx;
				}
			}

			padding: 20rpx 20rpx 0rpx 20rpx;
			display: flex;
			align-items: center;
			flex-direction: row;

			.iconfont {
				// width: 80rpx;
				color: $base-color;
				font-size: 40rpx;
				text-align: center;

				&.paste {
					font-size: 54rpx;
				}
			}

			.c_input {
				flex: 1;
			}

			.c_box {
				display: flex;
				align-items: center;
			}

		}
	}
	.box-des{
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #000000;
	}
</style>