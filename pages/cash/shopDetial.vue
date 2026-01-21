<template>
	<view class="round_head">
		<view class="round_head_m">
			<view class="sd_1">
				<view class="sd_t">
					营业时间：
				</view>
				<view class="sd_1_t">
					{{shopData.rangeTime}}
				</view>
			</view>
			<view class="sd_1 w_flex_center">
				<view class="sd_l">
					<view class="sd_t">
						店铺地址： 
					</view>
					<view class="sd_1_t">
						{{shopData.address}}
					</view>
				</view>
				<view class="sd_r">
					<text class="sd_r_icon iconfont">&#xe96c;</text>
					<view class="sd_r_t">电话</view>
				</view>
			</view>
			<view class="sd_2">
				<view class="sd_2_single">
					<view class="sd_2_top">
						门店照片:
					</view>
					<img class="sd_2_img" :src="$cdn + shopData.headImg" alt="">
				</view>
				<view class="sd_2_single">
					<view class="sd_2_top">
						店内环境图:  
					</view>
					<img class="sd_2_img" :src="$cdn + shopData.headImg" alt="">
				</view>
				<view class="sd_2_single">
					<view class="sd_2_top">
						营业执照:  
					</view>
					<img class="sd_2_img" :src="$cdn + shopData.headImg" alt="">
				</view>
				<view class="sd_2_single">
					<view class="sd_2_top">
						许可证: 
					</view>
					<img class="sd_2_img" :src="$cdn + shopData.headImg" alt="">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backimg: this.$cdn + '/static/shop-explain1.png',
				shopData:{}
			}
		},
		onLoad(option) {
			this.init(option.id)
		},
		methods: {
			async init(id){
				let res = await this.$get('/seller/find', {id: id});
				this.shopData = res.data
				uni.setNavigationBarTitle({
					title:res.data.name
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.round_head{
		background: #01CF79;
		overflow: auto;
	}
	.round_head_m{
		padding: 30rpx 20rpx;
		overflow: auto;
		height: 100%;
	}
	.sd_1{
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		color: #000000;
		line-height: 48rpx;
		border-bottom: 1px solid #E6E6E6;
		padding-bottom: 36rpx;
		margin-bottom: 38rpx;
		justify-content: space-between;
		.sd_t{
			margin-bottom: 30rpx;
			font-weight: bold;
		}
		.sd_1_t{
			width: 494rpx;
			line-height: 48rpx;
		}
		.sd_r{
			text-align: center;
			margin-right: 53rpx;
			.sd_r_icon {
				font-size: 50rpx;
				color: #969696;
			}
			.sd_r_t{
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #969696;
				line-height: 48rpx;
			}
		}
	}
	.sd_2{
		.sd_2_top{
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #000000;
			line-height: 48rpx;
			margin-bottom: 25rpx;
		}
		.sd_2_img{
			width: 310rpx;
			height: 200rpx;
		}
		.sd_2_single{
			margin-bottom: 56rpx;
		}
	}
</style>
