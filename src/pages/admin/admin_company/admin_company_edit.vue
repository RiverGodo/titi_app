<template>
	<view class="admin-floor-edit">
		<u--form labelPosition="left" labelWidth="80" :model="model1" :rules="rules" ref="form1">
			<u-form-item label="公司名称" prop="floorInfo.name" borderBottom ref="item1">
				<u--input placeholder="请输入公司名称" v-model="model1.floorInfo.name" border="none"></u--input>
			</u-form-item>
			<u-form-item label="所在楼层" prop="floorInfo.floor" borderBottom ref="item5">
				<u--input placeholder="请输入所在楼层" v-model="model1.floorInfo.floor" border="none"></u--input>
			</u-form-item>
			<u-form-item label="公司负责人" prop="floorInfo.leadingName" borderBottom ref="item6">
				<u--input placeholder="请输入公司负责人" v-model="model1.floorInfo.leadingName" border="none"></u--input>
			</u-form-item>
			<u-form-item label="负责人手机" prop="floorInfo.leadingMobile" borderBottom ref="item7">
				<u--input placeholder="请输入负责人手机" v-model="model1.floorInfo.leadingMobile" border="none"></u--input>
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
		companyDetial,
		updateCompany,
		createCompany
	} from '../../../api/admin.js'
	export default {
		// onReady() {
		// 		//onReady 为uni-app支持的生命周期之一
		//     	this.$refs.form.setRules(this.rules)
		// },
		onLoad(options) {
			if (options.id) {
				uni.setNavigationBarTitle({
					title: '编辑公司'
				})
				// this.floorId = options.id
				this.pageState = 'edit'
				this.getFloorDetial(options.id)
			} else if (options.floorId) {
				uni.setNavigationBarTitle({
					title: '新增公司'
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
				pageState:'add',
				model1: {
					floorInfo: {
						name: '',
						longitude: '',
						latitude: '',
						rangeDiameter: ''
					},
				},
				rules: {
					'floorInfo.name': {
						type: 'string',
						required: true,
						message: '请填写公司名称',
						trigger: ['blur', 'change']
					},
					'floorInfo.floorId': {
						type: 'number',
						required: true,
						message: '没有楼栋信息',
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
				companyDetial(pram).then(res => {
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
						updateCompany(pram).then(res => {
							if (res && res.code === 0) {
								uni.showToast({
									title: '修改成功'
								});
								uni.navigateTo({
									url: '/pages/admin/admin_company/admin_company'
								})
							}
						})
					} else {
						createCompany(_this.model1.floorInfo).then(res => {
							if (res && res.code === 0) {
								uni.showToast({
									title: '新增成功'
								});
								uni.navigateTo({
									url: '/pages/admin/admin_company/admin_company'
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
