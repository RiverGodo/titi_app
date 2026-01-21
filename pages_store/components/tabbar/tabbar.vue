<template>
	<view class="ynq-tabbar">
		<view class="ynq-tabbar-bg-box">
			<!-- <image class="ynq-tabbar-bg" :src="tabbarTop" mode="aspectFill"></image> -->
			<view class="ynq-mid-icon" @tap="midClick">
				<image :src="centerButton" mode="aspectFill"></image>
			</view>
			<view class="ynq-tabbar-box">
				<view class="ynq-tabbar-item" v-for="tab,index in data" :key="index" @tap="tabbarItemClick(tab,index)">
					<u-badge v-if="messageNumber" :offset="[3,20]" :absolute="true" :isDot="true" type="error">
					</u-badge>
					<image class="ynq-tabbar-icon" :src="tabbarIndex==index?tab.selectedIconPath:tab.iconPath"
						mode="aspectFill">
					</image>
					<view class="ynq-tabbar-text" :class="tabbarIndex==index?'ynq-tabbar-text-select':''">{{tab.text}}
					</view>
				</view>
			</view>
		</view>
		<!-- IOS安全距离START -->
		<view class="ynq-ios-aq"></view>
		<!-- IOS安全距离END -->
	</view>
</template>

<script>
	var _this, js;
	export default {
		name: "tabbar",
		props: ["index"],
		data() {
			return {
				upDataMsg: null,
				title: '',
				list: [{
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
				// 计时器时间
				countTime: 0,
				// 计时器对象
				countTimer: null,
				tabbarIndex: 0,
				showScans: false,
				messageNumber: 0,
				centerButton: this.$cdn + '/static/store/bar-add.png',
				data: [{
						"pagePath": "/pages_store/bar/home",
						"text": "首页",
						"iconPath": '/static/images/bar/home1.png',
						"selectedIconPath": '/static/images/bar/home2.png'
					},
					{
						"pagePath": "/pages_store/ad/list",
						"text": "交易广场",
						"iconPath": '/static/images/bar/p1.png',
						"selectedIconPath": '/static/images/bar/p2.png'
					},
					{
						"pagePath": "",
						"text": "",
						"iconPath": "",
						"selectedIconPath": ""
					},
					{
						"pagePath": "/pages_store/bar/cash",
						"text": "现金券",
						"iconPath": '/static/images/bar/ad1.png',
						"selectedIconPath": '/static/images/bar/ad2.png'
					},
					{
						"pagePath": "/pages_store/bar/mine",
						"text": "我的",
						"iconPath": '/static/images/bar/mine1.png',
						"selectedIconPath": '/static/images/bar/mine2.png'
					}
				]
			};
		},
		mounted() {
			this.tabbarIndex = this.index
			uni.hideTabBar();
		},
		methods: {
			tabbarItemClick(tab, index) {
				this.navTo(tab.pagePath)
			},
			midClick() {
				this.navTo('/pages_store/ad/adAdd',{login:true})
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
				top: 8rpx;
				left: 0;
				right: 0;
				margin: auto;
				border-radius: 100%;
				width: 80rpx;
				height: 80rpx;
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
						font-size: 22rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #969696;
					}

					.ynq-tabbar-text-select {
						color: $base-color;
					}
				}
			}
		}
	}
</style>