<template>
	<view class="pay">
		<view class="pay-single">
			<view class="pay-single-title">
				签约信息
			</view>
			<view class="pay-single-center">
				<view class="pay-flex-single pay-flex1">
					您的签约总金额为：
				</view>
				<view class="pay-flex-single">
					{{memberInvestment}}
				</view>
				<view class="pay-flex-single">
					元
				</view>
			</view>
			<view class="pay-single-center">
				<view class="pay-flex-single pay-flex1">
					已付款：
				</view>
				<view class="pay-flex-single">
					{{memberCompleteRecharge}}
				</view>
				<view class="pay-flex-single">
					元
				</view>
			</view>
			<view class="pay-single-center">
				<view class="pay-flex-single pay-flex1">
					未付款：
				</view>
				<view class="pay-flex-single">
					{{unpaid}}
				</view>
				<view class="pay-flex-single">
					元
				</view>
			</view>
<!-- 			<view v-if="payButton" class="pay-single-center">
				<view class="pay-flex-single pay-flex1">
					订单编号：
				</view>
				<view class="pay-flex-single">
					{{mchOrderNo}}
				</view>
			</view> -->
			<view v-if="!payButton" class="pay-single-center">
				<view class="pay-flex-single pay-flex1">
					签约状态：
				</view>
				<view class="pay-flex-single">
					您已成功签约，请上传合同
				</view>
			</view>
		</view>
		<view v-if="payButton" class="pay-single">
			<view class="pay-single-title">
				支付方式
			</view>
			<view class="pay-single-block">
				<view class="pay-single-block-single">
					<u-icon size="28" color="rgb(4, 190, 2)" name="weixin-circle-fill"></u-icon>
					微信支付
				</view>
			</view>
		</view>
		<view v-if="payButton" class="pay-single">
			<view class="pay-single-title">
				付款金额
			</view>
			<view class="pay-single-block">
				<view @click="priceClick(item)" v-for="(item, index) in payList" :key="item"
					:class="selectPay === item ? 'pay-single-block-single2 pay-active' : 'pay-single-block-single2'">
					{{item}}
				</view>
			</view>
			<view v-show="selectPay === constName" class="pay-input">
				<u--input placeholder="请输入自定义金额" border="surround" v-model="inputPay"></u--input>
			</view>

		</view>
		<view v-if="payButton" class="partner-bottom-button">
			<u-button @click="immediatelyPay()" size="large" :hairline="false" type="success" shape="circle"
				color="rgb(4, 190, 2)" text="确认付款"></u-button>
		</view>
		<view v-else class="partner-bottom-button">
	<!-- 		<u-button size="large" :hairline="false" type="success" shape="circle"
				color="#409eff" text="上传合同"></u-button> -->
		</view>
	</view>
</template>

<script>
	import {
		payOrder
	} from '@/api/manage' // 接口
	import { getSysUserInfo } from '@/api/user'
	const name = "自定义"
	export default {
		data() {
			return {
				constName: name,
				payList: [999, 2999, 3999, 4999, 19999, 49999, name],
				selectPay: 999,
				inputPay: null,
				paytestAmount: 0,
				orderTitle: '签约定金',
				mchOrderNo: '', // 模拟商户订单号
				currentWayCode: '', // 以何种方式进行支付，默认是微信二维码
				currentPayDataType: '', // 支付参数
				divisionMode: 0, // 订单分账模式
				userId: undefined,
				linkId: undefined,
				memberInvestment:null,
				memberCompleteRecharge:null,
				unpaid:null,
				payButton:true
			}
		},
		onLoad(e) {
			console.log(e);
			if (e.id && e.linkId) {
				this.userId = e.id
				this.linkId = e.linkId
				this.getSystemUserData()
			} else {
				if(e.extParam){
					this.userId = JSON.parse(e.extParam).userId
					this.linkId = JSON.parse(e.extParam).linkId
					this.getSystemUserData()
				}else{
					uni.$u.toast('请重新进入页面')
					uni.switchTab({
						url: '/pages/index/index'
					})
				}
			}
		},
		computed: {
			userInfo() {
				return this.$store.getters.userInfo
			},
			hasLogin() {
				return this.$store.getters.hasLogin
			}
		},
		methods: {
			getSystemUserData(){
				getSysUserInfo({id:this.linkId}).then(res => {
					if(res.data){
						if(res.data.memberInvestment === 0){
							this.payButton = false
							uni.showToast({
								title: '该区域未开放，请联系管理员',
								icon: 'none'
							});
						}else{
							this.memberInvestment = res.data.memberInvestment
							this.memberCompleteRecharge = res.data.memberCompleteRecharge
							this.unpaid =  (res.data.memberInvestment - res.data.memberCompleteRecharge).toFixed(2)
							if(this.unpaid < 0 || this.unpaid == 0){
								this.payButton = false
								uni.showToast({
									title: '恭喜完成签约',
									icon: 'none'
								});
							}
						}
					}
				})
			},
			priceClick(price) {
				this.selectPay = price
			},
			// 立即支付按钮
			immediatelyPay() {
				if (this.selectPay === name) {
					this.paytestAmount = this.inputPay
				} else {
					this.paytestAmount = this.selectPay
				}
				// 判断支付金额是否为0
				if (!this.paytestAmount || this.paytestAmount == 0.00 || this.paytestAmount == 0) {
					uni.showToast({
						title: '请输入支付金额',
						icon: 'none'
					});
					return;
				}
				// 判断是否选择支付方式
				// if (this.currentWayCode === '') {
				// 	return this.$message.error('请选择支付方式')
				// }
				this.currentWayCode = 'WX_JSAPI'
				this.currentPayDataType = 'payurl'
				this.orderTitle = "用户" + this.userId + this.orderTitle
				// 请输入订单标题
				if (!this.orderTitle || this.orderTitle.length > 20) {
					uni.showToast({
						title: '请输入正确的订单标题[20字以内]',
						icon: 'none'
					});
					return;
				}

				// 判断是否为条码支付
				// if (!this.$refs.payTestBarCode.getVisible() && (this.currentWayCode === 'WX_BAR' || this.currentWayCode ===
				// 		'ALI_BAR' || this.currentWayCode === 'AUTO_BAR')) {
				// 	this.$refs.payTestBarCode.showModal()
				// 	return
				// }
				this.mchOrderNo = 'M' + new Date().getTime() + Math.floor(Math.random() * (9999 - 1000) + 1000)
				const that = this
				payOrder({
					// jsapi 默认使用聚合二维码支付
					wayCode: (this.currentWayCode === 'WX_JSAPI' || this.currentWayCode === 'ALI_JSAPI') ?
						'QR_CASHIER' : this.currentWayCode, // 支付方式
					amount: this.paytestAmount, // 支付金额
					mchOrderNo: this.mchOrderNo, // 订单编号
					payDataType: this.currentPayDataType, // 支付参数（二维码，条码）
					linkId: this.linkId,
					divisionMode: this.divisionMode,
					orderTitle: this.orderTitle,
					userId: this.userId
				}).then(res => {
					console.log(res);
					console.log(res.data.payData);
					// let url = res.data.payData // URL是要跳转的外部地址 作为参数
					// uni.navigateTo({
					// 	url: '/pages/pay/pay-web?url=' + url
					// 	// page.json定义的路径 传url 到webview界面去接收 实现跳转
					// })
					// window.open(res.data.payData)
					window.location.href = res.data.payData
					// that.$refs.payTestModal.showModal(this.currentWayCode, res) // 打开弹窗
					// that.randomOrderNo() // 刷新订单号
				}).catch((err) => {
					console.log(err);
					// that.$refs.payTestBarCode.processCatch()
					// that.randomOrderNo() // 刷新订单号
				})
			}
		}
	}
</script>

<style>
	.pay {
		margin: 20rpx;
		margin-top: 0;
		padding-bottom: 300rpx;
	}

	.partner-bottom-button {
		margin: 20rpx;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 40rpx;
	}

	.pay-single-title {
		font-size: 20rpx;
		font-weight: 1000;
		/* width: 100rpx; */
		padding-bottom: 30rpx;
	}

	.pay-single {
		padding-top: 20rpx;
		border-bottom: 1px solid #dddddd;
		padding-bottom: 20rpx;
	}

	.pay-single-center {
		margin-bottom: 10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 500rpx;
	}

	.pay-flex1 {
		width: 300rpx;
	}

	.pay-single-block-single {
		border: 1px solid rgb(4, 190, 2);
		display: flex;
		align-items: center;
		padding: 20rpx;
		justify-content: space-between;
		color: rgb(4, 190, 2);
		border-radius: 5px;
	}

	.pay-single-block {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.pay-single-block-single2 {
		border: 1px solid #409eff;
		padding: 20rpx;
		width: 25%;
		text-align: center;
		border-radius: 5px;
		color: #409eff;
		margin-bottom: 30rpx;
	}

	.pay-active {
		background: #409eff;
		color: #ffffff;
	}
</style>
