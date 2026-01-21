<template>
	<view class="app column">
		<view class="price-wrapper center column">
			<text>支付金额</text>
			<text class="price">{{ money }}</text>
		</view>
    <view class="tips">
      <text>请您于<text class="important">{{time}}</text>分钟内支付完成，过期将会自动撤销订单。</text>
    </view>
		<view class="cell row b-b" @click="checkType(item)" v-for="item in payWays" :key="item">
			<text class="iconfont orange" v-if="item ==0">&#xe60e;</text>
			<text class="iconfont green" v-if="item ==1">&#xe639;</text>
			<view class="column fill">
				<text class="tit" v-if="item ==0">余额支付</text>
				<text class="tit" v-if="item ==1">微信支付</text>
			</view>
			<text class="money" v-if="item ==0">¥{{usable}}</text>
			<text class="iconfont" :class="curType == item? 'icon-selected' : 'icon-unselected'"></text>
		</view>
		<mix-button ref="confirmBtn" text="确认支付" marginTop="80rpx" @onConfirm="confirm"></mix-button>
		<mix-loading v-if="isLoading" :mask="true"></mix-loading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curType: null,
				money: 0,
				payWays: [],
				usable: '-',
				data: {

				},
        time: '--',
			}
		},
		async onLoad(options) {
			this.id = options.id;
      this.jumpType = options.j;
			const res = await this.$get('/ad-buy-order/getBuyMsg', {
				id: this.id
			})
      if(res.data.payWays.length > 0) this.curType = res.data.payWays[0];
			this.money = res.data.money;
			this.usable = res.data.usable;
      this.time = res.data.time;
			this.payWays = res.data.payWays;
		},
		methods: {
			confirm() {
				this.$util.throttle(() => {
					this.payByUnipay();
				})
			},
			async payByUnipay() {
				const res = await this.$post('/ad-buy-order/pay', {
					id: this.id,
					payWay: this.curType,
				});
				this.$util.msg("支付成功");
				setTimeout(() => {
          if(this.jumpType == 1){
            uni.navigateBack();
          }else{
            uni.redirectTo({
              url: "/pages/merchant/ad"
            })
          }

				}, 1000)
			},
			checkType(type) {
				this.curType = type;
			},
		}
	}
</script>

<style scoped lang="scss">
	view,text{line-height: 1.8;}
  page{
    background-color: #fff;
  }
	.tips {
		font-size: 26rpx;
    color: #666;
    display: flex;
    flex-direction: column;
    align-items: center;
    .iconfont{
      font-size: 60rpx;
      font-weight: bold;
    }
    padding-bottom: 40rpx;
    .important{
      color: $base-color;
      font-size: 40rpx;
      padding: 0 10rpx;
    }
	}

	.app {
		padding: 0 80rpx;
		align-items: center;

		/deep/ {
			.mix-btn-content {
				width: 560rpx;
			}
		}
	}

	.price-wrapper {
		background-color: #fff;
    padding-top: 80rpx;
		height: 220rpx;
		font-size: 28rpx;
		color: #909399;
		.price {
			font-size: 56rpx;
			color: #333;
			margin-top: 20rpx;
			font-weight: 600;
      &:before{
        content: '¥';
        font-size: 40rpx;
        padding-right: 20rpx;
      }
		}
	}

	.cell {
		.money {
			font-size: 26rpx;
			color: #666;
			padding-right: 30rpx;
		}

		width: 100%;
		height: 124rpx;
		align-items: center;
		justify-content: center;

		.iconfont {
			font-size: 50rpx;
			color: $base-color;
			margin-right: 32rpx;
			&.green{
        font-size: 40rpx;
        color: green
      }
      width: 30rpx;
      &.icon-selected{
        font-size: 40rpx;
        color: $base-color;
      }
      &.icon-unselected{
        font-size: 40rpx;
        color: #666;
      }
		}
		
		.circle {
			background: #FFFFFF;
			border:1rpx solid #999999;
			border-radius: 50%;
			height: 36rpx;
			width: 36rpx;
		
		}

		.tit {
			flex: 1;
			font-size: 30rpx;
			color: #333;
			font-weight: 700;
		}

		.tip {
			margin-top: 14rpx;
			font-size: 24rpx;
			color: #999;
		}

		.icon-xuanzhong {
			font-size: 40rpx;
			color: $base-color;
			height: 36rpx;
			width: 36rpx;
		}
	}
</style>
