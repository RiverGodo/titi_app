<template>
	<view class="ad">
		<view v-if="data.status == 0" class="ad_t">正在进行审核，请耐心稍等一会</view>
		<view v-if="data.status == 1" class="ad_t">正在投放广告，可以提前取消哦</view>
		<view v-if="data.status == 2" class="ad_t">结束时间：{{new Date(data.overTime).getTime() | friendDate}}</view>
		<view v-if="data.status == 3" class="ad_t">{{data.backReason || "用户撤销"}}</view>
		<view class="ad_m">
			<view class="ad_m_t">参数详情</view>
			<view class="ad_m_t_m1">
				<view class="ad_m_t_m1_s">
					广告名称：<text>{{data.name}}</text>
				</view>
				<view class="ad_m_t_m1_s">
					推广链接：<text>{{data.link}}</text>
				</view>
				<view class="ad_m_t_m1_s">
					推广描述：<text>{{data.brief}}</text>
				</view>
				<view class="ad_m_t_m1_s">
					投标时间：<text>{{fromDate}}</text>
				</view>
				<view class="ad_m_t_m1_s">
					出价方式：<text>CPT</text>
				</view>
				<view class="ad_m_t_m1_s">
					出 价 额：<text>{{data.adCardNum}}张广告卡</text>
				</view>
				<view class="ad_m_t_m1_s">
					广 告 图：<image :src="cdn + data.adImg" mode="widthFix"/>
				</view>
			</view>
			<view class="ad_m_t">投放地</view>
			<view class="ad_m_t_m2">
				<view class="ad_m_t_m2_s" v-for="(items, key) in data.adRatingMap">
					<view class="ad_m_t_m2_s_t">
						{{key}}
					</view>
					<view>
						<view class="ad_m_t_m2_s_s w_flex_center" v-for="item in items">
							<text>{{item.timeDesc}} 每秒 </text>
							<view class="ad_m_t_m2_s_s_i" v-if="data.status === 1">
								<input type="number" @blur="(e) => changePrice(e, item.id)" :value="item.price * 100" />
							</view>
							<view v-if="data.status !== 1" style="height: 40rpx; line-height: 40rpx; padding: 0 10rpx; color: #FC5C39">{{item.price * 100}}</view>
							<text> 分钱</text>
							<text style="padding-left: 20rpx;" v-if="data.status === 1"> 您在同时段排第<text style="color: #FC5531;">{{item.rank}}</text>名</text>
							<text  v-if="data.status === 1" class="iconfont" @click="navTo('/pages_store/ad/adRank?buildingId=' + item.buildingId + '&timeId=' + item.timeId)">&#xe601;</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 140rpx;"></view>
		<view class="ad_b w_flex_center">
			<view class="ad_b_b b_l" v-if="data.status === 1" @click.stop="over(data.id)">
				终止订单
			</view>
			<view style="margin-left: 7rpx;" class="ad_b_b b_r" @click.stop="navTo('/pages_store/ad/adAdd?id=' + data.id)">
				再来一单
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cdn: this.$cdn,
				data: {},
				id: 0,
				fromDate:''
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.getData();
		},
		methods: {
			async changePrice(e, id){
				let res = await this.$post('/ad-operation/changePrice', {id, price: e.detail.value / 100})
				this.$util.msg('修改价格成功');
				this.getData();
			},
			async getData(id){
				let res = await this.$get('/ad-operation/detail', {id: this.id});
				this.data = res.data;
				uni.setNavigationBarTitle({title: this.data.statusStr});
				this.fomateTime()
			},
			async over(id){
				uni.showModal({
					title: '温馨提示',
					content: '您的广告正在投放中，确定现在终止订单吗？',
					confirmColor: "#01CF79",
					showCancel: true,
					success: async (res) => {
						if (res.confirm) {
							let res = await this.$post('/ad-operation/over', {id});
							this.$util.msg("操作成功！")
							this.getData();
							this.mescroll && this.mescroll.resetUpScroll();
						}
					}
				});
			},
			fomateTime(){
				let times = ''
				if (Object.keys(this.data.adRatingMap).length) {
					let doms = this.data.adRatingMap[Object.keys(this.data.adRatingMap)[0]]
					doms.forEach(element => {
						times += element.timeDesc + ' '
					});
				}
				this.fromDate = times
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ad{
		background: #01CE77;
		height: 200rpx;
		.ad_b{
			position: fixed;
			bottom: 0;
			width: 100%;
			display: flex;
			justify-content: flex-end;
			background: #FFFFFF;
			box-shadow: 0rpx 5rpx 8rpx 0rpx #000000;
			padding: 8rpx 0;
			.ad_b_b{
				width: 223rpx;
				height: 82rpx;
				border: 2px solid #EEEEEE;
				border-radius: 40rpx;
				text-align: center;
				line-height: 74rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #969696;
				margin-left: auto;
			}
			.b_l{
				margin-left: auto;
			}
			.b_r{
				margin-right: 20rpx;
				background: #FC5531;
				color: #FFFFFF;
				border: 2px solid #FC5531;
			}
		}
		.ad_t{
			text-align: center;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
			margin-bottom: 30rpx;
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
					image{
						width: 100%;
					}
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
	}
</style>
