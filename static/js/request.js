import store from '../../store'
import {msg} from './util.js'
import config from './config.js'

function stop(that){
	if(that && that.isLoading){
		that.isLoading = false;
	}
	if(that && that.loading){
		that.loading = false;
	}
	if(that && that.pendingArr){
		that.pendingArr = false;
	}
	that.$refs.confirmBtn && that.$refs.confirmBtn.stop();
}

export const request = (url, data = {}, method = 'GET', ext = {}, that, failedCallback) => {
	return new Promise((resolve, reject) => {
		if(that && (method === 'POST' || ext.showLoading)){
			if(that.isLoading) return;
			that.isLoading = true;
			if(that.pendingArr) return;
			that.pendingArr = true;
			if(that.loading) return;
			that.loading = true;
		}
		let header = method === 'GET'? {}: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}
		header['token'] = store.state.token;
		if(url.indexOf("sendRegCode") !== -1){
			header['a_token'] = uni.getStorageSync("a_token");
		}
		let prefix = config.prefix;
		if(process.env.NODE_ENV !== 'production'){
			prefix = url.indexOf("/seller") === -1? config.prefix: config.sellerPrefix;
		}
		uni.request({
			url: prefix + url,
			data,
			method,
			header,
			success: (res) => {
				stop(that);
				let result = res.data;
				if(res.statusCode !== 200){
					stop(that);
					if(res.statusCode === 403){
						that.navTo('/pages/safe/waf');
						return;
					}else{
						msg("服务器打盹了");
						return;
					}
				}
				const code = result.code;
				if (code === 401) {
					msg(result.msg);
					store.commit('logout');
					uni.navigateTo({url: "/pages/auth/login"})
					return;
				}
				if (code === 403) {
					msg(result.msg);
					if (url !== '/user/login') {
						store.commit('logout');
					}
					uni.switchTab({url: '/pages/bar/home'})
					return;
				}
				if (code === 401) {
					if(ext.notCheckAuthInvalid){
						resolve(result); //session接口不需要返回登录超时信息
					}else{
						msg('登录信息已过期，请重新登录');
						uni.navigateTo({url: "/pages/auth/login"});
						store.commit('logout');
					}
					return;
				}
				if (code === 403) {
					msg('用户已被禁用，请联系客服处理');
					if (url !== '/user/login') {
						store.commit('logout');
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/bar/home'
							})
						}, 1200);
					}
					return;
				}
				if(code === -1){
					if(ext.notToast){
						resolve(result); //为了某些需要展示错误信息的页面（而不是吐司弹窗），如商品详情页。
					}else{
						msg(result.msg);
					}
					return;
				}
				resolve(result);
			},
			fail: (error, d) => {
				msg("网络开小差了");
				console.log("error fetch", error, d, url);
				stop(that);
				failedCallback && failedCallback();
			}
		})
	}).catch(err=>{stop(that); msg("异常错误～");console.log(err);})
}
