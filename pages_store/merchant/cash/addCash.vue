<template>
	<view class="add_cash">
		<view class="add_cash_m round_head_m">
			<view>
				<view v-for="(item,index1) in from1Data" :key="index1" class="add_cash_m_s">
					<view class="add_cash_m_s_l">
						<view class="nes_icon">*</view>
						<view class="add_cash_m_s_l_t">{{item.name}}</view>
					</view>
					<view class="add_cash_m_s_r">
						<input class="add_cash_m_s_r_input" v-if="item.type !== 'text'" placeholder-class="phcolor"
							:placeholder="item.place" :type="item.type" v-model="addData[item.field]" />
						<view v-if="item.type === 'text'" class="add_cash_m_s_r_t">立减券</view>
					</view>
				</view>
			</view>
			
			<view>
				<view v-for="(item,index2) in from2Data" :key="index2" class="add_cash_m_b">
					<view class="add_cash_m_s_t">
						<view class="nes_icon">*</view>
						<view class="add_cash_m_s_l_t">{{item.name}}</view>
					</view>
					<view class="add_cash_m_s_b">
						<radio-group style="display: flex;align-items: center;" @change="radioChange($event,item.field)">
							<label v-if="item.showRadio" class="radio">
								<radio color="#FC5C39" value="all" checked="true" />不限
							</label>
							<label class="radio">
								<radio color="#FC5C39" value="limit" :checked="!item.showRadio" />
								<view class="radio_select">
									{{item.headerName}}
									<view v-if="item.type === 'input-number'" :style="{width:item.width}"
										class="radio_select_block">
										<input style="width: 100%;height: 100%;padding-left: 20rpx;" type="number"
											v-model="addData[item.field]" />
									</view>
									<view @click="openSelect(item.field)" v-if="item.type === 'select-data'"
										:style="{width:item.width}" class="radio_select_block">
										<view v-if="addData[item.field]" class="select_state">
											<view class="select-text">{{addData[item.field]}}</view>
										</view>
										<view v-else class="select_state">
											<text class="iconfont icon-time">&#xe67c;</text>
											<view class="select-text">{{item.iconText}}</view>
										</view>
									</view>
									{{item.endName}}
								</view>
							</label>
						</radio-group>
					</view>
				</view>
			</view>
			
			<view>
				<view v-for="(item,index3) in from3Data" :key="index3" class="add_cash_m_b">
					<view class="add_cash_m_s_t">
						<view class="nes_icon">*</view>
						<view class="add_cash_m_s_l_t">{{item.name}}</view>
					</view>
					<view class="add_cash_m_s_b">
						<mix-textarea :ref="item.field" @changeValue="changeValue($event,item.field)"
							:maxLength="item.textlength" :height="'272rpx'" :placeholder="item.place"></mix-textarea>
					</view>
				</view>
			</view>
			
			<mix-button class="confirmBtn" ref="confirmBtn" @onConfirm="handleConfirm()" text="添  加" />
			<w-picker :visible.sync="linkageVisible" mode="linkage" :value="defaultRegion1" :options="options"
				:level="2" default-type="id" themeColor="#FC5C39" :default-props="defaultProps1"
				@confirm="onConfirm($event)" ref="linkage">
				<text class="able-text">{{selectTitle}}</text>
			</w-picker>
			<uni-popup ref="popup" type="center">
				<view class="popup_m">
					<view class="popup_m_t">
						是否确认添加现金券
					</view>
					<view class="popup_m_b">
						<view @click="$refs.popup.close()" class="popup_m_b_l popup_m_b_s">取消</view>
						<view @click="handleAdd()" class="popup_m_b_r popup_m_b_s">确认</view>
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: [],
				weekLimit: [],
				timeLimit: [],
				selectOptions: '',
				selectTitle: '',
				defaultRegion1: [],
				defaultProps1: {
					label: "name",
					value: "name",
					children: "child"
				},
				linkageVisible: false,
				from1Data: [{
						name: '现金券面值',
						field: 'price',
						type: 'number',
						place: '输入价格：例 ￥100.00'
					},
					{
						name: '现金券名称',
						field: 'name',
						type: 'input',
						place: '现金券名称限制25字'
					},
					{
						name: '现金券类型',
						field: '立减券',
						type: 'text',
						place: '现金券名称限制25字'
					}
				],
				from2Data: [{
						name: '现金券总量',
						field: 'total',
						type: 'input-number',
						headerName: '限量',
						endName: '',
						width: '181rpx',
						showRadio:false
					},
					{
						name: '兑换限制',
						field: 'perUserLimit',
						headerName: '限制每人',
						endName: '张',
						icon: '',
						type: 'input-number',
						width: '181rpx',
						showRadio:false
					},
					// {
					// 	name: '可用日期',
					// 	field: 'weekLimit',
					// 	headerName: '限制',
					// 	endName: '',
					// 	iconText: '选择日期',
					// 	type: 'select-data',
					// 	selecData: [],
					// 	width: '273rpx',
					// 	showRadio:true
					// },
					// {
					// 	name: '可用时间',
					// 	field: 'timeLimit',
					// 	headerName: '限制',
					// 	endName: '',
					// 	iconText: '选择时间',
					// 	type: 'select-data',
					// 	selecData: [],
					// 	width: '273rpx',
					// 	showRadio:true
					// },
				],
				from3Data: [
					// {
					// 	name: '使用限制',
					// 	field: 'otherLimit',
					// 	place: '请输入使用限制~~',
					// 	textlength: 50
					// },
					// {
					// 	name: '适用范围',
					// 	field: 'range',
					// 	place: '请输入适用范围~~',
					// 	textlength: 100
					// },
					// {
					// 	name: '使用规则',
					// 	field: 'rule',
					// 	place: '请输入使用规则，没有规则，输入“无”',
					// 	textlength: 500
					// },
				],
				addData: {
					name: '',
					otherLimit: '',
					perUserLimit: '',
					price: '',
					range: '',
					rule: '',
					timeLimit: '',
					total: '',
					weekLimit: ''
				}
			}
		},
		mounted() {
			// this.$refs.popup.open('top')
			this.formate();
		},
		methods: {
			formate() {
				let resdata1 = []
				let resdata2 = []
				let digits = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
				for (var i = 0; i < 7; i++) {
					resdata1.push({
						name: digits[i],
						child: []
					})
					for (var p = 0; p < 7; p++) {
						if (p >= i) {
							resdata1[i].child.push({
								name: digits[p]
							})
						}

					}
				}
				for (var i = 0; i < 24; i++) {
					resdata2.push({
						name: i + ':00',
						child: []
					})
					for (var p = 0; p < 25; p++) {
						if (p > i) {
							resdata2[i].child.push({
								name: p + ':00'
							})
						}

					}
				}
				this.weekLimit = resdata1
				this.timeLimit = resdata2
			},
			openSelect(fild) {
				if (fild === "weekLimit") {
					this.selectTitle = "可用日期"
				}
				if (fild === "timeLimit") {
					this.selectTitle = "可用时间"
				}
				this.selectOptions = fild
				this.options = this[fild]
				this.linkageVisible = true
			},
			onConfirm(event) {
				if (event.value[0] === event.value[1]) {
					this.addData[this.selectOptions] = "每" + event.value[0]
				} else {
					this.addData[this.selectOptions] = event.value[0] + " 到 " + event.value[1]
				}
			},
			radioChange(evt,fild) {
				if(evt.detail.value === 'all'){
					this.addData[fild] = ''
				}
			},
			changeValue(event, fild) {
				this.addData[fild] = event
			},
			async handleAdd() {
				if(this.addData.timeLimit === ''){
					this.addData.timeLimit = "不限"
				}
				if(this.addData.weekLimit === ''){
					this.addData.weekLimit = "不限"
				}
				this.$refs.popup.close()
				const res = await this.$post("/seller/coupon/add", {
					...this.addData
				});
				this.navTo("/pages_store/merchant/cash/cashList",{login: true});
			},
			handleConfirm() {
				// 在此处进行校验
				this.$refs.popup.open('popup')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add_cash{
		height: 100%;
		background: #FFFFFF;
		padding-top: 20rpx;
	}
	.add_cash_m {
		height: auto;
		padding-bottom: 28rpx;
	}

	.add_cash_m_s {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 85rpx;
		border: 1px solid #EEEEEE;
		border-radius: 20rpx;
		margin: 25rpx 20rpx;
		margin-top: 0;
		.add_cash_m_s_l {
			display: flex;
			align-items: flex-start;
			margin-left: 28rpx;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #000000;
		}

		.add_cash_m_s_r {
			margin-right: 30rpx;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #000000;
			width: 280rpx;
			text-align: right;
			height: 90%;
			display: flex;
			align-items: center;
			justify-content: flex-end;

			.add_cash_m_s_r_input {
				width: 100%;
				height: 100%;
				border: none;
				text-align: right;
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #000000;
			}
		}
	}

	.nes_icon {
		color: $base-color-admin;
	}

	.phcolor {
		text-align: right;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #969696;
		line-height: 34rpx;
	}

	.confirmBtn {
		background: $base-color-app;
		width: 710rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #FFFFFF;
		border-radius: 40rpx;
		z-index: 1;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 13rpx;
		margin: auto;
	}

	.add_cash_m_b {
		border: 1px solid #EEEEEE;
		border-radius: 20rpx;
		margin: 25rpx 20rpx;
		padding: 30rpx 28rpx;

		.add_cash_m_s_t {
			display: flex;
			align-items: center;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			margin-bottom: 24rpx;
		}
	}

	.radio {
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #000000;
		margin-right: 63rpx;
		display: flex;
		align-items: center;

		radio {
			transform: scale(0.7);
			color: $base-color-admin;
		}

		.radio_select {
			display: flex;
			align-items: center;

			.radio_select_block {
				height: 61rpx;
				border: 1px solid #969696;
				border-radius: 10rpx;
				margin-left: 11rpx;
				margin-right: 13rpx;

				.select_state {
					display: flex;
					align-items: center;
				}

				.icon-time {
					font-size: 29rpx;
					margin-left: 18rpx;
				}

				.select-text {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #000000;
					line-height: 2;
					height: 100%;
					margin-left: 16rpx;
				}
			}
		}
	}

	.able-text {
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #000000;
	}

	.popup_m {
		width: 600rpx;
		// height: 329rpx;
		background: #FFFFFF;
		border-radius: 20rpx;

		.popup_m_t {
			font-size: 48rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: $base-color-admin;
			text-align: center;
			padding-top: 86rpx;
			padding-bottom: 75rpx;
		}

		.popup_m_b {
			display: flex;
			align-items: center;
			justify-content: space-around;
			border-top: 2px solid rgba(150, 150, 150, 0.2);

			.popup_m_b_s {
				padding-top: 22rpx;
				padding-bottom: 22rpx;
				width: 50%;
				text-align: center;
			}

			.popup_m_b_l {
				border-right: 1px solid rgba(150, 150, 150, 0.2);
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #969696;
			}

			.popup_m_b_r {
				border-left: 1px solid rgba(150, 150, 150, 0.2);
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: $base-color-admin;
			}
		}
	}
</style>