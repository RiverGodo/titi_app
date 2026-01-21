<template>
	<view class="container">
		<view v-if="!taskList.length" class="cart-empty">
			<u-empty mode="list" width="500rpx" height="500rpx" icon="/static/images/empty/list.png"></u-empty>
		</view>
		<view v-if="taskList.length" class="task-list">
			<view v-for="(item,index) in taskList" :key="index" class="task-list-for">
				<image class="task-list-image" :src="item.image" mode=""></image>
				<view class="task-list-bottom">
					<view class="task-list-bottom-title">{{item.title}}</view>
					<view class="task-list-bottom-top">
						<view class="task-list-bottom-top-left">
							佣金
							<text class="task-list-bottom-top-left-text">{{item.price}}</text>
						</view>
						<view class="task-list-bottom-top-right">
							<u-button :custom-style="popupButtomButton3" @click="handleInsertTask(item.id)"
								shape="circle" type="primary" text="进行中"></u-button>
						</view>
					</view>
					<view class="task-list-bottom-end">
						<view class="task-list-bottom-end-left">
							截止时间:{{filterTime(item.taskTimeEnd)}}
						</view>
						<view class="task-list-bottom-end-right">
							{{item.numberComplete}}人已完成
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 		<view class="login-tips-box">
			<view class="login-tips">
				<navigator url="/pages/login/mobile" open-type="navigate" hover-class="none">
					<text class="login-link">登录</text>
				</navigator>
				<text>查看任务</text>
			</view>
		</view> -->
		<tabbar index="3"></tabbar>
	</view>
</template>

<script>
	import {
		getTaskList
	} from '../../api/task.js';
	export default {
		data() {
			return {
				title: '',
				taskList: [],
				popupButtomButton3: {
					width: '200rpx',
					height: '60rpx'
				},
			}
		},
		onShow() {
			// if (this.hasLogin) {
			// 	this.handleTaskList();
			// } else {
			// 	this.taskList = []
			// }
			this.handleTaskList();
		},
		methods: {
			handleTaskList() {
				let pram = {
					// memberId: this.userInfo.id
				}
				getTaskList(pram).then(res => {
					if (res && res.data.list.length) {
						this.taskList = res.data.list
					}
				})
			},
			handleInsertTask(id) {
				if (this.hasLogin) {
					uni.$u.route('/pages/task/content?id=' + id)
				} else {
					uni.$u.route('/pages/login/social')
				}
			},
			filterTime(time) {
				const date = new Date(time)
				const Y = date.getFullYear()
				const M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
				const D = date.getDate()
				return `${Y}-${M}-${D}`
			}
		},
		computed: {
			hasLogin() {
				return this.$store.getters.hasLogin
			},
			userInfo() {
				return this.$store.getters.userInfo
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-bottom: 120rpx;
	}

	.cart-empty {
		padding-top: 100rpx;
	}

	.login-tips-box {
		padding-top: 100rpx;

		.login-tips {
			@include flex-center;
			color: #939393;
			font-size: 28rpx;
			letter-spacing: 5rpx;
		}

		.login-link {
			color: $u-primary;
		}
	}

	.task-list {
		padding-bottom: 40rpx;
	}

	.task-list-for {
		// border: 1px solid #bfbfbf;
		margin: 30rpx;
		overflow: hidden;
		border-radius: 10px;
		-moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		-webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	.task-list-image {
		width: 100%;
		height: 380rpx;
	}

	.task-list-bottom-title {
		margin: 20rpx;
		font-size: 36rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.task-list-bottom-top {
		display: flex;
		align-items: flex-end;
		margin: 20rpx;
		justify-content: space-between;
	}

	.task-list-bottom-end {
		display: flex;
		align-items: flex-end;
		margin: 20rpx;
		justify-content: space-between;
		font-size: 20rpx;
		color: rgb(191, 191, 191);
	}

	.task-list-bottom-top-left {
		color: #409eff;
	}

	.task-list-bottom-top-left-text {
		font-size: 60rpx;
		margin-left: 20rpx;
	}
</style>
