let env = process.env.NODE_ENV
const PRO_URL = 'https://www.51uhj.com/app-api'
const LOCAL_URL = 'http://192.168.200.115:48080/app-api'
const DEV_URL = 'https://www.51uhj.com/app-api'

console.log('环境变量:',env)

module.exports = {
	//后端接口地址
	baseUrl: env === 'production' ? PRO_URL : env === 'development' ? DEV_URL : LOCAL_URL,
	// 超时
	timeout: 30000,
	// 禁用 Cookie 等信息
	withCredentials: false,
	header: {
		//租户ID
		'tenant-id': 1,
		'Authorization': 'Authorization'
	}
}
