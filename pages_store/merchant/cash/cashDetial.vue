<template>
	<view class="cash_detial">
		<view style="height: 100%;" class="cash_detial_m">
			<view v-for="(item,index) in statusType" :key="index" v-show="detialData.status === item.status"
				class="cash_detial_m_t">
				状态：{{item.name}}
			</view>
			<view class="cash_detial_m_m1 cash_block">
				<view v-for="(item,index) in formworkData1" :key="index" class="cash_detial_m_m1_s">
					<view class="cash_detial_m_m_s_l">{{item.name}}</view>
					<view :style="item.corresponding === 'price' ? 'color:#FC5C39':''" class="cash_detial_m_m_s_r">
						<text v-if="item.corresponding === 'price'">¥</text>{{detialData[item.corresponding]}}</view>
				</view>
			</view>
			<view class="cash_detial_m_m2 cash_block">
				<view v-for="(item,index) in formworkData2" :key="index" class="cash_detial_m_m2_s">
					<view class="cash_detial_m_m_s_l">{{item.name}}</view>
					<view class="cash_detial_m_m_s_r">{{detialData[item.corresponding]}}</view>
				</view>
			</view>
			<view v-if="detialData.status === 0 && detialData.isFirst === false" class="cash_detial_m_btn">
				<mix-button @onConfirm="handleOffLine()" class="confirmBtn" ref="confirmBtn" text="下线" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formworkData1: [{
						name: 'ID：',
						corresponding: 'id'
					},
					{
						name: '现金劵面值',
						corresponding: 'price'
					},
					{
						name: '现金券名称',
						corresponding: 'otherLimit'
					},
					{
						name: '现金券总量',
						corresponding: 'total'
					},
					{
						name: '兑换限制',
						corresponding: 'perUserLimit'
					},
					{
						name: '可用日期',
						corresponding: 'weekLimit'
					},
					{
						name: '可用时段',
						corresponding: 'timeLimit'
					}
				],
				formworkData2: [{
						name: '使用限制',
						corresponding: 'otherLimit'
					},
					{
						name: '适用范围',
						corresponding: 'rangeArea'
					},
					{
						name: '适用规则',
						corresponding: 'rule'
					}
				],
				statusType: [{
						status: 0,
						name: '已上线'
					},
					{
						status: 1,
						name: '已下线'
					},
					{
						status: 2,
						name: '已上线'
					},
					{
						status: 3,
						name: '已下线'
					}
				],
				detialData: {}
			}
		},
		onLoad(option){
			this.init(option.id);
		},
		methods: {
			async init(id){
				const res = await this.$get('/seller/coupon/get', {
					id:id
				});
				this.detialData = res.data
			},
			async handleOffLine(){
				const res = await this.$post("/seller/coupon/offline", {
					id:this.detialData.id
				});
				this.$util.msg('下线成功');
				this.init(this.detialData.id);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cash_detial {
		height: 100%;
		background: #FFFFFF;
		padding-top: 43rpx;
		.cash_detial_m {
			.cash_detial_m_t {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: $base-color-admin;
				margin-left: 52rpx;
				margin-bottom: 26rpx;
			}

			.cash_block {
				border: 2px solid rgba(150, 150, 150, 0.2);
				margin: 0 19rpx;
				margin-bottom: 24rpx;
				border-radius: 20rpx;
				padding: 32rpx 31rpx 40rpx 34rpx;
			}

			.cash_detial_m_m1 {
				.cash_detial_m_m1_s {
					display: flex;
					align-items: center;
					justify-content: space-between;
				}
			}

			.cash_detial_m_m_s_l {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #969696;
				line-height: 60rpx;
			}

			.cash_detial_m_m_s_r {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #000000;
				line-height: 60rpx;
			}
		}
	}

	.confirmBtn {
		// background: #969696;
		// width: 710rpx;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 24rpx;
		margin: auto;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #FFFFFF;
		border-radius: 40rpx;
	}
</style>