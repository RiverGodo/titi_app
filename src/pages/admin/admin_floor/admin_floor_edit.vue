<template>
	<view class="admin-floor-edit">
		<u--form labelPosition="left" labelWidth="80" :model="model1" :rules="rules" ref="form1">
			<u-form-item label="楼栋名称" prop="floorInfo.name" borderBottom ref="item1">
				<u--input placeholder="请输入楼栋名称" v-model="model1.floorInfo.name" border="none"></u--input>
			</u-form-item>
			<u-form-item label="总计楼层" prop="floorInfo.floorAll" borderBottom ref="item2">
				<u--input placeholder="请输入总计楼层" v-model="model1.floorInfo.floorAll" border="none"></u--input>
			</u-form-item>
			<u-form-item label="经度" prop="floorInfo.longitude" borderBottom ref="item2">
				<u--input placeholder="请输入经度" v-model="model1.floorInfo.longitude" border="none"></u--input>
			</u-form-item>
			<u-form-item label="纬度" prop="floorInfo.latitude" borderBottom ref="item3">
				<u--input placeholder="请输入纬度" v-model="model1.floorInfo.latitude" border="none"></u--input>
			</u-form-item>
			<u-form-item label="范围面积" prop="floorInfo.rangeDiameter" borderBottom ref="item4">
				<u--input placeholder="请输入范围面积" v-model="model1.floorInfo.rangeDiameter" border="none"></u--input>
			</u-form-item>
			<u-form-item label="园区ID" prop="floorInfo.parkId" borderBottom ref="item4">
				<view class="park">{{model1.floorInfo.parkId}}</view>
			</u-form-item>
		</u--form>
		<u-button class="submit_button" type="primary" @click="submit">提交</u-button>
	</view>
</template>

<script>
	import {
		floorDetial,
		updateFloor
	} from '../../../api/admin.js'
	export default {
		// onReady() {
		// 		//onReady 为uni-app支持的生命周期之一
		//     	this.$refs.form.setRules(this.rules)
		// },
		onLoad(options) {
			if (options.id) {
				uni.setNavigationBarTitle({
					title: '编辑楼栋'
				})
				this.floorId = options.id
				this.getFloorDetial(options.id)
				// var data = JSON.parse(options.data)
				// this.companyData = data
			} else {
				// uni.switchTab({
				// 	url: '/pages/index/index'
				// })
				uni.showToast({
					title: '没有楼栋ID'
				});
				uni.navigateTo({
					url: '/pages/admin/admin_floor/admin_floor'
				})
			}
		},
		data() {
			return {
				floorId: '',
				showSex: false,
				model1: {
					floorInfo: {
						name: '',
						floorAll:'',
						longitude: '',
						latitude: '',
						rangeDiameter: ''
					},
				},
				rules: {
					'floorInfo.name': {
						type: 'string',
						required: true,
						message: '请填写楼栋名称',
						trigger: ['blur', 'change']
					},
					'floorInfo.parkId': {
						type: 'number',
						required: true,
						message: '没有园区信息',
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
				floorDetial(pram).then(res => {
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
					let pram = {
						id:_this.floorId,
						..._this.model1.floorInfo
					}
					updateFloor(pram).then(res => {
						if(res && res.code === 0){
							uni.showToast({
								title: '修改成功'
							});
							uni.navigateTo({
								url: '/pages/admin/admin_floor/admin_floor'
							})
						}
					})
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
	}

	.submit_button {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}
</style>
