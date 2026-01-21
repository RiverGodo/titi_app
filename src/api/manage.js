//请求工具参考https://ext.dcloud.net.cn/plugin?id=392
const { http } = uni.$u

//用户注册
export const payOrder = data => http.post('/api/pay/payOrders', data)
