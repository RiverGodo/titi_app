<template>
	<view class="content">
		<view class="header">
			<image :src="headerUrl"></image>
		</view>

		<view class="list">
			<view style="margin-left: 16rpx;" class="list-call">
				申请
				<input disabled class="sl-input" v-model="floorInfo.name" placeholder="公司名称" />
				认证登记
			</view>
			<view class="list-call">
				<input disabled class="sl-input" v-model="companyType" placeholder="申请类型" />
			</view>
			<!-- 			<view style="margin-left: 16rpx;" class="list-call">
				用户编号:
				<input style="margin: 0;" disabled class="sl-input" v-model="phone" placeholder="用户编号" />
			</view> -->
			<!-- 	<view style="margin-left: 16rpx;" class="list-call">
				昵称/姓名:
				<input class="sl-input" v-model="registerPram.nickname" placeholder="昵称/姓名" />
			</view>
			<view style="margin-left: 16rpx;" class="list-call">
				登录密码:
				<input style="margin: 0;" class="sl-input" v-model="password" placeholder="请输入登录密码" />
			</view>
			<view style="margin-left: 16rpx;" class="list-call">
				确认密码:
				<input style="margin: 0;" class="sl-input" v-model="repassword" placeholder="请确认登录密码" />
			</view> -->
			<!-- 			<view class="list-call">
				<input class="sl-input" v-model="phone" type="number" maxlength="11" placeholder="手机号" />
			</view>
			<view class="list-call">
				<input class="sl-input" v-model="password" type="text" maxlength="32" placeholder="登录密码"
					:password="!showPassword" />
			</view>
			<view class="list-call">
				<input class="sl-input" v-model="code" type="number" maxlength="4" placeholder="验证码" />
				<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
			</view> -->
			<!-- <view class="list-call">
				<input class="sl-input" v-model="invitation" type="text" maxlength="12" placeholder="推荐人编号(非必填)" />
			</view> -->

		</view>

		<view class="button-login" hover-class="button-hover" @tap="bindLogin">
			<text>确认申请</text>
		</view>

		<view class="agreement">
			<text @tap="agreementSuccess"> 申请即同意</text>
			<navigator url="agreement?id=1" open-type="navigate">《软件用户协议》</navigator>
		</view>
	</view>
</template>

<script>
	import {
		register,
		updateCompanyAuth
	} from '../../api/auth.js'
	import {
		companyDetial
	} from '../../api/admin.js'
	import {
		socialAuthUserInfo
	} from '@/api/auth'
	import mix from "../../common/mixin.js"
	var _this, js;
	export default {
		onLoad(options) {
			_this = this;
			if (options.parentId) {
				uni.setStorageSync('parentId', options.parentId)
			}
			if (this.hasLogin) {
				this.$store.dispatch('ObtainUserInfo')
				if (this.userInfo.id && this.userInfo.companyId) {
					uni.showToast({
						title: this.userInfo.roleId === 121 ? '您已注册,请联系管理员审核' : '您已注册',
						icon: 'none'
					});
					uni.switchTab({
						url: '/pages/index/index'
					})
				}
				// if (this.userInfo.parentId) {
				// 	uni.showToast({
				// 		title: '您已被邀请',
				// 		icon: 'none'
				// 	});
				// 	setTimeout(() => {
				// 		uni.switchTab({
				// 			url: '/pages/index/index'
				// 		})
				// 	}, 1000)
				// }
			} else {
				if (options.data) {
					uni.setStorageSync('returnPath', '/pages/login/register?data=' + options.data)
				}
				uni.$u.route('/pages/login/social')
			}
			if (options.data) {
				this.urlData = options.data
				this.companyData = JSON.parse(options.data)
				this.companyType = this.companyData[2] === 0 ? '注册类型:正式卡注册' : '注册类型:临时卡注册'
				this.companyId = '公司ID:' + this.companyData[1]
				this.phone = String(new Date() * 1).slice(2)
				this.getDetial(this.companyData[1]);
				this.parentId = uni.getStorageSync('parentId')
			} else {
				uni.showToast({
					title: '请扫正确二维码',
					icon: 'none'
				});
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}, 2000)
			}
		},
		onUnload() {
			uni.switchTab({
				url: '/pages/index/index',
			})
			clearInterval(js)
			this.second = 0;
		},
		data() {
			return {
				headerUrl: mix.imageUrl + 'wx/676e4ff60ad46337f9b39d8757766bf581b9b89f5927b1bdf4766a456efdd3d3.png',
				urlData: '',
				phone: '',
				password: '',
				repassword: '',
				code: '',
				invitation: '',
				agreement: true,
				showPassword: false,
				second: 0,
				companyData: [],
				companyId: '公司ID',
				companyType: '注册类型',
				floorInfo: {},
				parentId: null,
				appid: 'wx4cdf9306457bda2e',
				registerPram: {
					avatar: '',
					nickname: '',
					level: 0,
					uuid: uni.getStorageSync('UUID') ? uni.getStorageSync('UUID') : 0
				}
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
			uni.hideTabBar();
			// #ifdef H5
			if (!this.hasLogin) {
				this.handleLoginH5Return()
			}
			//#endif
		},
		onUnload() {
			this.clear()
		},
		methods: {
			clear() {
				clearInterval(js)
				js = null
				this.second = 0
			},
			display() {
				this.showPassword = !this.showPassword
			},
			agreementSuccess() {
				this.agreement = !this.agreement;
			},
			getcode() {
				if (!this.phone.length) {
					uni.showToast({
						icon: 'none',
						title: '账号不正确'
					});
					return;
				}
				if (this.second > 0) {
					return;
				}
				this.second = 60;
				//请求业务
				js = setInterval(function() {
					_this.second--;
					if (_this.second == 0) {
						_this.clear()
					}
				}, 1000)
			},
			getDetial(id) {
				let pram = {
					id: id
				}
				companyDetial(pram).then(res => {
					if (res && res.code === 0) {
						this.floorInfo = res.data
					}
					if (res.data === null) {
						// uni.$u.toast('没有此公司，请联系管理员')
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}, 2000)
					}
				})
			},
			bindLogin() {
				if (this.agreement == false) {
					uni.showToast({
						icon: 'none',
						title: '请先阅读《软件用户协议》'
					});
					return;
				}
				// if (this.phone.length != 11) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '账号不正确'
				// 	});
				// 	return;
				// }
				// if (this.password.length < 6) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '密码长度过少'
				// 	});
				// 	return;
				// }
				// if (this.repassword !== this.password) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '两次输入密码不匹配'
				// 	});
				// 	return;
				// }
				this.userBind()
			},
			userBind() {
				let pram = {
					id: this.userInfo.id,
					companyId: this.companyData[1],
					roleId: this.companyData[2],
					parentId: this.parentId,
					status: 0,
				}
				updateCompanyAuth(pram).then(res => {
					if (res && res.code === 0) {
						uni.$u.toast('申请成功,请联系管理员审核')
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}, 2000)
					}
				})
			},
			userRegister() {
				let pram = {
					...this.registerPram,
					mobile: this.phone,
					password: this.password,
					companyId: this.companyData[1],
					parentId: this.invitation,
					roleId: this.companyData[2],
					parentId: this.parentId,
					status: 0
				}
				register(pram).then(res => {
					if (res && res.code === 0) {
						uni.$u.toast('注册成功正在登录，您的账号为' + res.data.userId)
						let prams = {
							mobile: res.data.userId,
							password: this.password,
						}
						this.mobileLogin(prams)
					}
				})
			},
			mobileLogin(data) {
				this.$store.dispatch('Logout').then(res0 => {
					this.$store.dispatch('Login', {
						type: 0,
						data: data
					}).then(res => {
						uni.$u.toast('登录成功,正在跳转')
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/user/user'
							})
						}, 2000)
					})
				})
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.header {
		width: 161rpx;
		height: 161rpx;
		/* 		background: rgba(63, 205, 235, 1);
		box-shadow: 0rpx 12rpx 13rpx 0rpx rgba(63, 205, 235, 0.47); */
		border-radius: 50%;
		margin-top: 30rpx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 161rpx;
		height: 161rpx;
		border-radius: 50%;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50rpx;
		padding-left: 70rpx;
		padding-right: 70rpx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		color: #333333;
		border-bottom: 0.5px solid #e2e2e2;
	}

	.list-call .img {
		width: 40rpx;
		height: 40rpx;
	}

	.list-call .sl-input {
		flex: 1;
		text-align: left;
		font-size: 32rpx;
		margin-left: 16rpx;
	}

	.yzm {
		color: #FF7D13;
		font-size: 24rpx;
		line-height: 64rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		width: auto;
		height: 64rpx;
		border: 1rpx solid #FFA800;
		border-radius: 50rpx;
	}

	.yzms {
		color: #999999 !important;
		border: 1rpx solid #999999;
	}

	.button-login {
		color: #FFFFFF;
		font-size: 34rpx;
		width: 470rpx;
		height: 100rpx;
		line-height: 100rpx;
		background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
		box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.2);
		border-radius: 50rpx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100rpx;
	}

	.button-hover {
		background: linear-gradient(-90deg, rgba(63, 205, 235, 0.8), rgba(188, 226, 158, 0.8));
	}

	.agreement {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		margin-top: 80rpx;
		color: #FFA800;
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}

	.agreement image {
		width: 40rpx;
		height: 40rpx;
	}
</style>
