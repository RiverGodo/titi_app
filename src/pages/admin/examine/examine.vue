<template>
	<view class="examine">
		<view class="admin-floor-top">
			<u-search :showAction="true" placeholder="请输入人员名称" @search="handleExamineList()"
				@custom="handleExamineList()" v-model="nickname"></u-search>
		</view>
		<view class="examine-list">
			<view v-for="(item, index) in indexList" :key="index" class="examine-list-single">
				<u-avatar :custom-style="popupButtomButton3" shape="square" size="35" :src="item.avatar"></u-avatar>
				<view class="examine-list-single-text">{{item.nickname}}</view>
				<u-button v-if="item.roleId === 121 && item.roleId !== 122" :custom-style="popupButtomButton"
					@click="closeExamine(2,item.id)" size="small" type="success" :plain="true" text="启用">
				</u-button>
				<u-button v-if="item.roleId === 2 && item.roleId !== 122" :custom-style="popupButtomButton"
					@click="closeExamine(121,item.id)" size="small" type="warning" :plain="true" text="禁用">
				</u-button>
				<view style="margin-right: 20rpx;" v-if="item.roleId === 1">超级管理员</view>
				<view style="margin-right: 20rpx;" v-else-if="item.roleId === 122">公司管理员</view>
				<u-button v-else :custom-style="popupButtomButton" @click="changeRole(item.id)" size="small"
					type="warning" :plain="true" text="设置管理员">
				</u-button>
			</view>
		</view>
		<u-modal :showCancelButton="true" @cancel="show = false" @confirm="confirm" :show="show" :title="title"
			:content='content'></u-modal>
	</view>
</template>

<script>
	import {
		examineList,
		updateStatus
	} from '../../../api/admin.js';
	import {
		updateReadAll
	} from '@/api/message.js'
	export default {
		data() {
			return {
				show: false,
				title: '设置管理员',
				content: '确定要将此人设置为管理员么？此操作将会解除你的管理员权限',
				changeId: 0,
				nickname: '',
				indexList: [

				],
				popupButtomButton: {
					width: '20rpx'
				},
				popupButtomButton3: {
					marginLeft: '20rpx',
					marginRight: '20rpx'
				}
			}
		},
		onLoad() {
			this.handleExamineList();
		},
		mounted() {
			updateReadAll().then(res => {
				// console.log(res);
				uni.setStorageSync('message', 0)
			})
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
			confirm() {
				updateStatus({
					id: this.changeId,
					roleId: 122
				}).then(res => {
					if (this.userInfo.roleId === 1) {
						uni.showToast({
							title: '审核成功'
						});
						this.show = false
						this.handleExamineList()
					} else {
						updateStatus({
							id: this.userInfo.id,
							roleId: 2
						}).then(res => {
							uni.showToast({
								title: '转移成功，请重新登录'
							});
							this.$store.dispatch('Logout')
							uni.switchTab({
								url: '/pages/user/user'
							})
						})
					}
				})
			},
			changeRole(changeId) {
				this.changeId = changeId
				this.show = true
			},
			closeExamine(roleId, changeId) {
				// console.log('close');
				updateStatus({
					fromId: this.userInfo.id,
					id: changeId,
					roleId: roleId
				}).then(res => {
					uni.showToast({
						title: '审核成功'
					});
					this.handleExamineList()
				})
			},
			handleExamineList() {
				examineList({
					companyId: this.userInfo.companyId,
					nickname: this.nickname
				}).then(res => {
					if (res.code === 0) {
						this.indexList = res.data.list
					}
				})
			}
		}
	}
</script>

<style>
	.admin-floor-top {
		margin: 0 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.examine-list-single {
		display: flex;
		align-items: center;
		width: 100%;
		border-bottom: 1rpx solid #dddddd;
		margin-bottom: 20rpx;
		padding-bottom: 20rpx;
	}

	.popup-buttom-button {
		width: 20rpx;
		margin: 0;
		margin-right: 20rpx;
	}

	.examine-list-single-text {
		margin-right: auto;
		width: 400rpx;
	}
</style>
