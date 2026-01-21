<template>
	<view class="partner">
		<image class="partner-image" :src="partnerUrl" mode=""></image>
		<view class="partner-button">
			<u-button size="large" :hairline="false" type="success" shape="circle"
				color="linear-gradient(to bottom, rgb(118, 241, 187), rgb(118, 241, 239))" text="申请合伙省总督"
				@click="handleJump('province-partner')"></u-button>
			<view style="width: 50rpx;"></view>
			<u-button size="large" :hairline="false" type="success" shape="circle"
				color="linear-gradient(to bottom, rgb(118, 241, 187), rgb(118, 241, 239))" text="申请城市合伙人"
				@click="handleJump('city-partner')"></u-button>
		</view>
	</view>
</template>

<script>
	import mix from "../../common/mixin.js"
	import {
		socialAuthUserInfo
	} from '../../api/auth'
	import {
		getUserInfo
	} from '@/api/user'
	export default {
		data() {
			return {
				partnerUrl: mix.imageUrl + 'wx/1d8d1ac573cc176e5e3efb8cb00b5ca0fefee0da71e021e69631faed80a6a993.jpg',
				appid: 'wx4cdf9306457bda2e',
				userId:undefined,
				userInfo:{}
			}
		},
		created() {
			if (!this.hasLogin) {
				uni.setStorageSync('returnPath', "/pages/partner/partner")
				uni.$u.route('/pages/login/social')
			}else{
				getUserInfo().then(res => {
					this.userInfo = res.data
					if(this.userInfo.sysID){
						uni.$u.route('/pages/pay/pay?id=' + this.userInfo.id + '&linkId=' + this.userInfo.sysID)
					}
				})
			}
		},
		computed: {
			hasLogin() {
				return this.$store.getters.hasLogin
			}
		},
		methods: {
			handleJump(page) {
				if (this.userInfo.id) {
					uni.$u.route('/pages/partner/' + page + "?id=" + this.userInfo.id)
				}else{
					uni.setStorageSync('returnPath', "/pages/partner/partner")
					uni.$u.route('/pages/login/social')
				}
			}
		}
	}
</script>

<style>
	.partner-image {
		width: 100%;
		height: 100%;
	}

	.partner {
		width: 100vw;
		height: 100vh;
	}

	.partner-button {
		position: fixed;
		bottom: 50rpx;
		left: 0;
		right: 0;
		margin: auto;
		display: flex;
		margin: 25rpx;
	}
</style>
