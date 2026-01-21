<template>
    <view class="invite-page">
        <view class="invite-content">
            <view class="invite-code-tip">
                <view class="txt">拜访码长期有效，手动更新后旧码失效。</view>
                <view class="btn" @click="fresh">更新</view>
            </view>
            <view class="invite-qrCode">
                <uqrcode :text="link" :size="150" v-if="link"/>
            </view>
            <view class="invite-code">
                <view class="invite-code-code" @click="copy">
                    <text>{{data}}</text>
                    <text class="iconfont" >&#xeb4e;</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import MixButton from "../../../components/mix-button/mix-button.vue";

export default {
    components: {MixButton},
    data() {
        return {
            link: null,
            data: null,
            time: '-',
            id: null
        }
    },
    onLoad(options) {
        this.id = options.id;
        this.getData();
    },
    methods: {
        confirm(){

        },
        copy(){
            uni.setClipboardData({
                data: this.data,
                success: () => {
                    this.$util.msg('复制成功');
                }
            })
        },
        async fresh(){
            this.link = "";
            const res = await this.$post("/property/updateCode", {id: this.id});
            this.$util.msg('更新成功');
            await this.getData();
        },
        async getData() {
            const res = await this.$get("/property/getCode", {id: this.id});
            let arr = res.data.split("_");
            this.data = arr[0];
            this.link = arr[1];
        },
    }
}
</script>

<style scoped lang="scss">
	view,text{line-height: 1.8;}
page{
  background: #fff;
  width: 100%; height: 100%;
}
.invite-page {
  width: 100%;
  height: 100%;
}
.invite-content {
  padding-top: 60rpx;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.invite-qrCode {
  background: url("@/static/images/share/bk.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding: 20rpx;
    width: 350rpx;
    height: 350rpx;
  .invite-qrCode-txt {
    color: #333333;
    text-align: center;
    font-size: 24rpx;
  }
}
.invite-code-tip {
    text-align: center;
    color: #333;
    font-size: 28rpx;
    display: flex;
    align-items: center;
    padding-bottom: 60rpx;
    .btn{
        font-size: 24rpx;
        width: 120rpx;
        height: 60rpx;
        border-radius: 10rpx;
        background: $base-color;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        margin-left: 20rpx;
    }
}

.invite-code {
  justify-content: center;
  align-items: center;
  padding-top: 40rpx;

  .invite-code-time {
    text-align: center;
    color: #999;
    font-size: 24rpx;
  }
  .invite-code-code {
    padding: 50rpx 0;
    letter-spacing: 20rpx;
    color: $base-color;
    text-align: center;
    font-size: 80rpx;
    font-weight: bold;
    .iconfont{
      color: #333;
    }
  }
}
.nop{
  font-size: 28rpx;
  color: #333;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 200rpx;
  .iconfont{
    font-size: 80rpx;
    color: #333;
  }
}
</style>
