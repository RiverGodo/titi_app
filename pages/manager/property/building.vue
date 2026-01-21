<template>
    <view class="app">
        <mescroll-body ref="mescrollRef" @init="mescrollInit"  :bottombar="false" @down="downCallback" @up="loadDataList" :up="upOption">
            <view class="c-1" v-for="(item, index) in dataList" :key="index">
                <view class="c-2">
                    <text class="title">楼栋名称</text>
                    <text class="content">{{item.name}}</text>
                </view>
                <view class="c-2">
                    <text class="title">所有楼层</text>
                    <text class="content">{{item.allFloor}}</text>
                </view>
                <view class="c-2">
                    <text class="title">公共楼层</text>
                    <text class="content">{{item.commonFloor}}</text>
                </view>
                <view class="c-2">
                    <text class="title">所属园区</text>
                    <text class="content">{{item.parkName}}</text>
                </view>
                <view class="operation">
                    <text class="text-4" @click.stop="del(item.id)">删除</text>
                    <text class="text-4" @click.stop="navTo('/pages/manager/property/buildingManager?park=' + id + '&id=' + item.id)">修改</text>
                    <text class="text-4" @click.stop="navTo('/pages/manager/property/company?id=' + item.id)">查看公司</text>
                    <text class="text-4" @click.stop="navTo('/pages/manager/property/code?id=' + item.id)">拜访码</text>
                </view>
            </view>
        </mescroll-body>
        <view class="c-btn-1">
            <text class="text-btn" @click="navTo('/pages/manager/property/buildingManager?park=' + id)">添加楼栋</text>
        </view>
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
            id: ''
        }
    },
    onLoad(options) {
        this.id = options.id;
    },
    onShow() {
        this.mescroll && this.mescroll.resetUpScroll(false);
    },
    methods: {
        async del(id) {
            uni.showModal({
                title: '温馨提示',
                content: '删除楼栋，会同时删除该楼栋的所有公司。并解绑该楼栋的全体员工，确认删除吗？',
                confirmColor: "#FC5C39",
                success: async (res) => {
                    if(res.confirm) {
                        await this.$post('/property/delBuilding', {id});
                        this.$util.msg("删除成功");
                        this.mescroll && this.mescroll.resetUpScroll(false);
                    }
                },
            });
        },
        //加载列表
        async loadDataList(e){
            let params = {currentPage: e.num, pageSize: e.size};
            if(this.id){
                params.id = this.id;
            }
            const res = await this.$get('/property/listMyBuilding', params, {}, ()=> {this.mescroll.endErr()});
            let curPageData = res.data.records;
            let curPageLen = curPageData.length;
            let totalSize = res.data.total;
            if(e.num === 1) this.dataList = [];
            this.dataList = this.dataList.concat(curPageData);
            this.mescroll.endBySize(curPageLen, totalSize);
        },
    }
}
</script>

<style scoped lang="scss">
	view,text{line-height: 1.8;}
page {
  background-color: $bg-color;
}
.error{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28rpx;
  color: #999;
}
.app {
    padding-bottom: 100rpx;
  position: relative;
}

//分割线
.line-1 {
  width: 100vw;
  height: 1rpx;
  background-color: #E5E5E5;
}

//填充
.fill-1 {
  width: 100vw;
  height: 30rpx;
  background-color: #FFFFFF;
}

//自定义按钮
.c-btn-1 {
  position: fixed;
  bottom: 40rpx;
  left: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: $base-color;
  border-radius: 44rpx;
  width: 300rpx;
  height: 88rpx;
  margin: 0 auto;
  margin-left: -150rpx;
}


.text-btn {
  color: #FFFFFF;
  font-size: 28rpx;
  text-align: center;
  height: auto;
}

//容器
.c-1 {
  margin: 20rpx 20rpx 0 20rpx;
  border-radius: 10rpx;
  border-radius: 10rpx;
  position: relative;
  padding: 20rpx 30rpx;
  background-color: #FFFFFF;
}

.c-2 {
  padding: 10rpx 0rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 24rpx;
  .title{
    color: #999;
    width: 150rpx;
  }
  .content{
    text-align: right;
    flex: 1;
    color: #333;
    font-weight: bold;
  }
}
.operation{
  display: flex;
  justify-content: flex-end;
}

.text-4 {
  text-align: center;
  background-color: $base-color;
  color: #fff;
  font-size: 24rpx;
  border-radius: 10rpx;
  padding: 10rpx 30rpx;
    margin-left: 20rpx;
    &:nth-child(1){
        background: red;
    }
    &:nth-child(2){
        background: orange;
    }
    &:nth-child(3){
        background: dodgerblue;
    }
    &:nth-child(4){
        background: olivedrab;
    }
}
</style>
