<template>
  <view class="wrapper">
    <view class="input-content">
      <view class="input-item">
        <text class="iconfont" style="font-size: 46rpx;">&#xe8bf;</text><input v-model="name" placeholder="请输入银行名称" />
      </view>
      <view class="input-item">
        <text class="iconfont"  style="font-size: 40rpx;">&#xe614;</text><input v-model="branch" placeholder="请输入支行名称" />
      </view>
      <view class="input-item">
        <text class="iconfont"  style="font-size: 46rpx;">&#xe641;</text><input type="number" v-model="number" placeholder="请输入银行卡号" />
      </view>
      <view class="input-item">
        <text class="iconfont"  style="font-size: 52rpx;">&#xe62a;</text><input v-model="userName" placeholder="请输入开户名称" />
      </view>
      <view class="input-item">
        <text class="iconfont"  style="font-size: 46rpx;">&#xe613;</text><input  type="number" maxlength="6" v-model="code" placeholder="请输入验证码" />
        <mix-code />
      </view>
      <mix-button ref="confirmBtn" text="确定" marginTop="60rpx" @onConfirm="confirm"></mix-button>
    </view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				branch: '',
				number: '',
				userName: '',
        code: ''
			}
		},
		methods: {
			async confirm() {
				if (this.$util.isEmpty(this.name)) {
					this.$util.msg('请正确输入银行名称');
          this.$refs.confirmBtn.stop();
          return;
				}
				if (this.$util.isEmpty(this.branch)) {
					this.$util.msg('请正确输入支行名称');
          this.$refs.confirmBtn.stop();
          return;
				}
				if (this.$util.isEmpty(this.number)) {
					this.$util.msg('请正确输入银行卡号');
          this.$refs.confirmBtn.stop();
          return;
				}
				if (this.$util.isEmpty(this.userName)) {
					this.$util.msg('请正确输入开户名称');
          this.$refs.confirmBtn.stop();
          return;
				}
				if (this.$util.isEmpty(this.code)) {
					this.$util.msg('请正确输入验证码');
          this.$refs.confirmBtn.stop();
          return;
				}
				await this.$post("/user-bank/save", {
					name: this.name,
					branch: this.branch,
					number: this.number,
					userName: this.userName,
					code: this.code
				});
        this.$util.msg('添加成功');
        setTimeout(() => {
          this.back();
				}, 1000);
			}
		}
	}
</script>

<style scoped lang="scss">
	view,text{line-height: 1.8;}
page{
  background: #fff;
}
.input-content {
  padding: 0 60rpx;
}

.input-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100rpx;
  border-bottom: 1px solid $line-color;
  .iconfont {
    color: #999;
    font-size: 40rpx;
    width: 60rpx;
    text-align: center;
  }
  input {
    display: flex;
    padding: 0rpx 20rpx;
    flex: 1;
    height: 60rpx;
    line-height: 60rpx;
    font-size: 28rpx;
    color: #333;
  }
}
</style>