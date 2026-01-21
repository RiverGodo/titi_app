<template>
	<view class="sort-bar row">
		<view v-for="(item,index) in tabList" :key="index" class="item row center"
			:class="selIndex == index? activeCls: ''" @click="sel(index)">
			<text>{{item}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "mix-tabs",
		props: {
			tabList: {
				type: Array,
				default: []
			},
			activeCls: {
				type: String,
				default: 'active'
			}
		},
		data() {
			return {
				selIndex: 0
			};
		},
		methods:{
			sel(index){
				this.selIndex = index
				this.$emit('changeTab',index)
			}
		}
	}
</script>

<style lang="scss" scoped>
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
			font-size: 26rpx;
			color: #333;
			position: relative;
			overflow: hidden;
			&.active {
				color: $base-color-admin;
				// font-weight: 700;
				font-weight: bold;

				&:after {
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50rpx);
					content: '';
					width: 100rpx;
					height: 4rpx;
					background-color: $base-color-admin;
					border-radius: 10px;
				}

				.iconfont.active {
					color: $base-color-admin;
				}
			}
			&.baseActive {
				color: $base-color;
				// font-weight: 700;
				font-weight: bold;

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