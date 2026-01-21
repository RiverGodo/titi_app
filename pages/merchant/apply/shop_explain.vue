<template>
	<view class="shop-explain">
		<view class="shop-explain-top">
			<view v-if="type === 0" class="shop-explain-title">
				开店流程
			</view>
			<view v-else class="shop-explain-title">
				加盟商家开店流程
			</view>
			<view class="shop-explain-main">
				<view class="shop-explain-main-single">
					<view class="shop-explain-main-single-t">1</view>
					<view class="shop-explain-main-single-e">提交资料</view>
				</view>
				<view class="shop-explain-main-single">
					<view class="shop-explain-main-single-t">2</view>
					<view class="shop-explain-main-single-e">资料审核</view>
				</view>
				<view class="shop-explain-main-single">
					<view class="shop-explain-main-single-t">3</view>
					<view class="shop-explain-main-single-e">开门营业</view>
				</view>
			</view>
		</view>
		<view class="shop-explain-c">
			<view class="shop-explain-title">
				开店需要准备以下资料
			</view>
			<view class="shop-explain-c-main">
				<view v-for="(item,index) in descList[type]" :key="index" class="shop-explain-c-main-s">
					<view class="shop-explain-c-main-s-l">
						<image :src="cdn + item.imgUrl" />
					</view>
					<view class="shop-explain-c-main-s-r">
						<view class="shop-explain-c-main-s-r-t">
							{{index + 1}}.{{item.title}}
						</view>
						<view class="shop-explain-c-main-s-r-b">
							{{item.desc}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="shop-explain-b">
			<view class="agreement">
				<!-- 	<text class="iconfont" :class="{active: agreement}"
							@click="checkAgreement">{{agreement? '&#xe63d;': '&#xe63e;'}}</text> -->
				<label @click="checkAgreement" class="radio">
					<radio color="#FC5C39" value="agreement" /><text><text>我已阅读并同意</text></text>
				</label>
				<text class="tit" @click="navTo('/pages/announce/detail?id=' + 3)">《开店说明》</text>
			</view>
			<mix-button ref="confirmBtn" text="我准备好了" @onConfirm="handleReady" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 0,
				cdn: this.$cdn,
				agreement: false,
				descList: [
					[{
							imgUrl: '/static/shop-explain1.png',
							title: '门店照片',
							desc: '需提供有完整牌匾的门脸图（建议正对门店来拍摄）'
						},
						{
							imgUrl: '/static/shop-explain2.png',
							title: '店内环境图',
							desc: '需真实反映内部环境'
						},
						{
							imgUrl: '/static/shop-explain3.png',
							title: '身份证正面照',
							desc: '需清晰展示文字信息，身份证在有效期内'
						},
						{
							imgUrl: '/static/shop-explain4.png',
							title: '身份证反面照',
							desc: '需清晰展示文字信息，身份证在有效期内'
						},
						{
							imgUrl: '/static/shop-explain5.png',
							title: '服务许可证',
							desc: '需文字清晰、边框完整可用有效特许证件代替'
						},
						{
							imgUrl: '/static/shop-explain6.png',
							title: '营业执照',
							desc: '需文字清晰、边框完整、露出国徽，拍复印件需加盖印章，可用有效特许证件代替'
						},
						{
							imgUrl: '/static/shop-explain7.png',
							title: '商标图',
							desc: '需体现您店铺的特色'
						}
					],
					[{
							imgUrl: '/static/shop-explain3.png',
							title: '身份证正反照',
							desc: '需清晰展示文字信息，身份证在有效期内'
						},
						{
							imgUrl: '/static/shop-explain6.png',
							title: '营业执照',
							desc: '需文字清晰、边框完整、露出国徽，拍复印件需加盖印章，可用有效特许证件代替'
						},
						{
							imgUrl: '/static/shop-explain7.png',
							title: '商标图',
							desc: '需体现您店铺的特色'
						}
					]
				]
			}
		},
		onLoad() {
			let cache = uni.getStorageSync('sellerCategory');
			if (cache) {
				let arr = cache.split("_");
				this.type = arr[3] * 1;
			}
		},
		methods: {
			checkAgreement() {
				this.agreement = !this.agreement;
			},
			handleReady() {
				this.$refs.confirmBtn.stop();
				if (this.agreement) {
					this.navTo("/pages/merchant/apply/shop_information")
				} else {
					this.$util.msg('请先阅读开店说明并同意')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	// view,
	// text {
	// 	line-height: 1.8;
	// }
	.agreement {
		padding-left: 20rpx;
		// height: 70rpx;
		font-size: 24rpx;
		color: #999;
		margin-bottom: 16rpx;

		.iconfont {
			font-size: 30rpx;
			color: #ccc;
			padding-right: 10rpx;
			display: inline-block;

			&.active {
				color: $base-color;
			}
		}

		.tit {
			color: $base-color;
		}
	}

	.shop-explain-c-main {
		margin: 0 20rpx;
	}

	.shop-explain-c {
		// margin-top: 50rpx;
		padding-bottom: 200rpx;
		background: #FFFFFF;
		border-radius: 30rpx 30rpx 0rpx 0rpx;
		padding-top: 34rpx;
	}

	.shop-explain-c-main-s-r-t {
		font-size: 30rpx;
		font-weight: bold;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #000000;
		line-height: 42rpx;
	}

	.shop-explain-c-main-s-r-b {
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #969696;
		line-height: 42rpx;
	}

	.shop-explain-c-main-s {
		display: flex;
		align-items: flex-start;
		margin-bottom: 20rpx;
		border: 1px solid #EAEAEA;
		border-radius: 20rpx;
		padding: 20rpx 30rpx;

		.shop-explain-c-main-s-l {
			margin-right: 36rpx;
			width: 200rpx;
			height: 180rpx;
			min-width: 200rpx;
			min-height: 180rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.shop-explain-title {
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #000000;
		line-height: 42rpx;
		margin-left: 20rpx;
		margin-bottom: 38rpx;
		// margin-top: 34rpx;
	}

	.shop-explain-main {
		@include flex-space-around;

		.shop-explain-main-single-t {
			width: 68rpx;
			height: 68rpx;
			background: $base-color;
			border-radius: 50%;
			line-height: 68rpx;
			text-align: center;
			margin: 0 auto;
			margin-bottom: 20rpx;
			color: #ffffff;
		}
	}

	.shop-explain-b {
		// padding: 20rpx 0;
		padding: 22rpx 0;
		// border-top:1px solid $line-color;
		position: fixed;
		bottom: 0;
		width: 100%;
		background: #ffffff;

		.agreement {
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #000000;
			line-height: 42rpx;

			.tit {
				color: #FC5C39;
			}
		}
	}
</style>