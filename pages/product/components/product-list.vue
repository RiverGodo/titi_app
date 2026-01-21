<template>
  <view class="eat">
    <view class="content">
      <view class="item" @click="wait">
        <!-- <image src="/static/images/tmp/1.jpg"/> -->
        <view class="leap">
          <view class="name">无忌龙江猪脚饭</view>
          <view class="vol">
            <text>月售2000+</text>
          </view>
          <view class="fee">配送费 <text>¥0.2</text></view>
          <view class="vol">
            <text>接单上限制：1000人</text>
            <text>当前已预定：100人</text>
          </view>
        </view>
      </view>
      <view class="item"  @click="wait">
        <!-- <image src="/static/images/tmp/2.jpg"/> -->
        <view class="leap">
          <view class="name">无忌龙江猪脚饭</view>
          <view class="vol">
            <text>月售2000+</text>
          </view>
          <view class="fee">配送费 <text>¥0.2</text></view>
          <view class="vol">
            <text>接单上限制：1000人</text>
            <text>当前已预定：100人</text>
          </view>
        </view>
      </view>
      <view class="item"  @click="wait">
        <!-- <image src="/static/images/tmp/3.jpg"/> -->
        <view class="leap">
          <view class="name">无忌龙江猪脚饭</view>
          <view class="vol">
            <text>月售2000+</text>
          </view>
          <view class="fee">配送费 <text>¥0.2</text></view>
          <view class="vol">
            <text>接单上限制：1000人</text>
            <text>当前已预定：100人</text>
          </view>
        </view>
      </view>
      <view class="item"  @click="wait">
        <!-- <image src="/static/images/tmp/4.jpg"/> -->
        <view class="leap">
          <view class="name">无忌龙江猪脚饭</view>
          <view class="vol">
            <text>月售2000+</text>
          </view>
          <view class="fee">配送费 <text>¥0.2</text></view>
          <view class="vol">
            <text>接单上限制：1000人</text>
            <text>当前已预定：100人</text>
          </view>
        </view>
      </view>
      <view class="item"  @click="wait">
        <!-- <image src="/static/images/tmp/4.jpg"/> -->
        <view class="leap">
          <view class="name">无忌龙江猪脚饭</view>
          <view class="vol">
            <text>月售2000+</text>
          </view>
          <view class="fee">配送费 <text>¥0.2</text></view>
          <view class="vol">
            <text>接单上限制：1000人</text>
            <text>当前已预定：100人</text>
          </view>
        </view>
      </view>
      <view class="item"  @click="wait">
        <!-- <image src="/static/images/tmp/4.jpg"/> -->
        <view class="leap">
          <view class="name">无忌龙江猪脚饭</view>
          <view class="vol">
            <text>月售2000+</text>
          </view>
          <view class="fee">配送费 <text>¥0.2</text></view>
          <view class="vol">
            <text>接单上限制：1000人</text>
            <text>当前已预定：100人</text>
          </view>
        </view>
      </view>
      <view class="item"  @click="wait">
        <!-- <image src="/static/images/tmp/4.jpg"/> -->
        <view class="leap">
          <view class="name">无忌龙江猪脚饭</view>
          <view class="vol">
            <text>月售2000+</text>
          </view>
          <view class="fee">配送费 <text>¥0.2</text></view>
          <view class="vol">
            <text>接单上限制：1000人</text>
            <text>当前已预定：100人</text>
          </view>
        </view>
      </view>
      <view class="item"  @click="wait">
        <!-- <image src="/static/images/tmp/4.jpg"/> -->
        <view class="leap">
          <view class="name">无忌龙江猪脚饭</view>
          <view class="vol">
            <text>月售2000+</text>
          </view>
          <view class="fee">配送费 <text>¥0.2</text></view>
          <view class="vol">
            <text>接单上限制：1000人</text>
            <text>当前已预定：100人</text>
          </view>
        </view>
      </view>
      <view class="item"  @click="wait">
        <!-- <image src="/static/images/tmp/4.jpg"/> -->
        <view class="leap">
          <view class="name">无忌龙江猪脚饭</view>
          <view class="vol">
            <text>月售2000+</text>
          </view>
          <view class="fee">配送费 <text>¥0.2</text></view>
          <view class="vol">
            <text>接单上限制：1000人</text>
            <text>当前已预定：100人</text>
          </view>
        </view>
      </view>
      <view class="item"  @click="wait">
        <!-- <image src="/static/images/tmp/4.jpg"/> -->
        <view class="leap">
          <view class="name">无忌龙江猪脚饭</view>
          <view class="vol">
            <text>月售2000+</text>
          </view>
          <view class="fee">配送费 <text>¥0.2</text></view>
          <view class="vol">
            <text>接单上限制：1000人</text>
            <text>当前已预定：100人</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	export default {
		name: 'MixProductList',
		data() {
			return {
			};
		},
		props: {
      list: {
				type: Array,
				default(){
					return []
				}
			},
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
.eat{
  .content{
    padding: 20rpx;
    .item{
      background-color: #fff;
      padding: 10rpx;
      display: flex;
      margin-bottom: 10rpx;
      border-radius: 10rpx;
      image {
        width: 200rpx;
        height: 200rpx;
      }
      .leap{
        flex: 1;
        padding-left: 20rpx;
        .name{
          font-weight: bold;
          font-size: 30rpx;
          line-height: 70rpx;
        }
        .vol{
          line-height: 40rpx;
          font-size: 24rpx;
          color: #666;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .fee{
          line-height: 50rpx;
          font-size: 24rpx;
          font-weight: bold;
          text{
            padding-left: 10rpx;
            color: $base-color
          }
        }
      }
    }
  }
}
</style>
