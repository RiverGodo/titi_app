<template>
	<view class="_me" v-if="init">
		<!-- <common-wx-header name="我的" /> -->
		<!--		<view @click="$util.msg('敬请期待');" class="_me_flex">
			<text class="iconfont">&#xe7c5;</text>
			分享
		</view>-->
		<view class="_me_top w_flex_center">
			<view v-if="session.isLogin" class="_me_t_l">
				<view class="_me_t_l_t w_flex_center">
					{{session.nickName}}
					<text @click="() => navTo('/pages/set/setting', {login: true})" class="iconfont">&#xeb8d;</text>
				</view>
				<view class="_me_t_l_b">
					UID: {{session.id}}
				</view>
			</view>
			<view v-else class="_me_t_l">
				<view @click="jumpLogin()" class="_me_t_l_t w_flex_center">
					登录
				</view>
			</view>
			<image class="_me_t_i" :src="session.headImg? (cdn + session.headImg) : (cdn + '/static/mine-logo.png')">
			</image>
		</view>
		<view class="_me_s1 w_flex_center">
			<view @click="navTo('/pages/money/money', {login: true})" class="_me_s1_s">
				<view class="_me_s1_s_t">{{balance.money}}</view>
				<view class="_me_s1_s_b">余额</view>
			</view>
			<view @click="navTo('/pages/money/points', {login: true})" class="_me_s1_s">
				<view class="_me_s1_s_t">{{balance.points}}</view>
				<view class="_me_s1_s_b">积分</view>
			</view>
			<view @click="navTo('/pages/ad/myAd/adBalance/adBalanceList', {login: true})" class="_me_s1_s">
				<view class="_me_s1_s_t">{{balance.adCardNum}}</view>
				<view class="_me_s1_s_b">广告卡</view>
			</view>
		</view>
		<view class="_me_s2 w_flex_center"
			:style="'background-image: url('+ backImg +');background-size: 100% 100%;background-repeat: no-repeat;'">
			<text class="_me_s2_i iconfont">&#xe62d;</text>
			广告卡订单
			<view class="_me_s2_btn w_flex_center">
				<view @click="selCard(0)" class="_me_s2_btn_s" :class="cardIndex === 0? 'single': ''">购买
				</view>
				<view class="line">|</view>
				<view @click="selCard(1)" class="_me_s2_btn_s " :class="cardIndex === 1? 'single': ''">出售</view>
			</view>
		</view>
		<view class="_me_s3" v-if="cardIndex === 0">
			<view class="_me_s3_m w_flex_center">
				<view @click="navTo('/pages/order/buyOrder/orderList', {login: true})" class="_me_s3_m_s">
					<image src="/static/images/ad/buy/all.png" />
					<view class="_me_s3_m_s_t">全部</view>
				</view>
				<view @click="navTo('/pages/order/buyOrder/orderList?s=0', {login: true})" class="_me_s3_m_s">
					<image src="/static/images/ad/buy/wait.png" />
					<view class="_me_s3_m_s_t">待付款</view>
					<!--					<view class="_me_s3_m_s_flex">10</view>-->
				</view>
				<view @click="navTo('/pages/order/buyOrder/orderList?s=1', {login: true})" class="_me_s3_m_s">
					<image src="/static/images/ad/buy/success.png" />
					<view class="_me_s3_m_s_t">已完成</view>
				</view>
				<view @click="navTo('/pages/order/buyOrder/orderList?s=2', {login: true})" class="_me_s3_m_s">
					<image src="/static/images/ad/buy/cancel.png" />
					<view class="_me_s3_m_s_t">已取消</view>
				</view>
			</view>
		</view>
		<view class="_me_s3" v-if="cardIndex === 1">
			<view class="_me_s3_m w_flex_center">
				<view @click="navTo('/pages/order/saleOrder/orderList', {login: true})" class="_me_s3_m_s">
					<image src="/static/images/ad/sale/all.png" />
					<view class="_me_s3_m_s_t">全部</view>
				</view>
				<view @click="navTo('/pages/order/saleOrder/orderList?s=1', {login: true})" class="_me_s3_m_s">
					<image src="/static/images/ad/sale/wait.png" />
					<view class="_me_s3_m_s_t">待成交</view>
				</view>
				<view @click="navTo('/pages/order/saleOrder/orderList?s=2', {login: true})" class="_me_s3_m_s">
					<image src="/static/images/ad/sale/part.png" />
					<view class="_me_s3_m_s_t">部分成交</view>
				</view>
				<view @click="navTo('/pages/order/saleOrder/orderList?s=3', {login: true})" class="_me_s3_m_s">
					<image src="/static/images/ad/sale/success.png" />
					<view class="_me_s3_m_s_t">完全成交</view>
				</view>
			</view>
		</view>

		<view v-if="seller && seller.status === 1" class="_me_s4 w_flex_center">
			<text class="iconfont">&#xe632;</text>
			<view class="_me_s4_m">
				<view class="_me_s4_m_t">我是商户</view>
				<view class="_me_s4_m_b">赶紧切换商户模式查看今天经营状况吧</view>
			</view>
			<view @click="changeRole(1)" class="_me_s4_r">
				切换
			</view>
		</view>
		<view class="_me_s5">
			<view class="_me_s5_t">我的服务</view>
			<view class="_me_s5_m w_flex_start">
				<view v-if="!property" @click="navTo('/pages/invite/up', {login: true})" class="_me_s5_m_s">
					<text class="iconfont">&#xe682;</text>
					<view class="_me_s5_m_s_t">
						乘梯邀请
					</view>
				</view>
				<view @click="navTo('/pages/money/bank', {login: true})" class="_me_s5_m_s">
					<text class="iconfont">&#xe63a;</text>
					<view class="_me_s5_m_s_t">
						银行卡
					</view>
				</view>
				<view @click="navTo('/pages/money/withdraw', {login: true})" class="_me_s5_m_s">
					<text class="iconfont">&#xe631;</text>
					<view class="_me_s5_m_s_t">
						提现
					</view>
				</view>
				<view @click="wait" class="_me_s5_m_s">
					<text class="iconfont">&#xe62b;</text>
					<view class="_me_s5_m_s_t">
						智能助理
					</view>
				</view>
				<view @click="navTo(`/pages/worker/apply${session.isChecking? '?check=1': ''}`, {login: true})"
					v-if="session.companyId <= 0 || session.isChecking" class="_me_s5_m_s">
					<text class="iconfont">&#xe818;</text>
					<view class="_me_s5_m_s_t">
						员工入驻
					</view>
				</view>
				<view @click="jumpSeller" v-if="!seller || seller.status !== 1" class="_me_s5_m_s">
					<text class="iconfont">&#xe811;</text>
					<view class="_me_s5_m_s_t">
						商家入驻
					</view>
				</view>
				<view @click="navTo('/pages/manager/company')" v-if="!session.isChecking && session.companyId"
					class="_me_s5_m_s">
					<text class="iconfont">&#xe679;</text>
					<view class="_me_s5_m_s_t">
						我的公司
					</view>
				</view>
				<view v-if="property" @click="navTo('/pages/manager/property')" class="_me_s5_m_s">
					<text class="iconfont">&#xe6af;</text>
					<view class="_me_s5_m_s_t">
						物业中心
					</view>
				</view>
				<view class="_me_s5_m_s" @click="navTo('/pages/income/incomeList',{login: true})">
					<text class="iconfont">&#xe6b6;</text>
					<view class="_me_s5_m_s_t">
						我的收益
					</view>
				</view>
				<view @click="navTo('/pages/cash/myCash/myCash', {login: true})" class="_me_s5_m_s">
					<text class="iconfont">&#xe627;</text>
					<view class="_me_s5_m_s_t">
						我的现金券
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import CommonWxHeader from "../../components/common-wx-header/common-wx-header.vue";

	export default {
		data() {
			return {
				cardIndex: 0,
				session: {},
				init: false,
				balance: {
					money: "--",
					points: "--",
					adCardNum: '--',
				},
				worker: false,
				property: false,
				seller: false,
				cdn: this.$cdn,
				backImg: this.$cdn + '/static/mine-back1.png',
				environment: process.env.NODE_ENV
			};
		},
		// watch: {
		// 	'$route'(to, from) {
		// 		if (to.path === "/pages/bar/mine") {
		// 			this.getData();
		// 		}
		// 	}
		// },
		onShow() {
			this.getData();
		},
		methods: {
			selCard(index) {
				this.cardIndex = index;
			},
			changeRole(role) {
				this.$store.commit('setRole', role);
				this.navTo('/pages_store/bar/mine', {login: true})
			},
			jumpSeller() {
				if (this.seller) {
					let status = this.seller.status;
					let reason = this.seller.backReason;
					if (status === 0) {
						uni.redirectTo({
							url: "/pages/auth/check"
						})
					} else if (status === 2) {
						uni.redirectTo({
							url: "/pages/auth/check?r=" + reason
						})
					}
				} else {
					this.navTo('/pages/merchant/apply/shop_select_category', {
						login: true
					})
				}
			},
			getData() {
				this.getSession();
				this.getSeller();
				this.getProperty();
			},
			async getProperty() {
				const res = await this.$get('/user/checkIsProperty');
				this.property = res.data;
			},
			async getSeller() {
				const res = await this.$get('/seller/get');
				this.seller = res.data;
			},
			//获取用户信息
			async getSession() {
				const res = await this.$get('/user/session');
				this.session = res.data;
				this.$store.commit('setUserInfo', res.data);
				this.init = true;
				if (this.session.isLogin) {
					await this.getBalance();
				} else {
					this.balance = {
						money: "--",
						points: "--",
						adCardNum: '--',
					};
				}
			},
			//获取余额
			async getBalance() {
				const res = await this.$get('/wallet/balance');
				this.balance = res.data;
			},
			jumpService() {
				uni.showModal({
					title: '温馨提示',
					content: '请直接联系客服进行充值，感谢您的支持！',
					showCancel: false,
					confirmColor: "#FC5C39",
					success: (res) => {
						if (res.confirm) {
							this.navTo("/pages/set/service")
						}
					}
				});
			},
			jumpLogin() {
				this.navTo("/pages/auth/login")
			}
		},
		components: {
			CommonWxHeader
		}
	}
</script>

<style lang="scss" scoped>
	.temp {
		height: 60rpx;
	}

	._me {
		padding-bottom: 140rpx;
	}

	._me_flex {
		display: flex;
		z-index: 999;
		width: 100rpx;
		height: 100rpx;
		background: #01CF79;
		border-radius: 50%;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #FFFFFF;
		// line-height: 31rpx;
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: space-evenly;
		align-items: center;
		position: fixed;
		right: 23rpx;
		bottom: 125rpx;
	}

	._me {
		margin: 0 20rpx;
	}

	._me_top {
		justify-content: space-between;
		margin: 0 25rpx;

		._me_t_l {
			._me_t_l_t {
				font-size: 48rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #000000;

				.iconfont {
					font-size: 40rpx;
					margin-left: 18rpx;
				}
			}

			._me_t_l_b {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #000000;
				margin-top: 29rpx;
			}
		}

		._me_t_i {
			width: 140rpx;
			height: 140rpx;
			border-radius: 50%;
			// margin-right: 25rpx;
		}

	}

	._me_s1 {
		justify-content: space-around;
		text-align: center;
		margin-top: 58rpx;

		._me_s1_s {
			position: relative;

			._me_s1_s_t {
				font-size: 38rpx;
				font-family: Arial;
				font-weight: bold;
				color: #000000;
				margin-bottom: 18rpx;
			}

			._me_s1_s_b {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #969696;
			}

			._me_s1_s_flex {
				position: absolute;
				z-index: 2;
				width: 60rpx;
				height: 30rpx;
				background: #FC5531;
				border-radius: 15rpx 15rpx 15rpx 0rpx;
				font-size: 18rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FEFEFE;
				right: -50rpx;
				top: -16rpx;
				line-height: 30rpx;
			}
		}
	}

	._me_s2 {
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #FFFFFF;
		height: 117.9rpx;
		border-radius: 20rpx 20rpx 0 0;
		margin-top: 38rpx;

		._me_s2_i {
			font-weight: lighter;
			margin-left: 35rpx;
			margin-right: 14rpx;
			font-size: 50rpx;
		}

		._me_s2_btn {
			// width: 160rpx;
			height: 60rpx;
			// background: linear-gradient(180deg, #01D584, #02C15F);
			border-radius: 30rpx;
			text-align: center;
			line-height: 60rpx;
			margin-left: auto;
			margin-right: 35rpx;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #FFFFFF;

			._me_s2_btn_s {
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #FFFFFF;
			}

			.single {
				color: #01CF79;
				border-bottom: 2px solid #01CF79;
				padding-bottom: 17rpx;
				margin-top: 20rpx;
			}

			.line {
				margin: 0 20rpx;
			}
		}
	}

	._me_s3 {
		background: #FFFFFF;
		border-radius: 0rpx 0rpx 20rpx 20rpx;

		._me_s3_t {
			justify-content: space-between;
			margin-left: 28rpx;
			margin-right: 35rpx;
			padding-top: 29rpx;

			._me_s3_t_l {
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #000000;
			}

			._me_s3_t_r {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #969696;
			}
		}

		._me_s3_m {
			justify-content: space-around;
			text-align: center;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #969696;
			padding-bottom: 36rpx;
			padding-top: 46rpx;

			.iconfont {
				color: #01CF79;
				font-size: 50rpx;
			}

			._me_s3_m_s {
				flex: 1;
				position: relative;

				image {
					width: 50rpx;
					height: 50rpx;
				}
			}

			._me_s3_m_s_t {
				margin-top: 22rpx;
				// margin-bottom: 36rpx;
			}

			._me_s3_m_s_flex {
				width: 22rpx;
				height: 22rpx;
				background: #FC5531;
				border-radius: 50%;
				font-size: 16rpx;
				font-family: Arial;
				font-weight: 400;
				color: #FEFEFE;
				text-align: center;
				line-height: 22rpx;
				position: absolute;
				z-index: 2;
				right: 0;
				top: -10rpx;
			}
		}
	}

	._me_s4 {
		background: #FFFFFF;
		border-radius: 20rpx;
		margin-top: 29rpx;

		padding: 35rpx 25rpx;

		.iconfont {
			color: #000;
			font-size: 70rpx;
			margin-right: 17rpx;
		}

		._me_s4_m {
			._me_s4_m_t {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #23283B;
				margin-bottom: 6rpx;
			}

			._me_s4_m_b {
				font-size: 24rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #969696;
			}
		}

		._me_s4_r {
			width: 121rpx;
			height: 50rpx;
			background: #FD4D36;
			border-radius: 25rpx;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
			line-height: 50rpx;
			margin-left: auto;
		}
	}

	._me_s5 {
		background: #FFFFFF;
		border-radius: 20rpx;
		padding-top: 31rpx;
		padding-left: 27rpx;
		padding-right: 31rpx;
		padding-bottom: 39rpx;
		margin-top: 26rpx;

		._me_s5_t {
			font-size: 32rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #000000;
			margin-bottom: 56rpx;
		}

		._me_s5_m {
			// justify-content: space-between;
			text-align: center;
			flex-wrap: wrap;

			._me_s5_m_s {
				width: 155rpx;
				margin-right: 10rpx;
				margin-bottom: 60rpx;

				&:nth-child(4n) {
					margin-right: 0;
				}
			}

			.iconfont {
				font-size: 50rpx;
			}

			._me_s5_m_s_t {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #000000;
				margin-top: 34rpx;
			}
		}
	}
</style>