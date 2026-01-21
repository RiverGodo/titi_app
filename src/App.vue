<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// //开屏广告
			// uni.reLaunch({
			// 	// url: '/pages/advertisement/advertisement', //开屏页面
			// 	url: '/pages/inde/index',
			// 	success() {
			// 		// #ifdef APP-PLUS
			// 		plus.navigator.closeSplashscreen();
			// 		// #endif 
			// 	}
			// })
			// #ifdef H5
			//在页面加载时读取sessionStorage里的状态信息
			if (sessionStorage.getItem('store')) {
				this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem(
					'store'))))
			}
			//在页面刷新时将vuex里的信息保存到sessionStorage里
			window.addEventListener('beforeunload', () => {
				sessionStorage.setItem('store', JSON.stringify(this.$store.state))
			})
			// #endif
		},
		onShow: function() {
			// this.$store.dispatch('ObtainUserInfo');
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 引入uView基础样式 */
	@import "uview-ui/index.scss";

	/*每个页面公共scss */
	@import 'app.scss';
</style>
