<template>
	<view class="mix-get-code" @click="getCode">
		<view v-if="loading" class="loading">
			<mix-icon-loading size="28rpx" color="#FC5C39"></mix-icon-loading>
		</view>
		<text class="text" :class="{disabled: timeDown > 0}">
			{{ timeDown > 0 ? '重新获取 ' + timeDown + 's' : '获取验证码' }}
		</text>
	</view>
</template>

<script>
	/**
	 * 手机验证码
	 * @prop mobile 手机号
	 * @prop templateCode 短信模版id
	 */
	export default {
		//获取手机验证码
		name: 'MixMobileCode',
		data() {
			return {
				loading: false,
				timeDown: ''
			}
		},
		props: {
			mobile: {
				type: String,
				default: ''
			},
			templateCode: {
				type: String,
				default: ''
			},
			action: {
				type: String,
				default: 'inner'
			},
			validBind: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			//获取验证码
			async getCode(){
				if(this.timeDown > 0){
					return;
				}
				const mobile = this.mobile;
				if (mobile && !this.$util.checkStr(mobile, 'mobile')) {
					this.$util.msg('手机号码格式不正确');
					return;
				}
				if(this.action === "reg" && this.$util.isEmpty(mobile)) {
					this.$util.msg('请先填写手机号');
					return;
				}
				let url = this.action === 'reg' ? "sendRegCode" : this.action === "innerOther" ? "sendInnerOthersCode" : "sendInnerCode"
				let params = mobile ? {mobile} : {};
				params.validBind = this.validBind;
				let res = await this.$post('/user/' + url, params);
				if(res.code === -3){
					uni.showModal({
						title: '温馨提示',
						content: res.msg,
						confirmColor: "#FC5C39",
						success: (res) => {
							if (res.confirm) {
								this.navTo("/pages/auth/account/bindMobile");
							}
						}
					});
					return;
				}
				this.$util.msg("发送成功");
				this.countDown(60);
			},
			//倒计时
			countDown(timer){
				timer --;
				this.timeDown = timer;
				if(timer > 0){
					setTimeout(()=>{
						this.countDown(timer);
					}, 1000)
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.mix-get-code{
		flex-shrink: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 36rpx;
		
		&:before{
			content: '';
			width: 0;
			height: 40;
			border-right: 1px solid #f0f0f0;
		}
		.loading{
			margin-right: 8rpx;
		}
		.text{
			line-height: 28rpx;
			font-size: 26rpx;
			color: $base-color;
			
			&.disabled{
				color: #ccc;
			}
		}
	}
</style>
