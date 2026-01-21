<template>
	<view class="container">
		<view class="auth-header">
			<view class="auth-logo">
				<u-avatar size="100" :src="headerUrl" fontSize="100"></u-avatar>
			</view>
		</view>

		<view class="auth-box">
			<!-- 登录方式选择 -->
			<view class="mode-section">
				<u-subsection class="subsection" mode="subsection" fontSize="15" :list="loginModeList"
					:current="currentModeIndex" @change="handleModeChange"></u-subsection>
			</view>
			<u-gap height="40"></u-gap>

			<!-- 登录表单 -->
			<u--form labelPosition="left" :model="formData" :rules="rules" ref="form">
				<u-form-item :label="currentModeIndex === 0 ? '账号':'手机号'" prop="mobile" labelWidth="60" borderBottom ref="item-mobile">
					<u-input type="number" maxlength="11" v-model="formData.mobile" clearable :placeholder="currentModeIndex === 0 ?'请填写账号或手机号':'请填写手机号'"
						border="none"></u-input>
				</u-form-item>

				<u-gap height="20"></u-gap>

				<u-form-item v-if="currentModeIndex === 0" label="密码" prop="password" labelWidth="60" borderBottom
					ref="item-password">
					<!-- 	<u-input v-if="inputType === 'password'" :type="inputType" maxlength="16" v-model="formData.password" placeholder="请填写密码"
						border="none">
						<template slot="suffix">
							<u-icon size="20" color="#666666" name="eye-fill"
								@click="hadleChangePassType('text')"></u-icon>
						</template>
					</u-input> -->
					<view v-if="inputType === 'password'" class="user_password">
						<input placeholder="请填写密码" v-model="formData.password" type="password">
						<u-icon size="20" color="#666666" name="eye-fill" @click="hadleChangePassType('text')"></u-icon>
					</view>
					<view v-if="inputType === 'text'" class="user_password">
						<input placeholder="请填写密码" v-model="formData.password" type="text">
						<u-icon size="20" color="#666666" name="eye-off" @click="hadleChangePassType('password')">
						</u-icon>
					</view>
				</u-form-item>

				<u-form-item v-else label="验证码" prop="code" labelWidth="60" borderBottom>
					<u--input type="number" maxlength="4" v-model="formData.code" border="none" placeholder="请填写验证码">
					</u--input>
					<u-button slot="right" @tap="getCode" :text="codeTips" type="success" size="mini"
						:disabled="codeDisabled"></u-button>
					<u-code ref="uCode" @change="codeChange" seconds="60" @start="codeDisabled = true"
						@end="codeDisabled = false"></u-code>
				</u-form-item>

				<view class="btn-group">
					<u-button class="auth-btn" type="primary" customStyle="margin-top: 50px" @click="handleSubmit">立即登录
					</u-button>
				</view>
			</u--form>
		</view>
	</view>
</template>

<script>
	import {
		sendSmsCode
	} from '../../api/auth'
	import mix from "../../common/mixin.js"
	export default {
		data() {
			return {
				headerUrl: mix.imageUrl + 'wx/676e4ff60ad46337f9b39d8757766bf581b9b89f5927b1bdf4766a456efdd3d3.png',
				currentModeIndex: 0,
				loginModeList: ['密码登录', '验证码登录'],
				inputType: 'password',
				codeDisabled: false,
				codeTips: '',
				formData: {
					mobile: '',
					password: '',
					code: ''
				},
				rules: {
					mobile: [{
							type: 'integer',
							required: true,
							message: '请填写账号',
							trigger: ['blur', 'change']
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.mobile()就是返回true或者false的
								return currentModeIndex === 0 ? uni.$u.test.mobile(value) : true
							},
							message: '账号不正确',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur']
						}
					],
					password: {
						type: 'string',
						min: 4,
						max: 16,
						required: true,
						message: '密码长度4-16位密码',
						trigger: ['blur', 'change']
					},
					code: {
						type: 'integer',
						len: 4,
						required: true,
						message: '请填写4位验证码',
						trigger: ['blur', 'change']
					}
				}
			}
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form.setRules(this.rules)
		},
		computed: {
			userInfo() {
				return this.$store.getters.userInfo
			}
		},
		methods: {
			hadleChangePassType(type) {
				this.inputType = type
			},
			handleModeChange(index) {
				if (index !== this.currentModeIndex) {
					this.currentModeIndex = index
					this.$refs.form.clearValidate()
				}
			},
			codeChange(text) {
				this.codeTips = text
			},
			getCode() {
				const mobile = this.formData.mobile
				if (!mobile) {
					uni.$u.toast('请填写账号')
				} else if (!uni.$u.test.mobile(mobile)) {
					uni.$u.toast('账号格式不正确')
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
			handleSubmit() {
				this.$refs.form.validate().then(res => {
					this.mobileLogin(this.formData)
				})
			},
			mobileLogin(data) {
				this.$store.dispatch('Login', {
					type: this.currentModeIndex,
					data: data
				}).then(res => {
					uni.$u.toast('登录成功')
					setTimeout(() => {
						if (uni.getStorageSync('returnPath')) {
							uni.$u.route(uni.getStorageSync('returnPath'))
						} else {
							uni.switchTab({
								url: '/pages/user/user'
							})
						}
					}, 3000)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.auth-header {
		height: 400rpx;
		@include flex-center;

		.auth-logo {
			@include flex-center(column);
		}
	}

	.auth-box {
		@include flex-center(column);

		.mode-section {
			width: 600rpx;

			.subsection {
				height: 60rpx;
			}
		}

		.btn-group {
			width: 600rpx;

			.auth-btn {
				height: 90rpx;
				font-size: 32rpx;
			}
		}
	}

	.user_password {
		width: 100%;
		display: flex;
		align-items: center;

		input {
			margin-right: auto;
		}

		.input-placeholder {
			color: rgb(192, 196, 204);
		}
	}
</style>
