import Vue from 'vue'
import App from './App'

// 引入全局uView
import uView from 'uview-ui'

// vuex
import store from './store'

import {Shares} from '@/utils/share.js'
//挂载到全局
Vue.prototype.$wxH5Share = Shares



// #ifdef H5
import VConsole from 'vconsole'
let env = process.env.NODE_ENV
if(env !== 'production'){
	// 上线进行注释，本地调试工具
	const vConsole = new VConsole()
}
// #endif

Vue.config.productionTip = false
Vue.prototype.$store = store



App.mpType = 'app'
Vue.use(uView)

const app = new Vue({
	store,
	...App
})

// 引入请求封装
require('./utils/request/index')(app)

app.$mount()
