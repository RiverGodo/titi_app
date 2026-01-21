<template>
	<view class="_me" v-if="init">
		<!-- <common-wx-header name="我的" /> -->
<!--		<view @click="$util.msg('敬请期待');" class="_me_flex">
			<text class="iconfont">&#xe7c5;</text>
			分享
		</view>-->
		<view class="_me_top w_flex_center">
			<view v-if="session.name" class="_me_t_l">
				<view class="_me_t_l_t w_flex_center">
					{{session.name}}
					<!-- <text @click="() => navTo('/pages/set/setting', {login: true})" class="iconfont">&#xeb8d;</text> -->
				</view>
				<view class="_me_t_l_b">
					SID: {{session.id}}
				</view>
			</view>
			<view v-else class="_me_t_l">
				<view @click="jumpLogin()" class="_me_t_l_t w_flex_center">
					登录
				</view>
			</view>
			<image class="_me_t_i" :src="session.logo? (cdn + session.logo) : (cdn + '/static/mine-logo.png')" />
		</view>
		<view class="_me_s1 w_flex_center">
			<view @click="navTo('/pages_store/money/money', {login: true})" class="_me_s1_s">
				<view class="_me_s1_s_t">{{balance.money}}</view>
				<view class="_me_s1_s_b">余额</view>
				<!-- <view class="_me_s1_s_flex">专享</view> -->
			</view>
			<view @click="navTo('/pages_store/money/bean', {login: true})" class="_me_s1_s">
				<view class="_me_s1_s_t">{{balance.bean}}</view>
				<view class="_me_s1_s_b">现金豆</view>
			</view>
			<view @click="navTo('/pages_store/ad/myAd/adBalance/adBalanceList', {login: true})" class="_me_s1_s">
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
				<view @click="selCard(1)"
					class="_me_s2_btn_s " :class="cardIndex === 1? 'single': ''">出售</view>
			</view>
		</view>
		<view class="_me_s3" v-if="cardIndex === 0">
			<view class="_me_s3_m w_flex_center">
				<view @click="navTo('/pages_store/order/buyOrder/orderList', {login: true})" class="_me_s3_m_s">
					<image src="/static/images/ad/buy/all.png"/>
					<view class="_me_s3_m_s_t">全部</view>
				</view>
				<view @click="navTo('/pages_store/order/buyOrder/orderList?s=0', {login: true})" class="_me_s3_m_s">
					<image src="/static/images/ad/buy/wait.png"/>
					<view class="_me_s3_m_s_t">待付款</view>
<!--					<view class="_me_s3_m_s_flex">10</view>-->
				</view>
				<view @click="navTo('/pages_store/order/buyOrder/orderList?s=1', {login: true})" class="_me_s3_m_s">
					<image src="/static/images/ad/buy/success.png"/>
					<view class="_me_s3_m_s_t">已完成</view>
				</view>
				<view @click="navTo('/pages_store/order/buyOrder/orderList?s=2', {login: true})" class="_me_s3_m_s">
					<image src="/static/images/ad/buy/cancel.png"/>
					<view class="_me_s3_m_s_t">已取消</view>
				</view>
			</view>
		</view>
		<view class="_me_s3" v-if="cardIndex === 1">
			<view class="_me_s3_m w_flex_center">
				<view @click="navTo('/pages_store/order/saleOrder/orderList', {login: true})" class="_me_s3_m_s">
					<image src="/static/images/ad/sale/all.png"/>
					<view class="_me_s3_m_s_t">全部</view>
				</view>
				<view @click="navTo('/pages_store/order/saleOrder/orderList?s=1', {login: true})" class="_me_s3_m_s">
					<image src="/static/images/ad/sale/wait.png"/>
					<view class="_me_s3_m_s_t">待成交</view>
				</view>
				<view @click="navTo('/pages_store/order/saleOrder/orderList?s=2', {login: true})" class="_me_s3_m_s">
					<image src="/static/images/ad/sale/part.png"/>
					<view class="_me_s3_m_s_t">部分成交</view>
				</view>
				<view @click="navTo('/pages_store/order/saleOrder/orderList?s=3', {login: true})" class="_me_s3_m_s">
					<image src="/static/images/ad/sale/success.png"/>
					<view class="_me_s3_m_s_t">完全成交</view>
				</view>
			</view>
		</view>
		<view  class="_me_s4 w_flex_center">
			<text class="iconfont">&#xe625;</text>
			<view class="_me_s4_m">
				<view class="_me_s4_m_t">我是用户</view>
				<view class="_me_s4_m_b">切换用户，享受更多优惠哦</view>
			</view>
			<view @click="changeRole(0)" class="_me_s4_r">
				切换
			</view>
		</view>
		<view class="_me_s5">
			<view class="_me_s5_t">我的服务</view>
			<view class="_me_s5_m w_flex_start">
				<view @click="navTo('/pages_store/merchant/cash/cashList', {login: true})" class="_me_s5_m_s">
					<text class="iconfont">&#xe635;</text>
					<view class="_me_s5_m_s_t">
						现金券管理
					</view>
				</view>
				<view @click="navTo('/pages_store/cash/myCash/myCash', {login: true})" class="_me_s5_m_s">
					<text class="iconfont">&#xe627;</text>
					<view class="_me_s5_m_s_t">
						我的现金券
					</view>
				</view>
				<view @click="navTo('/pages_store/merchant/apply/shop_exchange', {login: true})" class="_me_s5_m_s">
					<text class="iconfont">&#xe6a0;</text>
					<view class="_me_s5_m_s_t">
						账号信息
					</view>
				</view>
<!--				<view @click="$util.msg('敬请期待');" style="margin-right: 0;" class="_me_s5_m_s">
					<text class="iconfont">&#xe612;</text>
					<view class="_me_s5_m_s_t">
						资质管理
					</view>
				</view>-->
<!--				<view @click="navTo(`/pages/worker/apply${session.isChecking? '?check=1': ''}`, {login: true})"
					v-if="session.companyId <= 0 || session.isChecking" class="_me_s5_m_s">
					<text class="iconfont">&#xe612;</text>
					<view class="_me_s5_m_s_t">
						申请记录
					</view>
				</view>-->
<!--				<view class="_me_s5_m_s">
					<text class="iconfont">&#xe612;</text>
					<view class="_me_s5_m_s_t">
						电子合同协议
					</view>
				</view>-->
<!--				<view @click="navTo('/pages_store/ad/myAd/adInfo/adInfo', {login: true})" class="_me_s5_m_s">
					<text class="iconfont">&#xe612;</text>
					<view class="_me_s5_m_s_t">
						广告信息
					</view>
				</view>-->
				<view @click="logout" v-if="session.name" class="_me_s5_m_s">
					<text class="iconfont">&#xe651;</text>
					<view class="_me_s5_m_s_t">
						退出登录
					</view>
				</view>
			</view>
		</view>
		<tabbar ref="tabbars" index="4"></tabbar>
	</view>
</template>

<script>
	import CommonWxHeader from "../../components/common-wx-header/common-wx-header.vue";
	import tabbar from "@/pages_store/components/tabbar/tabbar.vue"
	export default {
		data() {
			return {
				cardIndex: 0,
				session: {},
				init: false,
				balance: {
					money: "--",
					bean: "--",
					adCardNum: "--",
				},
				worker: false,
				property: false,
				seller: false,
				cdn: this.$cdn,
				backImg: this.$cdn + '/static/mine-back1.png'
			};
		},
		onShow() {
			this.getData();
		},
		mounted() {
			// #ifdef H5
			// 隐藏头部返回按钮
			let ad = document.getElementsByClassName('uni-page-head-hd')[0]
			ad.style.display = 'none'
			// #endif
		},
		methods: {
			selCard(index){
				this.cardIndex = index;
			},
			async logout() {
				await this.$post('/user/logout');
				this.$store.commit('logout');
				this.getData(true);
			},
			changeRole(role){
				this.$store.commit('setRole', role);
				this.navTo('/pages/bar/mine?type=switch',{login: true});
			},
			getData() {
				this.getSession();
			},
			//获取用户信息
			async getSession() {
				const res = await this.$get('/seller/get');
				if(res.data){
					this.session = res.data;
				}else{
					this.session = {}
				}
				this.init = true;
				if (res.data) {
					await this.getBalance();
				} else {
					this.balance = {
						money: "--",
						bean: "--",
						adCardNum: "--",
					};
				}
			},
			//获取余额
			async getBalance() {
				const res = await this.$get('/seller/wallet/balance');
				this.balance = res.data;
				this.balance.adCardNum = res.data.adCardNum * 1 + res.data.adCardGaveNum * 1
			},
			jumpLogin() {
				this.navTo("/pages/auth/login")
			}
		},
		components: {
			CommonWxHeader,
			tabbar
		}
	}
</script>

<style lang="scss" scoped>
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
				image{
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
		padding: 30rpx;
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
				&:nth-child(4n){
					margin-right: 0;
				}
				.iconfont{
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