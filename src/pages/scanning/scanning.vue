<template>
	<view>
		<scanQrcode ref="qrcode" @scanOver='codeSuccess'></scanQrcode>
		<tabbar index="2"></tabbar>
	</view>
</template>

<script>
	var _this, js;
	export default {
		data() {
			return {
				// 计时器时间
				countTime: 0,
				// 计时器对象
				countTimer: null
			}
		},
		methods: {
			scanCode() {
				_this = this
				uni.scanCode({
					scanType: ['qrCode'],
					success: function(res) {
						_this.codeSuccess(res)
					},
					fail: function(err) {
						console.log(err, 'err');
						uni.showToast({
							title: '请扫正确的二维码',
							icon: 'none'
						})
						// uni.switchTab({
						// 	url: '/pages/index/index'
						// })
					}
				})
			},
			//防抖功能
			codeSuccess(res) {
				console.log(res, 'codeSuccess');
				// 函数执行时先判断时间
				if (this.countTime >= 10) {
					// 利用 return 终止函数继续运行
					return false;
				}
				// 开始计时
				this.countTimer = setInterval(() => {
					if (this.countTime >= 500) {
						this.countTime = 0;
						clearInterval(this.countTimer);
						return;
					}
					this.countTime += 10;
				}, 10);
				// 执行逻辑
				// console.log(e);
				if(res.decodedText){
					res.result = res.decodedText
				}
				_this = this
				// 数组第一位判断类型，0楼层码，1临时码，2注册码
				// 数组第二位为楼层索引，即第几楼
				// 数组第二位之后为大厅广告机编码，有多个，前端发送时挑选大厅广告机随机发送
				if (res && res.result) {
					let result = JSON.parse(res.result)
					if (Array.isArray(result)) {
						if (_this.hasLogin) {
							uni.$u.route('/pages/elevator/elevator?data=' + res.result)
						} else {
							if (result[0] === 0) {
								uni.$u.route('/pages/elevator/elevator?data=' + res.result)
							} else {
								uni.$u.route('/pages/login/register?data=' + res.result)
							}
						}
					} else {
						uni.showToast({
							title: '请扫正确的二维码',
							icon: 'none'
						})
					}
				} else {
					uni.showToast({
						title: '请扫正确的二维码',
						icon: 'none'
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
		onShow: function() {
			// this.scanCode()
		},
		onTabItemTap: function() {
			// this.scanCode()
		},
		onLoad() {
			// this.scanCode()
		}
	}
</script>

<style>

</style>
