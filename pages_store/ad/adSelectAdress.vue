<template>
	<view class="asa">
		<view class="asa_m">
			<view v-for="(item,index) in 3" :key="index" class="asa_m_s">
				<view class="asa_m_s_t w_flex_center">
					南山智园A-1栋
					<view class="asa_m_s_t_b w_flex_center">
						<text class="iconfont">&#xe672;</text>
						1.7km
					</view>
				</view>
				<view class="asa_m_s_m w_flex_center">
					<view>
						<view class="asa_m_s_m_l">
							<view class="ad_m_t_m2_s_s w_flex_center">
								<text>9:00-11:00 每秒 </text>
								<view class="ad_m_t_m2_s_s_i">
									<input type="number" value="5" />
								</view>
								<text> 分钱 </text>
							</view>
						</view>
						<view class="asa_m_s_m_l">
							<view class="ad_m_t_m2_s_s w_flex_center">
								<text>9:00-11:00 每秒 </text>
								<view class="ad_m_t_m2_s_s_i">
									<input type="number" value="5" />
								</view>
								<text> 分钱 </text>
							</view>
						</view>
					</view>
					<view class="asa_m_s_m_r">
						删除
					</view>
				</view>
			</view>
		</view>
		<view class="asa_b">
			确定选择
		</view>
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
	.asa{
		// padding-bottom: 100rpx;
		overflow: hidden;
		.asa_b{
			width: 710rpx;
			height: 70rpx;
			background: #01CE77;
			border-radius: 35rpx;
			text-align: center;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #FFFFFF;
			line-height: 70rpx;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 14rpx;
			margin: auto;
		}
		.asa_m_s_m{
			.asa_m_s_m_r{
				width: 141rpx;
				height: 61rpx;
				border: 1px solid #FC5937;
				border-radius: 30rpx;
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FC5937;
				line-height: 61rpx;
				text-align: center;
				margin-left: auto;
			}
		}
	}
	.asa_m_s{
		background: #FFFFFF;
		border-radius: 10rpx;
		margin: 30rpx 20rpx;
		padding: 40rpx;
		padding-bottom: 27rpx;
		padding-right: 53rpx;
		.asa_m_s_t{
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #000000;
			padding-bottom: 22rpx;
			// line-height: 56rpx;
			.asa_m_s_t_b{
				// width: 119rpx;
				height: 36rpx;
				background: #F6F6F6;
				border-radius: 15rpx;
				margin-left: 10rpx;
				font-size: 24rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #969696;
				line-height: 56rpx;
				padding: 0 11rpx;
				.iconfont{
					font-size: 17rpx;
					color: #00A661;
					margin-right: 6rpx;
					// width: 17rpx;
					height: 20rpx;
				}
			}
		}
	}
	.ad_m_t_m2_s_s{
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		color: #000000;
		// margin: 20rpx 0;
		margin-bottom: 20rpx;
	}
	.ad_m_t_m2_s_s_i{
		width: 56rpx;
		height: 41rpx;
		border: 1px solid #CECECE;
		border-radius: 10rpx;
		margin: 0 10rpx;
		input{
			font-size: 26rpx;
			font-family: Arial;
			font-weight: bold;
			color: #FC5937;
			line-height: 48rpx;
			text-align: center;
		}
	}
</style>
