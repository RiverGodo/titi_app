<template>
	<view class="invite-page">
      <common-wx-header  name="分享"/>
      <view class="container">
      <view class="back-btn" @click="goBack">
        <text class="iconfont">&#xe619;</text>
      </view>
      <view class="invite-bg" :style="{backgroundImage: 'url(' + cdn+'/common/invite_bg.png)'}"/>
      <view class="invite-content" ref="mydom">
        <view class="invite-qrCode">
          <uqrcode :text="data" :size="100" />
        </view>
        <view class="invite-code" @click="copy">
          <view>
            <text class="invite-code-code">{{data}}</text>
            <text class="iconfont">&#xeb4e;</text>
          </view>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	import CommonWxHeader from "../../components/common-wx-header/common-wx-header.vue";

  export default {
      components: {CommonWxHeader},
		data() {
			return {
                cdn: this.$cdn,
				data: this.$appLink,
			}
		},
		onReady() {
			// this.getData();
		},
		methods: {
			goBack() {
				this.back();
			},
			// async getData() {
      //     let top = this.systemInfo.windowHeight/800 * 600;
      //     this.$refs.mydom.$el.style.top = top + 'px';
			// },
			copy() {
				if (this.data.inviteCode) {
					uni.setClipboardData({
						data: this.data.inviteCode,
						success: () => {
							this.$util.msg('复制成功');
						}
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	view,text{line-height: 1.8;}
	.invite-page {
		width: 100%;
		height: 100%;
    display: flex;
    flex-direction: column;
  }
  .container{
    position: relative;
    flex: 1;
  }
  .back-btn{
    position: absolute;
    top: 50rpx;
    right: 50rpx;
    z-index: 99;
    background: rgba(0,0,0, .5);
    width: 60rpx;
    height: 60rpx;
    border-radius: 30rpx;
    align-items: center;
    display: flex;
    justify-content: center;
    .iconfont{
      font-size: 50rpx;
      color: #fff;
    }
  }
	.invite-bg {
		width: 100%;
		height: 100%;
    background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.invite-content {
		position: absolute;
		width: 600rpx;
		left: 75rpx;
		bottom: 30rpx;
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
		width: 220rpx;
		height: 220rpx;
		padding: 10rpx;
		.invite-qrCode-txt {
			color: #333333;
			text-align: center;
			font-size: 24rpx;
		}
	}
	.invite-code {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
		padding-top: 20rpx;
		.invite-code-tip {
			text-align: center;
			color: #333;
			font-size: 28rpx;
		}
		.invite-code-code {
			text-align: center;
			color: #000;
			font-size: 24rpx;
			font-weight: bold;
			border-bottom: 1rpx solid #000;
		}
	}
</style>
