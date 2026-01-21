<template>
	<view class="category">
		<mix-tabs style="background: #F6F6F6;" ref="mixtab" activeCls="baseActive" @changeTab="sel" :tabList="['普通门店','创业公司']"></mix-tabs>
		<view class="line"></view>
		<!-- 分类内容 -->
		<view class="category-box" v-if="list.length > 0">
				<view class='box-left'>
					<view class="category-item" v-for="(item, index) in list"
								:key="item.id">
						<view class="item-title" :class="{ active: oneIndex === index }" @click="handleOne(index)">
							<text>{{ item.name }}</text>
						</view>
					</view>
				</view>
				<view class="box-right">
					<view class="box-right-title">
						{{list[oneIndex].name}}
					</view>
					<view class="box-right-m">
						<view v-for="(item, index) in list[oneIndex].children"
									:key="item.id" :class="{active: index === twoIndex}"
									@click="handleTwo(index)" class="right-list">
							{{ item.name }}
							<!-- <view v-show="index === twoIndex" class="box-right-main">主营</view> -->
						</view>
					</view>
					
				</view>
		</view>
		<view class="category-btn">
			<mix-button style="margin: 0 auto;" ref="confirmBtn" text="选好了"  @onConfirm="confirm" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reback: '',
				selIndex: 0,
				list: [],
				oneIndex: 0,
				twoIndex: 0,
				cateId: ''
			}
		},
		onLoad(options) {
			let cache = uni.getStorageSync('sellerCategory');
			if(cache){
				let arr = cache.split("_");
				this.cateId = arr[0] * 1;
				this.oneIndex = arr[1] * 1;
				this.twoIndex = arr[2] * 1;
				this.selIndex = arr[3] * 1;
			}
			this.reback = options.reback
			this.listCate();
		},
		mounted() {
			this.$refs.mixtab.selIndex = this.selIndex
		},
		methods: {
			confirm() {
				let children = this.list[this.oneIndex].children;
				this.$refs.confirmBtn.stop();
				if(children.length === 0){
					this.$util.msg("请选择对应的二级类目");
					return
				}
				this.cateId = children[this.twoIndex].id;
				let cateName = children[this.twoIndex].name;
				uni.setStorageSync('sellerCategory', this.cateId + "_" + this.oneIndex +
						"_" + this.twoIndex + "_" + this.selIndex + "_" + cateName);
				if(this.reback){
					this.back();
				}else{
					this.navTo("/pages/merchant/apply/shop_explain" );
				}
			},
			handleOne(index) {
				if (this.oneIndex !== index) {
					this.oneIndex = index;
					this.twoIndex = 0;
				}
			},
			handleTwo(index) {
				if (this.twoIndex !== index) {
					this.twoIndex = index
				}
			},
			async listCate() {
				let res = await this.$get("/seller/category/list", {type: this.selIndex})
				this.list = res.data;
			},
			sel(index) {
				if (this.selIndex !== index) {
					this.selIndex = index
					this.oneIndex = 0;
					this.twoIndex = 0;
					this.listCate();
				}
			},
		}
	}
</script>


<style lang="scss" scoped>
	// view,text{line-height: 1.8;}
	.line{
		width: 100%;
		height: 1rpx;
		background: #E8E8E8;
		border-radius: 0rpx;
	}
	.category{
		height: 100%;
		display: flex;
		width: 100%;
		flex-direction: column;
	}
	.category-box {
		flex: 1;
		display: flex;
		flex-direction: row;
		height: 100%;
		overflow: hidden;
		.box-left {
			height: 100%;
			width: 190rpx;
			min-width: 190rpx;
			overflow: scroll;
			background-color: #f2f2f2;
			.category-item {
				text-align: left;
				color: #969696;

				.item-title {
					height: 90rpx;
					line-height: 90rpx;
					font-size: 28rpx;
					position: relative;
					padding-left: 29rpx;
					overflow: hidden;
					text-overflow: clip;
					&.active {
						font-weight: bold;
						background: #fff;
						color: #333;
					}
					&.active::before {
						position: absolute;
						left: 0;
						content: "";
						width: 8rpx;
						height: 80rpx;
						top: 0;
						width: 7rpx;
						height: 90rpx;
						background: #01CF79;
						border-radius: 0rpx 7rpx 7rpx 0rpx;
					}
				}
			}
		}

		.right-list {
			font-size: 28rpx;
			display: flex;
			align-items: center;
			height: 80rpx;
			line-height: 80rx;
			// padding-left: 30rpx;
			margin: 0 7rpx;
			margin-bottom: 24rpx;
			width: 150rpx;
			height: 55rpx;
			background: #F5F7FB;
			border-radius: 28rpx;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #000000;
			// line-height: 80rpx;
			text-align: center;
			justify-content: center;
			&.active{
				color: $base-color;
				border: 1px solid #01CF79;
				// border-radius: 28rpx;
				background: #fff;
			}
		}
		.box-right{
			background: #fff;
			padding: 0 30rpx;
			width: 100%;
			.box-right-title{
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #000000;
				line-height: 90rpx;
			}
		}
		.box-right-m {
			flex: 1;
			height: 100%;
			overflow: scroll;
			background: #fff;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			flex-wrap: wrap;
			flex-direction: row;
			align-content: flex-start;
			// padding: 0 30rpx;
			width: 100%;
			.box-right-main {
				width: 120rpx;
				height: 50rpx;
				border-radius: 4px;
				background-color: $base-color;
				color: rgba(255, 255, 255, 1);
				text-align: center;
				line-height: 50rpx;
				margin-left: 30rpx;
				font-size: 24rpx;
			}
		}
	}
	.category-btn {
		border-top:1px solid $line-color;
		background: #fff;
		height: 120rpx;
		display: flex;
		align-items: center;
		left: 0;
		width: 100%;
	}
</style>
