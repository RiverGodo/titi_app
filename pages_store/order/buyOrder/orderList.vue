<template>
	<view class="ol">
		<mix-tabs ref="mixtab" @changeTab="changeTab" :tabList="['全部','待付款','已完成','已取消']"></mix-tabs>
		<view class="ol_m">
			<mescroll-uni height="90%" :bottombar="false" ref="mescrollRef" @init="mescrollInit" @down="downCallback"
				@up="loadDataList" :up="upOption">
				<view v-for="(item, index) in cashList"
					@click="navTo('/pages_store/order/buyOrder/orderDetial?id=' + item.id, {login: true})"
					:key="item.id" class="ol_m_s">
					<view class="ol_m_l">
						<view class="ol_m_s_t w_flex_center">买入广告卡
							<text>{{item.statusStr}}</text>
						</view>
						<view class="ol_m_s_m">
							<view class="ol_m_s_m_s">
								<text>买入时间：</text>{{new Date(item.createTime) | friendDate}}
							</view>
							<view class="ol_m_s_m_s">
								<text>买入数量：</text>{{item.number}} 张
							</view>
							<view class="ol_m_s_m_s">
								<text>花费金额：</text>￥{{item.totalMoney}}
							</view>
							<view v-if="item.orderNo" class="ol_m_s_m_s">
								<text>订单编号：</text>{{item.orderNo}}
							</view>
						</view>
					</view>
					<view class="operation_box">
						<view @click.stop="navTo('/pages_store/ad/adExchange?id=' + item.id)" v-if="item.status == 0"
							class="ol_m_r">
							去支付
						</view>
					</view>
				</view>
			</mescroll-uni>
			<uni-popup ref="popup" type="center">
				<view class="popup_c">
					<view class="popup_c_t">温馨提示</view>
					<view class="popup_c_m">您仍可以继续支付这笔订单，确定要撤销吗？</view>
					<view class="popup_c_b w_flex_center">
						<view @click="$refs.popup.close()" class="popup_c_b_s b_s_l">取消</view>
						<view @click="confirm()" class="popup_c_b_s b_s_r">确认</view>
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				cashList: [],
				cdn: this.$cdn,
				selIndex: 0,
				upOption: {
					page: {
						size: 10
					},
					noMoreSize: 1,
					textNoMore: "我也是有底线的~",
					empty: {
						icon: '/static/images/empty/default.png'
					},
				}
			}
		},
		onLoad(options) {
			let s = options.s;
			if (s) {
				this.selIndex = s * 1 + 1;
			}
		},
		onShow() {
			this.mescroll && this.mescroll.resetUpScroll();
		},
		mounted() {
			this.$refs.mixtab.selIndex = this.selIndex
		},
		methods: {
			changeTab(index) {
				this.selIndex = index;
				this.mescroll.resetUpScroll();
			},
			async loadDataList(e) {
				let param = {
					currentPage: e.num,
					pageSize: e.size,
					role: 1
				};
				if (this.selIndex !== 0) {
					param.status = this.selIndex - 1;
				}
				const res = await this.$get('/ad-buy-order/list', param, {
					showLoading: true
				}, () => {
					this.mescroll.endErr()
				});
				let curPageData = res.data.records;
				let curPageLen = curPageData.length;
				let totalSize = res.data.total;
				// //设置列表数据
				if (e.num === 1) this.cashList = [];
				this.cashList = this.cashList.concat(curPageData);
				this.mescroll.endBySize(curPageLen, totalSize);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup_c {
		width: 584rpx;
		height: 346rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		position: relative;

		.popup_c_t {
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #23283B;
			text-align: center;
			padding-top: 40rpx;
			margin-bottom: 32rpx;
		}

		.popup_c_m {
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #969696;
			line-height: 48rpx;
			margin: 0 52rpx;
		}

		.popup_c_b {
			justify-content: space-around;
			border-top: 1px solid #EEEEEE;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			position: absolute;
			width: 100%;
			left: 0;
			right: 0;
			bottom: 0;

			.popup_c_b_s {
				width: 50%;
				text-align: center;
				padding-top: 24rpx;
				padding-bottom: 22rpx;
			}

			.b_s_l {
				color: #969696;
				border-right: 1px solid #EEEEEE;
			}

			.b_s_r {
				color: #FC5531;
				border-left: 1px solid #EEEEEE;
			}
		}
	}

	.ol_m {
		

		.ol_m_s {
			background: #FFFFFF;
			border-radius: 20rpx;
			margin: 0 20rpx;
			margin-top: 22rpx;
			margin-bottom: 25rpx;
			padding: 25rpx;
			justify-content: space-between;
			position: relative;
			

			.ol_m_s_t {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FC5531;
				justify-content: space-between;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #010101;
				border-bottom: 1px solid #E2E2E2;
				padding-bottom: 22rpx;
				margin-bottom: 33rpx;

				text {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FC5531;
				}

			}

			.ol_m_s_m {
				.ol_m_s_m_s {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #000000;
					margin-bottom: 22rpx;

					text {
						color: #969696;
					}
				}
			}

			.operation_box {
				position: absolute;
				right: 28rpx;
				bottom: 28rpx;
				display: flex;

				.ol_m_r {
					margin-left: 20rpx;
					width: 128rpx;
					height: 50rpx;
					background: #01CF79;
					border-radius: 25rpx;
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					text-align: center;
					line-height: 48rpx;
				}
			}

		}
	}
</style>