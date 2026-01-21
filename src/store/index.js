import Vue from 'vue'
import Vuex from 'vuex'
import {
	logout
} from '@/api/auth'
import {
	getUserInfo
} from '@/api/user'
import {
	passwordLogin,
	smsLogin,
	weixinMiniAppLogin,
	uuidLogin
} from '@/api/auth'

const AccessTokenKey = 'ACCESS_TOKEN'
const RefreshTokenKey = 'REFRESH_TOKEN'

Vue.use(Vuex) // vue的插件机制

// Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: {
		accessToken: uni.getStorageSync(AccessTokenKey), // 访问令牌
		refreshToken: uni.getStorageSync(RefreshTokenKey), // 刷新令牌
		userInfo: {}
	},
	getters: {
		accessToken: state => state.accessToken,
		refreshToken: state => state.refreshToken,
		userInfo: state => state.userInfo,
		hasLogin: state => !!state.accessToken
	},
	mutations: {
		// 更新 state 的通用方法
		SET_STATE_ATTR(state, param) {
			if (param instanceof Array) {
				for (let item of param) {
					state[item.key] = item.val
				}
			} else {
				state[param.key] = param.val
			}
		},
		// 更新令牌
		SET_TOKEN(state, data) {
			// 设置令牌
			const {
				accessToken,
				refreshToken
			} = data
			state.accessToken = accessToken
			state.refreshToken = refreshToken
			uni.setStorageSync(AccessTokenKey, accessToken)
			uni.setStorageSync(RefreshTokenKey, refreshToken)

			// 加载用户信息
			this.dispatch('ObtainUserInfo')
		},
		// 更新用户信息
		SET_USER_INFO(state, data) {
			state.userInfo = data
		},
		// 清空令牌 和 用户信息
		CLEAR_LOGIN_INFO(state) {
			uni.removeStorageSync(AccessTokenKey)
			uni.removeStorageSync(RefreshTokenKey)
			// #ifdef H5
			sessionStorage.removeItem("code")
			// #endif
			state.accessToken = ''
			state.refreshToken = ''
			state.userInfo = {}
		}
	},
	actions: {
		//账号登录
		Login({
			state,
			commit
		}, {
			type,
			data
		}) {
			if (type === 0) {
				return passwordLogin(data).then(res => {
					commit('SET_TOKEN', res.data)
				})
			} else if (type === 1) {
				return smsLogin(data).then(res => {
					commit('SET_TOKEN', res.data)
				})
			} else if(type === 9){
				return uuidLogin(data).then(res => {
					commit('SET_TOKEN', res.data)
				})
			} else {
				return weixinMiniAppLogin(data).then(res => {
					commit('SET_TOKEN', res.data)
				})
			}
		},
		// 退出登录
		async Logout({
			state,
			commit
		}) {
			commit('CLEAR_LOGIN_INFO')
			await logout()
		},
		// 获得用户基本信息
		async ObtainUserInfo({
			state,
			commit
		}) {
			//使用try catch捕获
			try{
				const res = await getUserInfo()
				if(res && res.data){
					if (res.data.status === 1) {
						uni.showToast({
							title: '账户已禁用',
							icon:'none'
						});
						commit('CLEAR_LOGIN_INFO')
						await logout()
					} else {
						commit('SET_USER_INFO', res.data)
					}
				}
			}catch(error){
				// console.log(error)
				uni.showToast({
					title: '会员账户不存在或账户被禁用',
					icon:'none'
				});
				commit('CLEAR_LOGIN_INFO')
				await logout()
			}
		}
	}
})

export default store
