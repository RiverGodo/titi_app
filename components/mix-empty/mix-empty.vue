<template>
	<view class="mix-empty" :style="{backgroundColor: backgroundColor}">
		<view class="default column center">
			<image class="icon" mode="widthFix" src="/static/images/empty/default.png"></image>
			<text class="text">{{ text }}</text>
		</view>
	</view>
</template>

<script>
	/**
	 * 缺省显示
	 * @prop text 缺省文字提示
	 * @prop type 缺省类型
	 * @prop backgroundColor 缺省页面背景色
	 */
	export default {
		props: {
			text: {
				type: String,
				default: '此处空空如也~'
			},
			type: {
				type: String,
				default: ''
			},
			backgroundColor: {
				type: String,
				default: 'rgba(0,0,0,0)'
			}
		},
		methods: {
		}
	}
</script>

<style scoped lang="scss">
	.mix-empty{
		flex-direction: column;
		align-items: center;
	}
	.default{
    padding: 100rpx 0rpx;
		.icon{
			width: 460rpx;
		}
		.text{
			margin-top: 10rpx;
			font-size: 28rpx;
			color: #999;
		}
	}
</style>
