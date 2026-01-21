<template>
	<view class="aa">
		<view class="aa_m">
			<view class="h_block"></view>
			<view @click="changeStep(0)" class="aa_m1 aa_m_main">
				<view class="aa_m_t w_f">
					<view v-if="step >= 0" class="idout"></view>
					<view v-else class="idoutnon"></view>
					基本信息
				</view>
				<view class="aa_m1_s">
					<input placeholder="请输入广告名称" type="text" v-model="name" />
				</view>
				<view style="margin: 0;" class="aa_m1_s">
					<input placeholder="请输入购买链接" type="text" v-model="link" />
				</view>
			</view>
			<view @click="changeStep(1)" class="aa_m2 aa_m_main">
				<view class="aa_m_t">
					<view v-if="step >= 1" class="idout"></view>
					<view v-else class="idoutnon"></view>
					广告创意
				</view>
				<view class="aa_m2_m">
					<view class="aa_m2_m_s w_flex_center">
						<view class="aa_m_s_t">投放渠道：</view>
						<radio-group>
							<view class="aa_radio">
								<radio style="transform:scale(0.8)" checked="0" color="#FC5C39" value="0">
									<text>单图广告</text>
								</radio>
							</view>
						</radio-group>
					</view>
					<view class="aa_m2_m_s">
						<view class="aa_m_s_t">广告描述：</view>
						<view class="aa_m2_m_s_i">
							<input placeholder="请输入广告描述" type="text" v-model="brief" />
						</view>
					</view>
					<view class="aa_m2_m_s">
						<view class="aa_m_s_t">图片素材：</view>
						<view v-if="adImg" @click="upload" class="aa_m2_m_s_u">
							<image :src="$cdn + adImg"></image>
						</view>
						<view v-else @click="upload" class="aa_m2_m_s_u">
							<text class="iconfont">&#xe727;</text>
						</view>
					</view>
				</view>
			</view>
			<view @click="changeStep(2)" class="aa_m2 aa_m_main">
				<view class="aa_m_t">
					<view v-if="step >= 2" class="idout"></view>
					<view v-else class="idoutnon"></view>
					投放设置
				</view>
				<view class="aa_m2_m">
					<view class="aa_m2_m_s w_flex_center">
						<view class="aa_m_s_t">计费方式：</view>
						<radio-group>
							<view class="aa_radio">
								<radio style="transform:scale(0.8)" checked="0" color="#FC5C39" value="0">
									<text>CPT</text><text class="small">(注：广告按照播放时长扣费）</text>
								</radio>
							</view>
						</radio-group>
					</view>
					<view class="aa_m2_m_s">
						<view class="aa_m_s_t w_flex_center">广告时段：
							<view @click="hadleShowPopup()" class="aa_m2_m_s_s_b">
								选择时段
							</view>
						</view>
						<view class="aa_m2_m_s_s">
							<view v-for="(item,index) in timeStrList" :key="index" class="aa_m2_m_s_s_s">
								{{item.timeStr}}
							</view>
						</view>
					</view>
					<view class="aa_m2_m_s">
						<view class="aa_m_s_t">出价：<text>(已有广告卡{{adCardNum}}张)</text></view>
						<view class="aa_m2_m_s_i w_flex_center">
							<input style="width: 380rpx;" placeholder="输入广告卡数量" type="number" v-model="cardNum" />
							<view @click="navTo('/pages_store/ad/list',{login:true})" class="aa_m2_m_s_i_b">充值</view>
						</view>
					</view>
				</view>
			</view>
			<view @click="changeStep(3)" class="aa_m2 aa_m_main">
				<view class="aa_m_t">
					<view v-if="step >= 3" class="idout"></view>
					<view v-else class="idoutnon"></view>
					选择投放地
				</view>
				<view class="aa_m2_m">
					<view class="aa_m2_m_s">
						<view @click="visible = true" class="aa_m2_m_s_i w_flex_center">
							<text class="aa_m2_m_s_i_t">{{regionStr}}</text>
							<text class="iconfont">&#xe601;</text>
						</view>
					</view>
					<view @click="floorVisible = true" v-if="floorList.length" class="aa_m2_m_s">
						<view class="aa_m2_m_s_i w_flex_center">
							<text class="aa_m2_m_s_i_t">{{floorStr}}</text>
							<text class="iconfont">&#xe601;</text>
						</view>
					</view>
					<view @click="generateForm" v-if="floorId" class="aa_m2_m_s_b">
						生成表单
					</view>
				</view>
				<view class="aa_m2_b">
					<view v-if="addList.length" style="margin-bottom: 30rpx;" class="aa_m_t">
						广告表单
					</view>
					<view class="ad_m_t_m2">
						<view v-for="(item,index) in addList" :key="index" class="ad_m_t_m2_s">
							<view @click="deleteAddList(index)" class="ad_m_t_m2_s_d">删除</view>
							<view class="ad_m_t_m2_s_t">
								{{item.floorStr}}
							</view>
							<view>
								<view v-for="(item2,index2) in item.timeList" :key="index2"
									class="ad_m_t_m2_s_s w_flex_center">
									<text>{{item2.timeDesc}} 每秒 </text>
									<view class="ad_m_t_m2_s_s_i">
										<input @input="reLoadData(item,item2,index,index2)" type="number"
											v-model="item2.price" />
									</view>
									<text> 分钱 您在同时段排第<text style="color: #FC5531;">{{item2.rank}}</text>名</text>
									<text
										@click="navTo('/pages_store/ad/adRank?buildingId=' + item.floorId +'&timeId=' + item2.timeId)"
										class="iconfont">&#xe601;</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup_m">
				<view class="popup_m_t">选择时段</view>
				<checkbox-group @change="checkboxChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in items" :key="index">
						<view class="popup_m_t_cell w_flex_center">
							<checkbox :value="String(index)" :checked="item.checked" />
							<view>{{item.timeStr}}</view>
						</view>
					</label>
				</checkbox-group>
				<view @click="handleSelectTime()" class="popup_m_b">
					确定
				</view>
			</view>
		</uni-popup>
		<w-picker :visible.sync="visible" mode="region" :value="defaultRegion" default-type="value" :hide-area="false"
			@confirm="regionPicker($event)" ref="region"></w-picker>
		<w-picker v-if="floorList.length" :visible.sync="floorVisible" mode="selector" :value="defaultFloor"
			default-type="name" :default-props="defaultProps" :options="floorList" @confirm="floorPicker($event)"
			ref="selector"></w-picker>
		<mix-button ref="confirmBtn" text="创建广告" marginTop="80rpx" @onConfirm="confirm"></mix-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timeStrList: [],
				step: 0, //步骤
				adImg: '', //图片素材
				name: '', //广告名称
				link: '', //购买连接
				brief: '', //广告描述
				cardNum: '', //广告卡数量
				adCardNum: 0, //已有多少广告卡
				items: [], //时段选择列表
				defaultRegion: [], //省市区默认选择
				visible: false, //省市区选择展示状态
				regionStr: '省/市/区', //省市区选择展示名称
				regionList: [], //省市区选择列表
				defaultFloor: '', //楼栋默认选择
				floorVisible: false, //楼栋选择展示状态
				floorStr: '选择楼栋', //楼栋选择展示名称
				floorId: '',
				floorList: [], //楼栋选择列表
				defaultProps: {
					label: "name",
					value: "id"
				},
				addList: [] //新增广告卡表单
			}
		},
		created() {
			this.init();
		},
		onShow() {
			this.getBalance();
		},
		onLoad(options) {
			if(options.id){
				this.cardDetial(options.id)
			}
		},
		methods: {
			async cardDetial(id){
				let res7 = await this.$get('/ad-operation/detail',{
					id:id
				});
				let defaultData = res7.data
				this.name = defaultData.name
				this.link = defaultData.link
				this.brief = defaultData.brief
				this.adImg = defaultData.adImg
				for (let i in defaultData.adRatingMap) {
					this.addList.push({
						floorId: defaultData.adRatingMap[i][0].buildingId,
						floorStr: i,
						timeList: defaultData.adRatingMap[i]
					})
					defaultData.adRatingMap[i].forEach((element) => {
						element.price = element.price * 100
					})
				}
			},
			async confirm() {
				var that = this
				uni.showModal({
					title: '提示',
					content: '是否要发布广告',
					success: function (res) {
						if (res.confirm) {
							that.handleCofirm()
						}
					}
				});
				
			},
			async handleCofirm(){
				let timeData = []
				this.addList.forEach((element1) => {
					element1.timeList.forEach((element2) => {
						timeData.push({
							timeId:element2.timeId,
							buildingId:element1.floorId,
							price:element2.price,
						})
					})
				})
				let res6 = await this.$post('/ad-operation/publish', {
					adImg: this.adImg,
					brief: this.brief,
					cardNum: this.cardNum,
					link: this.link,
					name: this.name,
					role: 1,
					timeData: JSON.stringify(timeData)
				});
				this.navTo('/pages_store/bar/home',{login: true})
			},
			init() {
				this.getTimeRange()
			},
			hadleShowPopup() {
				this.items.forEach((element) => {
					element.checked = false
				})
				this.items.forEach((element1) => {
					this.timeStrList.forEach((element2) => {
						if (element1.id === element2.id) {
							element1.checked = true
						}
					})
				})
				this.$forceUpdate()
				this.$refs.popup.open()
			},
			changeStep(index) {
				this.step = index
			},
			upload() {
				this.chooseLoginImage((file) => {
					this.adImg = file
				})
			},
			handleSelectTime() {
				this.timeStrList = []
				this.items.forEach((element) => {
					if (element.checked === true) {
						this.timeStrList.push(element)
					}
				})
				this.$refs.popup.close()
			},
			checkboxChange(event) {
				this.items.forEach((element) => {
					element.checked = false
				})
				event.detail.value.forEach((element) => {
					this.items[parseInt(element)].checked = true
				})
				this.$forceUpdate()
			},
			async getBalance() {
				let res2 = await this.$get('/seller/wallet/balance');
				this.adCardNum = res2.data.adCardNum
			},
			async getTimeRange() {
				let res = await this.$get('/ad-operation/getTimeRange');
				this.items = res.data
			},
			async regionPicker(event) {
				let res2 = await this.$get('/ad-operation/listParks', {
					area: event.result
				});
				this.regionStr = event.result
				this.regionList = event.value
				if (res2.data.length) {
					this.floorList = res2.data
				} else {
					this.$util.msg("此区域没有楼栋");
					this.floorId = ''
					this.floorStr = '选择楼栋'
					this.floorList = []
				}
			},
			floorPicker(event) {
				this.floorStr = event.result
				this.floorId = event.value
			},
			deleteAddList(index) {
				this.addList.splice(index, 1)
			},
			async reLoadData(item, item2, index, index2) {
				let res4 = await this.$get('/ad-operation/listRating', {
					buildingId: item.floorId,
					price: item2.price,
					timeId: item2.timeId
				});
				this.$util.debounce(() => {
					this.addList[index].timeList[index2].rank = res4.data
				})
			},
			async generateForm() {
				if (this.regionStr === '省/市/区') {
					this.$util.msg("请先选择投放地");
					return false;
				}
				if (this.floorId === '') {
					this.$util.msg("请先选择楼栋");
					return false;
				}
				if (!this.timeStrList.length) {
					this.$util.msg("请先选择时段");
					return false;
				}
				if (this.addList.length === 5) {
					this.$util.msg("最多选择5个投放地");
					return false;
				}
				let timeList = []
				for (var i = 0; i < this.timeStrList.length; i++) {
					let element = this.timeStrList[i]
					let res3 = await this.$get('/ad-operation/listRating', {
						buildingId: this.floorId,
						price: element.baseMoney,
						timeId: element.id
					});
					timeList.push({
						timeId: element.id,
						price: element.baseMoney,
						rank: res3.data,
						timeDesc: element.timeStr
					})
				}
				this.addList.push({
					floorId: this.floorId,
					floorStr: this.floorStr,
					timeList: timeList
				})
				this.regionStr = '省/市/区'
				this.floorId = ''
				this.floorStr = '选择楼栋'
				this.floorList = []
			}
		}
	}
</script>

<style lang="scss" scoped>
	.aa_m2_m_s_b {
		width: 579rpx;
		height: 70rpx;
		background: #FC5531;
		border-radius: 35rpx;
		margin-bottom: 36rpx;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		line-height: 70rpx;
	}

	.popup_m {
		background: #FFFFFF;
		border-radius: 30rpx 30rpx 0 0;
		overflow: hidden;

		.popup_m_t {
			text-align: center;
			margin-top: 20rpx;
			margin-bottom: 60rpx;
		}

		.popup_m_t_cell {
			margin: 30rpx auto;
			width: 280rpx;
			justify-content: space-between;
		}

		.popup_m_b {
			width: 100%;
			height: 80rpx;
			background: #FC5531;
			text-align: center;
			line-height: 80rpx;
			color: #FFFFFF;
		}
	}

	.aa_m2_m_s_s_b {
		width: 196rpx;
		height: 50rpx;
		background: #FC5531;
		border-radius: 25rpx;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		line-height: 50rpx;
	}

	.ad_m_t_m2 {
		.ad_m_t_m2_s {
			border: 1px solid #CECECE;
			border-radius: 10rpx;
			margin-bottom: 27rpx;
			padding: 26rpx;
			position: relative;

			.ad_m_t_m2_s_d {
				width: 90rpx;
				height: 36rpx;
				background: #FC5531;
				border-radius: 0rpx 10rpx 0rpx 10rpx;
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
				text-align: center;
				line-height: 36rpx;
				position: absolute;
				top: 0;
				right: 0;
			}

			.ad_m_t_m2_s_t {
				font-size: 20rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #000000;
				// line-height: 56rpx;
			}

			.ad_m_t_m2_s_s {
				font-size: 20rpx;
				font-family: Source Han Sans CN;
				color: #000000;
				margin: 20rpx 0;
			}

			.ad_m_t_m2_s_s_i {
				width: 56rpx;
				height: 41rpx;
				border: 1px solid #CECECE;
				border-radius: 10rpx;

				// margin: 0 10rpx;
				input {
					font-size: 26rpx;
					font-family: Arial;
					font-weight: bold;
					color: #FC5937;
					line-height: 48rpx;
					text-align: center;
				}
			}

			.iconfont {
				font-size: 14rpx;
				margin-left: auto;
			}
		}
	}

	.aa_m2_m_s_s {
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;



		.aa_m2_m_s_s_s {
			width: 100%;
			height: 51rpx;
			background: #F6F6F6;
			border: 1px solid #CECECE;
			border-radius: 25rpx;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #000000;
			padding-left: 27rpx;
			margin-bottom: 20rpx;
			margin-right: 23rpx;
			text-align: center;
			line-height: 48rpx;
		}
	}

	.aa_m2_m {
		margin-top: 31rpx;

		.aa_radio {
			// font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #000000;

			.small {
				font-size: 22rpx;
				color: #969696;
			}
		}

		.aa_m2_m_s {
			margin-bottom: 36rpx;

			.aa_m2_m_s_i {
				width: 577rpx;
				height: 71rpx;
				background: #F6F6F6;
				border: 1px solid #EEEEEE;
				border-radius: 35rpx;
				margin: 21rpx 0;

				input {
					margin: 0 29rpx;
					height: 100%;
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
				}

				.aa_m2_m_s_i_b {
					width: 133rpx;
					height: 100%;
					background: #FC5531;
					border-radius: 35rpx;
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					text-align: center;
					line-height: 66rpx;
					margin-left: auto;
				}

				.aa_m2_m_s_i_t {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #000000;
					margin-left: 38rpx;
					margin-right: auto;
				}

				.iconfont {
					font-size: 14rpx;
					margin-right: 40rpx;
				}
			}

			.aa_m2_m_s_u {
				width: 161rpx;
				height: 161rpx;
				background: #F6F6F6;
				border: 1px solid #EEEEEE;
				border-radius: 10rpx;
				margin-top: 25rpx;
				text-align: center;

				.iconfont {
					font-size: 58rpx;
					color: #969696;
					line-height: 150rpx;
				}

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.aa_m_s_t {
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #000000;

		text {
			color: #969696;
		}
	}

	.h_block {
		width: 1px;
		height: 36rpx;
		background: #F6F6F6;
		position: absolute;
		z-index: 3;
		top: 0;
		left: 47rpx;
	}

	.idout {
		width: 35rpx;
		height: 35rpx;
		background: #FFFFFF;
		border-radius: 50%;
		border: 8rpx solid #01CF79;
		position: absolute;
		left: -90rpx;
		top: 0;
		z-index: 2;
	}

	.idoutnon {
		width: 19rpx;
		height: 19rpx;
		background: #969696;
		border-radius: 50%;
		position: absolute;
		left: -82rpx;
		top: 8rpx;
		z-index: 2;
	}

	.aa_m1 {
		.aa_m1_s {
			width: 577rpx;
			height: 71rpx;
			background: #F6F6F6;
			border: 1px solid #EEEEEE;
			border-radius: 35rpx;
			margin: 21rpx 0;

			input {
				margin: 0 29rpx;
				height: 100%;
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
			}
		}
	}

	.aa_m {
		border-left: 1px solid #CECECE;
		margin-left: 47rpx;
		margin-top: 30rpx;
		margin-right: 20rpx;

		.aa_m_main {
			background: #FFFFFF;
			border-radius: 20rpx;
			margin-left: 36rpx;
			padding: 36rpx;
			margin-top: 26rpx;

			.aa_m_t {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #000000;
				position: relative;
			}
		}
	}
</style>