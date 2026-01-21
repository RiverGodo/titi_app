<template>
	<view class="ynq-tabbar">
		<view class="ynq-tabbar-bg-box">
			<image class="ynq-tabbar-bg" :src="tabbarTop" mode="aspectFill"></image>
			<u-action-sheet round="10" @select="selectClick" @close="show = false" :closeOnClickOverlay="true"
				:closeOnClickAction="true" :actions="list" :title="title" :show="show"></u-action-sheet>
			<view class="ynq-mid-icon" @tap="midClick">
				<image :src="centerButton" mode="aspectFill"></image>
			</view>
			<view class="ynq-tabbar-box">
				<view class="ynq-tabbar-item" v-for="tab,index in data" :key="index" @tap="tabbarItemClick(tab,index)">
					<u-badge v-if="messageNumber" :offset="[3,20]" :absolute="true" :isDot="true" type="error"></u-badge>
					<image class="ynq-tabbar-icon" :src="tabbarIndex==index?tab.selectedIconPath:tab.iconPath"
						mode="aspectFill">
					</image>
					<view class="ynq-tabbar-text" :class="tabbarIndex==index?'ynq-tabbar-text-select':''">{{tab.text}}
					</view>
				</view>
			</view>
		</view>
		<u-popup @close="showScans = false" :round="10" mode="center" :show="showScans">
			<view>
				<scanQrcode ref="qrcode" @scanOver='codeSuccess'></scanQrcode>
			</view>
		</u-popup>
		<!-- IOS安全距离START -->
		<view class="ynq-ios-aq"></view>
		<!-- IOS安全距离END -->
	</view>
</template>

<script>
	import mix from "../../common/mixin.js"
	import {
		getMessageData
	} from "@/api/message.js"
	var _this, js;
	export default {
		name: "tabbar",
		props: ["index"],
		data() {
			return {
				title: '',
				list: [
					{
						name: '转发任务'
					},
					{
						name: '转发藏品'
					},
					{
						name: '转发广告'
					},
					{
						name: '转发动态'
					}
				],
				show: false,
				// 计时器时间
				countTime: 0,
				// 计时器对象
				countTimer: null,
				tabbarIndex: 0,
				showScans: false,
				messageNumber:0,
				centerButton: mix.imageUrl + 'wx/43851fe4cf901894fc9bfb69b2ede3153052b17f1165398bf05984092bb4697b.png',
				tabbarTop: mix.imageUrl + 'wx/533aeaa5f452f7ec2b13254039e5956ef5fa63d5ea5d4bf1616ec3a468b9bc38.png',
				data: [{
						"pagePath": "pages/index/index",
						"text": "首页",
						"iconPath": "/static/images/tabbar/index.png",
						"selectedIconPath": "/static/images/tabbar/index-active.png"
					},
					{
						"pagePath": "pages/category/category",
						"text": "周边",
						"iconPath": "/static/images/tabbar/category.png",
						"selectedIconPath": "/static/images/tabbar/category-active.png"
					},
					{
						"pagePath": "",
						"text": "",
						"iconPath": "",
						"selectedIconPath": ""
					},
					{
						"pagePath": "pages/task/task",
						"text": "任务",
						"iconPath": "/static/images/tabbar/task.png",
						"selectedIconPath": "/static/images/tabbar/task-active.png"
					},
					{
						"pagePath": "pages/user/user",
						"text": "我的",
						"iconPath": "/static/images/tabbar/user.png",
						"selectedIconPath": "/static/images/tabbar/user-active.png"
					}
				]
			};
		},
		mounted() {
			this.tabbarIndex = this.index
			uni.hideTabBar();
			setTimeout(() => {
				this.getStorage();
				console.log(this.userInfo);
			}, 3000);
			this.getMessage()
		},
		computed: {
			userInfo() {
				return this.$store.getters.userInfo
			},
			hasLogin() {
				return this.$store.getters.hasLogin
			}
		},
		methods: {
			getMessage() {
				getMessageData().then(res => {
					uni.setStorageSync('message',res.data.list.length)
					console.log(uni.getStorageSync('message'));
				})
			},
			tabbarItemClick(tab, index) {
				// console.log(tab, index)
				this.messageNumber = uni.getStorageSync('message')
				uni.switchTab({
					url: '/' + tab.pagePath
				})
			},
			midClick() {
				this.show = true
				// console.log("点击了中间");
				// uni.switchTab({
				// 	url: '/' + 'pages/scanning/scanning'
				// })
				// this.scanCode()
				// // #ifdef  H5
				// this.showScans = true
				// this.$nextTick(() => {
				// 	console.log(this.$refs);
				// 	this.$refs.qrcode.getCameras()
				// })
				// // #endif
			},
			scanCode() {
				_this = this
				uni.scanCode({
					scanType: ['qrCode'],
					success: function(res) {
						_this.codeSuccess(res)
					},
					fail: function(err) {
						console.log(err, 'err');
						uni.showToast({
							title: '请扫正确的二维码',
							icon: 'none'
						})
						// uni.switchTab({
						// 	url: '/pages/index/index'
						// })
					}
				})
			},
			//防抖功能
			codeSuccess(res) {
				// console.log(res, 'codeSuccess')
				// console.log(this.countTime,'codeSuccess222')
				// 函数执行时先判断时间
				// if (this.countTime >= 10) {
				// 	// 利用 return 终止函数继续运行
				// 	return false;
				// }
				// // 开始计时
				// this.countTimer = setInterval(() => {
				// 	if (this.countTime >= 500) {
				// 		this.countTime = 0;
				// 		clearInterval(this.countTimer);
				// 		return;
				// 	}
				// 	this.countTime += 10;
				// }, 10);
				// 执行逻辑
				// console.log(e);
				if (res.decodedText) {
					res.result = res.decodedText
				}
				_this = this
				// 数组第一位判断类型，0楼层码，1临时码，2注册码
				// 数组第二位为楼层索引，即第几楼
				// 数组第二位之后为大厅广告机编码，有多个，前端发送时挑选大厅广告机随机发送
				if (res && res.result) {
					let oldResault = _this.getLocationParams(res.result,'content')
					console.log(oldResault);
					let result = JSON.parse(oldResault)
					if (Array.isArray(result)) {
						if (result[0] === 0) {
							uni.$u.route('/pages/elevator/elevator?data=' + oldResault)
						} else {
							uni.$u.route('/pages/login/register?data=' + oldResault)
						}
					} else {
						uni.showToast({
							title: '请扫正确的二维码',
							icon: 'none'
						})
					}
				} else {
					uni.showToast({
						title: '请扫正确的二维码',
						icon: 'none'
					})
				}
			},
			getStorage() {
				uni.getStorage({
					key: 'mqtt_data',
					success: function(res) {
						if (res.data) {
							uni.$u.route('/pages/elevator/elevator')
						}
					}
				});
			},
			selectClick(index) {
				uni.showToast({
					title: '您还没有会员权限',
					icon: 'none'
				})
			},
			getLocationParams(urls,keyWords) {
				// 提取路由值（字符串）
				let href = urls;
				// 从占位符开始截取路由（不包括占位符）
				let query = href.substring(href.indexOf("?") + 1);
				// 根据 & 切割字符串
				let vars = query.split("&");
				for (let i = 0; i < vars.length; i++) {
					let pair = vars[i].split("=");
					// 根据指定的参数名去筛选参数值
					if (pair[0] == keyWords) {
						return pair[1];
					}
				}
				return "没有该参数信息";
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ynq-tabbar {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;

		.ynq-ios-aq {
			height: env(safe-area-inset-bottom);
			background-color: #FFFFFF;
		}

		.ynq-tabbar-bg-box {
			width: 100%;
			height: 118rpx;
			position: relative;

			.ynq-tabbar-bg {
				width: 100%;
				height: 100%;
			}

			.ynq-mid-icon {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				margin: auto;
				border-radius: 100%;
				width: 120rpx;
				height: 120rpx;
				// background-color: $theme-color;
				// padding: 20rpx;
				z-index: 10;
				// transform: scale(0.65) translate(-78%, -15%);

				image {
					width: 100%;
					height: 100%;
					// transform: scale(0.9);
				}
			}


			.ynq-tabbar-box {
				width: 100%;
				height: 96rpx;
				position: absolute;
				bottom: 0;
				left: 0;
				display: flex;
				background-color: #FFFFFF;

				.ynq-tabbar-item {
					flex: 1;
					height: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					.ynq-tabbar-icon {
						width: 46rpx;
						height: 46rpx;
						padding: 2px;
						/*  */
					}

					.ynq-tabbar-text {
						color: #999;
						margin-top: 6rpx;
						line-height: 1;
						font-size: 30rpx;
					}

					.ynq-tabbar-text-select {
						color: #409eff;
					}
				}
			}
		}
	}
</style>
