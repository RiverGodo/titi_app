<template>
	<view class="id">
		<view class="id_t w_flex_center">
			<text>中奖类型</text>
			<text>中奖时间</text>
			<text>中奖奖品</text>
		</view>
		<view class="id_m ">
			<mescroll-uni height="92%" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="loadDataList"
				:up="upOption">
				<view v-for="(item,index) in incomeList" :key="index" class="id_m_s w_flex_center">
					<text>{{item.productTypeStr}}</text>
					<text>{{item.drawTime}}</text>
					<text>{{item.productName}}</text>
				</view>
			</mescroll-uni>
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
				incomeList:[]
			}
		},
		methods: {
			async loadDataList(e) {
				const res = await this.$get('/lottery/mineLottery', {
					currentPage: e.num,
					pageSize: e.size
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
	.id {
		background: #fff;
		height: 100%;

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
				color: #000000;
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