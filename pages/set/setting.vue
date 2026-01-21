<template>
	<view class="_main">
		<view>
			<view class="_main_list" @click="navTo('/pages/set/info', {login: true})">
				<text>修改信息</text>
				<text class="iconfont more">&#xe601;</text>
			</view>
			<view class="_main_list" @click="navTo('/pages/set/about', {login: true})">
				<text>关于我们</text>
				<text class="iconfont more">&#xe601;</text>
			</view>
		</view>
		<mix-button ref="confirmBtn" text="退出登录" marginTop="80rpx" @onConfirm="logout"></mix-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			async logout() {
				await this.$post('/user/logout');
				this.$store.commit('logout');
				uni.switchTab({
					url: "/pages/bar/home"
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	view,text{line-height: 1.8;}
	._me_tc {
		text-align: center;
		padding: 30rpx 0;
		margin: 50rpx 40rpx 0 40rpx;
		font-size: 30rpx;
		color: #fff;
		background: $base-color;
	}

	._main_list {
		font-size: 28rpx;
		padding: 30rpx 30rpx;
		background-color: #fff;
		border-bottom: 1px solid #F3F3F3;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.iconfont {
			color: #999;
			padding-right: 20rpx;
			font-size: 40rpx;
		}
	}
</style>