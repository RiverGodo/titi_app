<script>
	import Vue from 'vue';

	//#ifdef APP-PLUS
	import silenceUpdate from '@/uni_modules/rt-uni-update/js_sdk/silence-update.js' //引入静默更新
	//#endif  

	let timer = null;

	export default {
		onLaunch() {
			uni.getSystemInfo({
				success: e => {
					this.initSize(e);
				}
			})
			this.initLogin();
			this.initDeviceId();
		},
		onShow() {
			//#ifdef APP-PLUS
        if (process.env.NODE_ENV === 'production'){
            this.getUpApk();
        }
			//#endif
		},
		methods: {
			//登录状态
			async initLogin() {
				const token = uni.getStorageSync('token');
				const role = uni.getStorageSync('role');
				const userInfo = uni.getStorageSync('userInfo');
				if (token) {
					this.$store.commit('setToken', token);
					if (userInfo) {
						this.$store.commit('setUserInfo', userInfo);
					}
				}
        if(role == 1){
            this.$store.commit('setRole', 1);
        }else{
            this.$store.commit('setRole', 0);
        }
				// this.$store.commit('setToken', 1); 测试登录某个用户
			},
			initSize(e) {
				let systemInfo = e;
				let custom = {
					height: 0,
					width: 0
				}
				// #ifdef MP-WEIXIN
				custom = wx.getMenuButtonBoundingClientRect();
				// #endif
				systemInfo.custom = custom;
				Vue.prototype.systemInfo = systemInfo;
			},
			// 设置设备唯一标记
			initDeviceId() {
				this.$store.commit('setDeviceId', uni.getSystemInfoSync().deviceId)
			},
			// 更新APP
			getUpApk() {
				// 获取本地应用资源版本号
				plus.runtime.getProperty(plus.runtime.appid, (inf) => {
					//获取服务器的版本号
					uni.request({
						url: this.$cdn + '/app/android/apkEdition.json',
						success: (res) => {
							//res.data根据后台返回的数据决定（我这里后端返回的是data），所以是res.data 
							//判断后台返回版本号是否大于当前应用版本号 && 是否发行 （上架应用市场时一定不能弹出更新提示）
							if (Number(res.data.edition_number) > Number(inf.versionCode) && res.data
								.edition_issue == 1) {
								//如果是wgt升级，并且是静默更新 （注意！！！ 如果是手动检查新版本，就不用判断静默更新，请直接跳转更新页，不然点击检查新版本后会没反应）
								if (res.data.package_type == 1 && res.data.edition_silence == 1) {
									//调用静默更新方法 传入下载地址
									silenceUpdate(res.data.edition_url)
								} else {
									//跳转更新页面 （注意！！！如果pages.json第一页的代码里有一打开就跳转其他页面的操作，下面这行代码最好写在setTimeout里面设置延时3到5秒再执行）
									uni.navigateTo({
										url: '/uni_modules/rt-uni-update/components/rt-uni-update/rt-uni-update?obj=' +
											JSON.stringify(res.data)
									});
								}
							} else {
								// 如果是手动检查新版本 需开启以下注释
								/* uni.showModal({
								    title: '提示',
								    content: '已是最新版本',
								    showCancel: false
								}) */
							}
						}
					})
				});
			}
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import url("./static/css/common.css");

	page {
		height: 100%;
		background-color: $bg-color;
	}
</style>