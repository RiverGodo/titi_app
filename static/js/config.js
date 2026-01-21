let config;
if (process.env.NODE_ENV !== 'production') {
	//测试环境
	config = {
		prefix: "/api",
		sellerPrefix: "/api",
		mqtt: {
			host: 'ws://192.168.0.177:8083/mqtt',
			username: 'ttzs',
			password: 'test_123'
		}
	}
	// #ifndef H5
	config = {
		prefix: "http://192.168.0.177:4000/api",
		sellerPrefix: "http://192.168.0.177:4002/api",
		mqtt: {
			host: 'wx://192.168.0.177:8083/mqtt',
			username: 'ttzs',
			password: 'test_123'
		}
	}
	// #endif

} else {
	//正式环境
	config = {
		prefix: "/api",
		mqtt: {
			host: 'wss://51uhj.com:443/mqtt',
			username: 'ttzs',
			password: "ttzs2023.."
		}
	}
	// #ifndef H5
	config = {
		prefix: "https://51uhj.com/api",
		mqtt: {
			host: 'wxs://51uhj.com:443/mqtt',
			username: 'ttzs',
			password: "ttzs2023.."
		}
	}
	// #endif
}

config.md = {
	md1:'df662459590tt6099f8b78bb8979eeb1',
	md2:'80fb35775f7tt1338d034afa5fd2415d'
}
export default config;