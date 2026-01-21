//请求工具参考https://ext.dcloud.net.cn/plugin?id=392
const { http } = uni.$u

// 获取广告数据
export const getAdData = params => http.get('/ad/content/page', { params })
// 获取广告内容数据
export const getAdContentData = params => http.get('/ad/content/get', { params })
