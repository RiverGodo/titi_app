<template>
	<view>
		<view class="status_bar" :style="{height: statusBarHeight + 'px'}" />
		<!-- #ifdef (MP-WEIXIN) -->
		<view class="title" :style="{height: customHeight + 'px',
		 lineHeight: customHeight + 'px',backgroundColor:backColor}" >{{name}}</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		name: 'commonWxHeader',
		data() {
			return {
			};
		},
		computed: {
			customHeight(){
				return this.systemInfo.custom.height + 8;
			},
			statusBarHeight(){
				return this.systemInfo.statusBarHeight;
			}
		},
		props: {
			name: {
				type: String,
				default(){
					return ""
				}
			},
			backColor:{
				type: String,
				default(){
					return "#ffffff"
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.title{
		font-size:  30rpx;
		text-align: center;
		font-weight: bold;
	}
	.status_bar {
		width: 100%;
		background-color: #fff;
	}
</style>
