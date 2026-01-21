<template>
	<view class="admin-floor-edit">
		<u--form labelPosition="left" labelWidth="80" :model="model1" :rules="rules" ref="form1">
			<u-form-item label="大厅广告机编码" prop="floorInfo.adhostId" borderBottom ref="item1">
				<u--input placeholder="请输入大厅广告机编码" v-model="model1.floorInfo.adhostId" border="none"></u--input>
			</u-form-item>
			<u-form-item label="设备名称" prop="floorInfo.deviceName" borderBottom ref="item5">
				<u--input placeholder="请输入设备名称" v-model="model1.floorInfo.deviceName" border="none"></u--input>
			</u-form-item>
			<u-form-item label="设备序号" prop="floorInfo.deviceNo" borderBottom ref="item6">
				<u--input placeholder="请输入设备序号" v-model="model1.floorInfo.deviceNo" border="none"></u--input>
			</u-form-item>
			<u-form-item label="算法名称" prop="floorInfo.algorithmName" borderBottom ref="item11">
				<u--input placeholder="请输入算法名称" v-model="model1.floorInfo.algorithmName" border="none"></u--input>
			</u-form-item>
			<u-form-item label="设备IP" prop="floorInfo.deviceIp" borderBottom ref="item7">
				<u--input placeholder="请输入设备IP" v-model="model1.floorInfo.deviceIp" border="none"></u--input>
			</u-form-item>
			<u-form-item label="设备登录名称" prop="floorInfo.username" borderBottom ref="item2">
				<u--input placeholder="请输入设备登录名称" v-model="model1.floorInfo.username" border="none"></u--input>
			</u-form-item>
			<u-form-item v-if="pageState === 'add'" label="设备登录密码" prop="floorInfo.password" borderBottom ref="item15">
				<u--input placeholder="请输入设备登录密码" v-model="model1.floorInfo.password" border="none"></u--input>
			</u-form-item>
			
			<u-form-item label="状态" prop="floorInfo.deviceState" borderBottom ref="item12">
				<!-- <u--input v-model="model1.floorInfo.deviceState" border="none"></u--input> -->
				<u-radio-group 
				    v-model="model1.floorInfo.deviceState"
				    placement="row">
					<u-radio label="正常" :name="0"></u-radio>
					<u-radio label="停用" :name="1"></u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="所属楼栋编号" prop="floorInfo.floorId" borderBottom ref="item4">
				<view class="park">{{model1.floorInfo.floorId}}</view>
			</u-form-item>
			<u-form-item label="所属园区编号" prop="floorInfo.parkId" borderBottom ref="item10">
				<view class="park">{{model1.floorInfo.parkId}}</view>
			</u-form-item>
			<u-form-item label="所属电梯编号" prop="floorInfo.elevatorId" borderBottom ref="item10">
				<view class="park">{{model1.floorInfo.elevatorId}}</view>
			</u-form-item>
		</u--form>
		<u-button class="submit_button" type="primary" @click="submit">提交</u-button>
	</view>
</template>

<script>
	import {
		deviceAdnodeDetial,
		updateDeviceAdnode,
		createDeviceAdnode
	} from '../../../api/admin.js'
	export default {
		// onReady() {
		// 		//onReady 为uni-app支持的生命周期之一
		//     	this.$refs.form.setRules(this.rules)
		// },
		onLoad(options) {
			if (options.id) {
				uni.setNavigationBarTitle({
					title: '编辑电梯广告机'
				})
				// this.floorId = options.id
				this.pageState = 'edit'
				this.getFloorDetial(options.id)
			} else if (options.floorId) {
				uni.setNavigationBarTitle({
					title: '新增电梯广告机'
				})
				this.pageState = 'add'
				this.model1.floorInfo.floorId = options.floorId
				this.model1.floorInfo.parkId = options.parkId
				this.model1.floorInfo.elevatorId = options.elevatorId
			} else {
				console.log('没有楼栋与公司ID')
			}
		},
		data() {
			return {
				floorId: '',
				showSex: false,
				pageState: 'add',
				model1: {
					floorInfo: {
						deviceState:0
					},
				},
				rules: {
					'floorInfo.adhostId': {
						type: 'number',
						required: true,
						message: '请填写大厅广告机编码',
						trigger: ['blur', 'change']
					},
					'floorInfo.deviceState': {
						type: 'number',
						required: true,
						message: '请选择设备状态',
						trigger: ['blur', 'change']
					}
				},
				radio: '',
				switchVal: false
			}
		},
		methods: {
			getFloorDetial(id) {
				let pram = {
					id: id
				}
				deviceAdnodeDetial(pram).then(res => {
					// console.log(res);
					if (res && res.code === 0) {
						this.model1.floorInfo = res.data
					}
				})
			},
			submit() {
				var _this = this
				this.$refs.form1.validate().then(res => {
					// uni.$u.toast('校验通过')
					if (_this.pageState === 'edit') {
						let pram = {
							..._this.model1.floorInfo
						}
						updateDeviceAdnode(pram).then(res => {
							if (res && res.code === 0) {
								uni.showToast({
									title: '修改成功'
								});
								uni.navigateTo({
									url: '/pages/admin/admin_device_adnode/admin_device_adnode'
								})
							}
						})
					} else {
						createDeviceAdnode(_this.model1.floorInfo).then(res => {
							if (res && res.code === 0) {
								uni.showToast({
									title: '新增成功'
								});
								uni.navigateTo({
									url: '/pages/admin/admin_device_adnode/admin_device_adnode'
								})
							}
						})
					}

				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			}
		}
	}
</script>

<style>
	.admin-floor-edit {
		margin: 0 30rpx;
		padding-bottom: 50rpx;
	}

	.submit_button {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}
</style>
