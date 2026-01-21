//请求工具参考https://ext.dcloud.net.cn/plugin?id=392
const { http } = uni.$u

//获得用户任务列表
export const getTaskList = params => http.get('/member/task/page', {
	params
})
//通过ID获得任务
export const getTaskById = params => http.get('/member/task/get', { params })

