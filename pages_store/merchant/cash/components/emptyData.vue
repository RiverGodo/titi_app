<template>
	<view class="cash_list_m_m">
		<image class="empty" mode="widthFix" src="/static/images//empty/default.png"></image>
		<text class="empty_text">暂无数据</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.cash_list_m_m {
		position: absolute;
		left: 0;
		right: 0;
		top: 170+54rpx;
		margin: auto;
		width: 400rpx;
		position: relative;
	
		.empty {
			width: 100%;
		}
	
		.empty_text {
			font-size: 30rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: $base-color-admin;
			position: absolute;
			left: 0;
			right: 0;
			top: 359rpx;
			margin: auto;
			text-align: center;
		}
	}
</style>
