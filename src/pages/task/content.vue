<template>
	<view class="content">
		<view @click="shareTask" class="conten-share">
			<u-icon color="#ffffff" size="24" name="share"></u-icon>
			分享
		</view>
		<image class="content-image" :src="taskContent.image" mode=""></image>
		<view class="content-title">{{taskContent.title}}</view>
		<view class="content-price">佣金
			<text class="content-price-text">{{taskContent.price}}</text>
		</view>
		<view class="content-tag">
			标签：
			<view class="content-tag-type">{{taskContent.tag}}</view>
		</view>
		<view class="content-bottom">
			<view class="content-endtime">截止时间:{{filterTime(taskContent.taskTimeEnd)}}</view>
			<view v-if="taskContent.type === 0" class="content-type">系统任务</view>
			<view v-if="taskContent.type === 1" class="content-type">临时任务</view>
		</view>
		<u-tabs itemStyle="width:50%; height:100rpx;padding:0;border-bottom:1px solid #dddddd;" lineWidth="80" :list="list1" @click="changeTab"></u-tabs>
		<view v-show="showItem === 0" class="content-content">
			<u-parse :content="taskContent.content"></u-parse>
		</view>
		<view v-show="showItem === 1" class="content-detial">
			<view class="content-detial-text">初始保定金:{{taskContent.boundAmount}}</view>
			<view class="content-detial-text">可用保定金:{{taskContent.boundAmountSurplus}}</view>
			<view class="content-detial-text">已分配金额:{{taskContent.payAmount}}</view>
			<view class="content-detial-text">任务数量:{{taskContent.number === 0 ? '无限制' : taskContent.number}}</view>
			<view class="content-detial-text">完成数量:{{taskContent.numberComplete}}</view>
		</view>
		<view class="content-button">
			<u-button @click="handleInsertTask(taskContent.id)" shape="circle" type="primary" :text="buttonText()">
			</u-button>
		</view>
		<u-modal @confirm="showShare = false" :show="showShare" title="分享码" :content='taskContent.shareCode'></u-modal>
	</view>
</template>

<script>
	import {
		getTaskById
	} from '../../api/task.js';
	export default {
		data() {
			return {
				taskContent: {},
				list1: [{
					name: '任务内容',
				}, {
					name: '任务详情',
				}],
				showItem: 0,
				showShare: false
			}
		},
		onLoad(options) {
			if (options.id) {
				this.getTaskContent(options.id)
			} else {
				console.log('没有任务ID')
			}
		},
		methods: {
			getTaskContent(id) {
				let pram = {
					id: id
				}
				getTaskById(pram).then(res => {
					console.log(res);
					if (res && res.data) {
						this.taskContent = res.data
					}
				})
			},
			shareTask() {
				this.showShare = true
			},
			filterTime(time) {
				const date = new Date(time)
				const Y = date.getFullYear()
				const M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
				const D = date.getDate()
				return `${Y}-${M}-${D}`
			},
			buttonText() {
				return '立即领取(剩余' + this.taskContent.numberUnclaimed + '份)'
			},
			changeTab(item) {
				this.showItem = item.index
			},
			handleInsertTask(id) {
				uni.showToast({
					title: '您还没有会员权限',
					icon: 'none'
				});
			}
		}
	}
</script>

<style>
	.content {
		padding: 20rpx;
		padding-bottom: 200rpx;
		height: 100vh;
	}

	.content-image {
		width: 100%;
		border-radius: 20rpx;
	}

	.conten-share {
		width: 100rpx;
		height: 100rpx;
		background: #409eff;
		border-radius: 50%;
		font-size: 20rpx;
		color: #ffffff;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		flex-direction: column;
		position: fixed;
		bottom: 300rpx;
		right: 10rpx;
		z-index: 999;
	}

	.content-button {
		position: fixed;
		width: 90%;
		bottom: 50rpx;
		left: 0;
		right: 0;
		margin: auto;
		z-index: 999;
		height: 76rpx;
	}

	.content-title {
		margin: 20rpx;
		margin-left: 0;
		font-size: 36rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.content-price{
		color: #409eff;
	}
	.content-price-text{
		font-size: 60rpx;
		margin-left: 20rpx;
	}
	.content-bottom{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 20rpx;
		color: rgb(191, 191, 191);
		margin-top: 20rpx;
	}
	.content-content{
		margin-top: 20rpx;
	}
	.content-detial{
		margin-top: 20rpx;
	}
	.content-tag{
		display: flex;
		align-items: center;
		font-size: 20rpx;
		color: rgb(191, 191, 191);
		margin: 20rpx;
		margin-left: 0;
	}
	.content-detial-text{
		margin-bottom: 20rpx;
		background: #409eff;
		color: #ffffff;
		border-radius: 10rpx;
		padding: 20rpx;
	}
</style>
