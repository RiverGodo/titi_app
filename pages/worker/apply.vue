<template>
  <view class="app" v-if="init">
      <view class="wrapper">
          <view class="tips">
              <view v-if="company && company.name">
                  来自<text class="important">{{company && company.name}}</text>的邀请!
              </view>
          </view>
          <view class="input-wrap pwd-wrap row b-b">
              <text class="iconfont icon-code" style="font-size: 32rpx;">&#xe637;</text>
              <input class="input" v-model="inviteCode" @blur="getCompany"  type="text" placeholder="邀请码"  />
              <text class="iconfont icon-eye" @click="scan">&#xe60a;</text>
          </view>
          <view class="welcome">
              <view>没有邀请码？联系公司管理员获得邀请码或场所码</view>
          </view>
          <view class="input-wrap pwd-wrap row b-b" @click="visible = true" style="margin-bottom: 40rpx;" v-if="company&& company.buildings">
              <text class="iconfont icon-phone" style="font-size: 38rpx">&#xe673;</text>
              <input class="input" v-model="selelctValue" disabled maxlength="50" placeholder="选择楼栋"  />
              <text class="iconfont">&#xe601;</text>
          </view>
          <view class="input-wrap pwd-wrap row b-b">
              <text class="iconfont icon-phone" style="font-size: 38rpx">&#xe612;</text>
              <input class="input" v-model="checkNote" maxlength="50" placeholder="审核暗号"  />
          </view>
        <mix-button ref="confirmBtn" text="申请员工入驻" marginTop="80rpx" @onConfirm="reg"></mix-button>
          <w-picker v-if="company && company.buildings" :visible.sync="visible" mode="selector" :value="selelctValue" default-type="name"
                    :default-props="defaultProps" :options="company.buildings" @confirm="onConfirm($event)"
                    ref="selector"></w-picker>
      </view>
  </view>
</template>

<script>

export default{
  data(){
    return {
        selelctValue: '',
        visible: false,
        defaultProps: {
            label: "name",
            value: "id"
        },
        inviteCode: '',
        checkNote: '',
        init: false,
        company: null,
        buildingId: '',
    }
  },
  async onLoad(options){
      if(options.check){
          uni.redirectTo({
              url: "/pages/auth/check"
          })
      }else{
          if(options.c){
              this.inviteCode = options.c;
              this.getCompany();
          }
          this.init = true;
      }
  },
  methods: {
      onConfirm(event) {
          this.selelctValue = event.obj.name
          this.buildingId = event.value;
      },
      async getCompany(){
          if(this.inviteCode){
              const res = await this.$get('/company/getCompanyFromCode',{code: this.inviteCode});
              if(res.data){
                this.company = res.data;
              }
          }
      },
      scan(){
          // #ifdef H5
          this.$util.msg("请在小程序或者APP中打开");
          this.$refs.confirmBtn.stop();
          return;
          // #endif
          uni.scanCode({
              scanType: ['qrCode'],
              success: (data) => {
                  let res = data.result;
                  let code = res.substring(res.indexOf('c=') + 2)
                  this.inviteCode = code;
              },
          });
      },
    async reg(){
          let param = {companyCode: this.inviteCode, checkNote: this.checkNote};
          if(this.buildingId){
              param['buildingId'] = this.buildingId;
          }
      const res = await this.$post('/user/beWorker', param);
      uni.showModal({
          title: '温馨提示',
          content: '提交成功，请耐心等待审核',
          showCancel: false,
          confirmColor: "#FC5C39",
          success: (res) => {
              if (res.confirm) {
                  this.back();
              }
          }
      });
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
  .tips{
    text-align: center;
    height: 50rpx;
    font-size: 28rpx;
    padding-bottom: 100rpx;
    color: #333;
    font-weight: normal;
    .iconfont{
      color: $base-color;
    }
    .important{
      padding: 0 10rpx;
      color: $base-color;
      font-weight: bold;
    }
  }
}
.welcome{
  font-size: 24rpx;
  text-align: right;
  padding-right: 60rpx;
  padding-top: 20rpx;
  padding-bottom: 40rpx;
  color: #555;
  font-weight: bold;
  display: flex;
  flex-direction: column;

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
