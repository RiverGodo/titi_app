<template>
	<view class="register-jumper">
		<view class="top">
			您申请 <text class="jumper-text">“{{name}}”</text> 认证登记已经提交审核，请耐心等待审核结果，你的登录编号为：<text
				class="jumper-text">{{id}}</text>，请牢记用户编号。
		</view>
		<view class="jump">
			<image class="jump-image" :src="imageUrl"></image>
		</view>
		<view class="center">
			绑定手机即可成为友惠见会员，享受众多会员福利。
		</view>
		<view class="end">
			<u--form labelPosition="left" :model="formData" :rules="rules" ref="form">
				<u-form-item label="手机号" prop="mobile" labelWidth="60" borderBottom ref="item-mobile">
					<u-input type="number" maxlength="11" v-model="formData.mobile" clearable placeholder="请填写手机号"
						border="none"></u-input>
				</u-form-item>

				<u-gap height="20"></u-gap>

				<u-form-item label="验证码" prop="code" labelWidth="60" borderBottom>
					<u--input type="number" maxlength="4" v-model="formData.code" border="none" placeholder="请填写验证码">
					</u--input>
					<u-button slot="right" @tap="getCode" :text="codeTips" type="success" size="mini"
						:disabled="codeDisabled"></u-button>
					<u-code ref="uCode" @change="codeChange" seconds="60" @start="codeDisabled = true"
						@end="codeDisabled = false"></u-code>
				</u-form-item>
			</u--form>

			<u-gap height="20"></u-gap>

			<u-button type="primary" text="立即认证" @click="handleJump"></u-button>
			<!-- <button type="default">立即认证</button> -->
		</view>
	</view>
</template>

<script>
	import mix from "../../../common/mixin.js"
	import {
		sendSmsCode,
		updateAuthentication
	} from '../../../api/auth'
	export default {
		onLoad(options) {
			var _this = this;
			if (options.id && options.name) {
				this.id = options.id
				this.name = options.name
			}
		},
		onUnload() {
			uni.switchTab({
				url: '/pages/index/index',
			})
		},
		data() {
			return {
				id: 0,
				name: '',
				formData: {
					mobile: '',
					code: ''
				},
				codeTips: '',
				codeDisabled: false,
				rules: {
					mobile: [{
							type: 'integer',
							required: true,
							message: '请填写手机号',
							trigger: ['blur', 'change']
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.mobile()就是返回true或者false的
								return uni.$u.test.mobile(value)
							},
							message: '手机号不正确',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur']
						}
					],
					code: {
						type: 'integer',
						len: 4,
						required: true,
						message: '请填写4位验证码',
						trigger: ['blur', 'change']
					}
				},
				imageUrl: mix.imageUrl + 'wx/8a43fafca364a7f85509d369d598a1c1cc973cc2608bce1c0da0508df136dc78.jpg'
			}
		},
		methods: {
			handleJump() {
				this.$refs.form.validate().then(formres => {
					let prams = {
						id: this.id,
						mobile: this.formData.mobile,
						code: this.formData.code
					}
					updateAuthentication(prams).then(res => {
						if (res && res.data) {
							uni.$u.toast('认证完成，等待审核')
							uni.switchTab({
								url: '/pages/index/index'
							})
						}
					})
				})
			},
			codeChange(text) {
				this.codeTips = text
			},
			getCode() {
				const mobile = this.formData.mobile
				if (!mobile) {
					uni.$u.toast('请填写手机')
				} else if (!uni.$u.test.mobile(mobile)) {
					uni.$u.toast('手机格式不正确')
				} else if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					//scene:1登陆获取验证码场景
					sendSmsCode({
						mobile: mobile,
						scene: 1
					}).then(res => {
						//console.log(res)
						uni.hideLoading()
						uni.$u.toast('验证码已发送')
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start()
					})
				} else {
					uni.$u.toast('倒计时结束后再发送')
				}
			},
		}
	}
</script>

<style>
	.top {
		margin-bottom: 20rpx;
	}

	.register-jumper {
		padding: 20rpx;
	}

	.jump-image {
		width: 100%;
	}

	.center {
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.jumper-text {
		font-size: 40rpx;
		font-weight: lighter;
	}
</style>
