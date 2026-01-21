<template>
	<view class="home-banner">
		<swiper class="swiper" circular autoplay interval="5000" @change="onSwiperChange" :style="{width:width}">
			<swiper-item class="item" v-for="(item, index) in list" :key="index">
				<image class="pic" :class="{current: current === index}"
					:src="cdn + (item.image ? item.image : item.adImg)" mode="aspectFill"
					@click="handleLink(item.link,item.id)"></image>
			</swiper-item>
		</swiper>
		<view class="dots row center">
			<view class="dot" :class="{current: current === index}" v-for="(item, index) in list" :key="index"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'HomeBanner',
		data() {
			return {
				current: 0,
				cdn: this.$cdn
			};
		},
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			width: {
				type: String,
				default () {
					return "750rpx"
				}
			}
		},
		methods: {
			onSwiperChange(e) {
				this.current = e.detail.current;
			},
			async handleLink(link, id) {
				if (id) {
					let res = await this.$post('/ad/click', {
						id: id
					});
				}
				if (link) {
					// #ifdef APP-PLUS
					plus.runtime.openWeb(link)
					// #endif
					// #ifdef H5
					window.location.href = link
					// #endif
				}

			}
		}
	}
</script>

<style scoped lang="scss">
	// view,text{line-height: 1.8;}
	.home-banner {
		position: relative;
	}

	.swiper {
		width: 750rpx;
		height: 360rpx;
		// padding-top: 10rpx;
		margin: 0 auto;
	}

	.pic {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 16rpx;
		transform: scale(0.94, 0.88);
		transition: transform .36s;

		&.current {
			transform: scale(1);
		}
	}

	.dots {
		position: absolute;
		left: 0;
		bottom: 12rpx;
		width: 100%;
	}

	.dot {
		width: 32rpx;
		height: 8rpx;
		margin: 0 6rpx;
		background-color: #fff;
		border-radius: 10px;

		&.current {
			background-color: $base-color;
		}
	}
</style>