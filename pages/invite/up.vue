<template>
	<view class="invite-page">
		<view class="invite-content" v-if="!seller">
			<view class="invite-qrCode">
				<uqrcode :text="link" :size="150" v-if="link"/>
			</view>
			<view class="invite-code">
				<view class="invite-code-tip">分享你的乘梯二维码或编号吧</view>
				<view class="invite-code-code" @click="copy">
					<text>{{data}}</text>
					<text class="iconfont" >&#xeb4e;</text>
				</view>
				<view class="invite-code-time">有效期至：{{time}}</view>
			</view>
		</view>
		<view  class="nop" v-else>
			<text class="iconfont">&#xe7d0;</text>
			<text>您暂无乘梯邀请权限~</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			link: null,
			data: null,
			time: '-',
			seller: false
		}
	},
	onLoad() {
		this.getData();
	},
	methods: {
		copy(){
			uni.setClipboardData({
				data: this.data,
				success: () => {
					this.$util.msg('复制成功');
				}
			})
		},
		async getData() {
			const res = await this.$get("/user/inviteCode", {}, {notToast: true});
			if(res.code == -1){
				this.seller = true;
			}else{
				let arr = res.data.split("_");
				this.data = arr[0];
				this.time = arr[1];
				console.log(arr[2])
				this.link = arr[2];
			}
		},
	}
}
</script>

<style scoped lang="scss">
	view,text{line-height: 1.8;}
page{
	background: #fff;
	width: 100%; height: 100%;
}
.invite-page {
	width: 100%;
	height: 100%;
}
.invite-content {
	padding-top: 60rpx;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
}
.invite-qrCode {
	background: url("@/static/images/share/bk.png") no-repeat;
	background-size: 100% 100%;
	display: flex;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	padding: 20rpx;
	width: 350rpx;
	height: 350rpx;
	.invite-qrCode-txt {
		color: #333333;
		text-align: center;
		font-size: 24rpx;
	}
}
.invite-code {
	justify-content: center;
	align-items: center;
	padding-top: 40rpx;
	.invite-code-tip {
		text-align: center;
		color: #333;
		font-size: 28rpx;
	}
	.invite-code-time {
		text-align: center;
		color: #999;
		font-size: 24rpx;
	}
	.invite-code-code {
		padding: 50rpx 0;
		letter-spacing: 20rpx;
		color: $base-color;
		text-align: center;
		font-size: 80rpx;
		font-weight: bold;
		.iconfont{
			color: #333;
		}
	}
}
.nop{
	font-size: 28rpx;
	color: #333;
	display: flex;
	flex-direction: column;
	text-align: center;
	margin-top: 200rpx;
	.iconfont{
		font-size: 80rpx;
		color: #333;
	}
	text{
		padding-top: 40rpx;
	}
}
</style>
