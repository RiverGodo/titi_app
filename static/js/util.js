let _debounceTimeout = null,
	_throttleRunning = false

import CryptoJS from "crypto-js";

import config from "./config.js"

/**
 * 防抖
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms   
 */
export const debounce = (fn, delay = 500) => {
	clearTimeout(_debounceTimeout);
	_debounceTimeout = setTimeout(() => {
		fn();
	}, delay);
}
/**
 * 节流
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms  
 */
export const throttle = (fn, delay = 500) => {
	if (_throttleRunning) {
		return;
	}
	_throttleRunning = true;
	fn();
	setTimeout(() => {
		_throttleRunning = false;
	}, delay);
}
/**
 * toast
 */
export const msg = (title = '', param = {}) => {
	if (!title) return;
	uni.showToast({
		title,
		duration: param.duration || 1500,
		mask: param.mask || false,
		icon: param.icon || 'none'
	});
}

/**
 * 计算时长
 */
export const forMateTimes = (allTime, delay, bannerList) => {
	if(allTime && delay && bannerList.length){
		let a = Math.floor(allTime / delay) // 总秒数allTime平均分，一份delay秒，a为平均分后的份数
		let b = Math.floor(a / bannerList.length) // 总份数a平均分，平均分给bannerList数组，b为平均分后的份数
		let c = allTime % delay // c为余多少秒
		let d = a % bannerList.length // d为在bannerList数组中第几份余
		for (let i = 0; i < bannerList.length; i++) {
			bannerList[i].times = b * delay // 设置a平均分后一份delay的秒数
		}
		for (let p = 0; p < d; p++) {
			bannerList[p].times += delay // 设置d之前的数组加上一份delay的秒数
		}
		bannerList[d].times += c // 设置d在bannerList位置上加入的余秒
	}
	return bannerList
}

/**
 * 加密
 */
export const encrypt = (deviceNo, ratingId, times) => {
	const MD5_KEY = config.md.md1.replace('tt', '84')
	const AES_KEY = config.md.md2.replace('tt', '84')

	function encrypt(text) {
		return CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(AES_KEY), {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		}).toString()
	}
	let timestamp = new Date().getTime();
	let originTxt = "deviceNo=" + deviceNo + "&ratingId=" + ratingId + "&times=" + times + "&timestamp=" +
		timestamp + "&key=" + MD5_KEY;
	let sign = CryptoJS.MD5(originTxt).toString();
	let param = {
		deviceNo,
		ratingId,
		times,
		timestamp,
		sign
	};
	const txt = encrypt(JSON.stringify(param));
	let data = txt;
	return data
}
/**
 * 格式化时间戳 Y-m-d H:i:s
 * @param {String} format Y-m-d H:i:s
 * @param {Number} timestamp 时间戳   
 * @return {String}
 */
export const date = (format, timeStamp) => {
	if ('' + timeStamp.length <= 10) {
		timeStamp = +timeStamp * 1000;
	} else {
		timeStamp = +timeStamp;
	}
	let _date = new Date(timeStamp),
		Y = _date.getFullYear(),
		m = _date.getMonth() + 1,
		d = _date.getDate(),
		H = _date.getHours(),
		i = _date.getMinutes(),
		s = _date.getSeconds();

	m = m < 10 ? '0' + m : m;
	d = d < 10 ? '0' + d : d;
	H = H < 10 ? '0' + H : H;
	i = i < 10 ? '0' + i : i;
	s = s < 10 ? '0' + s : s;

	return format.replace(/[YmdHis]/g, key => {
		return {
			Y,
			m,
			d,
			H,
			i,
			s
		} [key];
	});
}

export const isEmpty = (str) => {
	if (str === undefined || str === null || str === "" || str === "null" || str === "undefined") return true;
	if ((str + "").trim() === "") return true;
	return false;
}

// 截取路由参数
export const getLocationParams = (urls, keyWords) => {
	// 提取路由值（字符串）
	let href = urls;
	// 从占位符开始截取路由（不包括占位符）
	let query = href.substring(href.indexOf("?") + 1);
	// 根据 & 切割字符串
	let vars = query.split("&");
	for (let i = 0; i < vars.length; i++) {
		let pair = vars[i].split("=");
		// 根据指定的参数名去筛选参数值
		if (pair[0] == keyWords) {
			return pair[1];
		}
	}
	return "";
}
// 判断类型集合
export const checkStr = (str, type) => {
	switch (type) {
		case 'mobile': //手机号码
			return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
		case 'tel': //座机
			return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
		case 'card': //身份证
			return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
		case 'mobileCode': //6位数字验证码
			return /^[0-9]{6}$/.test(str)
		case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
			return /^([a-zA-Z0-9_]){6,18}$/.test(str)
		case 'payPwd': //支付密码 6位纯数字
			return /^[0-9]{6}$/.test(str)
		case 'postal': //邮政编码
			return /[1-9]\d{5}(?!\d)/.test(str);
		case 'QQ': //QQ号
			return /^[1-9][0-9]{4,9}$/.test(str);
		case 'email': //邮箱
			return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
		case 'money': //金额(小数点2位)
			return /^\d*(?:\.\d{0,2})?$/.test(str);
		case 'URL': //网址
			return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(
				str)
		case 'IP': //IP
			return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
		case 'date': //日期时间
			return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) ||
				/^(\d{4})\-(\d{2})\-(\d{2})$/
				.test(str)
		case 'number': //数字
			return /^[0-9]$/.test(str);
		case 'english': //英文
			return /^[a-zA-Z]+$/.test(str);
		case 'chinese': //中文
			return /^[\\u4E00-\\u9FA5]+$/.test(str);
		case 'lower': //小写
			return /^[a-z]+$/.test(str);
		case 'upper': //大写
			return /^[A-Z]+$/.test(str);
		case 'HTML': //HTML标记
			return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
		default:
			return true;
	}
}