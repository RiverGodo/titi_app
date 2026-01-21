<template>
	<view class="_main">
		<view class="success_container" v-if="pageData">
			<view class="logo_contain2">
				<image class="logo2" :src="cdn + pageData.logo" />
				<input class="name" v-model="pageData.name" type="text" />
				<view class="columnLD">
					<view class="item">
						<text>广告卡</text>
						<text>{{pageData.adCardNum}}张</text>
					</view>
				</view>
				<view class="refund">地址/联系方式： {{pageData.address}} / {{pageData.phone}}</view>
			</view>
			<view class="btns">
				<view class="item" @click="navTo('/pages/merchant/ad', {login: true})">
					<text class="iconfont" style="font-size: 60rpx; position: relative; top: 10rpx;">&#xe60d;</text>
					<text>广告卡管理</text>
				</view>
				<view class="item" @click="navTo('/pages/merchant/cash/cashList', {login: true})">
					<text style="font-size: 60rpx" class="iconfont">&#xe8c9;</text>
					<text>现金券管理</text>
				</view>
			<!-- 	<view class="item" @click="wait">
					<text class="iconfont" style="font-size: 70rpx;">&#xe677;</text>
					<text>订单管理</text>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageData: null,
				cdn: this.$cdn
			}
		},
		onShow() {
			this.getData();
		},
		methods: {
			async getData() {
				const res = await this.$get('/seller/detail');
				this.pageData = res.data;
			},
		}
	}
</script>

<style lang="scss" scoped>
	view,text{line-height: 1.8;}
	page {
		background: $bg-color;
	}

	.top {
		background: $base-color;
		display: flex;
		flex-direction: row;
		height: 70rpx;
		align-items: center;
		padding-left: 10rpx;
		padding-right: 10rpx;

		text:nth-child(1) {
			font-size: 40rpx;
			color: #FFFFFF;
		}

		text:nth-child(2) {
			flex: 1;
			text-align: center;
			font-size: 30rpx;
			color: #FFFFFF;
		}

		text:nth-child(3) {
			text-align: center;
			background-color: $base-color;
			color: #FFFFFF;
			font-size: 26rpx;
			padding-top: 15rpx;
			padding-bottom: 15rpx;
			padding-left: 20rpx;
			padding-right: 5rpx;
			border-radius: 10rpx;
		}
	}

	.edit_container {
		background: #fff;
		padding-bottom: 60rpx;
	}

	.btns {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		.item {
			border-radius: 20rpx;
			display: flex;
			flex-direction: column;
			flex: 1;
			align-items: center;
			justify-content: center;
			padding: 30rpx 30rpx;
			background: #fff;
			margin: 20rpx;
		}

		text:nth-child(1) {
			display: block;
			height: 100rpx;
			font-size: 60rpx;
			color: $base-color;
		}

		text:nth-child(2) {
			font-size: 28rpx;
			color: #333;
		}
	}
	.btns2 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	
		.item {
			border-radius: 20rpx;
			display: flex;
			flex-direction: column;
			width:28.3%;
			align-items: center;
			justify-content: center;
			padding: 30rpx 30rpx;
			background: #fff;
			margin: 10rpx 20rpx;
		}
	
		text:nth-child(1) {
			display: block;
			height: 100rpx;
			font-size: 60rpx;
			color: $base-color;
		}
	
		text:nth-child(2) {
			font-size: 28rpx;
			color: #333;
		}
	}
	
	.columnLD {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;

		.item {
			padding: 40rpx 10rpx 10rpx 10rpx;
			width: 50%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: relative;

			.detail {
				position: absolute;
				top: 35rpx;
				left: 260rpx;
				font-size: 24rpx;
				text-decoration: underline;
			}
		}

		text:nth-child(1) {
			font-size: 24rpx;
			margin-bottom: 10rpx;
			color: #333;
		}

		text:nth-child(2) {
			font-size: 30rpx;
			margin-top: 0rpx;
			color: $base-color;

		}
	}

	.refund {
		width: 100%;
		text-align: left;
		color: #999;
		font-size: 26rpx;
		margin-top: 20rpx;
		border-top: 1px solid $line-color;
		padding-top: 20rpx;
		line-height: 50rpx;
	}

	.success_container {
		display: flex;
		flex-direction: column;
	}

	.logo_contain2 {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #fff;
		padding: 20rpx 30rpx;
	}

	.logo2 {
		width: 200rpx;
		height: 200rpx;
		border-radius: 200rpx;
		margin: 20rpx 0rpx;
		background: #fff;
	}

	.name {
		font-size: 30rpx;
		color: #000;
		text-align: center;
	}

	.failText {
		font-size: 36rpx;
		color: red;
		margin-top: 20rpx;
		line-height: 40rpx;
	}

	._main {
		height: 100%;
		overflow: scroll;
		display: flex;
		flex-direction: column;
		padding-bottom: 50rpx;
	}

	.logo_contain {
		margin: 40rpx 0rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.logo {
		width: 160rpx;
		height: 160rpx;
		border-radius: 4em;
		background: #FFFFFFFF;
	}

	.user_list {
		height: 100rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 10rpx 30rpx;
		border-bottom: 1rpx solid #eee;

		text {
			:first-child {
				width: 200rpx;
				display: block;
			}

			font-family: PingFangSC-Regular;
			font-size: 28rpx;
			white-space: nowrap;
		}


	}

	.user_list2 {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-bottom: 30rpx;
		margin-top: 30rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		border-bottom: 1rpx solid #eee;
		justify-content: space-between;

		text:nth-child(1) {
			font-family: PingFangSC-Regular;
			font-size: 30rpx;
			white-space: nowrap;
			color: #333333;
		}

		text:nth-child(2) {
			font-family: PingFangSC-Regular;
			font-size: 30rpx;
			white-space: nowrap;
			color: #666666;
		}


	}

	.input {
		flex: 1;
		margin-left: 5rpx;
		font-size: 26rpx;
	}

	.main_center {
		padding: 0 50rpx;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	._main_main {
		margin-top: 100rpx;

		padding-top: 5rpx;
	}

	.reCheck {
		background: $base-color;
		color: #fff;
		width: 200rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		border-radius: 40rpx;
		font-size: 25rpx;
		margin-top: 40rpx;
	}

	.remind {
		display: flex;
		flex-direction: column;
	}

	.notice {
		color: #333333;
		font-size: 30rpx;
	}
</style>
