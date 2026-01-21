<template>
	<view class="usage ">
		<view style="height: 100%;" class="usage_m round_head_m">
			<view class="usage_m_t">
				<view  v-for="(item,index) in tableHeaderList" :key="index" class="usage_m_t_h">{{item}}</view>
			</view>
		<!-- 	<mescroll-uni height="95%" v-show="tableList.length" ref="mescrollRef" @init="mescrollInit"
				@down="downCallback" @up="loadDataList" :up="upOption"> -->
				<view v-for="(item,index) in tableList" :key="index" class="usage_m_m">
					<view class="usage_m_h" align="center">{{item.id}}</view>
					<view class="usage_m_h" align="center">{{item.total ? item.total : '不限'}}</view>
					<view class="usage_m_h" align="center">{{item.hadSale}}</view>
					<view class="usage_m_h" align="center">{{item.hadCheck}}</view>
					<view class="usage_m_h" align="center">{{item.hadSale - item.hadCheck}}</view>
				</view>
			<!-- </mescroll-uni> -->
		</view>
	</view>
</template>

<script>
	import emptyData from './components/emptyData.vue'
	// import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		// mixins: [MescrollMixin],
		components: {
			emptyData
		},
		data() {
			return {
				upOption: {
					page: {
						size: 10
					},
					noMoreSize: 1,
					textNoMore: "我也是有底线的~",
					empty: {
						icon: '/static/images/empty/default.png'
					},
				},
				tableHeaderList: ['ID', '现金券总量', '已购买数', '已使用数', '待使用数'],
				tableList: []
			}
		},
		onLoad(option){
			this.init(option.id);
		},
		methods: {
			async init(id){
				const res = await this.$get('/seller/coupon/get', {
					id:id
				});
				this.tableList.push(res.data) 
			},
			async loadDataList(e) {
				// const res = await this.$get('/seller/coupon/list', {
				// 	currentPage: e.num,
				// 	pageSize: e.size
				// }, {
				// 	showLoading: true
				// }, () => {
				// 	this.mescroll.endErr()
				// });
				// let curPageData = res.data.records;
				// let curPageLen = curPageData.length;
				// let totalSize = res.data.total;
				// //设置列表数据
				// if (e.num === 1) this.tableList = [];
				// this.tableList = this.tableList.concat(curPageData);
				// this.mescroll.endBySize(curPageLen, totalSize);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.usage {
		height: 100%;
		background: #ffffff;
		.usage_m {

			.usage_m_t {
				background: #F6F6F6;
				display: flex;
				align-items: center;
				justify-content: space-around;
				.usage_m_t_h {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #000000;
					// line-height: 48rpx;
					padding: 30rpx 0 24rpx 0;
					width: 200rpx;
					text-align: center;
				}
			}

			.usage_m_h {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #969696;
				// line-height: 48rpx;
				padding: 0;
				border-bottom: 1px solid #ffffff;
				padding: 25rpx 0;
				width: 200rpx;
				text-align: center;
			}
			
			.usage_m_m{
				display: flex;
				align-items: center;
				justify-content: space-around;
			}
		}
	}
</style>