<template>
	<view class="floor-select">
		<view class="go-floor">
			去楼层：
			<view class="go-floor-block">
				{{floor}}
			</view>
		</view> 
		<view class="select-floor">
			<view @click="handleChangeFloor(item)" class="select-floor-single" v-for="(item,index) in 25" :key="index">
				<view v-if="item === floor" style="background: #409eff;">{{item}}</view>
				<view v-else style="background: #333333;">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"floor-selection",
		data() {
			return {
				floor:20
			};
		},
		methods:{
			handleChangeFloor(number){
				this.floor = number
			}
		}
	}
</script>

<style>
	.floor-select{
		width: 90%;
		height: 50%;
		background: #ffffff;
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		border-radius: 20rpx;
	}
	.go-floor{
		display: flex;
		align-items: center;
		width: 350rpx;
		margin: 30rpx auto;
		font-size: 50rpx;
	}
	.go-floor-block{
		border: 1px solid #333333;
		border-radius: 10%;
		padding: 0 40rpx;
		font-size: 40rpx;
	}
	.select-floor{
		display: grid;
		grid-template-columns: repeat(auto-fill, 100rpx);
		grid-gap: 10rpx;
		justify-content: center;
		height: auto;
		max-height: 540rpx;
		overflow: auto;
	}
	.select-floor::after{
		content: '';
		flex: auto;
	}
	.select-floor-single{
		color: #ffffff;
		padding: 10rpx;
		width: 76rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
	}
</style>

