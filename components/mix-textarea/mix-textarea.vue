<template>
	<view class="mix_area">
		<textarea placeholder-class="tAphcolor" class="mix_area_text" :style="{'width':width,'height':height}" v-model="value"
			:placeholder="placeholder" :maxlength="maxLength"></textarea>
		<view v-if="maxLength > 0" class="text-number">{{value.length}}/{{maxLength}}</view>
		<view v-else class="text-number">{{value.length}}</view>
	</view>
</template>

<script>
	export default {
		name: "MixTextarea",
		props: {
			maxLength: {
				type: Number,
				default: -1
			},
			placeholder: {
				type: String,
				default: ""
			},
			border: {
				type: String,
				default: ""
			},
			width: {
				type: String,
				default: "100%"
			},
			height: {
				type: String,
				default: "100%"
			}
		},
		watch: {
			value(value) {
				this.$emit('changeValue',value)
			}
		},
		data() {
			return {
				value: ''
			};
		}
	}
</script>

<style>
	.mix_area {
		position: relative;
	}

	.mix_area_text {
		width: 100%;
		height: 100%;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #000000;
		line-height: 48rpx;
	}

	.text-number {
		position: absolute;
		right: 0;
		bottom: 0;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #969696;
	}
	.tAphcolor{
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #969696;
		line-height: 34rpx;
	}
</style>