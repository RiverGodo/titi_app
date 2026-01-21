<template>
  <view class="app">
      <common-wx-header  name="注册"/>
      <view class="container">
      <view class="back-btn" @click="navBack">
        <text class="iconfont">&#xe629;</text>
      </view>
      <view class="wrapper">
        <view class="welcome">
          <view>请绑定您的手机号</view>
        </view>
        <view class="input-wrap pwd-wrap row b-b">
          <text class="iconfont icon-phone">&#xe633;</text>
          <input class="input" v-model="mobile" type="number" maxlength="11" placeholder="手机号码"  />
        </view>
        <view class="input-wrap row b-b">
          <text class="iconfont icon-pwd">&#xe613;</text>
          <input class="input" v-model="code" type="number" maxlength="6" placeholder="手机验证码"  />
          <mix-code :mobile="mobile" action="reg"></mix-code>
        </view>
        <mix-button ref="confirmBtn" text="绑定" marginTop="80rpx" @onConfirm="reg"></mix-button>
      </view>
    </view>
  </view>
</template>

<script>
import CommonWxHeader from "../../../components/common-wx-header/common-wx-header.vue";

export default{
    components: {CommonWxHeader},
  data(){
    return {
      code: '',
      mobile: '',
    }
  },
  methods: {
    async reg(){
      const res = await this.$post('/user/bind', {phone: this.mobile, code: this.code});
      this.$util.msg('操作成功');
      setTimeout(()=>{
          this.back();
      }, 1000)
    },
    navBack(){
      this.back();
    },
  }
}
</script>

<style>
</style>
<style scoped lang='scss'>
	view,text{line-height: 1.8;}
page{
  background-color: $bg-color;
}
.container{
  position: relative;
}
.back-btn{
  position: absolute;
  top: 30rpx;
  left: 30rpx;
  z-index: 99;
  background: rgba(0,0,0, .5);
  width: 60rpx;
  height: 60rpx;
  border-radius: 30rpx;
  align-items: center;
  display: flex;
  justify-content: center;
  .iconfont{
    font-size: 36rpx;
    color: #fff;
  }
}
.input-wrap{
  background: #fff;
  border-radius: 20rpx;
  height: 100rpx;
  margin: 10rpx 60rpx 0;
  padding-right: 20rpx;

  &.pwd-wrap{
    position: relative;
    z-index: 100;
  }
  .input{
    flex: 1;
    font-size: 28rpx;
    color: #333;
  }
  .iconfont{
    width: 80rpx;
    text-align: center;
    color: #999;
    &.icon-phone{
      font-size: 38rpx;
    }
    &.icon-code{
      font-size: 40rpx;
    }
    &.icon-invite{
      font-size: 30rpx;
    }
    &.icon-pwd{
      font-size: 40rpx;
    }
  }
  .icon-eye{
    width: auto;
    padding: 20rpx;
    font-size: 48rpx;
    color: #999;
    transform: translateX(14rpx);
  }
}
.wrapper{
  padding-top: 200rpx;
  z-index: 90;
  padding-bottom: 40rpx;
}
.welcome{
  position:relative;
  margin-bottom: 100rpx;
  text-align: center;
  font-size: 30rpx;
  color: #555;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  .tips{
    font-size: 24rpx;
    color: #666;
    font-weight: normal;
    .iconfont{
      color: $base-color;
    }
  }
}
.tip{
  margin-top: 50rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  text{
    font-size: 28rpx;
    color: #111;
    &.apply{
      color: $base-color;
      text-decoration: underline;
      padding-left: 10rpx;
    }
  }
}
</style>
