<template>
	<view class="cb">
		<view class="cb_t">
			<text class="yuan">¥</text>
			<text class="cb_t_m">{{price}}</text>
		</view>
		<img :src="img1" alt="">
	</view>
</template>

<script>
	export default {
		name:"cash-back",
		data() {
			return {
				img1: this.$cdn + '/static/cash1.png',
			};
		},
		props: {
			price: {
				type: Number,
				default(){
					return 10
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.cb{
		position: relative;
		font-weight: bold;
		color: #915422;
		img{
			width: 100%;
			height: 100%;
		}
		.cb_t{
			position: absolute;
			height: 30rpx;
			left: 0;
			right: 0;
			top: 26rpx;
			margin: auto;
			text-align: center;
		}
		.cb_t_m{
			font-size: 36rpx;
			font-family: Source Han Sans CN;
		}
		.yuan{
			font-family: Arial-BoldMT;
			font-size: 18rpx;
		}
	}
</style>