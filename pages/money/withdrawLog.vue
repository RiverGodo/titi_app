<template>
	<view class="moneyWithdrawRecord-page">
    <mescroll-body ref="mescrollRef" @init="mescrollInit"  :bottombar="false" @down="downCallback" @up="loadDataList" :up="upOption">
    <view class="moneyWithdrawRecord-item" v-for="(item, index) in dataList" :key="index">
				<view class="moneyWithdrawRecord-item-title">
					<text class="moneyWithdrawRecord-item-title-time">{{new Date(item.createTime) | friendDate}}</text>
					<view class="moneyWithdrawRecord-item-title-status" @click="submitAction(item)">
						<text>{{item.statusStr}}</text>
						<text class="cancel" v-if="item.status === 0">撤销</text>
					</view>
				</view>
				<view class="moneyWithdrawRecord-item-content">
          <view class="row">
            <text>提现金额</text>
            <text>{{item.amount}}</text>
          </view>
         <view class="row">
            <text>手续费</text>
            <text>{{item.fees}}</text>
          </view>
          <view class="row">
            <text>到账金额</text>
            <text class="important">{{parseFloat(item.amount - item.fees).toFixed(2)}}</text>
          </view>
				</view>
      <view v-show="item.status === 4" class="cancelReason">撤销原因：{{item.cancelReason}}</view>
    </view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				dataList: [],
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
			}
		},
		methods: {
      async loadDataList(e){
        const res = await this.$get('/withdraw-log/list', {
          currentPage: e.num,
          pageSize: e.size
        }, {}, ()=> {this.mescroll.endErr()});
        let curPageData = res.data.records;
        let curPageLen = curPageData.length;
        let totalSize = res.data.total;
        //设置列表数据
        if(e.num === 1) this.dataList = [];
        this.dataList = this.dataList.concat(curPageData);
        this.mescroll.endBySize(curPageLen, totalSize);
      },
			submitAction(item) {
				uni.showModal({
					title: '温馨提示',
					content: '您确认撤销提现申请吗？',
          confirmColor: "#FC5C39",
					success: (res) => {
						if (res.confirm) {
							this.cancelAction(item);
						}
					}
				});
			},
			async cancelAction(item) {
				await this.$post("/withdraw-log/cancel", {
					id: item.id
				});
				this.$util.msg('撤销成功');
				this.mescroll.resetUpScroll();
			}
		}
	}
</script>

<style scoped lang="scss">
	view,text{line-height: 1.8;}
	.moneyWithdrawRecord-item {
    margin: 20rpx 30rpx 0 30rpx;
		padding: 20rpx 30rpx 0 30rpx;
		background-color: #fff;
		border-radius: 10rpx;
		.moneyWithdrawRecord-item-title {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			border-bottom: 1rpx solid $line-color;
			padding-bottom: 20rpx;
			.moneyWithdrawRecord-item-title-time {
				color: #999;
				text-align: left;
				font-size: 28rpx;
			}
			.moneyWithdrawRecord-item-title-status {
				display: flex;
				flex-direction: row;
				align-items: center;
				text {
					font-size: 28rpx;
					&:nth-child(1) {
						color: #333;
					}
					&:nth-child(2) {
						color: $base-color;
					}
				}
        .cancel{
          border-left: 4rpx solid #ccc;
          padding-left: 10rpx;
          margin-left:10rpx;
        }
			}
		}
		.moneyWithdrawRecord-item-content {
			padding: 20rpx 0;
      width:100%;
			text {
				color: #000;
				text-align: left;
				font-size: 28rpx;
        &:first-child{
          color: #666;
        }
        &.important{
          color: $base-color;
        }
			}
      view{
        line-height: 50rpx;
        width:100%;
        justify-content: space-between;
      }
		}
    .cancelReason{
      padding: 20rpx 0rpx;
      border-top: 1px solid $line-color;
      display: flex;
      font-size: 24rpx;
      color: #999;
    }
	}
</style>