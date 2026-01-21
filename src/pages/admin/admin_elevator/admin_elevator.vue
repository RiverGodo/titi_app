<template>
	<view class="admin-floor">
		<view class="admin-floor-top">
			<u-search :showAction="true" placeholder="请输入电梯名称" @search="handleFloorList()" @custom="handleFloorList()"
				v-model="keyword"></u-search>
			<!-- <u-icon size="25" class="admin-floor-icon" name="plus-circle"></u-icon> -->
		</view>
		<view class="admin-floor-center">
			<view v-show="indexList.length" v-for="(item, index) in indexList" :key="index" class="examine-list-single">
				<view class="examine-list-single-text">名称：{{item.name}}</view>
				<u-button :custom-style="popupButtomButton" @click="handleAddDeviceAdnode(item)" size="small" type="success" :plain="true"
					text="新增电梯广告机">
				</u-button>
				<u-button :custom-style="popupButtomButton" @click="editFloor(item)" size="small" type="success" :plain="true"
					text="编辑">
				</u-button>
				<u-button :custom-style="popupButtomButton" @click="delFloor(item)" size="small" type="warning" :plain="true"
					text="删除">
				</u-button>
			</view>
			<view v-show="!indexList.length" class="no-floor">
				暂无数据
			</view>
		</view>
		<u-popup :customStyle="propStyle" :round="10" @close="show = false" mode="center" :show="show">
			<view class="floor-popup">
				<view>是否要删除：{{selectFloor.name}}</view>
			</view>
			<view class="floor-popup-bottom">
				<u-button :custom-style="popupButtomButton2" @click="delFloorSure()" size="small" type="success"
					:plain="true" text="确定">
				</u-button>
				<u-button :custom-style="popupButtomButton2" @click="show = false" size="small" type="warning"
					:plain="true" text="取消">
				</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		elevatorList,
		deleteElevator
	} from '../../../api/admin.js';
	export default {
		data() {
			return {
				show: false,
				keyword: '',
				indexList: [],
				propStyle: {
					width: "50%"
				},
				selectFloor: {

				},
				popupButtomButton: {
					width: '100rpx'
				},
				popupButtomButton2: {
					width: '150rpx'
				}
			}
		},
		onLoad() {
			this.handleFloorList();
		},
		methods: {
			handleFloorList() {
				let pram = {
					name: this.keyword
				}
				elevatorList(pram).then(res => {
					if (res.code === 0) {
						this.indexList = res.data.list
					}
				})
			},
			editFloor(item) {
				if (!this.hasLogin) {
					uni.$u.route('/pages/login/social')
				} else {
					uni.$u.route('/pages/admin/admin_elevator/admin_elevator_edit?id=' + item.id)
				}
			},
			handleAddDeviceAdnode(item){
				if (!this.hasLogin) {
					uni.$u.route('/pages/login/social')
				} else {
					uni.$u.route('/pages/admin/admin_device_adnode/admin_device_adnode_edit?floorId=' + item.floorId + '&parkId=' + item.parkId + '&elevatorId=' + item.id)
				}
			},
			delFloor(item) {
				this.selectFloor = item
				this.show = true
			},
			delFloorSure() {
				let pram = {
					id:this.selectFloor.id
				}
				deleteElevator(pram).then(res => {
					if(res && res.code === 0){
						this.show = false
						uni.showToast({
							title: '删除成功'
						});
						this.handleFloorList()
					}
				})
			}
		},
		computed: {
			userInfo() {
				return this.$store.getters.userInfo
			},
			hasLogin() {
				return this.$store.getters.hasLogin
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
	}

	.admin-floor-icon {
		margin-left: 20rpx;
	}

	.admin-floor-center {
		height: 80vh;
		overflow: auto;
		margin-top: 20rpx;
	}

	.admin-floor-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.admin-floor-bottom-button {
		margin: 20rpx;
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

	.examine-list-single-avator {
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.examine-list-single-text {
		margin-right: auto;
		margin-left: 30rpx;
		width: 400rpx;
	}

	.no-floor {
		text-align: center;
		margin-top: 30rpx;
	}

	.floor-popup {
		text-align: center;
		margin-top: 60rpx;
		margin-bottom: 120rpx;
	}

	.floor-popup-bottom {
		display: flex;
		align-items: center;
		width: 100%;
		position: absolute;
		bottom: 30rpx;
		left: 0;
		right: 0;
		margin: auto;
	}
</style>
