<template>
	<view class="advertisement">
		<view @click="changeAdState(false)" class="window-timeout">
			{{timeText}}
		</view>
		<image class="window-img" :src="windowImg"></image>
	</view>
</template>

<script>
	import {
		getAdData
	} from '../../api/advertisement.js'
	export default {
		name: "advertisement",
		onLoad() {
			// this.loadAdData();
			// this.palyTime()
		},
		data() {
			return {
				windowImg: '',
				timeText: '5s',
				timer: null
			};
		},
		methods: {
			loadAdData() {
				getAdData({
					positionId: 2
				}).then(res => {
					if (res && res.data.list.length) {
						this.windowImg = res.data.list[0].contentPath
						this.palyTime()
					}
				})
			},
			palyTime() {
				clearInterval(this.timer);
				var t = 5;
				var _this = this
				this.timer = setInterval(function() {
					_this.timeText = t + 's | 跳过';
					// #ifdef MP-WEIXIN
					_this.timeText = t + 's';
					// #endif
					t--;
					if (t < 0) {
						_this.changeAdState(false)
					}
				}, 1000)
			},
			changeAdState(state) {
				clearInterval(this.timer);
				uni.showTabBar()
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		},
		mounted() {
			this.loadAdData();
			uni.hideTabBar()
		}
	}
</script>

<style>
	.advertisement {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		z-index: 999;
		background-color: #fff;
		/* display: none; */
		overflow: hidden;
	}

	.window-img {
		width: 100%;
		height: 100%;
	}

	.window-timeout {
		position: fixed;
		right: 30rpx;
		top: 20rpx;
		z-index: 999;
		font-size: 30rpx;
		background: rgba(0, 0, 0, 0.1);
		padding: 20rpx;
		border-radius: 100px;
		font-size: 20rpx;
	}
</style>
