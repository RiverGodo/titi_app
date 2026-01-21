import App from './App'
import Vue from 'vue'
import store from './store'
import filter from './static/js/filter.js'
import mixin from './static/js/mixin.js'
import {
    msg,
    isEmpty,
    checkStr,
    throttle,
	debounce,
	getLocationParams,
	encrypt,
	forMateTimes
} from './static/js/util.js'
// #ifdef H5
// import vconsole from 'vconsole' // 引入vconsole
// if(process.env.NODE_ENV !== 'production'){
//     Vue.prototype.$vconsole = new vconsole() // 使用vconsole
// }
// #endif
Vue.prototype.$cdn = "https://cc.51uhj.com";
Vue.prototype.$appLink = "https://51uhj.com/pages/download/app";
Vue.prototype.$store = store
Vue.prototype.$util = {
    msg,
    isEmpty,
    checkStr,
    throttle,
	debounce,
	getLocationParams,
	encrypt,
	forMateTimes
}

Vue.mixin(mixin)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()