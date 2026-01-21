// #ifdef H5
var jweixin = require('jweixin-module');
import {
	get_jssdk
} from '@/api/auth.js' // 分享接口后台提供，用于获取appid，timestamp，nonceStr，signature

var Shares = {
	//其他页面调用的时候传分享的标题，地址链接，还可以传分享的图
	async get_jssdk(title, href, desc, link, imgUrl) {
		console.log(title, href, '页面数据')
		let that = this;
		try {
			const res = await get_jssdk(encodeURIComponent(href))
			console.log('get_jssdk', res.data)
			jweixin.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: res.data.sign.appId, // 必填，公众号的唯一标识
				timestamp: res.data.sign.timestamp, // 必填，生成签名的时间戳
				nonceStr: res.data.sign.nonceStr, // 必填，生成签名的随机串
				signature: res.data.sign.signature, // 必填，签名
				jsApiList: [
					'updateAppMessageShareData',
					'updateTimelineShareData',
				] // 必填，需要使用的JS接口列表
			})
			jweixin.error(function(res) {
				console.log(res, '错误')
			});
			console.log('分享了', res.data.sign.signature);
			jweixin.ready(function() {
				//分享给朋友
				jweixin.updateAppMessageShareData({
					title: title, // 分享标题
					desc: desc, // 分享描述
					link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: imgUrl, // 分享图标
					success: function() {
						console.log('设置分享给朋友成功')
					},
					cancel: function(res) {
						console.log('取消分享')
					}
				});
				//分享到朋友圈
				jweixin.updateTimelineShareData({
					title: title, // 分享标题
					link: href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: imgUrl, // 分享图标
					success: function() {
						console.log('设置分享到朋友圈成功')
					},
					cancel: function(res) {
						console.log('取消分享')
					}
				});
			});
			// 保存数据
		} catch (err) {
			uni.showToast({
				title: err,
				icon: 'none'
			})
			console.log('get_jssdk', err)
		}
	}

}
//抛出
export {
	Shares
}

//#endif
