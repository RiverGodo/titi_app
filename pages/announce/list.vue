<template>
	<view class="app">
    <mescroll-body ref="mescrollRef" @init="mescrollInit"  :bottombar="false" @down="downCallback" @up="loadDataList" :up="upOption">
      <view class="notice-item" v-for="(item, index) in dataList" @click="navTo('/pages/announce/detail?id=' + item.id)" :key="index">
        <text class="time">{{ new Date(item.updateTime) | friendDate }}</text>
        <view class="content">
          <view class="title">{{ item.title }}</view>
          <view class="bot b-t">
            <text>查看详情</text>
            <text class="iconfont icon-you">&#xe601;</text>
          </view>
        </view>
      </view>
		</mescroll-body>

		<mix-loading v-if="isLoading" :type="2"></mix-loading>
	</view>
</template>

<script>
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
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
			//加载列表
      async loadDataList(e){
        const res = await this.$get('/announce/list', {
          isHome: true,
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
		}
	}
</script>

<style lang='scss'>
	view,text{line-height: 1.8;}
.app {
  padding-bottom: 30rpx;
}

.notice-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80rpx;
  padding-top: 10rpx;
  font-size: 26rpx;
  color: #7d7d7d;
}

.content {
  width: 710rpx;
  padding: 0 24rpx;
  background-color: #fff;
  border-radius: 12rpx;
}

.title {
  padding-top: 30rpx;
  height: 70rpx;
  line-height: 40rpx;
  font-size: 28rpx;
  color: #303133;
  font-weight: 700;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.img-wrapper {
  width: 100%;
  height: 280rpx;
  margin-bottom: 16rpx;
  position: relative;
}

.pic {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 6rpx;
}
.introduce-wrap{
  padding-bottom: 20rpx;

  .introduce {
    font-size: 28rpx;
    color: #606266;
    line-height: 40rpx;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  &.has-pic .introduce{
    -webkit-line-clamp: 2;
  }
}

.bot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80rpx;
  font-size: 24rpx;
  color: #707070;
  position: relative;
}

.icon-you {
  font-size: 24rpx;
}
</style>
