<template>
	<view class="app">
    <view class="top">
      <!-- 排序 -->
      <view class="sort-bar row">
        <view class="item row center" :class="selIndex == 0? 'active': ''" @click="sel(0)">
          <text>待审核</text>
        </view>
        <view class="item row center" :class="selIndex == 1? 'active': ''" @click="sel(1)">
          <text>已通过</text>
        </view>
      </view>
    </view>
		<!-- 产品列表 -->
    <mescroll-body ref="mescrollRef" @init="mescrollInit"  :bottombar="false" @down="downCallback" @up="loadDataList" :up="upOption">
      <view class="worker" v-for="item in dataList" :key="item.id">
        <view class="item">
          <text class="title">昵称</text>
          <text class="content">{{item.nickName}}</text>
        </view>
        <view class="item">
          <text class="title">暗号</text>
          <text class="content">{{item.checkNote}}</text>
        </view>
        <view class="check" v-if="selIndex == 0">
          <text class="pass" @click="check(item.id, true)">通过</text>
          <text>｜</text>
          <text class="reject" @click="check(item.id, false)">拒绝</text>
        </view>
        <view class="check" v-if="selIndex == 1">
          <text class="reject" @click="del(item.id)">移除</text>
        </view>
      </view>
		</mescroll-body>
    <mix-loading v-if="isLoading"></mix-loading>
  </view>
</template>

<script>
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
			  selIndex: 0,
				dataList: [], //商品列表
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
        async del(id) {
            uni.showModal({
                title: '温馨提示',
                content: '确认移除员工码',
                confirmColor: "#FC5C39",
                success: async (res) => {
                    if(res.confirm) {
                        await this.$post('/user/delUser', {id});
                        this.$util.msg("移除成功");
                        this.mescroll && this.mescroll.resetUpScroll(false);
                    }
                }
            });
        },
      sel(index){
        this.selIndex = index;
        this.mescroll.resetUpScroll();
      },
      check(id, flag){
        uni.showModal({
          title: '温馨提示',
          content: flag? '您确认通过吗？': '您确认拒绝吗',
          confirmColor: "#FC5C39",
          success: async (res) => {
            if (res.confirm) {
              const result = await this.$post('/user/check', {id, flag});
              this.$util.msg('操作成功');
              this.mescroll.resetUpScroll();
            }
          }
        });
      },
      async loadDataList(e){
        const res = await this.$get('/user/workers', {
          isChecking: this.selIndex === 0,
          currentPage: e.num,
          pageSize: e.size
        }, {showLoading: true, notToast: true}, ()=> {this.mescroll.endErr()});
        if(res.code === -1){
            this.$util.msg(res.msg);
            setTimeout(() => {
                uni.switchTab({url: '/pages/bar/mine'});
            }, 1000)
            return;
        }
        let curPageData = res.data.records;
        let curPageLen = curPageData.length;
        let totalSize = res.data.total;
        //设置列表数据
        if(e.num === 1) this.dataList = [];
        this.dataList = this.dataList.concat(curPageData);
        this.mescroll.endBySize(curPageLen, totalSize);
      },
		}
	}
</script>

<style scoped lang="scss">
	view,text{line-height: 1.8;}
.worker{
  padding: 20rpx;
  background-color: #fff;
  border-radius: 10rpx;
  margin-top: 10rpx;
  .item{
    display: flex;
    justify-content: space-between;
    font-size: 28rpx;
    .title{
      color: #999;
    }
    .content{
      color: #333;
    }
  }
  .check{
    padding-top: 20rpx;
    font-size: 24rpx;
    border-top: 2rpx solid $bg-color;
    display: flex;
    justify-content: flex-end;
    text{
      padding: 0 10rpx;
    }
    .pass{
      color: green;
      text-decoration: underline;
    }
    .reject{
      color: red;
      text-decoration: underline;
    }
  }
}
  page{
    background: #f3f3f3;
  }
  .search-box{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10rpx 30rpx;
    .keyword{
      text-align: center;
      background: #fff;
      border-radius: 40rpx;
      height: 70rpx;
      flex: 1;
      padding: 0rpx 20rpx;
      line-height: 80rpx;
      font-size: 28rpx
    }
    .iconfont{
      color: #666;
      font-size: 50rpx;
      padding-left: 20rpx;
    }
  }
	.top{
		width: 100%;
		background-color: #fff;
	}
  .sort-bar{
    justify-content: space-around;
    height: 76rpx;
    padding: 4rpx 0 4rpx 4rpx;
    /* #ifdef MP */
    padding-left: 10rpx;
    /* #endif */
    background-color: #fff;
    position: relative;
    z-index: 1;

    .item{
      flex: 1;
      height: 100%;
      font-size: 28rpx;
      color: #333;
      position: relative;
      overflow: hidden;

      &.active{
        color: $base-color;
        font-weight: 700;

        &:after{
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50rpx);
          content: '';
          width: 100rpx;
          height: 4rpx;
          background-color: $base-color;
          border-radius: 10px;
        }
        .iconfont.active{
          color: $base-color;
        }
      }
      /* #ifdef MP */
      &.last:before{
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 2rpx;
        height: 40rpx;
        box-shadow: 0 0 16rpx rgba(0,0,0,.6);
      }
      /* #endif */
    }
    .icon-wrap{
      display: flex;
      flex-direction: column;
      padding-left: 8rpx;
    }
    .iconfont{
      line-height: 1;
      font-size: 14rpx;
      color: #bbb;
    }
    .btn{
      height: 68rpx;
      padding-left: 16rpx;
      padding-right: 20rpx;

      .icon-hengxiangliebiao, .icon-shuxiangliebiao{
        font-size: 40rpx;
        color: #333;
      }
    }
  }

</style>
