<template>
	<view class="se">
		<view class="se1 se_main">
			<view class="se_t w_flex_center">
				<view class="se_t_l">店铺信息</view>
				<view @click="se1Type = false" v-if="se1Type" class="se_t_r">修改</view>
				<view v-else class="se_t_r2 w_flex_center">
					<view @click="se1Type = true" style="background: #969696;" class="se_t_r">取消</view>
					<view @click="confirm1()" class="se_t_r">保存</view>
				</view>
			</view>
			<view class="se_m">
				<view class="se_m_s w_flex_center">
					<view class="se_m_s_l">门店牌匾名称： </view>
					<view v-if="se1Type" class="se_m_s_r">{{shopData.name}}</view>
					<input v-else placeholder="请填写门店牌匾名称" type="text" v-model="editData.name" />
				</view>
				<view class="se_m_s w_flex_start">
					<view class="se_m_s_l">店铺地址：</view>
					<view v-if="se1Type" class="se_m_s_r">{{shopData.address}}</view>
					<input v-else placeholder="请填写店铺地址" type="text" v-model="editData.address" />
				</view>
				<view class="se_m_s w_flex_center">
					<view class="se_m_s_l">联系电话：</view>
					<view v-if="se1Type" class="se_m_s_r">{{shopData.mobile}}</view>
					<input v-else placeholder="请填写联系电话" type="number" v-model="editData.mobile" />
				</view>
				<view class="se_m_s w_flex_center">
					<view class="se_m_s_l">门店照片：</view>
					<image v-if="se1Type" class="se_m_s_i" :src="$cdn + shopData.headImg"></image>
					<view v-else class="se_m_s_u">
						<view v-if="editData.headImg" class="se_m_s_i">
							<image class="se_m_s_i_img" :src="$cdn + editData.headImg"></image>
							<view @click="editData.headImg = ''" class="se_m_s_i_i">
								<text class="iconfont">&#xe619;</text>
							</view>
						</view>
						<view @click="upload(1)" v-else class="se_m_s_u_m">
							<text class="iconfont">&#xe727;</text>
						</view>
					</view>
				</view>
				<view class="se_m_s w_flex_center">
					<view class="se_m_s_l">店内环境图：</view>
					<image v-if="se1Type" class="se_m_s_i" :src="$cdn + shopData.innerImg"></image>
					<view v-else class="se_m_s_u">
						<view v-if="editData.innerImg" class="se_m_s_i">
							<image class="se_m_s_i_img" :src="$cdn + editData.innerImg"></image>
							<view @click="editData.innerImg = ''" class="se_m_s_i_i">
								<text class="iconfont">&#xe619;</text>
							</view>
						</view>
						<view @click="upload(2)" v-else class="se_m_s_u_m">
							<text class="iconfont">&#xe727;</text>
						</view>
					</view>
				</view>
				<view class="se_m_s w_flex_center">
					<view class="se_m_s_l">商标图：</view>
					<image v-if="se1Type" class="se_m_s_i" :src="$cdn + shopData.logo"></image>
					<view v-else class="se_m_s_u">
						<view v-if="editData.logo" class="se_m_s_i">
							<image class="se_m_s_i_img" :src="$cdn + editData.logo"></image>
							<view @click="editData.logo = ''" class="se_m_s_i_i">
								<text class="iconfont">&#xe619;</text>
							</view>
						</view>
						<view @click="upload(3)" v-else class="se_m_s_u_m">
							<text class="iconfont">&#xe727;</text>
						</view>
					</view>
				</view>
			</view>
			<view class="se_t w_flex_center">
				<view class="se_t_l">资质信息</view>
			</view>
			<view class="se_m">
				<view class="se_m_s w_flex_center">
					<view class="se_m_s_l">身份证正反照：</view>
					<view v-if="se1Type" style="width: auto;" class="se_m_s_r w_flex_center">
						<image class="se_m_s_i" :src="$cdn + shopData.idCardFront"></image>
						<image class="se_m_s_i" :src="$cdn + shopData.idCardBackend"></image>
					</view>
					<view v-else class="se_m_s_u w_flex_center">
						<view v-if="editData.idCardFront" class="se_m_s_i">
							<image class="se_m_s_i_img" :src="$cdn + editData.idCardFront"></image>
							<view @click="editData.idCardFront = ''" class="se_m_s_i_i">
								<text class="iconfont">&#xe619;</text>
							</view>
						</view>
						<view @click="upload2(1)" v-else class="se_m_s_u_m">
							<text class="iconfont">&#xe727;</text>
						</view>
						<view style="margin-left: 30rpx;" v-if="editData.idCardBackend" class="se_m_s_i">
							<image class="se_m_s_i_img" :src="$cdn + editData.idCardBackend"></image>
							<view @click="editData.idCardBackend = ''" class="se_m_s_i_i">
								<text class="iconfont">&#xe619;</text>
							</view>
						</view>
						<view style="margin-left: 30rpx;" @click="upload2(2)" v-else class="se_m_s_u_m">
							<text class="iconfont">&#xe727;</text>
						</view>
					</view>
				</view>
				<view class="se_m_s w_flex_center">
					<view class="se_m_s_l">营业执照：</view>
					<image v-if="se1Type" class="se_m_s_i" :src="$cdn + shopData.business"></image>
					<view v-else class="se_m_s_u">
						<view v-if="editData.business" class="se_m_s_i">
							<image class="se_m_s_i_img" :src="$cdn + editData.business"></image>
							<view @click="editData.business = ''" class="se_m_s_i_i">
								<text class="iconfont">&#xe619;</text>
							</view>
						</view>
						<view @click="upload2(3)" v-else class="se_m_s_u_m">
							<text class="iconfont">&#xe727;</text>
						</view>
					</view>
				</view>
				<view class="se_m_s w_flex_center">
					<view class="se_m_s_l">许可证：</view>
					<image v-if="se1Type" class="se_m_s_i" :src="$cdn + shopData.license"></image>
					<view v-else class="se_m_s_u">
						<view v-if="editData.license" class="se_m_s_i">
							<image class="se_m_s_i_img" :src="$cdn + editData.license"></image>
							<view @click="editData.license = ''" class="se_m_s_i_i">
								<text class="iconfont">&#xe619;</text>
							</view>
						</view>
						<view @click="upload2(4)" v-else class="se_m_s_u_m">
							<text class="iconfont">&#xe727;</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="se3 se_main">
			<view class="se_t w_flex_center">
				<view class="se_t_l">收款信息</view>
				<view @click="se3Type = false" v-if="se3Type" class="se_t_r">修改</view>
				<view v-else class="se_t_r2 w_flex_center">
					<view @click="se3Type = true" style="background: #969696;" class="se_t_r">取消</view>
					<view @click="confirm3()" class="se_t_r">保存</view>
				</view>
			</view>
			<view class="se_m">
				<view class="se_m_s w_flex_center">
					<view class="se_m_s_l">开户人姓名：</view>
					<view v-if="se3Type" class="se_m_s_r">{{shopData.bankName}}</view>
					<input v-else placeholder="请填写开户人姓名" type="text" v-model="editData.bankName" />
				</view>
				<view class="se_m_s w_flex_center">
					<view class="se_m_s_l">银行账号：</view>
					<view v-if="se3Type" class="se_m_s_r">{{shopData.bankAccount}}</view>
					<input v-else placeholder="请填写银行账号" type="number" v-model="editData.bankAccount" />
				</view>
				<view class="se_m_s w_flex_center">
					<view class="se_m_s_l">开户行：</view>
					<view v-if="se3Type" class="se_m_s_r">{{shopData.bank}}</view>
					<input v-else placeholder="请填写开户行" type="text" v-model="editData.bank" />
				</view>
				<view class="se_m_s w_flex_center">
					<view class="se_m_s_l">支行：</view>
					<view v-if="se3Type" class="se_m_s_r">{{shopData.bankBranch}}</view>
					<input v-else placeholder="请填写支行" type="text" v-model="editData.bankBranch" />
				</view>
				<view class="se_m_s w_flex_center">
					<view class="se_m_s_l">预留手机号：</view>
					<view v-if="se3Type" class="se_m_s_r">{{shopData.bankPhone}}</view>
					<input v-else placeholder="请填写预留手机号" type="number" v-model="editData.bankPhone" />
				</view>
				<view v-if="!se3Type" style="color: #FE0000;" class="se_m_s">
					温馨提示：请注意填写，如填写错误商户自行负责
				</view>
			</view>
		</view>
		<view class="se4 se_main">
			<view class="se_t w_flex_center">
				<view class="se_t_l">营业时间</view>
				<view @click="se4Type = false" v-if="se4Type" class="se_t_r">设置</view>
				<view v-else class="se_t_r2 w_flex_center">
					<view @click="se4Type = true" style="background: #969696;" class="se_t_r">取消</view>
					<view @click="confirm4()" class="se_t_r">保存</view>
				</view>
			</view>
			<view class="se_m">
				<view v-if="se4Type" style="margin: 0;" class="se_m_s w_flex_center">
					<view v-if="shopData.rangeTime" class="se_m_s_l">{{shopData.rangeTime}}</view>
					<view v-else class="se_m_s_w">暂无营业时间，请先设置！</view>
				</view>
				<view v-else style="margin: 0;" class="se_m_s">
					<view style="margin-bottom: 30rpx;" class="se_m_s_l w_flex_center">选择日期
						<view @click="openSelect('weekLimit')" class="se_m_s_l_b w_flex_center">
							<view v-if="editData.weekLimit" class="se_m_s_l_b_s">{{editData.weekLimit}}</view>
							<view v-else>
								<text class="iconfont icon-time">&#xe67c;</text>
								请选择日期
							</view>
						</view>
					</view>
					<view class="se_m_s_l w_flex_center">选择时间
						<view @click="openSelect('timeLimit')" class="se_m_s_l_b w_flex_center">
							<view v-if="editData.timeLimit" class="se_m_s_l_b_s">{{editData.timeLimit}}</view>
							<view v-else>
								<text class="iconfont icon-time">&#xe67c;</text>
								请选择时间
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		{{options}}
		<w-picker :visible.sync="linkageVisible" mode="linkage" :value="defaultRegion1" :options="options"
			:level="2" default-type="id" themeColor="#FC5C39" :default-props="defaultProps1"
			@confirm="onConfirm($event)" ref="linkage">
			<text class="able-text">{{selectTitle}}</text>
		</w-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				se1Type: true,
				se2Type: true,
				se3Type: true,
				se4Type: true,
				shopData: {},
				editData: {},
				weekLimit: [],
				timeLimit: [],
				defaultRegion1: [],
				defaultProps1: {
					label: "name",
					value: "name",
					children: "child"
				},
				linkageVisible: false,
				selectTitle:'',
				options: [],
			}
		},
		created() {
			this.formate()
			this.init()
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
					this.editData[this.selectOptions] = "每" + event.value[0]
				} else {
					this.editData[this.selectOptions] = event.value[0] + " 到 " + event.value[1]
				}
				console.log(this.editData);
			},
			async init() {
				const res = await this.$get('/seller/detail');
				this.shopData = JSON.parse(JSON.stringify(res.data))
				this.editData = JSON.parse(JSON.stringify(res.data))
				this.se1Type = true
				this.se2Type = true
				this.se3Type = true
				this.se4Type = true
			},
			upload(type) {
				this.chooseLoginImage((file) => {
					if (type === 1) {
						this.editData.headImg = file
					} else if (type === 2) {
						this.editData.innerImg = file;
					} else if (type === 3) {
						this.editData.logo = file;
					}
				})
			},
			upload2(type) {
				this.chooseLoginImage((file) => {
					if (type === 1) {
						this.editData.idCardFront = file
					} else if (type === 2) {
						this.editData.idCardBackend = file;
					} else if (type === 3) {
						this.editData.business = file;
					} else if (type === 4) {
						this.editData.license = file;
					}
				})
			},
			async confirm1() {
				let {
					name,
					headImg,
					innerImg,
					logo,
					address,
					mobile,
					idCardFront,
					idCardBackend,
					business,
					license,
				} = this.editData;
				if (this.tip(headImg, "请上传门店照片")) return;
				if (this.tip(name, "请填写店铺牌匾名")) return;
				if (this.tip(innerImg, "请上传店内环境图")) return;
				if (this.tip(logo, "请上传商标图")) return;
				if (this.tip(address, "请填写店铺地址")) return;
				if (this.tip(mobile, "请填写联系电话")) return;
				if (this.tip(idCardFront, "请上传身份证正面照")) return;
				if (this.tip(idCardBackend, "请上传身份证反面照")) return;
				if (this.tip(business, "请上传营业执照")) return;
				if (this.tip(license, "请上传许可证")) return;
				this.init();
				await this.$post('/seller/updateInfo', {
					...this.editData
				});
				this.$util.msg('已提交审核');
			},
			async confirm3() {
				let {
					bankName,
					bankAccount,
					bank,
					bankBranch,
					bankPhone,
				} = this.editData;
				if (this.tip(bankName, "请填写开户名")) return;
				if (this.tip(bankAccount, "请填写银行卡账号")) return;
				if (this.tip(bank, "请填写开户行")) return;
				if (this.tip(bankBranch, "请填写开户支行")) return;
				if (this.tip(bankPhone, "请填写预留手机号")) return;
				await this.$post('/seller/updateReceive', {
					...this.editData
				});
				this.$util.msg('修改成功');
				this.init();
			},
			async confirm4() {
				let {
					weekLimit,
					timeLimit
				} = this.editData;
				if (this.tip(weekLimit, "请选择日期")) return;
				if (this.tip(timeLimit, "请选择时间")) return;
				this.editData.rangeTime = this.editData.weekLimit + " " + this.editData.timeLimit
				await this.$post('/seller/updateBusinessTime', {
					...this.editData
				});
				this.$util.msg('修改成功');
				this.init();
			},
			tip(data, msg) {
				if (this.$util.isEmpty(data)) {
					this.$util.msg(msg);
					return true;
				}
				return false;
			},
		}
	}
</script>



<style lang="scss" scoped>
	.se {
		padding-bottom: 27rpx;

		input {
			text-align: right;
			font-size: 26rpx;
			height: 60rpx;
		}

		.icon-time {
			margin: 0 18rpx;
		}
		
		.se_m_s_l_b_s{
			margin-left: 18rpx;
		}
	}

	.se_main {
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 27rpx;
		margin: 0 20rpx;

		.se_t {
			justify-content: space-between;
			margin-bottom: 29rpx;

			.se_t_l {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #000000;
			}

			.se_t_r {
				width: 118rpx;
				height: 49rpx;
				background: #FC5531;
				border-radius: 25rpx;
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
				text-align: center;
				line-height: 49rpx;
				margin-left: 11rpx;
			}
		}

		.se_m {
			.se_m_s {
				justify-content: space-between;
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #000000;
				margin-bottom: 30rpx;

				.se_m_s_l {
					text-align: left;
					line-height: 60rpx;
				}

				.se_m_s_r {
					text-align: right;
					width: 337rpx;
					line-height: 60rpx;
				}

				.se_m_s_i {
					width: 200rpx;
					height: 150rpx;
					margin-left: 30rpx;
					position: relative;

					.se_m_s_i_img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}

	.se1 {
		margin-top: 37rpx;
		margin-bottom: 26rpx;
	}

	.se2 {
		margin-bottom: 35rpx;
	}

	.se3 {
		margin-bottom: 35rpx;
	}

	.se_m_s_u_m {
		width: 200rpx;
		height: 150rpx;
		background: #F6F6F6;
		border-radius: 0rpx;

		.iconfont {
			font-size: 50rpx;
			color: #BABABA;
			text-align: center;
			line-height: 150rpx;
			margin: 0 auto;
			width: 50rpx;
			display: block;
		}
	}

	.se_m_s_i_i {
		width: 40rpx;
		height: 40rpx;
		background: #FC5531;
		border-radius: 50%;
		font-size: 13rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 40rpx;
		position: absolute;
		top: -10rpx;
		right: -10rpx;
	}

	.se_m_s_l_b {
		width: 273rpx;
		height: 61rpx;
		border: 1px solid #969696;
		border-radius: 10rpx;
		margin-left: 40rpx;
		text-align: center;
		line-height: 60rpx;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #969696;
	}
	.se_m_s_w{
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FE0000;
		line-height: 60rpx;
		text-align: center;
		width: 100%;
	}
</style>