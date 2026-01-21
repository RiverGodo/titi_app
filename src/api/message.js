//请求工具参考https://ext.dcloud.net.cn/plugin?id=392
const { http } = uni.$u

// 获取用户信息
export const getMessageData = params => http.get('/member/message/page', { params })

// 修改全部用户消息状态
export const updateReadAll = params => http.post('/member/message/update-read-all', params)
