import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token: '',
		userInfo: {},
		deviceId:'',
		role: 0,
		couponData: {}
	},
	getters: {
		hasLogin(state) {
			return !!state.token;
		}
	},
	mutations: {
		//设置用户信息
		setUserInfo(state, data) {
			state.userInfo = data
			uni.setStorageSync('userInfo', data);
		},
		//更新token
		setToken(state, token) {
			state.token = token;
			uni.setStorageSync('token', token);
		},
		setRole(state, role) {
			state.role = role;
			uni.setStorageSync('role', role);
		},
		setCouponData(state, data) {
			state.couponData = data;
		},
		//退出登录
		logout(state) {
			state.token = '';
			uni.removeStorageSync('token');
		},
		//设置设备统一标记
		setDeviceId(state, data) {
			state.deviceId = data
			uni.setStorageSync('deviceId', data);
		}
	}
})


export default store