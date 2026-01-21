<template>
	<view class="app">
		<view class="top">
			<input type="text" placeholder="出售数量" />
			<mix-button ref="confirmBtn" text="出售广告卡" marginTop="20rpx" @onConfirm="wait()" />
		</view>
		<view class="sort-bar row">
			<view class="item row center" :class="selIndex == 0? 'active': ''" @click="sel(0)">
				<text>购买记录</text>
			</view>
			<view class="item row center" :class="selIndex == 1? 'active': ''" @click="sel(1)">
				<text>出售记录</text>
			</view>
		</view>
		<!-- 产品列表 -->
		<mescroll-uni height="80%" ref="mescrollRef" @init="mescrollInit" :bottombar="false" @down="downCallback" @up="loadDataList"
			:up="upOption">
			<view class="worker" v-for="item in dataList" :key="item.id">
				<view class="item">
					<text class="title">订单状态</text>
					<text class="content">{{item.statusStr}}</text>
				</view>
				<view class="item">
					<text class="title">购买数量</text>
					<text class="content">{{item.number}}张</text>
				</view>
				<view class="item">
					<text class="title">售价</text>
					<text class="content">¥{{item.price}}</text>
				</view>
				<view class="item">
					<text class="title">总花费</text>
					<text class="content important">¥{{item.totalMoney}}</text>
				</view>
				<view class="item">
					<text class="title">出售者</text>
					<text class="content">友惠见官方</text>
				</view>
				<view class="item">
					<text class="title">创建时间</text>
					<text class="content">{{item.createTime}}</text>
				</view>
				<view class="check" v-if="item.status == 0">
					<text class="reject" @click="navTo('/pages/ad/pay?j=1&id=' + item.id)">去支付</text>
				</view>
			</view>
		</mescroll-uni>
		<mix-loading v-if="isLoading"></mix-loading>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MixButton from "../../components/mix-button/mix-button.vue";
	export default {
		components: {
			MixButton
		},
		mixins: [MescrollMixin],
		data() {
			return {
				selIndex: 0,
				dataList: [], //商品列表
				upOption: {
					page: {
						size: 20
					},
					noMoreSize: 1,
					textNoMore: "我也是有底线的~",
					empty: {
						icon: '/static/images/empty/default.png'
					},
				},
			}
		},
		// watch: {
		// 	'$route'(to, from) {
		// 		if (from.path === "/pages/ad/pay" && to.path === "/pages/merchant/ad") {
		// 			this.mescroll.resetUpScroll();
		// 		}
		// 	}
		// },
		onShow() {
			// this.mescroll.resetUpScroll();
		},
		methods: {
			sel(index) {
				if (index == 1) {
					this.wait();
					return;
				}
				this.selIndex = index;
				this.mescroll.resetUpScroll();
			},
			async loadDataList(e) {
				const res = await this.$get('/ad-buy-order/list', {
					currentPage: e.num,
					pageSize: e.size
				}, {
					showLoading: true
				}, () => {
					this.mescroll.endErr()
				});
				let curPageData = res.data.records;
				let curPageLen = curPageData.length;
				let totalSize = res.data.total;
				//设置列表数据
				if (e.num === 1) this.dataList = [];
				this.dataList = this.dataList.concat(curPageData);
				this.mescroll.endBySize(curPageLen, totalSize);
			},
		}
	}
</script>

<style scoped lang="scss">
	view,text{line-height: 1.8;}
	.app{
		height: 100%;
		width: 100%;
		overflow: hidden;
	}
	.worker {
		padding: 20rpx;
		background-color: #fff;
		border-radius: 10rpx;
		margin-top: 10rpx;

		.item {
			display: flex;
			justify-content: space-between;
			font-size: 28rpx;

			.title {
				color: #999;
			}

			.content {
				color: #333;
				line-height: 1.8;

				&.important {
					font-weight: bold;
					color: $base-color;
				}
			}
		}

		.check {
			padding-top: 20rpx;
			font-size: 24rpx;
			border-top: 2rpx solid $bg-color;
			display: flex;
			justify-content: flex-end;

			text {
				padding: 0 10rpx;
			}

			.reject {
				color: #fff;
				background-color: dodgerblue;
				padding: 10rpx 20rpx;
				border-radius: 10rpx;
			}
		}
	}

	page {
		background: #f3f3f3;
	}

	.search-box {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10rpx 30rpx;

		.keyword {
			text-align: center;
			background: #fff;
			border-radius: 40rpx;
			height: 70rpx;
			flex: 1;
			padding: 0rpx 20rpx;
			line-height: 80rpx;
			font-size: 28rpx
		}

		.iconfont {
			color: #666;
			font-size: 50rpx;
			padding-left: 20rpx;
		}
	}

	.top {
		padding-top: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		background-color: #fff;

		input {
			text-align: center;
			padding: 0 10rpx;
			font-size: 28rpx;
			color: #111;
			border-radius: 50rpx;
			background-color: $bg-color;
			width: 200rpx;
			height: 80rpx;
		}
	}

	.sort-bar {
		justify-content: space-around;
		height: 76rpx;
		padding: 4rpx 0 4rpx 4rpx;
		/* #ifdef MP */
		padding-left: 10rpx;
		/* #endif */
		background-color: #fff;
		position: relative;
		z-index: 1;

		.item {
			flex: 1;
			height: 100%;
			font-size: 28rpx;
			color: #333;
			position: relative;
			overflow: hidden;

			&.active {
				color: $base-color;
				font-weight: 700;

				&:after {
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50rpx);
					content: '';
					width: 100rpx;
					height: 4rpx;
					background-color: $base-color;
					border-radius: 10px;
				}

				.iconfont.active {
					color: $base-color;
				}
			}

			/* #ifdef MP */
			&.last:before {
				content: '';
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 2rpx;
				height: 40rpx;
				box-shadow: 0 0 16rpx rgba(0, 0, 0, .6);
			}

			/* #endif */
		}

		.icon-wrap {
			display: flex;
			flex-direction: column;
			padding-left: 8rpx;
		}

		.iconfont {
			line-height: 1;
			font-size: 14rpx;
			color: #bbb;
		}

		.btn {
			height: 68rpx;
			padding-left: 16rpx;
			padding-right: 20rpx;

			.icon-hengxiangliebiao,
			.icon-shuxiangliebiao {
				font-size: 40rpx;
				color: #333;
			}
		}
	}
</style>