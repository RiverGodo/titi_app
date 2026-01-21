//请求工具参考https://ext.dcloud.net.cn/plugin?id=392
const {
	http
} = uni.$u

//使用手机 + 密码登录
export const passwordLogin = data => http.post('/member/auth/login', data)
//发送手机验证码
export const sendSmsCode = data => http.post('/member/auth/send-sms-code', data)
//使用手机 + 验证码登录
export const smsLogin = data => http.post('/member/auth/sms-login', data)
//使用uuid登录
export const uuidLogin = data => http.post('/member/auth/uuid-login', data)
//微信小程序的一键登录
export const weixinMiniAppLogin = data => http.post('/member/auth/weixin-mini-app-login', data)
// 获取微信openId接口
export const socialAuthUserInfo = params => http.get('/wechat/userInfo', {
	params
})
// 微信授权接口
export const authorize = params => http.get('/wechat/authorize', {
	params
})
// 获取微信跳转小程序链接
export const wxUrl = params => http.post('/wechat/wx-url', {
	params
})
// 公众号获取微信跳转sign
export const get_jssdk = data => http.post('/wechat/share-info?urls=' + data)
//刷新令牌
export const refreshToken = data => http.post('/member/auth/refresh-token?refreshToken=' + data)
//退出登录
export const logout = data => http.post('/member/auth/logout', data)
//用户注册
export const register = data => http.post('/member/auth/create', data)
//绑定用户信息
export const updateCompanyAuth = params => http.put('/member/user/update-company', params)
//修改会员用户信息
export const updateAuthentication = params => http.post('/member/user/user-authentication', params)
// 获得团队收益列表
export const getUserTeam = params => http.get('/member/user/get-user-team', {
	params
})
