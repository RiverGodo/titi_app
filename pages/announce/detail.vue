<template>
	<view class="_no_list" v-if="data">
		<view class="_no_ll">
			<view class="_no_ll_r">
				<view class="">
					<text>{{data.title}}</text>
				</view>
				<view class="row time">
					<text class="iconfont">&#xe8c4;</text>
					<text>{{new Date(data.updateTime) | friendDate}}</text>
				</view>
			</view>
		</view>
		<view class="_no_detail">
<!-- 			<view class="_no_d_text" v-html="data.content">
			</view> -->
			<jyf-parser class="_no_d_text" :html="data.content" lazy-load show-with-animation></jyf-parser>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: null
			}
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id;
			}
		},
		mounted() {
			this.getData();
		},
		methods: {
			async getData() {
				const res = await this.$get('/announce/get', {
					id: this.id
				});
				this.data = res.data
			},
		}
	}
</script>

<style lang="scss" scoped>
	view,text{line-height: 1.8;}
	page {
		background-color: #fff;
		height: 100%;
		font-size: 26rpx;
		color: #333;
	}

	._no_ll {
		font-weight: bold;
		background-color: #fff;
		padding: 35rpx 30rpx;
		display: flex;
	}

	._no_ll_r {
		font-size: 32rpx;
		color: #333;

		.row {
			font-size: 24rpx;
			padding-top: 20rpx;

			.iconfont {
				padding-right: 10rpx;
			}

			color: #999;
		}
	}

	._no_detail {
		padding: 0rpx 30rpx 20rpx 30rpx;
	}

	._no_d_text {
		line-height: 1.5;
		margin-top: 20rpx;
	}
</style>