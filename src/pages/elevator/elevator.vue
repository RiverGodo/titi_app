<template>
	<view class="floor">
		<mqtt-component @sendData='returnData' ref="mqtt">
		</mqtt-component>
		<view v-if="isTemporary" class="floor-temporary">
			<view class="floor-temporary-center">
				<view class="floor-temporary-center-title">
					<text class="floor-temporary-center-text">请输入邀请码</text>
					<view class="floor-temporary-center-button">
						<u-button type="primary" @click="pauseCode()" size="small" text="粘贴"></u-button>
					</view>
				</view>
				<!-- <u-code-input  @finish="confirm" space="20" v-model="verifyCode" mode="line"
					:maxlength="6"></u-code-input> -->
				<xt-verify-code type="box" v-model="verifyCode" @confirm="confirm"></xt-verify-code>
			</view>
		</view>
		<view v-show="floorState !== 0" class="floor-top">
			<u-swiper height="100%" class="floor-top-swiper" keyName="contentPath" :list="bannerList"></u-swiper>
		</view>
		<view v-if="floorState === 0" class="floor-select">
			<view class="go-floor">
				<u-icon customStyle="font-size:40rpx;margin-left:40rpx;margin-right:20rpx" name="list"></u-icon>
				<view class="go-floor-block">
					去楼层：
					<view class="go-floor-number">{{floor}} 楼</view>
				</view>
				<view class="floor-time">
					<u-button :custom-style="popupButtomButton3" :disabled="buttonState" @click="handleCheckElevator"
						type="primary" :text="buttontext"></u-button>
				</view>
			</view>
			<view class="select-floor">
				<view @click="handleChangeFloor(item)"
					:class="item === floor ? 'select-floor-single select-floor-single-active' : 'select-floor-single'"
					v-show="item !== 0" v-for="(item,index) in defaultFloor" :key="index">
					<view :class="item === floor ? 'floor-single floor-active':'floor-single'">{{item}}</view>
				</view>
			</view>
			<view class="vitirfy-code">
				今日邀请码：
				<view class="code">
					653488
				</view>
				<view class="vitirfy-code-button">
					<u-button type="primary" @click="copyCode()" size="small" text="复制"></u-button>
				</view>
			</view>
		</view>
		<view v-else class="floor-select">
			<view v-show="floorState === 1" class="floor-await">
				<view class="floor-await-text">正在为您调度,请稍后...</view>
				<u-button @click="rebackFloor()" type="primary" :plain="true" text="重新乘梯"></u-button>
			</view>
			<view v-show="floorState === 2" class="floor-await">
				<view class="floor-await-text">调度失败，
				<view v-if="mqttData.scheduleFailType === 1">网络异常</view>
				<view v-if="mqttData.scheduleFailType === 2">电梯故障</view>
				<view v-if="mqttData.scheduleFailType === 3">电梯被遮挡，无法关门</view>
				<view v-if="mqttData.scheduleFailType === 4">电梯满员</view>
				<view v-if="mqttData.scheduleFailType === 5">自行取消乘梯</view>
				<view v-if="mqttData.scheduleFailType === 6">电梯不到达此楼层</view>
				</view>
				<u-button @click="rebackFloor()" type="primary" :plain="true" text="重新乘梯"></u-button>
			</view>
			<view v-show="floorState === 3" class="floor-await2">
				<view class="floor-await-text">
					电梯已到达{{mqttData.currentFloor}}楼，正在
					<text v-show="mqttData.elevatorStatus === 2">上行中</text>
					<text v-show="mqttData.elevatorStatus === 3">下行中</text>
					<text v-show="mqttData.elevatorStatus === 4">等待乘客中</text>
					<text v-show="mqttData.elevatorStatus === 1">启动中</text>
					<text v-show="mqttData.elevatorStatus === 0">停止中</text>
				</view>
				<u-button @click="rebackFloor()" type="primary" :plain="true" text="重新乘梯"></u-button>
			</view>
			<view v-show="floorState === 4" class="floor-await2">
				<view v-if="mqttData.elevatorStatus === 4 && mqttData.isUserReqFloor" class="floor-await-text">
					电梯已到达:{{mqttData.currentFloor}}楼
					<view v-show="mqttData.isUserReqFloor">，请上{{mqttData.elevatorNum}}号电梯</view>
				</view>
				<view v-else class="floor-await-text">
					电梯已到达:{{mqttData.floorNum}}楼，感谢您的乘坐
				</view>
				<view v-if="mqttData.elevatorStatus === 4 && mqttData.isUserReqFloor"></view>
				<u-button v-else @click="rebackIndex()" type="primary" :plain="true" text="返回首页"></u-button>
			</view>
		</view>
		<view v-show="floorState !== 0" class="floor-end">
			<image :src="bottomImg" mode=""></image>
		</view>
		<u-modal :showCancelButton="true" @confirm="delFloorSure()" @cancel="showPopup = false" :show="showPopup"
			@close="showPopup = false" content='是否要重新乘梯'></u-modal>
		<!-- 		<u-popup mode="center" customStyle="width:70%" :round="10" @close="showPopup = false" :show="showPopup">
			<view class="floor-popup">
				<view>是否要重新乘梯</view>
			</view>
			<view class="floor-popup-bottom">
				<u-button :custom-style="popupButtomButton2" @click="delFloorSure()" size="small" type="success"
					:plain="true" text="确定">
				</u-button>
				<u-button :custom-style="popupButtomButton2" @click="showPopup = false" size="small" type="warning"
					:plain="true" text="取消">
				</u-button>
			</view>
		</u-popup> -->
		<u-popup v-if="showSuccessPopupStart" @close="handleCloseStart()" :show="floorState === 4 && mqttData.elevatorStatus === 4 && mqttData.isUserReqFloor && mqttData.isUserReqFloor">
			<view class="elevator-arrive">
				<u-icon class="elevator-arrive-icon" color="#32b98c" size="60" name="checkmark-circle-fill"></u-icon>
				<text class="elevator-arrive-text">您预约的电梯已经到达，请上{{mqttData.elevatorNum}}号电梯</text>
			</view>
			<image style="width: 100%;" :src="bottomImg" mode=""></image>
		</u-popup>
		<u-popup v-if="showSuccessPopupEnd" @close="handleCloseEnd()" :show="floorState === 4 && !(mqttData.elevatorStatus === 4 && mqttData.isUserReqFloor)">
			<view class="elevator-arrive">
				<u-icon class="elevator-arrive-icon" color="#32b98c" size="60" name="checkmark-circle-fill"></u-icon>
				<text class="elevator-arrive-text">你的目标楼层已经到达，感谢您的乘坐</text>
			</view>
			<image style="width: 100%;" :src="bottomImg" mode=""></image>
		</u-popup>
	</view>
</template>

<script>
	import {
		getAdData
	} from '../../api/advertisement.js'
	export default {
		name: "elevator",
		onLoad(options) {
			var _this = this
			if (this.hasLogin) {
				this.$store.dispatch('ObtainUserInfo')
			}
			uni.getStorage({
				key: 'mqtt_data',
				success: function(res) {
					console.log(res.data);
					let send = JSON.parse(res.data)
					_this.floorState = 1
					_this.$refs.mqtt.inviteCode = ''
					_this.$refs.mqtt.randomFloor = ''
					_this.$refs.mqtt.inviteCode = uni.getStorageSync('scancode');
					_this.$refs.mqtt.randomFloor = uni.getStorageSync('randomFloor')
					_this.$refs.mqtt.connect2(send)
				},
				fail: function() {
					if (options.data) {
						_this.companyData = JSON.parse(options.data)
						var data = JSON.parse(options.data)
						data.splice(0, 2)
						const max = data.length * 10
						const min = 10
						const radomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
						_this.$refs.mqtt.randomFloor = data[parseInt(radomNumber / 10) - 1]
						if (!_this.hasLogin) {
							_this.isTemporary = true
							_this.floorState = 1
						} else {
							if (_this.userInfo.companyId === 0 || _this.userInfo.roleId === 121) {
								_this.isTemporary = true
								_this.floorState = 1
							} else {
								_this.$refs.mqtt.connect()
							}
						}
					} else {
						console.log('没有信息请重新扫码')
					}
				}
			});
		},
		onUnload(options) {
			this.showPopup = false
			this.floorState = 0
			this.buttonState = false
			clearInterval(this.timer);
			let send = {
				reqTimestamp: this.time,
				userId: this.userInfo.id ? this.userInfo.id : this.inviteCode,
				currentFloor: this.companyData[1],
				targetFloor: this.floor,
				signToken: 'test',
				requestType: 17,
				isCancelQueueUp: true
			}
			this.$refs.mqtt.publish2(send)
			uni.switchTab({
				url: '/pages/index/index',
			})
			return true;
		},
		// onShow() {
		// 	if (this.hasLogin) {
		// 		this.$store.dispatch('ObtainUserInfo')
		// 	}
		// },
		data() {
			return {
				defaultFloor: [-2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
					24, 25
				],
				companyData: [],
				floor: 20,
				buttontext: '请确认(5)',
				mqttData: {},
				timer: null,
				buttonState: false,
				bannerList: [],
				floorState: 0,
				showPopup: false,
				showSuccessPopupStart:true,
				showSuccessPopupEnd:true,
				popupButtomButton2: {
					width: '150rpx'
				},
				popupButtomButton3: {
					height: '80rpx'
				},
				verifyCode: '',
				isTemporary: false,
				bottomImg: '',
				inviteCode: ''
			};
		},
		computed: {
			userInfo() {
				return this.$store.getters.userInfo
			},
			hasLogin() {
				return this.$store.getters.hasLogin
			}
		},
		mounted() {
			uni.hideTabBar()
			this.getBannerList(5)
			this.getBannerList(6)
			if (this.hasLogin && !uni.getStorageSync('mqtt_data')) {
				// this.$refs.mqtt.connect()
				this.palyTime()
			}
		},
		methods: {
			handleCloseStart(){
				this.showSuccessPopupStart = false
				this.showSuccessPopupEnd = true
			},
			handleCloseEnd(){
				this.showSuccessPopupEnd = false
				this.showSuccessPopupStart = true
			},
			handleChangeFloor(number) {
				this.isTemporary = false
				if (!this.buttonState) {
					clearInterval(this.timer);
					this.floor = number
					this.palyTime()
				}
			},
			palyTime() {
				var t = 5;
				var _this = this
				this.timer = setInterval(function() {
					_this.buttontext = '请确认(' + t + ')';
					t--;
					if (t < 0) {
						_this.handleCheckElevator()
					}
				}, 1000)
			},
			returnData(res) {
				// floorState类型值
				// 0是用户操作界面
				// 1是正在调度中
				// 2是调度失败
				// 3是电梯运行中
				// 4是电梯已到达
				let jsonRes = JSON.parse(res)
				this.mqttData = jsonRes
				if (jsonRes.dataType === 20) {
					if (jsonRes.elevatorNum === -1) {
						if (jsonRes.scheduleFailType === 5) {
							if (this.hasLogin) {
								// this.palyTime()
								// _this.$refs.mqtt.unsubscribe()
								this.floorState = 0
								this.buttontext = "重新选择"
							} else {
								uni.showToast({
									title: '请重新扫码',
									icon: 'none'
								})
								uni.switchTab({
									url: '/pages/index/index'
								})
							}
						} else {
							this.floorState = 2
						}
					}
				} else if (jsonRes.dataType === 21) {
					this.floorState = 4
				} else if (jsonRes.dataType === 22) {
					if (jsonRes.elevatorStatus === 4 && jsonRes.isUserReqFloor) {
						this.floorState = 4
					} else {
						this.floorState = 3
					}
				}
			},
			handleCheckElevator() {
				var _this = this
				clearInterval(this.timer);
				this.buttontext = '正在跳转'
				this.buttonState = true
				this.floorState = 1
				let send = {
					reqTimestamp: this.time,
					userId: this.userInfo.id ? this.userInfo.id : this.inviteCode,
					currentFloor: this.companyData[1],
					targetFloor: this.floor,
					signToken: 'test',
					requestType: 17,
					isCancelQueueUp: false
				}
				this.$refs.mqtt.subscribe().then(res => {
					_this.$refs.mqtt.publish(send)
				})
				// console.log("调用广告组件，调用积分接口");
			},
			rebackFloor() {
				this.showPopup = true
			},
			rebackIndex() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			delFloorSure() {
				var _this = this
				this.showPopup = false
				this.floorState = 0
				this.buttonState = false
				clearInterval(this.timer);
				let send = {
					reqTimestamp: this.time,
					userId: this.userInfo.id ? this.userInfo.id : this.inviteCode,
					currentFloor: this.companyData[1],
					targetFloor: this.floor,
					signToken: 'test',
					requestType: 17,
					isCancelQueueUp: true
				}
				if (send.userId && this.userInfo.companyId && this.userInfo.roleId !== 121) {
					this.$refs.mqtt.publish(send).then(res => {
						// console.log(uni.getStorageSync('mqtt_data'), 77777777);
						if (this.hasLogin) {
							// this.palyTime()
							// _this.$refs.mqtt.unsubscribe()
							this.buttontext = "重新选择"
						} else {
							uni.showToast({
								title: '请重新扫码',
								icon: 'none'
							})
							uni.switchTab({
								url: '/pages/index/index'
							})
						}
					})
				} else {
					uni.showToast({
						title: '请重新扫码',
						icon: 'none'
					})
					uni.switchTab({
						url: '/pages/index/index'
					})
				}
			},
			confirm() {
				if (this.verifyCode === '653488') {
					this.inviteCode = 'T' + this.verifyCode + this.companyData[2]
					this.$refs.mqtt.inviteCode = 'T' + this.verifyCode + this.companyData[2]
					this.$refs.mqtt.connect()
					this.handleChangeFloor(6)
				} else {
					uni.showToast({
						title: '您输入的验证码有误',
						icon: 'none'
					})
					this.verifyCode = ""
				}
			},
			pauseCode() {
				var _this = this
				uni.getClipboardData({
					success: function(res) {
						_this.verifyCode = res.data.slice(0, 7)
						_this.confirm()
					}
				});
			},
			copyCode() {
				var _this = this
				uni.setClipboardData({
					data: '653488',
					success: function () {
						console.log('success');
					}
				});
			},
			getBannerList(id) {
				getAdData({
					positionId: id,
					userId: this.userInfo.companyId ? this.userInfo.id : 37
				}).then(res => {
					if (res && res.data.list.length) {
						if (id === 5) {
							this.bannerList = res.data.list
						} else {
							this.bottomImg = res.data.list[0].contentPath
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.floor {
		width: 100%;
		height: 100%;
	}

	.go-floor {
		display: flex;
		align-items: center;
		/* width: 420rpx; */
		margin: 30rpx 15rpx;
		justify-content: space-between;
		font-size: 40rpx;
		background: #f3f5f7;
		border-radius: 10rpx;
		/* color: #000; */
		/* height: 100rpx; */
		font-size: 30rpx;
		height: 80rpx;
	}

	.go-floor-block {
		/* border: 1px solid #333333; */
		/* border-radius: 10%; */
		/* padding: 0 40rpx; */
		/* padding-right: 40rpx; */
		/* font-size: 35rpx; */
		display: flex;
		align-items: center;
	}

	.go-floor-number {
		color: #409eff;
	}

	.select-floor {
		display: grid;
		grid-template-columns: repeat(auto-fill, 120rpx);
		grid-gap: 30rpx;
		justify-content: center;
		/* height: calc(50vh); */
		overflow: auto;
		padding: 10rpx;
		margin-bottom: 20rpx;
	}

	.floor-select {
		/* background-color: aqua; */
		width: 100%;
		/* height: 58vh; */
		/* background: red; */
		/* 	position: absolute;
		z-index: 1;
		top: 19%;
		left: 0;
		right: 0; */
		/* bottom: 0; */
		margin: auto;
		overflow: auto;
		/* border-radius: 20rpx;
		/* border: 1px solid #333333; */
	}

	.select-floor::after {
		content: '';
		flex: auto;
		padding-bottom: 10rpx;
	}

	.select-floor-single {
		color: #ffffff;
		padding: 10rpx;
		width: 100rpx;
		height: 100rpx;
		text-align: center;
		line-height: 80rpx;
		-moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		-webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		font-size: 30rpx;
		border-radius: 10%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 10rpx;
		background: rgb(151, 151, 151);
	}

	.select-floor-single-active {
		background: #409eff;
	}

	.floor-end {
		width: 100%;
		height: calc(20vh);
		/* min-height: calc(20vh); */
		/* 		position: fixed;
		bottom: 0;
		left: 0;
		right: 0; */
		/* 	position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto; */
		height: 40vh;
	}

	.floor-top {
		width: 100%;
		/* 	position: absolute;
		top: 0;
		left: 0;
		right: 0;
		margin: auto; */
		height: 40vh;
	}

	.floor-end image {
		width: 100%;
		height: 100%;
	}

	.floor-top-swiper {
		height: 100%;
	}

	.floor-top-swiper image {
		width: 100%;
		height: 100%;
	}

	.floor-await {
		/* line-height: 10; */
		text-align: center;
		width: 80%;
		display: block;
		margin: 50rpx auto;
		font-size: 35rpx;
		/* 	display: flex;
		align-items: center;
		justify-content: center; */
		height: 100%;
	}

	.floor-await2 {
		/* line-height: 15; */
		text-align: center;
		width: 80%;
		display: block;
		margin: 50rpx auto;
		font-size: 35rpx;
		height: 100%;
	}

	.floor-single {
		color: #ffffff;
		/* border-radius: 100%; */
		border: 3px solid #ffffff;
		width: 90rpx;
		height: 90rpx;
		font-size: 40rpx;
		border-radius: 10%;
		line-height: 90rpx;
	}

	.floor-active {
		background: #409eff;
		/* border-radius: 100%; */
		color: #fff;
	}

	.floor-popup {
		text-align: center;
		margin-top: 60rpx;
		margin-bottom: 120rpx;
	}

	.floor-popup-bottom {
		display: flex;
		align-items: center;
		width: 100%;
		position: absolute;
		bottom: 30rpx;
		left: 0;
		right: 0;
		margin: auto;
	}

	.floor-await-text {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 20rpx;
		/* justify-content: space-around; */
	}

	.floor-temporary {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		background-color: rgba(0, 0, 0, 0.1);
		z-index: 999;
	}

	.floor-temporary-center {
		width: 80%;
		height: 250rpx;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 40rpx;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		z-index: 999;
		/* text-align: center; */
		font-size: 40rpx;
	}

	.floor-temporary-center-text {
		display: block;
		margin-bottom: 20rpx;
	}
	
	.floor-temporary-center-button{
		width: 200rpx;
		display: block;
		margin-bottom: 20rpx;
	}

	.vitirfy-code {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.code {
		font-size: 50rpx;
	}
	.floor-temporary-center-title{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80rpx;
	}
	.vitirfy-code-button{
		margin-left: 20rpx;
	}
	.elevator-arrive{
		height: 25vh;
		text-align: center;
		font-size: 40rpx;
		font-weight: bold;
		.elevator-arrive-text{
			border-bottom: 1px solid #333333;
			padding-bottom: 50rpx;
			margin-bottom: 50rpx;
		}
		// line-height: 50vh;
		.elevator-arrive-icon{
			margin: 0 auto;
			width: 60px;
			margin-top: 100rpx;
			margin-bottom: 50rpx;
		}
	}
</style>
