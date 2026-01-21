<template>
	<view class="app">
		<view class="tips" v-if="mask">
			<image :src="cdn + mask" mode="widthFix"/>
		</view>
		<view class="c-1">
			<view class="c-2">
				<image class="img-1" :src="cdn + '/logo.png'"></image>
				<mix-button ref="confirmBtn" text="下载友惠见" :mini="true" marginTop="40rpx" @onConfirm="download" />
			</view>
			<view class="c-3">
				<text class="t-1">或用手机扫描下面的二维码安装</text>
				<view class="c-4">
					<uqrcode :text="link" :size="150" v-if="link !== ''" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				link: this.$appLink,
				iosUrl: 'xxxx',
				mask: '',
				cdn: this.$cdn,
				androidUrl: this.$cdn + '/app/android/ttzs.apk',
				cdn:this.$cdn
			}
		},
		onLoad(){
			this.init();
		},
		methods: {
			init() {
				let ua = window.navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/_SQ_/i) == '_sq_') {
					if (this.isIOS() && !this.isAndroid()) {
						this.mask = '/ios_browser.png';
					}else{
						this.mask = '/android_browser.png';
					}
				}
			},
			isAndroid() {
				return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1 ||
					navigator.userAgent.indexOf('Windows') > -1;
			},
			isIOS() {
				return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || navigator.userAgent.toLowerCase()
					.indexOf("iPhone") !== -1;
			},
			download() {
				let url = '';
				if (this.isIOS() && !this.isAndroid()) {
					this.$util.msg("敬请期待");
				} else {
					url = this.androidUrl;
				}
				window.location.href = url;
			}
		}
	}
</script>

<style scoped lang="scss">
	view,text{line-height: 1.8;}
	page {
		background-color: #FFFFFF;
	}

	.app {
		background-color: #FFFFFF;
	}

	.tips{
		position:fixed;
		width: 100%;
		height:100%;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 999;
		display: flex;
		justify-content: center;
		image{
			width: 70%;
			margin-top: 20rpx;
		}
	}

	.c-1 {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100vw;
		height: 100vh;
	}

	.c-2 {
		background-color: #FFFFFF;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: auto;
	}

	.c-3 {
		background-color: #FFFFFF;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: auto;
	}

	.c-4 {
		background: url("@/static/images/share/bk.png") no-repeat;
		background-size: 100% 100%;
		padding: 20rpx;
		min-width: 100rpx;
		width: auto;
		min-height: 100rpx;
		height: auto;
	}

	.c-5 {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		background-color: #FFFFFF;
		position: fixed;
		top: 0rpx;
		width: 100%;
		height: 88rpx;
		margin: 30rpx;
	}

	.t-1 {
		color: #333333;
		font-size: 30rpx;
		text-align: center;
		width: calc(100%);
		height: auto;
		margin-bottom: 50rpx;
	}

	.img-1 {
		width: 200rpx;
		height: 200rpx;
		margin: 0rpx 0rpx 50rpx 0rpx;
		border-style: solid;
		border-color: unset;
		border-width: 0rpx;
		border-radius: 100rpx;
	}

	.img-2 {
		width: 24rpx;
		height: 38rpx;
	}

	.btn-1 {
		font-size: 32rpx;
		font-weight: bold;
		color: #FFFFFF;
		background: linear-gradient(to bottom right, #ffb2bf, $base-color);
		border-style: solid;
		border-radius: 60rpx;
		padding: 30rpx 60rpx 30rpx 60rpx;
		height: 120rpx;
	}
</style>