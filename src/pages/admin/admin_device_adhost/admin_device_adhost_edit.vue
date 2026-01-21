<template>
	<view class="admin-floor-edit">
		<u--form labelPosition="left" labelWidth="80" :model="model1" :rules="rules" ref="form1">
			<u-form-item label="楼层(0-255)" prop="floorInfo.floorLevel" borderBottom ref="item1">
				<u--input placeholder="请输入楼层(0-255)" v-model="model1.floorInfo.floorLevel" border="none"></u--input>
			</u-form-item>
			<u-form-item label="设备名称" prop="floorInfo.deviceName" borderBottom ref="item5">
				<u--input placeholder="请输入设备名称" v-model="model1.floorInfo.deviceName" border="none"></u--input>
			</u-form-item>
			<u-form-item label="设备序号" prop="floorInfo.deviceNo" borderBottom ref="item6">
				<view class="park">{{model1.floorInfo.deviceNo}}</view>
			</u-form-item>
			<u-form-item label="设备IP" prop="floorInfo.deviceIp" borderBottom ref="item7">
				<u--input placeholder="请输入设备IP" v-model="model1.floorInfo.deviceIp" border="none"></u--input>
			</u-form-item>
			<u-form-item label="算法名称" prop="floorInfo.algorithmName" borderBottom ref="item11">
				<u--input placeholder="请输入算法名称" v-model="model1.floorInfo.algorithmName" border="none"></u--input>
			</u-form-item>
			<u-form-item label="设备登录名称" prop="floorInfo.username" borderBottom ref="item2">
				<u--input placeholder="请输入设备登录名称" v-model="model1.floorInfo.username" border="none"></u--input>
			</u-form-item>
			<u-form-item v-if="pageState === 'add'" label="设备登录密码" prop="floorInfo.password" borderBottom ref="item15">
				<u--input placeholder="请输入设备登录密码" v-model="model1.floorInfo.password" border="none"></u--input>
			</u-form-item>
			<u-form-item label="mqtt端口" prop="floorInfo.portMqtt" borderBottom ref="item3">
				<u--input placeholder="请输入mqtt端口" v-model="model1.floorInfo.portMqtt" border="none"></u--input>
			</u-form-item>
			<u-form-item label="websoket端口" prop="floorInfo.portWebsokert" borderBottom ref="item4">
				<u--input placeholder="请输入websoket端口" v-model="model1.floorInfo.portWebsokert" border="none"></u--input>
			</u-form-item>
			<u-form-item label="http端口" prop="floorInfo.portHttp" borderBottom ref="item11">
				<u--input placeholder="请输入http端口" v-model="model1.floorInfo.portHttp" border="none"></u--input>
			</u-form-item>
			<u-form-item label="netty端口" prop="floorInfo.portNetty" borderBottom ref="item11">
				<u--input placeholder="请输入netty端口" v-model="model1.floorInfo.portNetty" border="none"></u--input>
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
		</u--form>
		<u-button class="submit_button" type="primary" @click="submit">提交</u-button>
	</view>
</template>

<script>
	import {
		deviceAdhostDetial,
		updateDeviceAdhost,
		createDeviceAdhost
	} from '../../../api/admin.js'
	export default {
		// onReady() {
		// 		//onReady 为uni-app支持的生命周期之一
		//     	this.$refs.form.setRules(this.rules)
		// },
		onLoad(options) {
			if (options.id) {
				uni.setNavigationBarTitle({
					title: '编辑大厅广告机'
				})
				// this.floorId = options.id
				this.pageState = 'edit'
				this.getFloorDetial(options.id)
			} else if (options.floorId) {
				uni.setNavigationBarTitle({
					title: '新增大厅广告机'
				})
				this.pageState = 'add'
				this.model1.floorInfo.floorId = options.floorId
				this.model1.floorInfo.parkId = options.parkId
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
						portMqtt: 9999,
						portWebsokert: 8888,
						portHttp: 8080,
						portNetty:9898,
						deviceState:0
					},
				},
				rules: {
					'floorInfo.floorLevel': {
						type: 'number',
						required: true,
						message: '请填写楼层',
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
				deviceAdhostDetial(pram).then(res => {
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
						updateDeviceAdhost(pram).then(res => {
							if (res && res.code === 0) {
								uni.showToast({
									title: '修改成功'
								});
								uni.navigateTo({
									url: '/pages/admin/admin_device_adhost/admin_device_adhost'
								})
							}
						})
					} else {
						createDeviceAdhost(_this.model1.floorInfo).then(res => {
							if (res && res.code === 0) {
								uni.showToast({
									title: '新增成功'
								});
								uni.navigateTo({
									url: '/pages/admin/admin_device_adhost/admin_device_adhost'
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
