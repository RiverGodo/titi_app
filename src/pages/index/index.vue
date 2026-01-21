<template>
	<view class="container">

		<!--搜索栏-->
		<!--   <u-sticky style="top: 0" offset-top="0">
      <view class="search-wrap">
        <u-search placeholder="搜索" disabled height="32" :show-action="false" @click="handleSearchClick"></u-search>
      </view>
    </u-sticky> -->

		<!--轮播图-->
		<u-swiper keyName="picUrl" :list="swiperList" circular height="150" @change="e => (current = e.current)"
			:autoplay="true" @click="handleSwiperClick">
			<view slot="indicator" class="indicator">
				<view class="indicator__dot" v-for="(item, index) in swiperList" :key="index"
					:class="[index === current && 'indicator__dot--active']"> </view>
			</view>
		</u-swiper>

		<!-- <u-gap height="20px"></u-gap> -->

		<!--宫格菜单按钮-->


		<!-- <u-gap height="15px"></u-gap> -->

		<!--消息滚动栏-->
		<u-notice-bar style="padding: 13px 12px" :text="changText()" mode="link" direction="column"></u-notice-bar>

		<!-- <u-gap height="15px"></u-gap> -->

		<view class="index-center">
			<u-grid :border="false" col="4">
				<u-grid-item @click="handleShowToast(item)" v-for="(item, index) in menuList" :key="index">
					<!-- <u-icon :name="item.icon" :size="40"></u-icon> -->
					<image class="grid-image" :src="imgHeader + item.icon"></image>
					<text class="grid-title">{{ item.title }}</text>
				</u-grid-item>
			</u-grid>
			<view class="scan-button">
				<u-button @click="handleScanCode()" size="large" :hairline="false" type="success" shape="circle"
					icon="scan" color="linear-gradient(to top, rgb(64, 158, 255), rgb(60, 58, 186))" text="扫一扫">
				</u-button>
			</view>
		</view>

		<u-gap height="20px"></u-gap>
		<!--商品展示栏-->

		<view>
			<view class="prod-block half">
				<!-- 		<view class="bloc-header">
					<text class="bloc-title">商品热卖</text>
					<text @click="handleMoreProduct()" class="more">更多 &gt;</text>
				</view> -->
				<view class="prod-grid half">
					<view class="prod-item" v-for="(item, index) in productList" :key="item.id"
						@click="handleProdItemClick(item.id)">
						<image class="prod-image" :src="item.picUrls[0]"></image>
						<view class="item-info">
							<view class="info-text">
								<u--text :lines="1" size="14px" color="#333333" :text="item.name"></u--text>
								<u--text :lines="1" size="12px" color="#939393" :text="item.sellPoint"></u--text>
							</view>
							<view class="price-and-cart">
								<custom-text-price color="red" size="12" intSize="18" :price="item.minPrice/100">
								</custom-text-price>
								<u-icon name="shopping-cart" color="#2979ff" size="28"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view>
			<u-gap height="180" bgColor="#398ade"></u-gap>
			<view class="prod-block">
				<!-- 			<view class="bloc-header">
					<text class="bloc-title">热门任务</text>
					<text @click="moreTask()" class="see-more">查看更多</text>
				</view> -->
				<view class="prod-grid">
					<view class="prod-item" v-for="(item, index) in taskList" :key="item.id"
						@click="handleTaskClick(item.id)">
						<image class="prod-image" :src="item.image"></image>
						<view class="item-info">
							<view class="info-text">
								<u--text :lines="2" size="14px" color="#333333" :text="item.title"></u--text>
							</view>
							<view class="price-and-cart">
								<custom-text-price color="red" size="12" intSize="18" :price="item.price">
								</custom-text-price>
								<!-- <u-icon name="shopping-cart" color="#2979ff" size="28"></u-icon> -->
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>


		<!--    <view>
      <view class="prod-block list">
        <view class="bloc-header">
          <text class="bloc-title">更多宝贝</text>
          <text></text>
        </view>

        <view class="prod-list" v-for="(item, index) in productList" :key="item.id">
          <view class="prod-item" @click="handleProdItemClick(item.id)">
            <image class="prod-image" :src="item.image"></image>
            <view class="item-info">
              <view class="info-text">
                <u--text :lines="1" size="14px" color="#333333" :text="item.title"></u--text>
                <u-gap height="2px"></u-gap>
                <u--text class="info-desc" :lines="2" size="12px" color="#939393" :text="item.desc"></u--text>
              </view>
              <view class="price-and-cart">
                <custom-text-price color="red" size="12" intSize="18" :price="item.price"></custom-text-price>
                <u-icon name="shopping-cart" color="#2979ff" size="28"></u-icon>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view> -->
		<!--加载更多-->
		<u-loadmore fontSize="28rpx" :status="status" :loading-text="loadingText" :loadmore-text="loadmoreText"
			:nomore-text="nomoreText" />
		<tabbar ref="tabbars" index="0"></tabbar>
		<u-loading-page :loading="vloading"></u-loading-page>
	</view>
</template>

<script>
	// import {
	// 	log
	// } from '../../../dist/dev/mp-weixin/common/vendor';
	import mix from "../../common/mixin.js"
	import {
		getBannerData,
		getNoticeData
	} from '../../api/index'
	import {
		getTaskList
	} from '../../api/task.js'
	import {
		productSpuPage
	} from '../../api/product';

	export default {
		components: {},
		data() {
			return {
				vloading:true,
				verifyCode: '',
				current: 0,
				currentNum: 0,
				bannerList: [],
				imgHeader: mix.imageUrl + 'wx/',
				appid: 'wx4cdf9306457bda2e',
				menuList: [{
						icon: '99c47d4c687a85fdf296b72a86c22db3fdb82b97e3faeef045ed1a30b9768294.png',
						title: '合伙人',
						url: '/pages/team/team',
						urlType: 1,
						isLogin: true
					},
					{
						icon: '5c1db33842138e5af41c114921d4f0822c7749a5c3850dc9ad69d8bbbf34001c.png',
						title: '个人中心',
						url: '/pages/user/user',
						urlType: 0
					},
					{
						icon: '0c127e8d192e49b08a5f7f881111c94d839344a01c2dc5b5cbc8d2869218b433.png',
						title: '福利中心',
						url: ''
					},
					{
						icon: '66a14972f62b5e7dc8b1f6d81b3bbe8126e26cb67eaa14ded6fe240c1c5fa97e.png',
						title: '优惠券',
						url: ''
					},
					{
						icon: 'a1ad1faec8c78c364cfa8539a67b3ff4f524136a216a5f195bb53aec49ff0772.png',
						title: '活动中心',
						url: ''
					},
					{
						icon: 'd61b21c85555fdd878c75022caf28d5b9d649e39ecfc2ddcb50881170f50e389.png',
						title: '邀请好友',
						url: ''
					},
					{
						icon: '1758c38cf5c40ace023febb9867a6faf864ae9a62b4d00e05ed091615c31a466.png',
						title: '任务中心',
						url: '/pages/task/task',
						urlType: 0
					},
					{
						icon: '98df3fe72dc41e68281cf79dd9aa0f7300ca5a6332f7a117af6fed565b0e9e8c.png',
						title: '我的资产',
						url: '/pages/profile/profile',
						urlType: 1,
						isLogin: true
					}
				],
				noticeList: [],
				productList: [],
				taskList: [],
				status: 'nomore',
				loadingText: '努力加载中...',
				loadmoreText: '轻轻上拉',
				nomoreText: '实在没有了...',
				uuid: ''
			}
		},
		onLoad(options) {
			if (options.parentId) {
				uni.setStorageSync('parentId', options.parentId)
			}
			// // #ifdef APP-PLUS
			// this.getPlus();
			// //#endif
			// // #ifdef MP-WEIXIN
			this.getPlusWx();
			// //#endif
			// // #ifdef H5
			// this.getPlusH5();
			// //#endif
			this.loadBannerData();
			this.loadNoticeData();
			this.loadProductData();
			this.loadTaskData();
			if (this.hasLogin) {
				this.$store.dispatch('ObtainUserInfo')
			}
			// console.log(mix);
		},
		onShow() {
			this.vloading = false
		},
		created() {
			uni.hideTabBar();
		},
		methods: {
			getPlusH5() {
				if (!this.hasLogin) {
					uni.$u.route('/pages/login/social')
				}
				// let status = navigator.userAgent.toLowerCase();
				// if (status.match(/MicroMessenger/i) == "micromessenger") {
				// 	if (!this.hasLogin) {
				// 		uni.$u.route('/pages/login/social')
				// 	}
				// }
			},
			getPlusWx() {
				let port = uni.getSystemInfoSync().platform
				// console.log(port);
				if (port === 'android') {
					uni.$u.route('/pages/download/download')
				} else {
					if (!this.hasLogin) {
						// uni.$u.route('/pages/login/social')
					}
				}
			},
			getPlus() {
				if (!this.hasLogin) {
					uni.$u.route('/pages/login/social')
				}
				// if (!this.uuid) {
				// 	let _this = this
				// 	plus.device.getInfo({
				// 		success: (e) => {
				// 			console.log('getDeviceInfo succe2ss: ' + JSON.stringify(e));
				// 			_this.uuid = e.uuid;
				// 			let prams = {
				// 				appUuid: e.uuid
				// 			}
				// 			_this.$store.dispatch('Login', {
				// 				type: 9,
				// 				data: prams
				// 			}).then(res => {
				// 				uni.$u.toast('登录成功')
				// 				uni.setStorageSync('UUID', e.uuid)
				// 			})
				// 		},
				// 		fail: (e) => {
				// 			console.log('getDeviceInfo failed: ' + JSON.stringify(e));
				// 			uni.showModal({
				// 				title: '提示',
				// 				content: '获取设备信息失败，是否授权打开设备信息',
				// 				success: (res) => {
				// 					if (res.confirm) {
				// 						uni.getSystemInfo({
				// 							success: (sys) => {
				// 								if (sys.platform == 'ios') {
				// 									plus.runtime.openURL(
				// 										"app-settings://");
				// 								} else {
				// 									var Intent = plus.android
				// 										.importClass(
				// 											"android.content.Intent");
				// 									var Settings = plus.android
				// 										.importClass(
				// 											"android.provider.Settings"
				// 										);
				// 									var Uri = plus.android.importClass(
				// 										"android.net.Uri");
				// 									var mainActivity = plus.android
				// 										.runtimeMainActivity();
				// 									var intent = new Intent();
				// 									var intentGoApp = new Intent(
				// 										mainActivity.getIntent());
				// 									var uri = Uri.fromParts("package",
				// 										"uni.UNIA6D2BFC", null);
				// 									intent.addFlags(Intent
				// 										.FLAG_ACTIVITY_NEW_TASK);
				// 									intent.setAction(
				// 										"android.settings.APPLICATION_DETAILS_SETTINGS"
				// 									);
				// 									intent.setData(Uri.fromParts(
				// 										"package",
				// 										"uni.UNIA6D2BFC", null
				// 									));
				// 									mainActivity.startActivity(intent)
				// 								}
				// 							}
				// 						})
				// 					}
				// 				}
				// 			})
				// 		}
				// 	});
				// }
			},
			loadBannerData() {
				getBannerData().then(res => {
					this.bannerList = res.data
					this.vloading = false
				})
			},
			loadNoticeData() {
				getNoticeData().then(res => {
					if (res && res.data.list.length) {
						this.noticeList = res.data.list
					}
				})
			},
			handleSearchClick(e) {
				uni.$u.route('/pages/search/search')
			},
			handleSwiperClick(index) {
				// uni.$u.route('/pages/download/download')
				uni.$u.route('/pages/elevator/elevator?data=[0,5,15,14]')
				console.log('点击了图片索引值：', index)
			},
			handleProdItemClick(productId) {
				uni.$u.route('/pages/product/product', {
					productId: productId
				})
			},
			handleMoreProduct() {
				uni.switchTab({
					url: '/pages/category/category'
				})
			},
			moreTask() {
				uni.switchTab({
					url: '/pages/task/task'
				})
			},
			loadProductData() {
				let param = {
					pageNo: 1,
					pageSize: 6
				}
				productSpuPage(param).then(res => {
					if (res && res.data.list.length) {
						this.productList = res.data.list
					}
				})
			},
			loadTaskData() {
				let pram = {
					pageNo: 1,
					pageSize: 6
				}
				getTaskList(pram).then(res => {
					if (res && res.data.list.length) {
						this.taskList = res.data.list
					}
				})
			},
			changText() {
				let list = []
				this.noticeList.forEach((v) => {
					list.push(v.title)
				})
				return list
			},
			handleTaskClick(id) {
				if (this.hasLogin) {
					uni.$u.route('/pages/task/content?id=' + id)
				} else {
					uni.$u.route('/pages/login/social')
				}
			},
			handleShowToast(item) {
				if (item.url) {
					if (item.urlType) {
						if (item.isLogin) {
							if (this.hasLogin) {
								uni.$u.route(item.url)
							} else {
								uni.$u.route('/pages/login/social')
							}
						} else {
							if (item.title === '合伙人') {
								// #ifdef H5
								uni.$u.route(item.url)
								//#endif
								uni.showToast({
									title: '请在公众号内打开',
									icon: 'none'
								})
							} else {
								uni.$u.route(item.url)
							}
						}
					} else {
						uni.switchTab({
							url: item.url
						})
					}
				} else {
					if (this.hasLogin) {
						uni.showToast({
							title: '您还没有会员权限',
							icon: 'none'
						});
					} else {
						uni.$u.route('/pages/login/social')
					}
				}
			},
			handleScanCode() {
				// #ifdef H5
				uni.switchTab({
					url: '/pages/scanning/scanning'
				})
				//#endif
				// #ifndef H5
				this.$refs.tabbars.scanCode()
				//#endif
			}
		},
		computed: {
			swiperList() {
				return this.bannerList.map(item => {
					if (item) {
						return item
					}
				})
			},
			noticeTextList() {
				return this.noticeList.map(item => {
					if (item.title) {
						return item.title
					}
				})
			},
			hasLogin() {
				return this.$store.getters.hasLogin
			},
			userInfo() {
				return this.$store.getters.userInfo
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-bottom: 120rpx;
	}

	.search-wrap {
		background: $custom-bg-color;
		padding: 20rpx;
	}

	.indicator {
		@include flex(row);
		justify-content: center;

		&__dot {
			height: 15rpx;
			width: 15rpx;
			border-radius: 100rpx;
			background-color: rgba(255, 255, 255, 0.35);
			margin: 0 10rpx;
			transition: background-color 0.3s;

			&--active {
				background-color: $custom-bg-color;
			}
		}
	}

	.grid-title {
		line-height: 50rpx;
		font-size: 26rpx;
	}

	.prod-block {
		margin-top: -160px;

		.bloc-header {
			@include flex-space-between;
			padding: 10rpx 20rpx;

			.bloc-title {
				color: $custom-bg-color;
				font-size: 34rpx;
			}

			.see-more {
				color: $custom-bg-color;
				background: $u-primary;
				padding: 0 30rpx;
				height: 50rpx;
				line-height: 50rpx;
				border-radius: 50rpx;
				font-size: 24rpx;
			}
		}

		&.half,
		&.list {
			margin-top: 0;

			.bloc-header {
				margin-top: 50rpx;
				margin-bottom: 20rpx;

				.bloc-title {
					color: #333333;
				}

				.more {
					font-size: 24rpx;
				}
			}
		}

		.prod-grid {
			width: 730rpx;
			margin: 0 auto;
			@include flex;
			flex-wrap: wrap;
			justify-content: left;

			&.half {
				.prod-item {
					width: 340rpx;
					margin: 10rpx;

					.prod-image {
						width: 346rpx;
						height: 346rpx;
					}
				}
			}

			.prod-item {
				width: 220rpx;
				margin: 10rpx;
				background: #ffffff;
				border-radius: 10rpx;
				box-shadow: 0rpx 6rpx 8rpx rgba(58, 134, 185, 0.2);

				.prod-image {
					width: 224rpx;
					height: 224rpx;
					border-radius: 10rpx 10rpx 0 0;
				}

				.item-info {
					padding: 15rpx;

					.info-text {
						// height: 70rpx;
						padding-bottom: 10rpx;
					}

					.price-and-cart {
						@include flex-space-between;
					}
				}
			}
		}
	}

	.prod-list {
		.prod-item {
			background: #ffffff;
			@include flex-space-between;
			border-bottom: $custom-border-style;
			padding: 20rpx;

			.prod-image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
			}

			.item-info {
				flex: 1;
				padding: 20rpx 20rpx 0;

				.info-text {
					height: 100rpx;
					padding-bottom: 10rpx;
				}

				.price-and-cart {
					@include flex-space-between;
				}
			}
		}
	}

	.grid-image {
		width: 100rpx;
		height: 100rpx;
		padding-top: 20rpx;
	}

	.scan-button {
		width: 90%;
		margin: 0 auto;
		margin-top: 40rpx;
	}
</style>
