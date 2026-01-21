<template>
	<view class="admin-floor-edit">
		<u--form labelPosition="left" labelWidth="80" :model="model1" :rules="rules" ref="form1">
			<u-form-item label="电梯名称" prop="floorInfo.name" borderBottom ref="item1">
				<u--input placeholder="请输入电梯名称" v-model="model1.floorInfo.name" border="none"></u--input>
			</u-form-item>
			<u-form-item label="共计楼层" prop="floorInfo.floorAll" borderBottom ref="item5">
				<u--input placeholder="请输入共计楼层" v-model="model1.floorInfo.floorAll" border="none"></u--input>
			</u-form-item>
			<u-form-item label="楼层编码" prop="floorInfo.floorRefJson" borderBottom ref="item5">
				<view v-show="!showFloorJson">
					<view class="floor-ref-json">
						起始楼层：<yp-number-box @change="bindChangeStart" :value="startFloor" :min="-30" :max="220">
						</yp-number-box>
					</view>
					<view class="floor-ref-json">
						结束楼层：<yp-number-box @change="bindChangeEnd" :value="endFloor" :min="-30" :max="220">
						</yp-number-box>
					</view>
					<u-button @click="generateFloor(true)" size="small" type="success" :plain="true" text="生成楼层编码">
					</u-button>
					<view class="floor-ref-json-desc">注：不生成将使用默认楼层编码</view>
				</view>
				<view v-show="showFloorJson">
					<u-button @click="generateFloor(false)" size="small" type="success" :plain="true" text="重新生成">
					</u-button>
					<u--form labelPosition="left" :model="jsonform" :rules="rules2" ref="jsonForm">
						<u-form-item labelWidth="120" v-for="(domain, index) in jsonform.domains"
							:prop="'domains.' + index + '.value'" :key="index" :label="`楼层`+domain.label+`的名称`">
							<u--input v-model="domain.value" placeholder="请输入电梯名称" border="none"></u--input>
							<view class="json-switch">
								<view class="json-switch-text">是否启用</view>
								<u-switch v-model="domain.require"></u-switch>
							</view>
						</u-form-item>
					</u--form>
				</view>
			</u-form-item>
			<u-form-item label="电梯维保联系人" prop="floorInfo.leadingName" borderBottom ref="item6">
				<u--input placeholder="请输入电梯维保联系人" v-model="model1.floorInfo.leadingName" border="none"></u--input>
			</u-form-item>
			<u-form-item label="电梯维保电话" prop="floorInfo.leadingMobile" borderBottom ref="item7">
				<u--input placeholder="请输入电梯维保电话" v-model="model1.floorInfo.leadingMobile" border="none"></u--input>
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
		<u-button class="submit_button" type="primary" @click="submitSure">提交</u-button>
	</view>
</template>

<script>
	import ypNumberBox from "@/components/yp-number-box/yp-number-box.vue"
	import {
		elevatorDetial,
		updateElevator,
		createElevator
	} from '../../../api/admin.js'
	export default {
		// onReady() {
		// 		//onReady 为uni-app支持的生命周期之一
		//     	this.$refs.form.setRules(this.rules)
		// },
		components: {
			ypNumberBox
		},
		onLoad(options) {
			if (options.id) {
				uni.setNavigationBarTitle({
					title: '编辑电梯'
				})
				// this.floorId = options.id
				this.pageState = 'edit'
				this.getFloorDetial(options.id)
			} else if (options.floorId) {
				uni.setNavigationBarTitle({
					title: '新增电梯'
				})
				this.pageState = 'add'
				this.model1.floorInfo.floorId = options.floorId
				this.model1.floorInfo.parkId = options.parkId
			} else {
				console.log('没有楼栋与电梯ID')
			}
		},
		data() {
			return {
				floorId: '',
				showSex: false,
				pageState: 'add',
				jsonform: {
					domains: [],
				},
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
						message: '请填写电梯名称',
						trigger: ['blur', 'change']
					},
					'floorInfo.floorId': {
						type: 'number',
						required: true,
						message: '没有楼栋信息',
						trigger: ['blur', 'change']
					}
				},
				rules2: {

				},
				endFloor: 40,
				startFloor: -4,
				radio: '',
				switchVal: false,
				showFloorJson: false,
			}
		},
		methods: {
			bindChangeStart(value) {
				this.startFloor = value
			},
			bindChangeEnd(value) {
				this.endFloor = value
			},
			getFloorDetial(id) {
				let pram = {
					id: id
				}
				elevatorDetial(pram).then(res => {
					// console.log(res);
					if (res && res.code === 0) {
						this.model1.floorInfo = res.data
						this.jsonform.domains = JSON.parse(res.data.floorRefJson)
						this.showFloorJson = true
					}
				})
			},
			submitSure() {
				if (this.showFloorJson) {
					let checkNUmber = 1
					this.jsonform.domains.forEach((item) => {
						if (item.value == '') {
							checkNUmber = 0
						}
					})
					if (checkNUmber) {
						this.submit()
					} else {
						uni.showToast({
							title: '请完善楼层编码'
						});
						return;
					}
				} else {
					if (this.endFloor > this.startFloor) {
						this.generateFloor(false)
						this.submit()
					} else {
						uni.showToast({
							title: '结束楼层必须大于起始楼层'
						});
					}
				}
			},
			submit() {
				var _this = this
				this.$refs.form1.validate().then(res => {
					// uni.$u.toast('校验通过')
					_this.model1.floorInfo.floorRefJson = JSON.stringify(_this.jsonform.domains)
					if (_this.pageState === 'edit') {
						let pram = {
							..._this.model1.floorInfo
						}
						updateElevator(pram).then(res => {
							if (res && res.code === 0) {
								uni.showToast({
									title: '修改成功'
								});
								uni.navigateTo({
									url: '/pages/admin/admin_elevator/admin_elevator'
								})
							}
						})
					} else {
						createElevator(_this.model1.floorInfo).then(res => {
							if (res && res.code === 0) {
								uni.showToast({
									title: '新增成功'
								});
								uni.navigateTo({
									url: '/pages/admin/admin_elevator/admin_elevator'
								})
							}
						})
					}

				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			generateFloor(value) {
				console.log(this.endFloor, this.startFloor);
				if (this.endFloor > this.startFloor) {
					this.jsonform = {
						domains: []
					}
					let flist = []
					let startNumber = this.startFloor
					if (this.startFloor > 0) {
						for (let i = 0; i < this.endFloor - this.startFloor; i++) {
							flist.push(startNumber + i)
						}
						flist.push(flist[flist.length - 1] + 1)
					} else {
						for (let i = 0; i < this.endFloor - this.startFloor; i++) {
							if (startNumber + i > -1) {
								flist.push(startNumber + i + 1)
							} else {
								flist.push(startNumber + i)
							}
						}
					}
					flist.forEach(element => {
						this.jsonform.domains.push({
							label: element,
							value: element,
							require: true
						})
					});
					this.showFloorJson = value
				} else {
					uni.showToast({
						title: '结束楼层必须大于起始楼层'
					});
				}
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

	.floor-ref-json {
		margin-bottom: 20rpx;
	}

	.floor-ref-json-desc {
		color: red;
		margin-top: 20rpx;
	}

	.json-switch {
		display: flex;
		align-items: center;
	}

	.json-switch-text {
		margin-right: 10rpx;
	}
</style>
