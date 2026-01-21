<template>
	<view style="height: 100%">
		<view class="que"
			style="margin-top: 20rpx; margin-bottom: 200rpx; height: 1250rpx; z-index: 99999; overflow: auto">
			<block style="height: 1000rpx" v-for="(item, index) in syas" :key="index">
				<view class="con" style="width: 100%">
					<view v-show="item.isay" class="isay" style="display: flex; width: 100%;align-items: center;
    padding-top: 20rpx;">
						<view class="r-i"
							style="width: 60rpx;height: 60rpx;min-width: 60rpx; margin-left: 20rpx;border-radius: 50%;overflow: hidden;">
							<image style="width: 100%; height: 100%;"
								:src="$store.state.headImg? ($cdn + $store.state.headImg) : ($cdn + '/static/mine-logo.png')">
							</image>
						</view>

						<view class="r-t"
							style="margin-bottom: 20rpx; margin-top: 20rpx; line-height: 40rpx; float: left; margin-right: 15px">
							<text :selectable="true"
								style="word-break: break-all; margin-left: 10px; float: left; border-radius: 8px; font-size: 14px; color: black"
								:user-select="true">
								{{ item.isay }}
							</text>
						</view>
					</view>

					<view class="robort" style="
                            display: flex;
                            width: 100%;
                            border-top-style: solid;
                            border-top-width: 1rpx;
                            border-top-color: rgb(214, 214, 216);
                            border-bottom-style: solid;
                            border-bottom-width: 1rpx;
                            border-bottom-color: rgb(214, 214, 216);
                            margin-top: 20rpx;
                            background-color: rgb(248, 246, 246);
							align-items: center;
							padding: 20rpx 0;
                        ">
						<view class="l-i"
							style="width: 60rpx;min-width: 60rpx;height: 60rpx; margin-left: 20rpx;border-radius: 50%;overflow: hidden;">
							<image style="width: 100%; height: 100%;" :src="headLeft"></image>
						</view>
						<view class="l-t"
							style="margin-top: 20rpx; margin-bottom: 20rpx; line-height: 40rpx; float: left; margin-right: 15px">
							<text :selectable="true"
								style="word-break: break-all; margin-left: 10px; float: left; border-radius: 8px; font-size: 14px; color: black"
								:user-select="true">
								{{ item.robot }}
							</text>
						</view>
					</view>
				</view>
			</block>
		</view>

		<view class="send">
			<view class="input">
				<input v-model="moduleText" confirm-type="send" @confirm="handleSend()" type="text" class="text"
					placeholder="请输入您的问题" name="says" />
				<button @click="handleSend()" :disabled="disabled"
					style="width: 160rpx;margin-left: 20rpx;margin-right: 20rpx;" class="btn" id="btn"
					form-type="submit">发送</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				syas: [{
					robot: '欢迎使用友惠见GPT助手！',
					isay: '你好！'
				}, ],
				disabled: false,
				headLeft: this.$cdn + '/logo.png',
				avatarUrl: '',
				moduleText: ''
			};
		},
		methods: {
			handleSend() {
				if (this.moduleText) {
					if (this.moduleText.length > 50) {
						this.$util.msg("您输入的问题过长");
					} else {
						this.$util.debounce(() => {
							this.loadDataList()
						})
					}
				} else {
					this.$util.msg("请输入问题");
				}
			},
			async loadDataList() {
				this.disabled = true
				const params = {
					model: 'gpt-3.5-turbo',
					messages: [{
						role: 'user',
						content: this.moduleText
					}],
				}

				// #ifdef APP-PLUS
				let url = 'https://openai.api2d.net/v1/chat/completions'
				// #endif
				// #ifndef APP-PLUS
				let url = '/v1/chat/completions'
				// #endif
				this.syas.push({
					robot: "正在思考。。。"
				})
				uni.request({
					url: url,
					method: 'POST',
					data: params,
					header: {
						'content-type': 'application/json',
						"Authorization": "Bearer fk187255-PeKYz8VYBqvnGbxuI3iGdAYMn6VQ4gY5"
					},
					success: (res) => {
						this.syas.push({
							robot: res.data.choices[0].message.content,
							isay: this.moduleText
						})
						this.moduleText = ''
						this.disabled = false
					},
					fail: (error, d) => {
						this.disabled = false
						console.log(error, d);
						this.$util.msg("网络开小差了");
					}
				})
			}
		}
	};
</script>
<style>
	.send {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 12vh;
		line-height: 100rpx;
		background-color: #ffffff;
		text-align: center;
		box-shadow: 6px -2px 15px rgb(209, 204, 204);
	}

	.input {
		/* position: fixed; */
		width: 100%;

		margin-top: 50rpx;
		display: flex;
		align-items: center;
	}

	.text {
		float: left;
		margin-left: 10px;
		width: 75%;
		height: 33px;
		border-radius: 29px;
		font-size: 12px;
		background-color: rgb(239, 243, 243);
		text-align: center;
		color: #505050;
	}

	.btn {
		float: left;
		/* margin-left: 100rpx; */
		background-color: rgba(17, 208, 192, 0.88);
		/* line-height: 31px; */
		font-size: 12px;
		color: #ffffff;
		cursor: pointer;
		border-radius: 18px;
		/* box-shadow:3px 3px 12px -1px #968f96db; */
	}

	.btn-d {
		/* float:left; */
		border-style: solid;
		border-width: 2rpx;
		border-color: #cac9c9;
		/* height: 55rpx;
  width: 10rpx; */
		background-color: rgb(252, 249, 249);
		/* line-height: 31px; */
		color: #585757;
		cursor: pointer;
		border-radius: 18px;
		/* box-shadow:3px 3px 12px -1px #968f96db; */
		font-size: 14px;
	}
</style>