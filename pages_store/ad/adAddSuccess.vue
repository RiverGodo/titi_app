<template>
	<view class="aas">
		<view class="ad_m">
			<view class="ad_m_t">广告信息</view>
			<view class="ad_m_t_m1">
				<view class="ad_m_t_m1_s">
					广告名称：<text>宝马汽车</text>
				</view>
				<view class="ad_m_t_m1_s">
					推广链接：<text>https://wwwbaidu.com</text>
				</view>
				<view class="ad_m_t_m1_s">
					投标时间：<text>9:00-10:00 12:00-13:00</text>
				</view>
				<view class="ad_m_t_m1_s">
					出价方式：<text>CPT</text>
				</view>
				<view class="ad_m_t_m1_s">
					出 价 额：<text>200张广告卡</text>
				</view>
			</view>
			<view class="ad_m_t">投放地</view>
			<view class="ad_m_t_m2">
				<view @click="navTo('/pages_store/ad/adSelectAdress',{login:true})" class="ad_m_t_m2_s">
					<view class="ad_m_t_m2_s_t">
						南山智园C-1栋
					</view>
					<view>
						<view  class="ad_m_t_m2_s_s w_flex_center">
							<text>9:00-11:00 每秒 </text>
							<view class="ad_m_t_m2_s_s_i">
								<input type="number" value="5" />
							</view>
							<text> 分钱  您在同时段排第<text style="color: #FC5531;">8</text>名</text>
							<text class="iconfont">&#xe601;</text>
						</view>
						<view class="ad_m_t_m2_s_s w_flex_center">
							<text>9:00-11:00 每秒 </text>
							<view class="ad_m_t_m2_s_s_i">
								<input type="number" value="5" />
							</view>
							<text> 分钱  您在同时段排第<text style="color: #FC5531;">8</text>名</text>
							<text class="iconfont">&#xe601;</text>
						</view>
					</view>
				</view>
				<view @click="navTo('/pages_store/ad/adSelectAdress',{login:true})" class="ad_m_t_m2_s">
					<view class="ad_m_t_m2_s_t">
						南山智园C-1栋
					</view>
					<view>
						<view class="ad_m_t_m2_s_s w_flex_center">
							<text>9:00-11:00 每秒 </text>
							<view class="ad_m_t_m2_s_s_i">
								<input type="number" value="5" />
							</view>
							<text> 分钱  您在同时段排第<text style="color: #FC5531;">8</text>名</text>
							<text class="iconfont">&#xe601;</text>
						</view>
						<view class="ad_m_t_m2_s_s w_flex_center">
							<text>9:00-11:00 每秒 </text>
							<view class="ad_m_t_m2_s_s_i">
								<input type="number" value="5" />
							</view>
							<text> 分钱  您在同时段排第<text style="color: #FC5531;">8</text>名</text>
							<text class="iconfont">&#xe601;</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="aas_b">
			立即投放
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
	.aas{
		padding-top: 30rpx;
		.aas_b{
			width: 710rpx;
			height: 70rpx;
			background: #01CE77;
			border-radius: 35rpx;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #FFFFFF;
			text-align: center;
			line-height: 70rpx;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 14rpx;
			margin: auto;
		}
	}
	.ad_m{
		background: #FFFFFF;
		border-radius: 20rpx;
		margin: 0 20rpx;
		padding: 33rpx;
		.ad_m_t{
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #000000;
			margin-bottom: 32rpx;
		}
		.ad_m_t_m1{
			margin-bottom: 49rpx;
			.ad_m_t_m1_s{
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #969696;
				line-height: 60rpx;
				text{
					color: #000000;
				}
			}
		}
		.ad_m_t_m2{
			.ad_m_t_m2_s{
				border: 1px solid #CECECE;
				border-radius: 10rpx;
				margin-bottom: 27rpx;
				padding: 30rpx;
				.ad_m_t_m2_s_t{
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #000000;
					line-height: 56rpx;
				}
				.ad_m_t_m2_s_s{
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					color: #000000;
					margin: 20rpx 0;
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
				.iconfont{
					font-size: 14rpx;
					margin-left: auto;
				}
			}
		}
	}
</style>
