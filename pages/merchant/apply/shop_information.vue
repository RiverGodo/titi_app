<template>
	<view class="wrapper">
			<view @click="navTo('/pages/merchant/apply/shop_select_category?reback=1')" class="item">
				<view class="title">经营品类</view>
				<view class="content">
					<input v-model="model.cateName" disabled placeholder="请选择经营品类"/>
					<text class="iconfont">&#xe605;</text>
				</view>
			</view>
			<view class="item upload">
				<view class="title" :class="type === 0? '': 'no'">门店照片<view class="subject">需拍出完整门匾、门框</view></view>
				<view class="message"  @click="upload(1)">
					<view class="no_img" v-if="model.headImg === ''">
						<text class="iconfont">&#xe727;</text>
					</view>
					<image :src="cdn + model.headImg" v-if="model.headImg !== ''" />
				</view>
			</view>
			<view class="item">
				<view class="title">门店牌匾名称</view>
				<view class="content">
					<input v-model="model.name" placeholder="需要与上传的门店照片一致"/>
				</view>
			</view>
			<view class="item upload">
				<view class="title" :class="type === 0? '': 'no'">店内环境图<view class="subject">需真实反映内部环境</view></view>
				<view class="message" @click="upload(2)">
					<view class="no_img" v-if="model.innerImg === ''">
						<text class="iconfont">&#xe727;</text>
					</view>
					<image class="logo" :src="cdn + model.innerImg" v-if="model.innerImg !== ''" />
				</view>
			</view>
			<view class="item upload">
				<view class="title">商标图<view class="subject">需体现您店铺的特色</view></view>
				<view class="message"  @click="upload(3)">
					<view class="no_img" v-if="model.logo === ''">
						<text class="iconfont">&#xe727;</text>
					</view>
					<image class="logo" :src="cdn + model.logo" v-if="model.logo !== ''" />
				</view>
			</view>
			<view class="item">
				<view class="title">店铺地址</view>
				<view class="message">
					<view class="content">
						<input v-model="model.address" @click="openPicker" disabled placeholder="请选择省市区"/>
						<text class="iconfont">&#xe601;</text>
					</view>
				<!-- 	<view class="row">
						<input v-model="model.address" disabled  @click="openPicker" placeholder="请选择省市区"/>
						<text class="iconfont">&#xe601;</text>
					</view> -->
					<view class="content-area">
						<!-- <input v-model="model.detail" placeholder="请填写详细地址"/> -->
						<textarea class="content-area-m" v-model="model.detail" placeholder="请填写详细地址" />
					</view>
				</view>
			</view>
			<view class="item">
				<view class="title">联系人</view>
				<view class="content">
					<input v-model="model.contactName" placeholder="请输入法人姓名"/>
				</view>
			</view>
			<view class="item">
				<view class="title">联系人电话</view>
				<view class="content">
					<input v-model="model.mobile" type="number" placeholder="请输入法人联系电话" />
				</view>
			</view>
			<view v-if="type === 0" class="item">
				<view class="title">推荐人UID</view>
				<view class="content">
					<input v-model="model.uid" type="number" placeholder="请输入UID" />
				</view>
			</view>
			<view class="item" >
				<view class="title">验证码</view>
				<view class="content">
					<input type="number" maxlength="6" v-model="model.code"  placeholder="请填写验证码" />
					<mix-code :mobile="model.mobile" action="innerOther" />
				</view>
			</view>
			<view class="btn">
				<mix-button ref="confirmBtn" text="下一步" @onConfirm="confirm"></mix-button>
			</view>
		<lotus-address class="address_box" v-on:choseVal="choseValue" :lotusAddressData="lotusAddressData"></lotus-address>
	</view>
</template>

<script>
import lotusAddress from "../../../components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue";
export default {
	components: {"lotus-address":lotusAddress},
		data() {
			return {
				model: {
					cateName: '',
					headImg: '',
					innerImg: '',
					logo: '',
					name: '',
					address: '',
					detail: '',
					contactName: '',
					mobile: '',
					uid:'',
					code: '',
					cateId: '',
					type: 0,
				},
				lotusAddressData:{
					visible: false,
					provinceName:'',
					cityName:'',
					townName:'',
				},
				type: 0,
				cdn: this.$cdn
			};
		},
		onShow() {
			let cache = uni.getStorageSync('sellerCategory');
			if(cache){
				let arr = cache.split("_");
				this.model.cateId = arr[0] * 1;
				this.model.cateName = arr[4];
				this.type = arr[3] * 1;
			}
		},
		onLoad(){
			let cache = uni.getStorageSync('sellerBase');
			if(cache){
				let arr = cache.split("_");
				this.model.headImg = arr[0];
				this.model.name = arr[1];
				this.model.innerImg = arr[2];
				this.model.logo = arr[3];
				this.model.address = arr[4];
				this.model.detail = arr[5];
				this.model.contactName = arr[6];
				this.model.mobile = arr[7];
				this.model.uid = arr[8];
			}
		},
		methods: {
			upload(type) {
				this.chooseLoginImage((file) => {
					if (type === 1) {
						this.model.headImg = file
					} else if (type === 2){
						this.model.innerImg = file;
					}else if (type === 3){
						this.model.logo = file;
					}
				})
			},
			async confirm(){
				let {
					name,
					headImg,
					innerImg,
					logo,
					address,
					detail,
					contactName,
					mobile,
					code,
					cateId,
						uid
				} = this.model;
				if(this.tip(cateId, "请选择您的经营类目")) return;
				if(this.tip(headImg, "请上传门头照")) return;
				if(this.tip(name, "请填写店铺牌匾名")) return;
				if(this.tip(innerImg, "请上传店内照片")) return;
				if(this.tip(logo, "请上传商标")) return;
				if(this.tip(address, "请选择店铺所在省市区")) return;
				if(this.tip(detail, "请输入详细地址")) return;
				if(this.tip(contactName, "请输入法人姓名")) return;
				if(this.tip(mobile, "请输入法人手机号")) return;
				if(this.tip(code, "请填写验证码")) return;
				if(this.type === 0){
					if(this.tip(uid, "请填写推荐人UID")) return;
				}
				uni.setStorageSync('sellerBase', headImg + "_" + name +
						"_" + innerImg + "_" + logo +
						"_" + address + "_" + detail +
						"_" + contactName + "_" + mobile + "_" + uid);
				await this.$post('/seller/valid', {mobile, code, uid, type: this.type});
				this.navTo("/pages/merchant/apply/shop_aptitude");
			},
			tip(data, msg){
				if(this.$util.isEmpty(data)){
					this.$util.msg(msg);
					this.$refs.confirmBtn.stop();
					return true;
				}
				return false;
			},
			openPicker() {
				this.lotusAddressData.visible = true;
				this.lotusAddressData.provinceName = '广东省';
				this.lotusAddressData.cityName = '广州市';
				this.lotusAddressData.townName = '白云区';
			},
			//回传已选的省市区的值
			choseValue(res){
				//res数据源包括已选省市区与省市区code
				this.lotusAddressData.visible = res.visible;//visible为显示与关闭组件标识true显示false隐藏
				//res.isChose = 1省市区已选 res.isChose = 0;未选
				if(res.isChose){
					this.model.address = `${res.province} ${res.city} ${res.town}`; //region为已选的省市区的值
				}
			},
		}
	};
</script>
<style lang="scss">
	.content-area{
		width: 100%;
		height: 146rpx;
		border: 1px solid #DBDBDB;
		border-radius: 20rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		padding: 28rpx 31rpx;
		margin-top: 29rpx;
		.content-area-m{
			width: 100%;
			height: 100%;
			font-size: 28rpx;
		}
	}
	// view,text{line-height: 1.8;}
	.upload{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	page{
		background: $bg-color;
	}
	.btn{
		height: 130rpx;
		// background: #fff;
		// position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		// border-top: 1px solid $line-color;
		left: 0;
		width: 100%;
	}
	.wrapper{
		// padding-bottom: 130rpx;
		color: #666;
		font-size: 30rpx;
		.item{
			background: #fff;
			margin: 28rpx 20rpx;
			border-radius: 20rpx;
			padding: 30rpx;
			// margin-bottom: 25rpx;
			// min-height: 120rpx;
			// display: flex;
			// align-items: center;
			
			&.upload{
				align-items: center;
				// padding-top: 30rpx;
			}
			.title{
				width: 280rpx;
				font-weight: bold;
				// padding:0 40rpx 0 20rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: Medium;
				color: #000000;
				line-height: 42rpx;
				&::before{
					display: inline-block;
					content: '*';
					// padding-left: 20rpx;
					color: #FF0000;
				}
				&.no:after{
					content: '';
				}
			}

			.content{
				flex: 1;
				padding-right: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #111;
				height: 81rpx;
				border: 1px solid #DBDBDB;
				border-radius: 20rpx;
				margin-top: 30rpx;
				padding: 0 30rpx;
				font-size: 28rpx;
				.iconfont{
					font-size: 10rpx;
					color: #000000;
				}
				input{
					flex: 1;
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #000000;
					line-height: 42rpx;
				}
			}
			.message{
				// padding-right: 20rpx;
				// padding-bottom: 30rpx;
				// flex: 1;
				.row{
					align-items: flex-start;
					.iconfont{
						font-size: 40rpx;
						padding-right: 20rpx;
					}
				}
				.subject{
					color: #333;
					margin-bottom: 30rpx;
				}
				// input{
				// 	margin-right:20rpx;
				// 	flex: 1;
				// 	font-size: 28rpx;
				// 	border-bottom: 1px solid #ccc;
				// 	padding-bottom: 20rpx;
				// 	box-sizing: content-box;
				// 	margin-bottom: 40rpx;
				// }
				.no_img{
					justify-content: center;
					align-items: center;
					display: flex;
					width: 240rpx;
					height: 180rpx;
					background: #F6F6F6;
					border-radius: 20rpx;
					.iconfont{
						font-size: 60rpx;
						color: #BABABA;
					}
				}
				image{
					width: 300rpx;
					height: 200rpx;
				}
			}
		}
	}
	.subject{
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #969696;
		// line-height: 42rpx;
		margin-top: 25rpx;
	}
</style>
