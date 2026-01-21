<template>
	<view class="app">
      <common-wx-header name="拼餐" />
      <view class="search-box">
      <input class="keyword" v-model="keyword" placeholder="搜索你想吃的东西吧"  />
      <text class="iconfont" @click="search">&#xe622;</text>
    </view>
    <view class="top">
      <!-- 排序 -->
      <view class="sort-bar row">
        <view class="item row center" :class="{active: item.current, last: index === sortList.length-1}"
              v-for="(item,index) in sortList" :key="index"  @click="wait">
          <text>{{ item.name }}</text>
          <view v-if="item.isPrice" class="icon-wrap">
            <text class="iconfont"  :class="{active: item.type === 2}">&#xe604;</text>
            <text class="iconfont" :class="{active: item.type === 3}">&#xe605;</text>
          </view>
        </view>
      </view>
    </view>
		<!-- 产品列表 -->
<!--    <mescroll-body ref="mescrollRef" @init="mescrollInit"  :bottombar="false" @down="downCallback" @up="loadDataList" :up="upOption">-->
      <product-list ref="productList" :list="dataList"></product-list>
<!--		</mescroll-body>-->
    <mix-loading v-if="isLoading"></mix-loading>

  </view>
</template>

<script>
  import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
  import productList from '@/pages/product/components/product-list.vue'
  import CommonWxHeader from "../../components/common-wx-header/common-wx-header.vue";
	export default {
		components: {
        CommonWxHeader,
			productList
		},
		mixins: [MescrollMixin],
		data() {
			return {
				sortList: [
					{name: '综合排序', type: 1, current: true},
					{name: '价格', type: 2, isPrice: true, current: false},
					{name: '人气', type: 4,  current: false},
				],
				keyword: '',
        sortType: 1,
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
      search(){
        this.mescroll.resetUpScroll();
      },
      async loadDataList(e){
        const res = await this.$get('/product/getList', {
          sortType: this.sortList.filter(item=> item.current)[0].type,
          keyword: this.keyword,
          currentPage: e.num,
          pageSize: e.size
        }, {showLoading: true}, ()=> {this.mescroll.endErr()});
        let curPageData = res.data.records;
        let curPageLen = curPageData.length;
        let totalSize = res.data.total;
        //设置列表数据
        if(e.num === 1) this.dataList = [];
        this.dataList = this.dataList.concat(curPageData);
        this.mescroll.endBySize(curPageLen, totalSize);
      },
			//排序
			changeSort(item){
        if(this.isLoading) return;
				if(item.current){
					if(item.isPrice){
						item.type = item.type === 2 ? 3 : 2;
					}else{
						return;
					}
				}else{
					this.sortList.forEach(v=> v.current = false);
					item.current = true;
					if(item.type === 2 || item.type === 3){
						item.type = 2;
					}
				}
        this.mescroll.resetUpScroll();
      },
		}
	}
</script>

<style scoped lang="scss">
	view,text{line-height: 1.8;}
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
