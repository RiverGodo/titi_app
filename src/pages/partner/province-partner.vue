<template>
	<view class="province-partner">
		<image class="partner-image" :src="partnerUrl" mode=""></image>
		<view class="partner-center">
			签约省会：<view v-if="cityName" class="cityname">{{cityName}}</view>
			<view v-else class="cityname">暂无</view>
		</view>
		<view class="partner-center">
			入股金额：<view v-if="amountofshares" class="amountofshares">{{amountofshares}}</view>
			<view v-else class="amountofshares">暂无</view>
		</view>
		<view class="partner-center">
			赠送碳卡：<view v-if="complimentarycard" class="complimentarycard">{{complimentarycard}}</view>
			<view v-else class="complimentarycard">暂无</view>
		</view>
		<view class="partner-button">
			<u-button @click="handleSelect()" type="primary" size="small" text="选择省会"></u-button>
		</view>
		<view class="list-call">
			姓名:
			<input class="sl-input" v-model="userName" placeholder="请输入姓名" />
		</view>
		<view class="list-call">
			手机号:
			<input style="margin: 0;" type="number" class="sl-input" v-model="mobile" placeholder="请输入手机号" />
		</view>
		<view class="list-call">
			验证码:
			<u--input type="number" maxlength="4" v-model="code" border="none" placeholder="请填写验证码">
			</u--input>
			<view class="list-call-code">
				<u-button @tap="getCode" :text="codeTips" type="success" size="mini"
					:disabled="codeDisabled"></u-button>
				<u-code ref="uCode" @change="codeChange" seconds="60" @start="codeDisabled = true"
					@end="codeDisabled = false"></u-code>
			</view>
		</view>
		<view class="list-call">
			合同收件地址:
			<input style="margin: 0;" class="sl-input" v-model="address" placeholder="请确认合同收件地址" />
		</view>
		<view class="partner-checkbox">
			<u-checkbox-group v-model="checked">
				<u-checkbox name="sure" label="我已阅览并同意签约协议条款,"></u-checkbox>
			</u-checkbox-group>
			<!-- #ifdef  APP-PLUS -->
			<view @click="fileDownload" class="partner-download">线下协议下载</view>
			<!-- #endif -->
			<!-- #ifdef  H5 -->
			<a :href="docUrl" class="btn">线下协议下载</a>
			<!-- #endif -->
		</view>
		<view class="partner-bottom-button">
			<u-button @click="handlePay()" size="large" :hairline="false" type="success" shape="circle"
				color="linear-gradient(to top, rgb(64, 158, 255), rgb(60, 58, 186))" text="签约省总督"></u-button>
		</view>
		<u-picker keyName="label" :loading="loading" :defaultIndex="[0,0,0]" :closeOnClickOverlay="true" ref="uPicker"
			@change="changeHandler" @cancel="show = false" @close="show = false" :show="show" @confirm="confirm"
			:columns="columns"></u-picker>
	</view>
</template>

<script>
	import {
		getDeptUserData,
		updatePayState,
		updatePayStateSys
	} from "../../api/partner.js"
	import mix from "../../common/mixin.js"
	import {
		sendSmsCode
	} from '../../api/auth'
	export default {
		data() {
			return {
				userId: '',
				checked: [],
				show: false,
				cityName: '',
				amountofshares: '',
				complimentarycard: '',
				userName: '',
				mobile: '',
				address: '',
				linkId: '',
				loading: true,
				code:'',
				codeTips: '',
				codeDisabled: false,
				columns: [
					['入股39.96万元', '入股29.97万元', '入股19.98万元']
				],
				columnData: [
					['赠4万张碳卡'],
					['赠3万张碳卡'],
					['赠2万张碳卡']
				],
				columnData1: [
					[]
				],
				partnerUrl: mix.imageUrl + 'wx/19b53cb7f64bf4957969c82d6b5b1a1907469a91ab2158613a26e6104e9d0220.png',
				docUrl: mix.imageUrl + '912ae198a3ebd9092edb9f41e4e6b67cf7474692eb1d796f675c52f8176390b2.doc'
			}
		},
		onLoad(e) {
			if (e.id) {
				this.userId = e.id
			}
		},
		created() {
			this.init()
		},
		methods: {
			codeChange(text) {
				this.codeTips = text
			},
			getCode() {
				const mobile = this.mobile
				if (!mobile) {
					uni.$u.toast('请填写手机号')
				} else if (!uni.$u.test.mobile(mobile)) {
					uni.$u.toast('手机号格式不正确')
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
			init() {
				getDeptUserData({
					deptId: 114,
					memberEquity: 40000
				}).then(res => {
					if (res.data.length) {
						this.columnData1[0] = []
						res.data.forEach((v) => {
							this.columnData1[0].push({
								label:v.nickname,
								value:v.id
							})
						})
					}
				})
				getDeptUserData({
					deptId: 114,
					memberEquity: 30000
				}).then(res => {
					if (res.data.length) {
						this.columnData1[1] = []
						res.data.forEach((v) => {
							this.columnData1[1].push({
								label:v.nickname,
								value:v.id
							})
						})
					}
				})
				getDeptUserData({
					deptId: 114,
					memberEquity: 20000
				}).then(res => {
					if (res.data.length) {
						this.columnData1[2] = []
						res.data.forEach((v) => {
							this.columnData1[2].push({
								label:v.nickname,
								value:v.id
							})
						})
					}
				})
				this.loading = false
			},
			handleSelect() {
				this.$refs.uPicker.setColumnValues(1, this.columnData[0])
				this.$refs.uPicker.setColumnValues(2, this.columnData1[0])
				this.show = true
			},
			changeHandler(e) {
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					picker.setColumnValues(1, this.columnData[index])
					picker.setColumnValues(2, this.columnData1[index])
				}
			},
			// 回调参数为包含columnIndex、value、values
			confirm(e) {
				this.cityName = e.value[2].label
				this.linkId = e.value[2].value
				this.amountofshares = e.value[0]
				this.complimentarycard = e.value[1]
				this.show = false
			},
			handlePay() {
				// console.log(this.checked);
				if (this.checked.length && this.checked[0] === "sure") {
					if (!this.cityName) {
						uni.showToast({
							icon: 'none',
							title: '请选择签约城市',
						});
						return;
					}
					if (!this.amountofshares) {
						uni.showToast({
							icon: 'none',
							title: '请选择入股金额',
						});
						return;
					}
					if (!this.complimentarycard) {
						uni.showToast({
							icon: 'none',
							title: '请选择赠送碳卡',
						});
						return;
					}
					if (!this.userName) {
						uni.showToast({
							icon: 'none',
							title: '请填写您的姓名',
						});
						return;
					}
					if (!this.mobile) {
						uni.showToast({
							icon: 'none',
							title: '请填写您的手机号',
						});
						return;
					}
					if (this.mobile.length !== 11) {
						uni.showToast({
							icon: 'none',
							title: '请填写正确的手机号',
						});
						return;
					}
					if (this.code.length !== 4) {
						uni.showToast({
							icon: 'none',
							title: '请填写正确的验证码',
						});
						return;
					}
					if (!this.address) {
						uni.showToast({
							icon: 'none',
							title: '请填写合同收件地址',
						});
						return;
					}
					this.handleSign()
				} else {
					uni.showToast({
						icon: 'none',
						title: '请先同意签约协议条款并下载线上协议',
					});
				}
				// uni.$u.route('/pages/pay/pay')
			},
			handleSign(){
				// 更新用户信息
				updatePayState({
					id: this.userId,
					nickname: this.userName,
					mobile: this.mobile,
					parentId: uni.getStorageSync('parentId')
				}).then(res => {
					if(res && res.data){
						updatePayStateSys({
							id: this.linkId,
							memberId:this.userId,
							mobile: this.mobile,
							code:this.code,
							contractReceivingAddress: this.address
						}).then(res2 => {
							if(res2 && res2.data){
								uni.$u.route('/pages/pay/pay?id=' + this.userId + '&linkId=' + this.linkId)
							}
						})
					}
				})
			},
			//签订合同下载
			fileDownload() {
				uni.downloadFile({
					url: 'http://192.168.0.200:8058/files/200200711.doc', //下载地址接口返回
					success: (data) => {
						if (data.statusCode === 200) {
							//文件保存到本地
							uni.saveFile({
								tempFilePath: data.tempFilePath, //临时路径
								success: function(res) {
									uni.showToast({
										icon: 'none',
										mask: true,
										title: '文件已保存：' + res.savedFilePath, //保存路径
										duration: 3000,
									});
									setTimeout(() => {
										//打开文档查看
										uni.openDocument({
											filePath: res.savedFilePath,
											success: function(res) {
												// console.log('打开文档成功');
											}
										});
									}, 3000)
								}
							});
						}
					},
					fail: (err) => {
						console.log(err);
						uni.showToast({
							icon: 'none',
							mask: true,
							title: '失败请重新下载',
						});
					},
				});
			},

		}
	}
</script>

<style>
	.province-partner {
		width: 100%;
	}

	.partner-image {
		width: 100%;
		height: 600rpx;
		margin-bottom: 20rpx;
	}

	.partner-center {
		display: flex;
		align-items: center;
		/* justify-content: center; */
		/* font-size: 30rpx; */
		margin-bottom: 20rpx;
		margin-left: 50rpx;
	}

	.partner-button {
		/* width: 400rpx; */
		margin: 0 50rpx;
		margin-top: 20rpx;
	}

	.partner-checkbox {
		display: flex;
		align-items: center;
		/* justify-content: center; */
		margin-top: 30rpx;
		font-size: 20rpx;
		margin-left: 50rpx;
	}

	.partner-bottom-button {
		margin: 30rpx;
		margin-top: 30rpx;
	}

	.partner-download {
		color: #409eff;
		font-size: 20rpx;
	}

	.list-call {
		display: flex;
		align-items: center;
		margin-top: 20rpx;
		margin-left: 50rpx;
		margin-right: 50rpx;
	}
</style>
