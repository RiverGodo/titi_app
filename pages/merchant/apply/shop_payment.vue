<template>
	<view class="wrapper">
		<view class="item">
			<view class="title">账户类型</view>
			<view class="content">
				<input value="对公账户" disabled/>
			</view>
		</view>
		<view class="item">
			<view class="title">户名</view>
			<view class="content">
				<input placeholder="请输入户名" v-model="model.bankName"/>
			</view>
		</view>
		<view class="item">
			<view class="title">银行账号</view>
			<view class="content">
				<input placeholder="请输入银行账号" type="number" v-model="model.bankAccount"/>
			</view>
		</view>
		<view class="item">
			<view class="title">开户行</view>
			<view class="content">
				<input placeholder="请输入开户行" v-model="model.bank"/>
			</view>
		</view>
		<view class="item">
			<view class="title">开户支行</view>
			<view class="content">
				<input placeholder="请输入开户支行" v-model="model.bankBranch"/>
			</view>
		</view>
		<view class="item">
			<view class="title no">银行预留手机号</view>
			<view class="content">
				<input placeholder="请输入银行预留手机号" type="number" v-model="model.bankPhone"/>
			</view>
		</view>
		<view class="tips">
			<text class="iconfont">&#xe8ba;</text>
			<text>温馨提示：请注意填写，如填写错误商户自行负责。</text>
		</view>
		<view class="btn">
			<mix-button ref="confirmBtn" text="提交" @onConfirm="confirm"></mix-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			model: {
				bankName: '',
				bankAccount: '',
				bank: '',
				bankBranch: '',
				bankPhone: '',
			},
		};
	},
	onLoad(){
		let cache = uni.getStorageSync('sellerBank');
		if(cache){
			let arr = cache.split("_");
			this.model.bankName = arr[0];
			this.model.bankAccount = arr[1];
			this.model.bank = arr[2];
			this.model.bankBranch = arr[3];
			this.model.bankPhone = arr[4];
		}
	},
	methods: {
		async confirm(){
			let {
				bankName,
				bankAccount,
				bank,
				bankBranch,
				bankPhone,
			} = this.model;
			if(this.tip(bankName, "请填写开户名")) return;
			if(this.tip(bankAccount, "请填写银行卡账号")) return;
			if(this.tip(bank, "请填写开户行")) return;
			if(this.tip(bankBranch, "请填写开户支行")) return;
			uni.setStorageSync('sellerBank', bankName + "_" + bankAccount +
					"_" + bank + "_" + bankBranch + "_" + bankPhone);
			let param = {
				type: 0,
				bankName,
				bankAccount,
				bank,
				bankBranch,
				bankPhone,
			}
			let sellerCategory = uni.getStorageSync('sellerCategory');
			if(sellerCategory){
				let arr = sellerCategory.split("_");
				let cateId = arr[0] * 1;
				let type = arr[3] * 1;
				param['cateId'] = cateId;
				param['type'] = type;
			}
			let sellerBase = uni.getStorageSync('sellerBase');
			if(sellerBase){
				let arr = sellerBase.split("_");
				let headImg = arr[0];
				let name = arr[1];
				let innerImg = arr[2];
				let logo = arr[3];
				let address = arr[4];
				let detail = arr[5];
				let contactName = arr[6];
				let mobile = arr[7];
				let uid = arr[8];
				param['headImg'] = headImg;
				param['name'] = name;
				param['innerImg'] = innerImg;
				param['logo'] = logo;
				param['address'] = address + " " + detail;
				param['contactName'] = contactName;
				param['mobile'] = mobile;
				if(uid){
					param['inviterId'] = uid;
				}
			}
			let sellerLicense = uni.getStorageSync('sellerLicense');
			if(sellerLicense){
				let arr = sellerLicense.split("_");
				let idCardFront = arr[0];
				let idCardBackend = arr[1];
				let business = arr[2];
				let license = arr[3];
				param['idCardFront'] = idCardFront;
				param['idCardBackend'] = idCardBackend;
				param['business'] = business;
				param['license'] = license;
			}
			let res = await this.$post("/seller/apply", param);
			this.navTo("/pages/merchant/apply/shop_success?mobile=" + module.bankPhone);
		},
		tip(data, msg){
			if(this.$util.isEmpty(data)){
				this.$util.msg(msg);
				this.$refs.confirmBtn.stop();
				return true;
			}
			return false;
		},
	}
};
</script>
<style lang="scss">
	view,text{line-height: 1.8;}
page{
	background: $bg-color;
}
.tips{
	padding: 20rpx;
	.iconfont{
		color: $base-color;
		font-size: 40rpx;
	}
	text{
		padding-left: 20rpx;
		font-size: 24rpx;
	}
}
.btn{
	height: 130rpx;
	background: #fff;
	position: fixed;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	border-top: 1px solid $line-color;
	left: 0;
	width: 100%;
}
.wrapper{
	padding-bottom: 130rpx;
	color: #666;
	font-size: 30rpx;
	.item{
		background: #fff;
		margin-bottom: 20rpx;
		min-height: 120rpx;
		display: flex;
		align-items: center;
		&.upload{
			align-items: flex-start;
			padding-top: 30rpx;
		}
		.title{
			width: 300rpx;
			font-weight: bold;
			padding:0 40rpx 0 20rpx;
			&:after{
				display: inline-block;
				content: '*';
				padding-left: 20rpx;
				color: $base-color;
			}
			&.no:after{
				content: '';
			}
		}

		.content{
			flex: 1;
			text-align: right;
			padding-right: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #111;
			.iconfont{
				font-size: 40rpx;
				color: #666;
			}
			input{
				flex: 1;
				font-size: 30rpx;
			}
		}
		.message{
			padding-right: 20rpx;
			padding-bottom: 30rpx;
			flex: 1;
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
			input{
				margin-right:20rpx;
				flex: 1;
				font-size: 28rpx;
				border-bottom: 1px solid #ccc;
				padding-bottom: 20rpx;
				box-sizing: content-box;
				margin-bottom: 40rpx;
			}
			.no_img{
				width: 300rpx;
				height: 200rpx;
				border: 4rpx dashed $base-color;
				justify-content: center;
				align-items: center;
				display: flex;
				.iconfont{
					font-size: 60rpx;
					color: $base-color;
				}
			}
			image{
				width: 300rpx;
				height: 200rpx;
			}
		}
	}
}
</style>

