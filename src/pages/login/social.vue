<template>
	<view class="container">
		<view v-if="!loading" class="auth-header">
			<view class="auth-logo">
				<u-avatar size="100" :src="headerUrl" fontSize="100"></u-avatar>
			</view>
		</view>

		<view v-if="!loading" class="auth-box">
			<view class="btn-group">
				<!-- #ifdef MP-WEIXIN -->
				<!-- 	<u-button icon="weixin-fill" ref="loginbtn" class="auth-btn" type="primary"
					@click="handleLoginByMPWX()">微信登录</u-button> -->
				<u-button icon="weixin-fill" ref="loginbtn" class="auth-btn" open-type="getPhoneNumber" type="primary"
					@getphonenumber="getPhoneNumber">一键登录</u-button>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<u-button icon="weixin-fill" ref="loginbtn" class="auth-btn" type="primary"
					@click="handleLoginByWXH5()">微信登录</u-button>
				<!-- #endif -->
				<!-- #ifdef APP -->
				<u-button icon="weixin-fill" ref="loginbtn" class="auth-btn" type="primary" @click="handleWXLogin()">
					微信登录</u-button>
				<!-- #endif -->
				<view style="height: 20rpx;"></view>
				<u-button class="auth-btn" type="primary" text="手机号登录" @click="handleJump"></u-button>
			</view>
			<view class="auth-footer">
				<view>登录即表示同意<text class="lk-text">《用户协议》</text> 和 <text class="lk-text">《隐私政策》</text></view>
			</view>
		</view>
		<u-modal :show="showPopup" title="请确认" @confirm="handleLoginByMPWX()" content='请确认使用微信用户信息'></u-modal>
		<u-loading-page :loading="loading"></u-loading-page>
	</view>
</template>

<script>
	import {
		socialAuthUserInfo
	} from '@/api/auth'
	import {
		updateNickname,
		updateAvatarUrl
	} from "@/api/user"
	import mix from "../../common/mixin.js"
	export default {
		data() {
			return {
				headerUrl: mix.imageUrl + 'wx/676e4ff60ad46337f9b39d8757766bf581b9b89f5927b1bdf4766a456efdd3d3.png',
				showPopup: false,
				parentId: null,
				appid: 'wx4cdf9306457bda2e',
				loading: true
			}
		},
		onLoad() {},
		mounted() {
			uni.hideTabBar();
			// #ifdef H5
			if (!this.hasLogin) {
				this.handleLoginH5Return()
			}
			//#endif
			// #ifndef H5
			this.loading = false
			//#endif
		},
		computed: {
			hasLogin() {
				return this.$store.getters.hasLogin
			},
			userInfo() {
				return this.$store.getters.userInfo
			}
		},
		methods: {
			handleLoginByMPWX() {
				var that = this
				this.loading = true
				uni.getUserProfile({
					provider: 'weixin', //使用微信登录
					desc: "用于登录",
					success: async loginRes => {
						try {
							if (!this.userInfo.nickname) {
								await updateNickname({
									nickname: loginRes.userInfo.nickName
								})
							}
							if (!this.userInfo.avatar) {
								await updateAvatarUrl({
									avatarUrl: loginRes.userInfo.avatarUrl
								})
							}
							this.showPopup = false
							uni.$u.toast('微信登录成功')
							setTimeout(() => {
								if (uni.getStorageSync('returnPath')) {
									uni.$u.route(uni.getStorageSync('returnPath'))
								} else {
									uni.switchTab({
										url: '/pages/user/user'
									})
								}
							}, 3000)
						} catch (e) {
							this.showPopup = false
							this.loading = false
							uni.$u.toast('微信登录失败')
							console.log(e);
							//TODO handle the exception
						}
					}
				});
			},
			handleLoginH5Return() {
				this.loading = true
				let status = navigator.userAgent.toLowerCase();
				if (status.match(/MicroMessenger/i) == "micromessenger") {
					const code = this.getUrlParame('code') // 截取code
					const code2 = sessionStorage.getItem('code')
					var that = this
					console.log(code, code2);
					if (!code && !code2) {
						//没有code，跳转腾讯地址，获取code
						var redirect_uri = this.urlencode(window.location.href);
						var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + this.appid +
							"&redirect_uri=" + redirect_uri + "&response_type=code" + "&scope=snsapi_userinfo" +
							"&state=STATE#wechat_redirect";
						window.location.replace(url);
					} else if (!code2) {
						sessionStorage.setItem('code', code)
						history.back()
					}
					setTimeout(() => {
						this.loading = false
					}, 2000)
				} else {
					setTimeout(() => {
						this.loading = false
					}, 2000)
				}
			},
			handleLoginByWXH5() {
				this.loading = true
				var that = this
				const code = this.getUrlParame('code') // 截取code  
				const code2 = sessionStorage.getItem('code')
				if (!code && !code2) {
					//没有code，跳转腾讯地址，获取code
					var redirect_uri = this.urlencode(window.location.href);
					var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + this.appid +
						"&redirect_uri=" + redirect_uri + "&response_type=code" + "&scope=snsapi_userinfo" +
						"&state=STATE#wechat_redirect";
					window.location.replace(url);
				} else if (!code2) {
					sessionStorage.setItem('code', code)
					history.back()
				} else {
					socialAuthUserInfo({
						code: code2
					}).then(res => {
						this.userId = res.data.userId
						let prams = {
							appUuid: res.data.uuId,
						}
						that.$store.dispatch('Login', {
							type: 9,
							data: prams
						}).then(res2 => {
							uni.setStorageSync('UUID', res.data.uuId)
							uni.$u.toast("登录成功")
							setTimeout(() => {
								if (uni.getStorageSync('returnPath')) {
									uni.$u.route(uni.getStorageSync('returnPath'))
								} else {
									uni.switchTab({
										url: '/pages/user/user'
									})
								}
							}, 3000)
						})
					})
				}
			},
			urlencode(url) {
				url = (url + '').toString();
				return encodeURIComponent(url).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
				replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
			},
			// 截取code
			getUrlParame(parameName) {
				/// 获取地址栏指定参数的值
				/// <param name="parameName">参数名</param>
				// 获取url中跟在问号后面的部分
				var parames = window.location.search
				// 检测参数是否存在
				if (parames && parames.indexOf(parameName) > -1) {
					var parameValue = ''
					parameValue = parames.substring(parames.indexOf(parameName), parames.length)
					// 检测后面是否还有参数
					if (parameValue.indexOf('&') > -1) {
						// 去除后面多余的参数, 得到最终 parameName=parameValue 形式的值
						parameValue = parameValue.substring(0, parameValue.indexOf('&'))
						// 去掉参数名, 得到最终纯值字符串
						parameValue = parameValue.replace(parameName + '=', '')
						return parameValue
					}
					return ''
				}
			},
			handleJump() {
				uni.$u.route('/pages/login/mobile')
			},
			handleWXLogin() {
				var that = this;
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									console.log(loginRes);
									// uni.$u.toast(JSON.stringify(loginRes.authResult.access_token))
									// loginRes 包含access_token，expires_in，openid，unionid等信息
									//这里只需要把这些数据传递给后台，让后台去请求微信的接口拿到用户信息就可以了，
									//然后返回登录状态
									if (!loginRes.authResult.unionid) {
										uni.$u.toast("正在重新登录")
										setTimeout(() => {
											that.handleWXLogin()
										}, 1000)
									}else{
										that.getApploginData(loginRes); //请求登录接口方法
									}
								},
								fail: function(res) {
									uni.$u.toast('微信登录失败')
								}
							});
						}
					}
				});
			},
			getPhoneNumber(e) {
				let phoneCode = e.detail.code
				if (!e.detail.code) {
					uni.showModal({
						title: '授权失败',
						content: '您已拒绝获取绑定手机号登录授权，可以使用其他手机号验证登录',
						cancelText: '知道了',
						confirmText: '验证登录',
						confirmColor: '#3C9CFFFF',
						success: res => {
							if (res.confirm) {
								uni.$u.route('/pages/login/mobile')
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
				} else {
					this.loading = true
					uni.login({
						provider: 'weixin',
						success: res => {
							// console.log(JSON.stringify(res));
							this.$store.dispatch('Login', {
								type: 2,
								data: {
									phoneCode: phoneCode,
									loginCode: res.code
								}
							}).then(res => {
								uni.$u.toast('登录成功')
								this.showPopup = true
							})
						}
					})
				}
			},
			getApploginData(data) {
				this.loading = true
				var that = this;
				//这边是前端自己去调微信用户信息的接口，根据接口需要请求，如果不需要前端去获取的话就交给后端，可省去次操作
				uni.request({
					url: 'https://api.weixin.qq.com/sns/userinfo?access_token=' + data.authResult.access_token +
						'&openid=' + data.authResult.openid,
					method: 'GET',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded' // 默认值
					},
					success(res) {
						console.log('【登录回调啾啾啾】', res);
						// uni.$u.toast("登录回调" + JSON.stringify(res))
						//前端调用微信接口，获取到微信用户的基本信息，传递给后台
						let prams = {
							appUuid: data.authResult.unionid,
							avatar: res.data.headimgurl,
							nickname: res.data.nickname
						}
						that.$store.dispatch('Login', {
							type: 9,
							data: prams
						}).then(res2 => {
							uni.setStorageSync('UUID', data.authResult
								.unionid)
							uni.$u.toast("登录成功")
							setTimeout(() => {
								if (uni.getStorageSync('returnPath')) {
									uni.$u.route(uni.getStorageSync('returnPath'))
								} else {
									uni.switchTab({
										url: '/pages/user/user'
									})
								}
							}, 3000)
						})
					},
					fail() {
						this.loading = false
						uni.$u.toast('获取微信授权失败')
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: calc(100vh - 70px);
		@include flex-space-between(column);
	}

	.auth-header {
		flex: 2;
		@include flex-center;

		.auth-logo {
			@include flex-center(column);
		}
	}

	.auth-box {
		@include flex-center(column);

		.btn-group {
			width: 600rpx;
			margin-bottom: 200rpx;

			.auth-btn {
				height: 90rpx;
				font-size: 32rpx;
				// margin-bottom: 20rpx;
			}
		}

		.reg-login-link {
			margin-top: 32rpx;
			text-align: center;
			color: #636363;
			font-size: 30rpx;
		}

		.auth-footer {
			font-size: 26rpx;
			color: #939393;

			.lk-text {
				color: $u-primary;
				text-decoration: $u-primary;
			}
		}
	}
</style>
