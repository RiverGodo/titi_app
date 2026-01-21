<template>
	<view class="app">
		<common-wx-header name="登录" />
		<view class="container">
			<view class="left-bottom-sign"></view>
			<view class="back-btn" @click="navBack">
				<text class="iconfont">&#xe619;</text>
			</view>
			<view class="right-top-sign"></view>
			<view class="agreement center">
				<text class="iconfont" :class="{active: agreement}"
					@click="checkAgreement">{{agreement? '&#xe63d;': '&#xe63e;'}}</text>
				<text @click="checkAgreement">请认真阅读并同意</text>
				<text class="tit" @click="navToAgreementDetail(1)">《服务协议》</text>
				<text class="tit" @click="navToAgreementDetail(2)">《隐私政策》</text>
			</view>
			<view class="logo_container">
				<image :src="cdn + '/logo.png'" mode="widthFix" class="logo" />
			</view>
			<view class="wrapper">
				<mix-button ref="confirmBtn" icon="icon-wx-login" :iconSize="30" text="微信登录" marginTop="60rpx"
					@onConfirm="login" />
			</view>
		</view>
	</view>
</template>

<script>
	import CommonWxHeader from "../../components/common-wx-header/common-wx-header.vue";

	export default {
		components: {
			CommonWxHeader
		},
		data() {
			return {
				agreement: true,
				inviteCode: '',
				cdn: this.$cdn
			}
		},
		onLoad(options) {
			if (options.q) {
				this.inviteCode = this.$util.getLocationParams(decodeURIComponent(options.q), 'c')
			}
		},
		methods: {
			async jump(unionId) {
				//昵称等信息微信已经不支持获取了
				const res = await this.$post('/user/login', {
					unionId
				});
				this.$util.msg('登陆成功');
				this.$store.commit('setToken', res.data);
				setTimeout(() => {
					if (this.inviteCode) {
						this.navTo('/pages/worker/apply?c=' + this.inviteCode)
					} else {
						this.back();
					}
				}, 1000)
			},
			async login() {
				// #ifdef H5
				if (process.env.NODE_ENV !== 'production') {
					//ttt 商家账号  //wx 公司管理员、物业管理员
					this.jump("oRiVo63uzjTKZXEfrHKXzZIrI");
				} else {
					this.$util.msg("请在小程序或者APP中打开");
				}
				this.$refs.confirmBtn.stop();
				return;
				// #endif
				if (!this.agreement) {
					this.$util.msg('请阅读并同意用户服务及隐私协议');
					this.$refs.confirmBtn.stop();
					return;
				}
				uni.login({
					provider: 'weixin', //使用微信登录
					onlyAuthorize: true,
					success: async (loginRes) => {
						let code = loginRes.code;
						let param = {
							code
						};
						// #ifdef  APP-PLUS
						param.platform = "app";
						// #endif
						const wxData = await this.$post('/user/getUnionId', param);
						let unionId = wxData.data;
						if (this.$util.isEmpty(unionId)) {
							this.$util.msg("微信unionId获取失败");
						} else {
							this.jump(unionId);
						}
					},
					complete: () => {
						this.$refs.confirmBtn.stop();
					}
				});

			},
			navBack() {
				this.back();
			},
			//同意协议
			checkAgreement() {
				this.agreement = !this.agreement;
			},
			//打开协议
			navToAgreementDetail(type) {
				this.navTo('/pages/announce/detail?id=' + type)
			},
		}
	}
</script>

<style>
</style>
<style scoped lang='scss'>
	view,
	text {
		line-height: 1.8;
	}

	.app {
		width: 100vw;
		height: 100vh;
		background: #fff;
		display: flex;
		flex-direction: column;
	}

	.reg-wrap {
		padding: 10rpx 60rpx 0;
		font-size: 24rpx;
		color: #999;

		.reg-btn {
			padding: 20rpx 0;
			color: $base-color;
		}
	}

	.logo_container {
		margin-top: 200rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.logo {
		width: 200rpx;
		height: 200rpx;
	}

	.wrapper {
		margin-top: 200rpx;
		z-index: 90;
		padding-bottom: 40rpx;
	}

	.container {
		padding-top: 200rpx;
		position: relative;
		flex: 1;
		overflow: hidden;
	}

	.back-btn {
		position: absolute;
		top: 30rpx;
		right: 30rpx;
		z-index: 99;
		background: rgba(0, 0, 0, .5);
		width: 60rpx;
		height: 60rpx;
		border-radius: 30rpx;
		align-items: center;
		display: flex;
		justify-content: center;

		.iconfont {
			font-size: 50rpx;
			color: #fff;
		}
	}

	.left-top-sign {
		font-size: 120rpx;
		color: #f8f8f8;
		position: relative;
		left: -12rpx;
	}

	.right-top-sign {
		position: absolute;
		left: -270rpx;
		top: -320rpx;
		border: 100rpx solid $base-color;
		opacity: 0.5;
		border-radius: 50%;
		padding: 180rpx;
	}

	.left-bottom-sign {
		position: absolute;
		right: -270rpx;
		bottom: -320rpx;
		border: 100rpx solid lightskyblue;
		border-radius: 50%;
		padding: 180rpx;
	}

	.welcome {
		position: relative;
		left: 60rpx;
		top: -90rpx;
		font-size: 46rpx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
	}

	.input-content {
		padding: 0 60rpx;
	}

	.input-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 0 30rpx;
		background: #f8f6fc;
		height: 100rpx;
		border-radius: 4px;
		margin-bottom: 50rpx;

		&:last-child {
			margin-bottom: 0;
		}

		.row {
			width: 100%;
		}

		.tit {
			padding-right: 20rpx;
			height: 50rpx;
			line-height: 56rpx;
			color: #999;

			&.tit1 {
				font-size: 30rpx;
			}

			&.tit2 {
				font-size: 34rpx;
			}
		}

		input {
			flex: 1;
			height: 60rpx;
			font-size: 28rpx;
			color: #333;
			width: 100%;
		}
	}

	/* 其他登录方式 */
	.other-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 20rpx;
		margin-top: 80rpx;

		.line {
			margin-bottom: 40rpx;

			.tit {
				margin: 0 32rpx;
				font-size: 24rpx;
				color: #606266;
			}

			&:before,
			&:after {
				content: '';
				width: 160rpx;
				height: 0;
				border-top: 1px solid #e0e0e0;
			}
		}

		.item {
			font-size: 24rpx;
			color: #606266;
			background-color: #fff;
			border: 0;

			&:after {
				border: 0;
			}
		}

		.icon {
			width: 90rpx;
			height: 90rpx;
			margin: 0 24rpx 16rpx;
		}
	}

	.agreement {
		position: absolute;
		left: 0;
		bottom: 4vh;
		z-index: 1;
		width: 750rpx;
		height: 90rpx;
		font-size: 24rpx;
		color: #999;

		.iconfont {
			font-size: 30rpx;
			color: #ccc;
			margin-right: 10rpx;
			margin-top: 1px;

			&.active {
				color: $base-color;
			}
		}

		.tit {
			color: $base-color;
		}
	}
</style>