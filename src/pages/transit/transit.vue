<template>
	<view>
		<u-loading-page :loading="true"></u-loading-page>
	</view>
</template>

<script>
	import {
		wxUrl
	} from "../../api/auth.js"
	export default {
		onLoad(options) {
			if (options.q) {
				// this.$store.dispatch('ObtainUserInfo')
				const sceneStr = decodeURIComponent(options.q);
				this.content = this.getLocationParams(sceneStr, 'content')
				this.handleJump();
			} else {
				console.log('没有信息')
			}
		},
		onUnload() {
			uni.switchTab({
				url: '/pages/index/index',
			})
		},
		computed: {
			userInfo() {
				return this.$store.getters.userInfo
			},
			hasLogin() {
				return this.$store.getters.hasLogin
			}
		},
		data() {
			return {
				content: ''
			}
		},
		mounted() {

		},
		methods: {
			// 后续优化添加按钮支持小程序打开APP
			android() {
				var _clickTime = new Date().getTime();
				window.location.href = "youhuijian://pages/index/index";
				var _count = 0,
					intHandle;
				intHandle = setInterval(() => {
					_count++;
					var elsTime = new Date().getTime() - _clickTime;
					if (_count >= 100 || elsTime > 5000) {
						clearInterval(intHandle);
						if (document.hidden || document.webkitHidden) {
							window.location.href = "youhuijian://pages/index/index";
							window.close();
							// return;
						} else {
							// 安卓下载app
							uni.$u.route('/pages/download/download')
						}
					}
				}, 20);
			},
			handleJump() {
				let port = uni.getSystemInfoSync().platform
				switch (port) {
					case 'android':
						//判断app是否存在
						// this.android();
						uni.$u.route('/pages/download/download')
						console.log('运行Android上', port); //android
						break;
					case 'ios':
						// #ifdef H5
						wxUrl().then(res => {
							window.location.href = res
						})
						// #endif
						// #ifdef MP-WEIXIN
						// uni.$u.route('/pages/login/social')
						this.handleElevator()
						// #endif
						console.log('运行iOS上', port); //ios
						break;
					default:
						// uni.$u.route('/pages/login/social')
						this.handleElevator()
						console.log('运行在开发者工具上'); //devtools
						break;
				}
			},
			// 截取code
			getLocationParams(urls, keyWords) {
				// 提取路由值（字符串）
				let href = urls;
				// 从占位符开始截取路由（不包括占位符）
				let query = href.substring(href.indexOf("?") + 1);
				// 根据 & 切割字符串
				let vars = query.split("&");
				for (let i = 0; i < vars.length; i++) {
					let pair = vars[i].split("=");
					// 根据指定的参数名去筛选参数值
					if (pair[0] == keyWords) {
						return pair[1];
					}
				}
				return "";
			},
			handleElevator() {
				console.log(JSON.parse(this.content),232323232);
				if(this.hasLogin){
					let result = JSON.parse(this.content)
					if (Array.isArray(result)) {
						if (result[0] === 0) {
							uni.$u.route('/pages/elevator/elevator?data=' + this.content)
						} else {
							uni.$u.route('/pages/login/register?data=' + this.content)
						}
					}else{
						uni.$u.toast("扫码错误")
					}
				}else{
					let result = JSON.parse(this.content)
					if (Array.isArray(result)) {
						if (result[0] === 0) {
							uni.setStorageSync('returnPath', '/pages/elevator/elevator?data=' + this.content)
						} else {
							uni.setStorageSync('returnPath', '/pages/login/register?data=' + this.content)
						}
						uni.$u.route('/pages/login/social')
					}else{
						uni.$u.toast("扫码错误")
					}
				}
			}
		}
	}
</script>

<style>

</style>
