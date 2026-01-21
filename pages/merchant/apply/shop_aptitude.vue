<template>
	<view class="wrapper">
		<view class="item upload">
			<view class="title">身份证正反面</view>
			<view class="message" >
				<view class="subject">需保持照片清晰可见，身份证在有限期内</view>
				<view class="row">
					<view  @click="upload(1)">
						<view class="no_img" v-if="model.idCardFront === ''">
							<text class="iconfont">&#xe727;</text>
						</view>
						<image :src="cdn + model.idCardFront" v-if="model.idCardFront !== ''" />
					</view>
					<view  @click="upload(2)">
						<view class="no_img" v-if="model.idCardBackend === ''">
							<text class="iconfont">&#xe727;</text>
						</view>
						<image :src="cdn + model.idCardBackend" v-if="model.idCardBackend !== ''" />
					</view>
				</view>
			</view>
		</view>
		<view class="item upload">
			<view class="title">营业执照</view>
			<view class="message" @click="upload(3)">
				<view class="subject">需文字清晰、边框完整、露出国徽。拍复印件需加盖印章，可用有效特许证件代替</view>
				<view class="no_img" v-if="model.business === ''">
					<text class="iconfont">&#xe727;</text>
				</view>
				<image class="logo" :src="cdn + model.business" v-if="model.business !== ''" />
			</view>
		</view>
		<view class="item upload">
			<view class="title no">许可证</view>
			<view class="message"  @click="upload(4)">
				<view class="subject">需文字清晰、边框完整。可用有效特许证代替</view>
				<view class="no_img" v-if="model.license === ''">
					<text class="iconfont">&#xe727;</text>
				</view>
				<image class="logo" :src="cdn + model.license" v-if="model.license !== ''" />
			</view>
		</view>
		<view class="btn">
			<mix-button ref="confirmBtn" text="下一步" @onConfirm="confirm"></mix-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			model: {
				idCardFront: '',
				idCardBackend: '',
				business: '',
				license: '',
			},
			cdn: this.$cdn
		};
	},
	onLoad(){
		let cache = uni.getStorageSync('sellerLicense');
		if(cache){
			let arr = cache.split("_");
			this.model.idCardFront = arr[0];
			this.model.idCardBackend = arr[1];
			this.model.business = arr[2];
			this.model.license = arr[3];
		}
	},
	methods: {
		upload(type) {
			this.chooseLoginImage((file) => {
				if (type === 1) {
					this.model.idCardFront = file
				} else if (type === 2){
					this.model.idCardBackend = file;
				}else if (type === 3){
					this.model.business = file;
				}else if (type === 4){
					this.model.license = file;
				}
			})
		},
		async confirm(){
			let {
				idCardFront,
				idCardBackend,
				business,
				license,
			} = this.model;
			if(this.tip(idCardFront, "身份证正反面都要上传")) return;
			if(this.tip(idCardBackend, "身份证正反面都要上传")) return;
			if(this.tip(business, "请上传营业执照")) return;
			uni.setStorageSync('sellerLicense', idCardFront + "_" + idCardBackend +
					"_" + business + "_" + license);
			this.navTo("/pages/merchant/apply/shop_payment");
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
			width: 280rpx;
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
			.row{
				justify-content: space-between;
				.no_img{
					width: 210rpx;
					height: 140rpx;
				}
				image{
					width: 210rpx;
					height: 140rpx;
				}
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
