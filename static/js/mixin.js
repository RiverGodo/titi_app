import {
	request
} from './request.js'
import cache from './cache.js'
import config from './config.js'

export default {
	data() {
		return {
			page: 0, //页码
			pageNum: 6, //每页加载数据量
			loadingType: 1, //0加载前 1加载中 2没有更多
			isLoading: false, //刷新数据
		}
	},
	methods: {
		log(data) {
			console.log(JSON.parse(JSON.stringify(data)))
		},
		wxVisit(url){
			if(process.env.NODE_ENV !== 'production') return true;
			//这些页面小程序可以访问
			let arr = ['auth/check', 'auth/login', 'bar/home', '/bar/mine', '/scan/scan',
				'/scan/up', '/worker/apply', '/pay/selectCash', '/pay/paySuccess', '/safe/waf'];
			for(const element of arr){
				if(url.indexOf(element) !== -1){
					return true;
				}
			}
			return false;
		},
		/**
		 * navigatorTo跳转页面
		 * @param {String} url
		 * @param {Object} options
		 * @param {Boolean} options.login 是否检测登录
		 */
		navTo(url, options = {}) {
			console.log(url);
			this.$util.throttle(() => {
				if (!url) {
					return;
				}
				// #ifdef MP-WEIXIN || H5
				if(!this.wxVisit(url)){
					uni.showModal({
						title: '温馨提示',
						content: '想要使用更多功能，请下载APP',
						showCancel: true,
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/download/app'
								})
							}
						}
					});
					return;
				}
				// #endif
				if ((~url.indexOf('login=1') || options.login) && !this.$store.getters.hasLogin) {
					url = '/pages/auth/login';
				}
				if (~url.indexOf('type=switch')) {
					uni.switchTab({
						url
					})
				} else {
					uni.navigateTo({
						url
					})
				}
			}, 300)
		},
		wait() {
			this.$refs.confirmBtn && this.$refs.confirmBtn.stop();
			this.$util.msg("敬请期待");
		},
		chooseLoginImage(successCallback) {
			if (this.isLoading) return;
			uni.chooseImage({
				count: 1, //最多可以选择的图片张数，默认9
				success: (res) => {
					this.isLoading = true;
					res.tempFilePaths.forEach((v) => {
						uni.uploadFile({
							url: config.prefix + '/user/upload',
							header: {
								token: uni.getStorageSync("token")
							},
							filePath: v,
							name: 'file',
							success: (result) => {
								this.isLoading = false;
								uni.hideLoading();
								let data = JSON.parse(result.data);
								let code = data.code;
								if (code === 401) {
									this.$util.msg(data.msg);
									this.$store.commit('logout');
									this.navTo("/pages/auth/login")
									return;
								}
								if (code === 403) {
									this.$util.msg(data.msg);
									this.$store.commit('logout');
									uni.switchTab({
										url: '/pages/tabbar/home'
									});
									return;
								}
								if (code !== 200) {
									this.$util.msg(data.msg);
									return;
								}
								successCallback && successCallback(data.data);
							},
							fail: () => {
								this.isLoading = false;
								this.$util.msg("网络开小差了～");
							}
						});
					})
				}
			})
		},
		chooseImage(successCallback) {
			if (this.isLoading) return;
			uni.chooseImage({
				count: 1, //最多可以选择的图片张数，默认9
				success: (res) => {
					this.isLoading = true;
					res.tempFilePaths.forEach((v) => {
						uni.uploadFile({
							url: config.prefix + '/user/uploadNoNeed',
							filePath: v,
							name: 'file',
							success: (result) => {
								this.isLoading = false;
								uni.hideLoading();
								let data = JSON.parse(result.data);
								let code = data.code;
								if (code !== 200) {
									this.$util.msg(data.msg);
									return;
								}
								successCallback && successCallback(data.data);
							},
							fail: () => {
								this.isLoading = false;
								this.$util.msg("网络开小差了～");
							}
						});
					})
				},
				fail: () => {
					this.$util.msg("网络开小差了～");
				}
			})
		},
		back() {
			const pages = getCurrentPages();
			const prePage = pages[pages.length - 2];
			if (prePage) {
				uni.navigateBack();
			} else {
				uni.switchTab({
					url: "/pages/bar/home"
				});
			}
		},
		$get(url, data = {}, ext = {}, failedCallback) {
			return new Promise((resolve, reject) => {
				if (ext.cache > 0) {
					const cacheResult = cache.get(url + JSON.stringify(data));
					if (cacheResult && cacheResult.status !== 0) {
						resolve(cacheResult);
						return;
					}
				}
				request(url, data, 'GET', ext, this, failedCallback).then(result => {
					if (ext.cache > 0) {
						cache.put(url + JSON.stringify(data), result, ext.cache);
					}
					resolve(result);
				})
			})
		},
		$post(url, data = {}, ext={}, failedCallback) {
			return new Promise((resolve, reject) => {
				request(url, data, 'POST', ext, this, failedCallback).then(result => {
					resolve(result);
				})
			})
		}
	},
}