//请求工具参考https://ext.dcloud.net.cn/plugin?id=392
const {
	http
} = uni.$u

// 获取权益数据
export const getDeptUserData = params => http.get('/system/user/dept-id-list', {
	params
})

// 获取团队权益数据
export const getTeamUserData = params => http.get('/system/user/dept-team-list', {
	params
})

// 获取部门精简信息列表
export const getListAllSimple = params => http.get('/system/user/list-all-simple', {
	params
})

//修改会员用户信息
export const updatePayState = params => http.put('/member/user/update-pay-state', params)

//修改系统用户
export const updatePayStateSys = params => http.put('/member/user/update-pay-state-sys', params)
