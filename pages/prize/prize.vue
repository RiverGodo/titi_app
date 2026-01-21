<template>
	<view class="prize">
		<view :style="'background-image: url('+ backImg +');'" class="p_t">
			<view @click="navTo('/pages/prize/prizeList',{login:true})" class="p_t_t">
				我的中奖纪录
			</view>
		</view>
		<view class="p_m">
			<mix-tabs @changeTab="changeTab" :tabList="['日日奖','月月奖','年年奖']"></mix-tabs>
			<view class="id">
				<view class="id_t w_flex_center">
					<text>中奖类型</text>
					<text>中奖时间</text>
					<text>中奖奖品</text>
				</view>
				<view class="id_m ">
					<mescroll-uni height="66%" ref="mescrollRef" @init="mescrollInit" @down="downCallback"
						@up="loadDataList" :up="upOption">
						<view v-for="(item,index) in incomeList" :key="index" class="id_m_s w_flex_center">
							<text>{{item.productTypeStr}}</text>
							<text>{{item.drawTime}}</text>
							<text>{{item.productName}}</text>
						</view>
					</mescroll-uni>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				upOption: {
					page: {
						size: 20
					},
					noMoreSize: 1,
					textNoMore: "我也是有底线的~",
					empty: {
						icon: '/static/images/empty/default.png'
					},
				},
				backImg: this.$cdn + '/static/prize-back.png',
				type: 0,
				incomeList: []
			}
		},
		methods: {
			changeTab(item) {
				this.type = item
				this.loadDataList({
					num: 1,
					size: 20
				})
			},
			async loadDataList(e) {
				// console.log(e);
				const res = await this.$get('/lottery/lotteryLogs', {
					currentPage: e.num,
					pageSize: e.size,
					type: this.type
				}, {
					showLoading: true
				}, () => {
					this.mescroll.endErr()
				});
				let curPageData = res.data.records;
				let curPageLen = curPageData.length;
				let totalSize = res.data.total;
				//设置列表数据
				if (e.num === 1) this.incomeList = [];
				this.incomeList = this.incomeList.concat(curPageData);
				this.mescroll.endBySize(curPageLen, totalSize);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.p_m {
		background: #FFFFFF;
		position: absolute;
		width: 100%;
		height: 80%;
		z-index: 2;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 30rpx;
		overflow: hidden;
	}

	.p_t {
		width: 100%;
		height: 350rpx;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center bottom;
		position: relative;
		margin-bottom: -50rpx;

		.p_t_t {
			width: 184rpx;
			height: 50rpx;
			background: #FFFFFF;
			border-radius: 25rpx;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #FC5531;
			text-align: center;
			line-height: 50rpx;
			position: absolute;
			left: 50rpx;
			top: 220rpx;
		}
	}

	.id {
		background: #fff;
		height: 100%;
		margin: 0 20rpx;
		margin-top: 18rpx;

		.id_t {
			height: 79rpx;
			background: #F6F6F6;
			border-radius: 0rpx;

			text {
				width: 33%;
				text-align: center;
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #969696;
			}
		}

		.id_m {
			margin-top: 33rpx;

			.id_m_s {
				margin-bottom: 45rpx;

				text {
					width: 33%;
					text-align: center;
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #969696;
				}
			}
		}
	}
</style>