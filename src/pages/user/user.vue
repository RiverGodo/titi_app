<template>
	<view class="container">
		<view class="user-header">
			<view class="user-info" @click="loginOrJump('/pages/profile/profile')">
				<u-avatar size="80" :src="userInfo.avatar"></u-avatar>
				<text class="nick-name">{{ hasLogin ? userInfo.nickname || '游客' : '登录' }}</text>
				<!-- <text v-if="hasLogin" class="nick-detial">颜色不一样的烟火</text> -->
			</view>
			<view v-if="hasLogin" style="align-items: flex-start;" class="user-info">
				<text class="nick-flag">等级头衔</text>
				<text class="nick-flag">现金</text>
				<text class="nick-flag">积分</text>
				<text class="nick-flag">碳值</text>
				<text class="nick-flag">保证金</text>
			</view>
			<view v-if="hasLogin" style="align-items: flex-start;" class="user-info">
				<text class="nick-flag">NFT{{forMateLevel(userInfo.integralBalance)}}</text>
				<text class="nick-flag">{{userInfo.cashBalance}}￥</text>
				<text class="nick-flag">{{userInfo.integralBalance}}</text>
				<text class="nick-flag">{{userInfo.tbBalance}}</text>
				<text class="nick-flag">{{userInfo.bondBalance}}￥</text>
			</view>
		</view>

		<u-gap height="10" bgColor="#f3f3f3"></u-gap>

		<view>
			<view class="order-header">
				<text class="order-title">我的订单</text>
				<view @click="unOpen()" class="see-all">
					<text>查看全部</text>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>

			<view class="order-status-box">
				<u-grid :border="false" :col="orderStatusList.length">
					<u-grid-item @click="unOpen()" v-for="(item, index) in orderStatusList" :key="index">
						<u-icon :name="item.icon" :size="32"></u-icon>
						<text class="grid-title">{{ item.title }}</text>
					</u-grid-item>
				</u-grid>
			</view>
		</view>

		<u-gap height="10" bgColor="#f3f3f3"></u-gap>

		<view class="stat-box">
			<u-grid :border="false" col="3">
				<u-grid-item @click="unOpen()" v-for="(item, index) in statList" :key="index">
					<text class="grid-value">{{ item.value }}</text>
					<text class="grid-title">{{ item.title }}</text>
				</u-grid-item>
			</u-grid>
		</view>

		<u-gap height="10" bgColor="#f3f3f3"></u-gap>

		<u-cell-group class="fun-list">
			<!-- <u-cell v-if="hasLogin && userInfo.companyId" class="fun-item" @click="unShare()" :border="false" icon="share" title="今日邀请码" isLink></u-cell> -->
			<u-cell class="fun-item" :border="false" icon="account" title="我的团队"
				@click="loginOrJump('/pages/team/team')" isLink></u-cell>
			<u-cell class="fun-item" @click="personalCode()" :border="false" icon="gift" title="个人二维码" isLink></u-cell>
			<u-cell v-if="userInfo.companyId" class="fun-item" @click="companyCode()" :border="false" icon="gift"
				title="公司二维码" isLink></u-cell>
			<u-cell class="fun-item" @click="unOpen()" :border="false" icon="tags" title="领券中心" isLink></u-cell>
			<u-cell class="fun-item" @click="unOpen()" :border="false" icon="coupon" title="我的优惠券" isLink></u-cell>
			<u-cell class="fun-item" :border="false" icon="map" title="收货地址" @click="loginOrJump('/pages/address/list')"
				isLink></u-cell>
			<view
				v-if="userInfo.roleId === 122 || userInfo.roleId === 120 || userInfo.roleId === 118 || userInfo.roleId === 117 || userInfo.roleId === 1">
				<u-cell class="fun-item" :border="false" icon="edit-pen" title="TT助手管理"
					@click="loginOrJump('/pages/admin/admin_main/admin_main')" isLink>
					<text v-if="messageNumber" slot="value" class="u-slot-value">{{messageNumber}}</text>
				</u-cell>
			</view>
		</u-cell-group>

		<view v-if="hasLogin" class="logout-btn">
			<u-button type="error" color="#ea322b" text="退出登录" @click="logout"></u-button>
		</view>
		<u-modal @confirm="showPopup = false" @cancel="showPopup = false" :show="showPopup" @close="showPopup = false"
			content='今日邀请码为:653488'></u-modal>
		<tabbar index="4"></tabbar>
		<u-popup :round="10" mode="center" :show="showErcode" @close="showErcode = false">
			<view class="ercode-wind">
				<canvas id="qrcode" canvas-id="qrcode" style="width: 200px;height: 200px;"></canvas>
			</view>
			<view v-if="codeType === 0" class="person-code">
				<!-- #ifdef APP-PLUS -->
				<u-button @click="handleAPPInvitePeople()" type="primary" text="邀请好友赚钱"></u-button>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<u-button @click="handleH5InvitePeople()" type="primary" text="邀请好友赚钱"></u-button>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<button style="width: 100%;" @click="handleWXInvitePeople()" open-type="share">邀请好友赚钱</button>
				<!-- #endif -->
			</view>
			<view v-if="codeType === 1" class="company-code">
				<!-- #ifdef APP-PLUS -->
				<u-button @click="handleAPPInvitePeople2()" type="primary" text="邀请同事"></u-button>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<u-button @click="handleH5InvitePeople2()" type="primary" text="邀请同事"></u-button>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<button style="width: 100%;" @click="handleWXInvitePeople2()" open-type="share">邀请同事</button>
				<!-- #endif -->
				<view class="number-code">
					访客临时码：653488
					<view class="number-code-btn">
						<u-button type="primary" @click="copyCode()" size="small" text="复制"></u-button>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getSysDictInfo
	} from '@/api/user.js'
	import {
		getMessageData
	} from "@/api/message.js"
	import UQRCode from 'uqrcodejs'; // npm install uqrcodejs
	import mix from "../../common/mixin.js"
	export default {
		data() {
			return {
				showErcode: false,
				levelDict: [],
				showPopup: false,
				codeType: 0,
				messageList: [],
				messageNumber:0,
				orderStatusList: [{
						icon: 'rmb-circle',
						title: '待支付'
					},
					{
						icon: 'car',
						title: '待发货'
					},
					{
						icon: 'order',
						title: '待收货'
					},
					{
						icon: 'integral',
						title: '已完成'
					}
				],
				statList: [{
						value: '0',
						title: '我的收藏'
					},
					{
						value: '0',
						title: '我的消息'
					},
					{
						value: '0',
						title: '我的足迹'
					}
				]
			}
		},
		mounted() {
			if (this.hasLogin) {
				this.$store.dispatch('ObtainUserInfo')
			}
			this.init()
		},
		onShow() {
			this.messageNumber = uni.getStorageSync('message')
			// if (this.hasLogin) {
			// 	this.$store.dispatch('ObtainUserInfo')
			// }
		},
		methods: {
			init() {
				getSysDictInfo({
					dictType: 'member_level_status'
				}).then(res => {
					if (res.data) {
						this.levelDict = res.data.list
					}
				})
			},
			personalCode() {
				this.codeType = 0
				this.unOpenErcode();
				setTimeout(() => {
					// 获取uQRCode实例
					var qr = new UQRCode();
					// 设置二维码内容
					qr.data = mix.domainUrl + 'pages/index/index?parentId=' + this.userInfo.id;
					// 设置二维码大小，必须与canvas设置的宽高一致
					qr.size = 200;
					// 调用制作二维码方法
					qr.make();
					// 获取canvas上下文
					var canvasContext = uni.createCanvasContext('qrcode', this); // 如果是组件，this必须传入
					// 设置uQRCode实例的canvas上下文
					qr.canvasContext = canvasContext;
					// 调用绘制方法将二维码图案绘制到canvas上
					qr.drawCanvas();
				}, 1000)
			},
			companyCode() {
				this.codeType = 1
				this.unOpenErcode();
				setTimeout(() => {
					// 获取uQRCode实例
					var qr = new UQRCode();
					// 设置二维码内容
					qr.data = mix.domainUrl + 'pages/login/register?data=[2,' + this.userInfo.companyId +
						',0]&parentId=' + this
						.userInfo.id;
					// 设置二维码大小，必须与canvas设置的宽高一致
					qr.size = 200;
					// 调用制作二维码方法
					qr.make();
					// 获取canvas上下文
					var canvasContext = uni.createCanvasContext('qrcode', this); // 如果是组件，this必须传入
					// 设置uQRCode实例的canvas上下文
					qr.canvasContext = canvasContext;
					// 调用绘制方法将二维码图案绘制到canvas上
					qr.drawCanvas();
				}, 1000)
			},
			unOpenErcode() {
				if (this.hasLogin) {
					this.showErcode = true
				} else {
					uni.$u.route('/pages/login/social')
				}
			},
			forMateLevel(number) {
				let name = "列兵"
				for (let i = 0; i < this.levelDict.length; i++) {
					if (number >= this.levelDict[i].value) {
						name = this.levelDict[i].label
					}
				}
				return name
			},
			loginOrJump(pageUrl) {
				if (!this.hasLogin) {
					uni.$u.route('/pages/login/social')
				} else {
					uni.$u.route(pageUrl)
				}
			},
			logout() {
				uni.showModal({
					title: '提示',
					content: '您确定要退出登录吗',
					success: res => {
						if (res.confirm) {
							this.$store.dispatch('Logout')
						} else if (res.cancel) {
							//console.log('用户点击取消')
						}
					}
				})
			},
			unOpen() {
				console.log(this.userInfo);
				uni.showToast({
					title: '您还没有会员权限',
					icon: 'none'
				})
			},
			unShare() {
				this.showPopup = true
			},
			copyCode() {
				var _this = this
				uni.setClipboardData({
					data: '653488',
					success: function() {
						console.log('success');
					}
				});
			},
			handleWXInvitePeople() {
				this.shareTitle = this.userInfo.nickname + '邀请您一起赚钱'
				this.sharePath = '/pages/index/index?parentId=' + this.userInfo.id
			},
			handleAPPInvitePeople() {
				let TITLE = this.userInfo.nickname + "邀请您一起赚钱"
				let DESC = "加入我的友惠见团队，和我一起实现共赢"
				let LINK = mix.domainUrl + 'pages/index/index?parentId=' + this.userInfo.id
				let IMGURL = "https://image.51uhj.com/25a421f644932557d2dc72f12cb262aab89a36a5eb72c6555c9c05254dbb3bc8.jpg"
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: LINK,
					title: TITLE,
					summary: DESC,
					imageUrl: IMGURL,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
						if (err.errCode === -8) {
							uni.$u.toast("微信未安装")
						}
					}
				});
			},
			handleH5InvitePeople() {
				let TITLE = this.userInfo.nickname + "邀请您一起赚钱"
				let HREF = window.location.href.split('#')[0]
				let DESC = "加入我的友惠见团队，和我一起实现共赢"
				let LINK = mix.domainUrl + 'pages/index/index?parentId=' + this.userInfo.id
				let IMGURL = "https://image.51uhj.com/25a421f644932557d2dc72f12cb262aab89a36a5eb72c6555c9c05254dbb3bc8.jpg"
				this.$wxH5Share.get_jssdk(TITLE, HREF, DESC, LINK, IMGURL)
				this.show = true
			},
			handleWXInvitePeople2() {
				this.shareTitle = '邀请同伴'
				this.sharePath = '/pages/login/register?data=[2,' + this.userInfo.companyId + ',0]&parentId=' + this
					.userInfo.id
			},
			handleAPPInvitePeople2() {
				let TITLE = this.userInfo.nickname + "邀请您加入我的团队"
				let DESC = "加入我的公司"
				let LINK = "https://www.51uhj.com/#/pages/login/register?data=[2," + this.userInfo.companyId +
					",0]&parentId=" + this.userInfo.id
				let IMGURL = "https://image.51uhj.com/25a421f644932557d2dc72f12cb262aab89a36a5eb72c6555c9c05254dbb3bc8.jpg"
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: LINK,
					title: TITLE,
					summary: DESC,
					imageUrl: IMGURL,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
						if (err.errCode === -8) {
							uni.$u.toast("微信未安装")
						}
					}
				});
			},
			handleH5InvitePeople2() {
				let TITLE = this.userInfo.nickname + "邀请您加入我的团队"
				let HREF = window.location.href.split('#')[0]
				let DESC = "加入我的公司"
				let LINK = "https://www.51uhj.com/#/pages/login/register?data=[2," + this.userInfo.companyId +
					",0]&parentId=" + this.userInfo.id
				let IMGURL = "https://image.51uhj.com/25a421f644932557d2dc72f12cb262aab89a36a5eb72c6555c9c05254dbb3bc8.jpg"
				this.$wxH5Share.get_jssdk(TITLE, HREF, DESC, LINK, IMGURL)
				this.show = true
			}
		},
		computed: {
			userInfo() {
				return this.$store.getters.userInfo
			},
			hasLogin() {
				return this.$store.getters.hasLogin
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-bottom: 120rpx;
	}

	.user-header {
		@include flex-center(column);
		height: 280rpx;
		flex-direction: unset;
		justify-content: space-around;

		.user-info {
			@include flex-center(column);

			// margin-left: 60rpx;
			.nick-name {
				margin-top: 20rpx;
				font-size: 32rpx;
				font-weight: 700;
			}

			.nick-detial {
				font-size: 22rpx;
				font-weight: 500;
				margin-top: 10rpx;
				color: #409eff;
			}

			.nick-flag {
				margin-bottom: 10rpx;
				font-size: 30rpx;
			}
		}
	}

	.order-header {
		@include flex-space-between;
		padding: 20rpx 30rpx;
		border-bottom: $custom-border-style;

		.order-title {
			color: #333333;
			font-size: 34rpx;
		}

		.see-all {
			height: 40rpx;
			@include flex-right;
			color: #666666;
			font-size: 26rpx;
		}
	}

	.order-status-box {
		padding: 40rpx 0;
	}

	.stat-box {
		padding: 20rpx 0;
	}

	.grid-title {
		line-height: 50rpx;
		font-size: 26rpx;
	}

	.grid-value {
		line-height: 50rpx;
		font-size: 36rpx;
		font-weight: 700;
		color: #2b85e4;
	}

	.fun-list {
		.fun-item {
			padding-top: 10rpx;
			padding-bottom: 10rpx;
			border-bottom: $custom-border-style;
		}
	}

	.logout-btn {
		margin: 60rpx auto 0;
		width: 400rpx;
		margin-bottom: 40rpx;
	}

	.ercode-wind {
		width: 500rpx;
		height: 480rpx;
		position: relative;

		canvas {
			// margin: 0 auto;
			// margin-top: 40rpx;
			position: absolute;
			top: 40rpx;
			left: 0;
			right: 0;
			margin: auto;
		}
	}

	.ercode-btn {
		display: flex;
		align-items: center;
		justify-content: space-between;
		// width: 400rpx;
		margin: 0 auto;
		margin-bottom: 40rpx;
	}

	.ercode-btn-single {
		width: 180rpx;
		margin: 0 auto;

	}

	.number-code {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 20rpx 20rpx;
		width: 360rpx;
	}

	.number-code-btn {
		width: 20rpx;
	}

	.u-slot-value {
		background-color: red;
		color: #ffffff;
		border-radius: 10px;
		padding-left: 10rpx;
		padding-right: 10rpx;
	}
</style>
