<template>
	<view class="_main">
		<view>
			<view class="_main_list">
				<text>头像</text>
				<img @click="handleUploadImg" class="head_img" :src="headImg? (cdn + headImg) :  (cdn + '/logo.png')" alt="">
			</view>
			<view class="_main_list">
				<text>昵称</text>
				<input class="_main_list_input" placeholder="请输入昵称" v-model="nickName" />
			</view>
		</view>
		<mix-button ref="confirmBtn" text="确认修改" marginTop="80rpx" @onConfirm="confirm"></mix-button>
		<mix-loading v-if="isLoading" :mask="true"></mix-loading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cdn: this.$cdn,
				headImg: '',
				nickName: ''
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				this.headImg = this.$store.state.userInfo.headImg
				this.nickName = this.$store.state.userInfo.nickName
			},
			async confirm() {
				if (this.headImg && this.nickName) {
					const returnImg = await this.$get('/user/changeHeadImg', {
						img: this.headImg
					});
					const returnName = await this.$get('/user/changeNickName', {
						nickName: this.nickName
					});
					let userData = {
						...this.$store.state.userInfo,
						headImg: this.headImg,
						nickName: this.nickName
					}
					this.$store.commit('setUserInfo', userData);
					this.$util.msg('修改成功');
					setTimeout(() => {
						uni.switchTab({
							url: "/pages/bar/mine"
						})
					}, 1000)
				} else {
					this.$util.msg('请填写信息');
					this.$refs.confirmBtn.stop();
				}
			},
			handleUploadImg() {
				this.chooseLoginImage((file) => {
					this.headImg = file
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	view,text{line-height: 1.8;}
	._me_tc {
		text-align: center;
		padding: 30rpx 0;
		margin: 50rpx 40rpx 0 40rpx;
		font-size: 30rpx;
		color: #fff;
		background: $base-color;
	}

	._main_list {
		font-size: 28rpx;
		padding: 30rpx 30rpx;
		background-color: #fff;
		border-bottom: 1px solid #F3F3F3;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.iconfont {
			color: #999;
			padding-right: 20rpx;
			font-size: 40rpx;
		}

		.head_img {
			width: 80rpx;
			height: 80rpx;
		}

		._main_list_input {
			text-align: right;
		}
	}
</style>