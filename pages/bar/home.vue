<template>
	<view style="padding-bottom: 100rpx;" class="app">
		<mescroll-body ref="mescrollRef" @down="downCallback" @init="mescrollInit" @up="loadDataList">
			<!-- <common-wx-header backColor="rgb(230, 249, 239)" name="首页" /> -->
			<view :style="'background-image: url('+ backImg +');'" class="app_back">
				<!-- 顶部栏 -->
				<view class="app_t">
					<view class="app_t_hey">Hey</view>
					<view class="app_t_welcome">欢迎来到梯梯电梯助手</view>
				</view>
				<!-- 头部轮播图 -->
				<banner :width="'710rpx'" :list="banner"></banner>
			</view>
			<view class="app_center">
				<!-- 金刚区 -->
				<view class="cate-section">
					<view class="item" v-for="item in navList" :key="item._id" @click="navTo(item.link)">
						<image class="icon" :src="cdn + item.image"></image>
						<text>{{ item.name }}</text>
					</view>
				</view>
				<!-- 公告 -->
				<!-- 	<view class="mid-ad" v-if="announces.length !== 0">
					<swiper class="notice_center" vertical :autoplay="true" :interval="4000" :duration="500" :circular="true"
						disable-touch>
						<swiper-item v-for="item in announces" :key="item.id" class="swiperIn"
							@click="navTo('/pages/announce/detail?id=' + item.id)">
							<view class="title">{{item.title}}</view>
						</swiper-item>
					</swiper>
					<text class="iconfont" @click="navTo('/pages/announce/list')">&#xe600;</text>
				</view> -->
				<mix-button style="width: 710rpx;" icon="icon-iconfontscan" :iconSize="40" ref="confirmBtn" text="扫码乘梯"
					marginTop="40rpx" @onConfirm="scan" />
				<!--		<view class="floor-header row center" @click="product">-->
				<!--			<text class="iconfont image">&#xe615;</text>-->
				<!--			<view class="column fill">-->
				<!--				<text class="tit">小梯为您推荐午餐</text>-->
				<!--				<text>Recommend Foods</text>-->
				<!--			</view>-->
				<!--			<text class="iconfont more">&#xe664;</text>-->
				<!--		</view>-->
				<!--		<view class="food">-->
				<!--			<mix-product-list />-->
				<!--		</view>-->
			</view>
			<view class="app_cash">
				<view class="app_cash_t">
					现金券<text style="color: #E90000;">专区</text>
				</view>
				<view v-if="cashList.length" class="app_cash_m">
					<view @click="navTo('/pages/cash/cashShopDetial?id=' + item.sellerId)"
						v-for="(item,index) in cashList" :key="index" class="app_cash_m_s w_flex_center">
						<img class="app_cash_m_s_l" :src="$cdn + item.sellerLogo" alt="">
						<view class="app_cash_m_s_m">
							<view class="app_cash_m_s_m_t">{{item.sellerName}}</view>
							<view class="app_cash_m_s_m_c">{{item.name}}
							</view>
							<view class="app_cash_m_s_m_e w_flex_center">￥{{item.price}}
								<view class="line"></view>{{item.costPoints}}积分
								<!-- <view class="line"></view>{{item.costBean}}现金豆 -->
							</view>
						</view>
						<view @click="navTo('/pages/cash/cashExchange?id=' + item.id,{login:true})"
							class="app_cash_m_s_r">
							兑换
						</view>
					</view>
				</view>
				<mix-empty v-else></mix-empty>
			</view>
			<!-- #ifdef H5 -->
			<view class="copyright" @click="jumpBeian">
				粤ICP备2022124445号-1
			</view>
			<!-- #endif -->

		</mescroll-body>
	</view>
</template>

<script>
	import MixProductList from "../product/components/product-list.vue";
	import CommonWxHeader from "../../components/common-wx-header/common-wx-header.vue";
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		components: {
			CommonWxHeader,
			MixProductList
		},
		data() {
			return {
				banner: [], //banner图
				navList: [], //金刚区
				announces: [],
				cdn: this.$cdn,
				backImg: this.$cdn + '/static/index-back.png',
				cashList: []
			}
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			jumpBeian(){
					window.location.href = "https://www.beian.gov.cn"
			},
			loadDataList() {
				this.loadData();
				this.mescroll.endByPage(1, 1);
			},
			product() {
				uni.switchTab({
					url: '/pages/bar/project'
				});
			},
			scan() {
				// #ifdef H5
				if (process.env.NODE_ENV !== 'production') {
					this.navTo('/pages/scan/scan?b=12&f=1&i=143575')
				} else {
					this.$util.msg("请在小程序或者APP中打开");
				}
				this.$refs.confirmBtn.stop();
				return;
				// #endif
				uni.scanCode({
					onlyFromCamera: true,
					scanType: ['qrCode'],
					success: (data) => {
						let res = data.result;
						let param = res.substring(res.indexOf("?"));
						if (res.indexOf('/pages/scan/scan') == -1 || res.indexOf('b') == -1 || res.indexOf(
								'c') == -1 || res.indexOf('f') == -1) {
							this.$util.msg('无效码')
						} else {
							this.navTo('/pages/scan/scan' + param)
						}
					},
					complete: () => {
						this.$refs.confirmBtn.stop();
					}
				});
			},
			async loadData() {
				await this.loadAnnounce();
				await this.loadNavList();
				await this.loadCashList();
			},
			//加载广告 缓存10分钟
			async loadAnnounce() {
				const res = await this.$get('/announce/list', {
					currentPage: 1,
					pageSize: 3
				});
				this.announces = res.data.records;
			},
			//加载导航 缓存10分钟
			async loadNavList() {
				const res = await this.$get('/ad/getAdvertList');
				this.banner = res.data;
				const icon = await this.$get('/ad/getNavList');
				this.navList = icon.data;
			},
			//加载现金券
			async loadCashList() {
				const cash = await this.$get('/coupon/listHome', {
					currentPage: 1,
					pageSize: 4
				});
				this.cashList = cash.data.records
			}
		}
	}
</script>

<style scoped lang="scss">
.copyright{
	color: #999;
	font-size: 24rpx;
	text-align: center;
}
	view,
	text {
		line-height: 1.8;
	}

	.app_center {
		background: #FFFFFF;
		padding-top: 46rpx;
		padding-bottom: 20rpx;
	}

	.app_back {
		// padding-bottom: 20rpx;
		background-color: #fff;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.app {
		background: #f6f6f6;
	}

	.app_cash {
		padding: 20rpx 20rpx 0 20rpx;

		.app_cash_t {
			font-size: 32rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #000000;
		}

		.app_cash_m {
			.app_cash_m_s {
				background: #FFFFFF;
				// border: 1px solid rgba(197, 197, 197, 0.5);
				border-radius: 20rpx;
				padding: 26rpx;
				margin-top: 31rpx;
				margin-bottom: 31rpx;

				.app_cash_m_s_l {
					width: 200rpx;
					height: 150rpx;
					margin-right: 31rpx;
				}

				.app_cash_m_s_m {
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.app_cash_m_s_m_t {
						width: 277rpx;
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: bold;
						color: #000000;
						line-height: 48rpx;
						text-overflow: ellipsis;
						overflow: hidden;
						-webkit-line-clamp: 1;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						margin-bottom: 14rpx;
					}

					.app_cash_m_s_m_c {
						width: 160rpx;
						height: 36rpx;
						border: 1px solid #FC5531;
						border-radius: 10rpx;
						font-size: 20rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FC5531;
						text-align: center;
						line-height: 30rpx;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
						padding: 0 20rpx;
					}

					.app_cash_m_s_m_e {
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FC5531;
						margin-top: 30rpx;

						.line {
							width: 1rpx;
							height: 21rpx;
							background: #000000;
							border: 1px solid #E2E2E2;
							margin: 0 20rpx;
						}
					}

				}

				.app_cash_m_s_r {
					width: 100rpx;
					height: 50rpx;
					background: #FC5531;
					border-radius: 25rpx;
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					text-align: center;
					line-height: 50rpx;
					margin-left: 45rpx;
				}
			}
		}
	}

	.app_t {
		// padding-top: 50rpx;
		margin-left: 20rpx;
		font-size: 48rpx;
		font-family: Arial;
		font-weight: bold;
		color: #000000;
		margin-bottom: 36rpx;
	}

	/* 分类 */
	.cate-section {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		// padding: 10rpx 16rpx;
		// background: #fff;
		// margin-top: 46rpx;

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 25%;
			// padding: 20rpx 0;
			font-size: 24rpx;
			color: #333;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #000000;
		}

		.icon {
			width: 100rpx;
			height: 100rpx;
			margin-bottom: 14rpx;
			border-radius: 50%;
		}
	}

	.mid-ad {
		background: #fff;
		display: flex;
		align-items: center;
		width: 100%;
		height: 80rpx;
		padding: 0 50rpx;

		.title {
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			flex: 1;
			font-size: 24rpx;
			color: #666;
			padding: 0 20rpx;
		}

		.notice_center {
			flex: 1;
			display: flex;
			align-items: center;
			height: 40rpx;

			.swiperIn {
				display: flex;
				align-items: center;
			}

			&:before {
				display: block;
				content: '';
				border-left: 10rpx solid $base-color;
				opacity: 0.3;
				height: 40rpx;
			}
		}

		.iconfont {
			border-radius: 10rpx;
			color: #999;
			width: 70rpx;
			text-align: center;
			font-size: 30rpx;
			background: $bg-color;
			padding: 10rpx;
		}
	}

	.floor-header {
		margin: 30rpx 0rpx 10rpx 0rpx;
		height: 110rpx;
		padding: 0rpx 50rpx;
		font-size: 24rpx;
		color: #999;
		background-color: #fff;

		.iconfont {
			&.image {
				color: $base-color;
				font-size: 60rpx;
			}

			&.more {
				color: #666;
				font-size: 40rpx;
			}
		}

		.column {
			padding: 0 20rpx;
		}

		.tit {
			letter-spacing: 2rpx;
			font-size: 32rpx;
			color: #333;
			font-weight: 700;
		}
	}

	.food {}
</style>