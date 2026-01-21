//请求工具参考https://ext.dcloud.net.cn/plugin?id=392
const {
	http
} = uni.$u

//获得会员账户分页
export const examineList = params => http.get('/member/user/page', {
	params
})

//修改用户角色
export const updateStatus = params => http.put('/member/user/update-role', params)

//楼栋相关

//获得楼栋登记分页
export const floorList = params => http.get('/nft/floor/page', {
	params
})

//获得楼栋登记详情
export const floorDetial = params => http.get('/nft/floor/get', {
	params
})

//更新楼栋登记
export const updateFloor = params => http.put('/nft/floor/update', params)

//删除楼栋登记
export const deleteFloor = params => http.delete('/nft/floor/delete', {}, { params })

//公司相关

//获得公司登记分页
export const companyList = params => http.get('/nft/company/page', {
	params
})

//获得公司登记详情
export const companyDetial = params => http.get('/nft/company/get', {
	params
})

//更新公司登记
export const updateCompany = params => http.put('/nft/company/update', params)

//删除公司登记
export const deleteCompany = params => http.delete('/nft/company/delete', {}, { params })

//创建公司登记
export const createCompany = data => http.post('/nft/company/create', data)

//电梯相关

//获得电梯登记分页
export const elevatorList = params => http.get('/nft/elevator/page', {
	params
})

//获得电梯登记详情
export const elevatorDetial = params => http.get('/nft/elevator/get', {
	params
})

//更新电梯登记
export const updateElevator = params => http.put('/nft/elevator/update', params)

//删除电梯登记
export const deleteElevator = params => http.delete('/nft/elevator/delete', {}, { params })

//创建电梯登记
export const createElevator = data => http.post('/nft/elevator/create', data)

//大厅主机相关

//获得大厅主机分页
export const deviceAdhostList = params => http.get('/nft/device-adhost/page', {
	params
})

//获得大厅主机详情
export const deviceAdhostDetial = params => http.get('/nft/device-adhost/get', {
	params
})

//更新大厅主机
export const updateDeviceAdhost = params => http.put('/nft/device-adhost/update', params)

//删除大厅主机
export const deleteDeviceAdhost = params => http.delete('/nft/device-adhost/delete', {}, { params })

//创建大厅主机
export const createDeviceAdhost = data => http.post('/nft/device-adhost/create', data)


//电梯广告机相关

//获得电梯广告机分页
export const deviceAdnodeList = params => http.get('/nft/device-adnode/page', {
	params
})

//获得电梯广告机详情
export const deviceAdnodeDetial = params => http.get('/nft/device-adnode/get', {
	params
})

//更新电梯广告机
export const updateDeviceAdnode = params => http.put('/nft/device-adnode/update', params)

//删除电梯广告机
export const deleteDeviceAdnode = params => http.delete('/nft/device-adnode/delete', {}, { params })

//创建电梯广告机
export const createDeviceAdnode = data => http.post('/nft/device-adnode/create', data)



