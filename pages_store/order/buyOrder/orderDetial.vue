<template>
	<view class="od">
		<view :style="'background-image: url('+ backImg[data.status] +');'" class="od_t">
			<view class="od_t_t w_flex_center">
				<text :class="'iconfont ' + getDataMsg(data).icon"></text>
				<view class="od_t_t_r">
					<view style="font-size: 36rpx;margin-bottom: 20rpx;font-weight: bold;">{{data.statusStr}}</view>
					<view v-if="data.status === 0">{{'剩余时间：' + minute + ":" + second}}</view>
					<view v-if="data.status === 1">感谢您的支持，欢迎再次光临</view>
					<view v-if="data.status === 2">订单已取消，欢迎再次购买</view>
				</view>
			</view>
			<view class="od_t_m" v-for="item in data.slaves" :key="item.id">
				<view class="od_t_m_t w_flex_center">
					<image class="od_t_m_t_i" :src="cdn + item.pic"></image>
					<view class="od_t_m_t_r">
						<view class="od_t_m_t_r_t">{{item.name}}</view>
						<view class="od_t_m_t_r_b w_flex_center amount">数量 <text>{{item.number}}张</text></view>
						<view class="od_t_m_t_r_b w_flex_center">单价 <text>￥{{item.price}}</text></view>
					</view>
				</view>
				<view class="od_t_m_b">
					小计：<text>￥{{item.money}}</text>
				</view>
			</view>
			<view class="od_t_e">
				<view class="od_t_e_t">订单信息</view>
				<view class="od_t_e_m">
					<view class="od_t_e_m_s w_flex_center">
						<view class="od_t_e_m_s_l">订单编号:</view>
						<view class="od_t_e_m_s_c">{{data.orderNo}}</view>
						<view class="od_t_e_m_s_r" @click="copy(data.orderNo)">复制</view>
					</view>
					<view class="od_t_e_m_s w_flex_center">
						<view class="od_t_e_m_s_l">下单时间:</view>
						<view class="od_t_e_m_s_c">{{new Date(data.createTime).getTime() | friendDate}}</view>
					</view>
					<view class="od_t_e_m_s w_flex_center">
						<view class="od_t_e_m_s_l">数量:</view>
						<view class="od_t_e_m_s_c">{{data.number}}张</view>
					</view>
					<view class="od_t_e_m_s w_flex_center">
						<view class="od_t_e_m_s_l">均价:</view>
						<view class="od_t_e_m_s_c"> <text>{{data.totalMoney / data.number | price(2)}}</text> </view>
					</view>
					<view class="od_t_e_m_s w_flex_center" v-if="data.payTypeStr">
						<view class="od_t_e_m_s_l">支付方式:</view>
						<view class="od_t_e_m_s_c">{{data.payTypeStr}}</view>
					</view>
					<view class="od_t_e_m_s w_flex_center" v-if="data.payTime">
						<view class="od_t_e_m_s_l">支付时间:</view>
						<view class="od_t_e_m_s_c">{{new Date(data.payTime).getTime() | friendDate}}</view>
					</view>
					<view class="od_t_e_m_s w_flex_center" v-if="data.cancelTime">
						<view class="od_t_e_m_s_l">取消时间:</view>
						<view class="od_t_e_m_s_c">{{new Date(data.cancelTime).getTime() | friendDate}}</view>
					</view>
					<view class="od_t_e_m_s w_flex_center" v-if="data.cancelReason">
						<view class="od_t_e_m_s_l">取消理由:</view>
						<view class="od_t_e_m_s_c">{{data.cancelReason}}</view>
					</view>
				</view>
				<view class="od_t_e_e">
					<text v-if="data.status === 1">实付金额：</text>
					<text v-else>应付金额：</text>
					<text>{{data.totalMoney | price(2)}}</text>
				</view>
			</view>
		</view>
		<view class="od_b w_flex_center" v-if="data.status === 0">
			<view @click="cancel" class="od_b_b b_b_l">取消订单</view>
			<view class="od_b_b b_b_r" @click.stop="navTo('/pages_store/ad/adExchange?id=' + data.id)" v-if="data.status == 0">去支付</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup_m">
				<view class="popup_m_t">取消订单</view>
				<view class="popup_m_d">请选择取消订单的原因（必选）：</view>
				<view class="popup_m_m">
					<view class="popup_m_m_s">
						<radio-group @change="onChange">
							<view class="od_radio">
								<radio color="#FC5C39" value="不想要了" ><text>不想要了</text></radio>
							</view>
							<view class="od_radio">
								<radio color="#FC5C39" value="商品错选/多选" ><text>商品错选/多选</text></radio>
							</view>
							<view class="od_radio">
								<radio color="#FC5C39" value="价格高了" ><text>价格高了</text></radio>
							</view>
							<view class="od_radio">
								<radio color="#FC5C39" value="没用/少用/错用优惠" ><text>没用/少用/错用优惠</text></radio>
							</view>
						</radio-group>
					</view>
				</view>
				<view class="popup_m_b" @click="confirm">提 交</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
let timer = null;
export default {
	data() {
		return {
			minute: "-",
			second: "-",
			cdn: this.$cdn,
			data: {},
			backImg: [
				this.$cdn + '/static/order-back3.png',
				this.$cdn + '/static/order-back2.png',
				this.$cdn + '/static/order-back1.png'
			]
		}
	},
	onLoad(option) {
		this.id = option.id;
		this.getData();
	},
	methods: {
		onChange(e){
			this.reason = e.detail.value;
		},
		cancel(){
			this.$refs.popup.open();
		},
		async confirm(){
			if(!this.reason){
				this.$util.msg("请选择理由");
				return
			}
			let res = await this.$post('/ad-buy-order/cancel', {id: this.data.id, note: this.reason});
			this.$util.msg('撤销成功');
			this.getData();
			this.$refs.popup.close();
		},
		getDataMsg(data){
			let status = data.status;
			if(status === 0){
				return {icon : 'icon-wait'}
			}else if(status === 1){
				return {icon : 'icon-success'}
			}else{
				return {icon : 'icon-cancel'}
			}
		},
		countDownTime(){
			let time = this.data.remainTime;
			timer && clearInterval(timer);
			timer = setInterval(() => {
				time --;
				this.countDown(time);
				if(time === 0){
					timer && clearInterval(timer);
				}
			}, 1000)
		},
		countDown(time){
			let minute = Math.floor(time/60) + "";
			let second = time%60 + "";
			if(minute.length === 1){
				this.minute = "0" + minute;
			}else{
				this.minute = minute;
			}
			if(second.length === 1){
				this.second = "0" + second;
			}else{
				this.second = second;
			}
		},
		copy(text){
			uni.setClipboardData({
				data: text,
				success: () => {
					this.$util.msg('复制成功');
				}
			})
		},
		async getData() {
			let res = await this.$get('/ad-buy-order/detail', {id: this.id});
			this.data = res.data;
			if(this.data.status === 0){
				this.countDownTime()
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.popup_m {
	background: #FFFFFF;
	border-radius: 30rpx 30rpx 0 0;
	padding: 0 20rpx;
	padding-top: 48rpx;
	padding-bottom: 22rpx;

	.popup_m_t {
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #000000;
		margin-bottom: 27rpx;
		margin-left: 10rpx;
	}

	.popup_m_d {
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #969696;
		margin-bottom: 47rpx;
		margin-left: 10rpx;
	}

	.popup_m_m{
		margin-left: 10rpx;
	}

	.popup_m_b {
		width: 710rpx;
		height: 79rpx;
		background: #FC5531;
		border-radius: 39rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 79rpx;
		text-align: center;
		margin-top: 56rpx;
	}

	.od_radio {
		margin-bottom: 39rpx;
		text{
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #000000;
			margin-left: 22rpx;
		}
	}
}

.od_t {
	width: 100%;
	height: 230rpx;
	background-repeat: no-repeat;
	background-size: 100% 100%;

	.od_t_t {
		padding-bottom: 26rpx;
		margin: 0 20rpx;
		padding-top: 45rpx;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		color: #ffffff;

		.iconfont {
			font-size: 77rpx;
			margin-right: 28rpx;
		}
	}

	.od_t_m {
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 25rpx;
		margin: 0 20rpx;
		margin-top: 10rpx;

		.od_t_m_t_i {
			width: 200rpx;
			height: 150rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			margin-right: 35rpx;
			min-width: 200rpx;
		}

		.od_t_m_t_r {
			width: 100%;
			.od_t_m_t_r_t {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #000000;
				height: 45rpx;
			}

			.od_t_m_t_r_b {
				justify-content: space-between;
				font-size: 20rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #969696;
				&.amount{
					padding-top: 10rpx;
					padding-bottom: 20rpx;
					text{
						color: #000;
					}
				}
				text {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #FC5531;
				}
			}
		}

		.od_t_m_b {
			text-align: right;
			border-top: 1px solid #E2E2E2;
			padding-top: 26rpx;
			margin-top: 25rpx;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #000000;

			text {
				color: #FC5531;
			}
		}
	}

	.od_t_e {
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 30rpx;
		margin: 0 20rpx;
		margin-top: 31rpx;

		.od_t_e_t {
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #000000;
			margin-bottom: 32rpx;
		}

		.od_t_e_m {
			.od_t_e_m_s {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				color: #000000;
				margin-bottom: 30rpx;

				.od_t_e_m_s_l {
					margin-right: 20rpx;
				}

				.od_t_e_m_s_c {
					text {
						color: #FC5531;
					}
				}

				.od_t_e_m_s_r {
					margin-left: auto;
					width: 90rpx;
					height: 39rpx;
					background: #EEEEEE;
					border: 2px solid #D1D1D1;
					border-radius: 6rpx;
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #969696;
					line-height: 30rpx;
					text-align: center;
				}
			}
		}
	}

	.od_t_e_e {
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #000000;
		text-align: right;
		border-top: 1px solid #E2E2E2;
		padding-top: 30rpx;

		text {
			color: #FC5531;
		}
	}
}

.od_b {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	background: #FFFFFF;
	box-shadow: 0rpx 5rpx 8rpx 0rpx #000000;
	padding: 8rpx 0;

	.od_b_b {
		width: 223rpx;
		height: 82rpx;
		border-radius: 40rpx;
		text-align: center;
		line-height: 76rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
	}

	.b_b_l {
		margin-left: auto;
		border: 2px solid #EEEEEE;
		color: #969696;
	}

	.b_b_r {
		background: #FC5531;
		border: 2px solid #FC5531;
		color: #FFFFFF;
		margin-right: 20rpx;
		margin-left: 7rpx;
	}

}
</style>