<template>
	<!-- <view>
		<button type="primary" @click="connect">mqtt 连接</button>
		<button type="primary" @click="subscribe">mqtt 订阅</button>
		<button type="primary" @click="publish">mqtt 发布</button>
		<button type="primary" @click="unsubscribe">取消订阅</button>
		<button type="primary" @click="unconnect">断开连接</button>
		<button type="primary" @click="timeOut">定时五秒发布</button>
		<view>message:{{ receiveMessage.toString() }}</view>
	</view> -->
</template>

<script>
	var mqtt = require('mqtt/dist/mqtt.js')
	export default {
		data() {
			return {
				serve: {
					host: 'www.51uhj.com',
					wsport: '30848',
					wssport: '443',
					path: '/mqtt',
				},
				onHost: 'msg_send/',
				onSend: 'msg_receiver/',
				Qos: 0,
				sendMassage: 'Hello wsq！',
				time: 0,
				receiveMessage: '',
				client: null,
				//MQTT连接的配置
				options: {
					wsOptions: {},
					protocolVersion: 4, //MQTT连接协议版本
					clientId: 'esp_' + Math.random().toString(16).substr(2, 8),
					keepalive: 60,
					clean: false,
					username: '',
					password: ' ',
					reconnectPeriod: 1000, //1000毫秒，两次重新连接之间的间隔
					connectTimeout: 30 * 1000, //1000毫秒，两次重新连接之间的间隔
					resubscribe: true //如果连接断开并重新连接，则会再次自动订阅已订阅的主题（默认true）
				},
				inviteCode: '',
				randomFloor:0
			};
		},
		computed: {
			userInfo() {
				return this.$store.getters.userInfo
			},
			hasLogin() {
				return this.$store.getters.hasLogin
			}
		},
		methods: {
			async connect() {
				var hosts = '',
					// #ifdef H5
					hosts = 'ws://' + this.serve.host + ':' + this.serve.wsport + this.serve.path
				// hosts = 'wss://' + this.serve.host + ':' + this.serve.wssport + this.serve.path
				// hosts = 'tpc://' + this.serve.host + ':1883'
				//#endif
				// #ifdef MP-WEIXIN
				hosts = 'wxs://' + this.serve.host + ':' + this.serve.wssport + this.serve.path
				//#endif
				// #ifdef APP-PLUS
				hosts = 'wxs://' + this.serve.host + ':' + this.serve.wssport + this.serve.path
				//#endif
				// console.log(this.client)
				if (this.client == null || this.client.connented == false) {
					uni.showLoading({
						title: '连接中···'
					})
					this.onHost = 'msg_send/' + (this.userInfo.id ? this.userInfo.id : this.inviteCode)
					this.onSend = 'msg_receiver/' + this.randomFloor
					console.log(this.onHost, this.onSend, '连接消息');
					// this.onSend = this.userInfo.id + '_topic1'
					// console.log(JSON.stringify(hosts), JSON.stringify(this.options))
					// uni.showModal({
					// 	title: JSON.stringify(hosts)
					// })
					// uni.showModal({
					// 	title: JSON.stringify(this.options)
					// })
					this.client = mqtt.connect(
						hosts,
						this.options
					);
					this.client.on('connect', () => {
						uni.hideLoading();
						this.showToast('连接成功', 1000, 'success')
						this.subscribe()
					});
					this.client.on('message', (topic, message) => {
						console.log('收到来自' + topic + '的消息' + message.toString());
						let messageData = JSON.parse(message.toString())
						this.$emit("sendData", message.toString())
						this.receiveMessage = message
					});
				}

				this.client.on('reconnect', error => {
					uni.hideLoading();
					this.showToast('正在重连···', 1000)

				});
				this.client.on('error', error => {
					uni.hideLoading();
					this.showToast('连接失败!', 1000)
				});

			},
			async connect2(send) {
				var hosts = '',
					// #ifdef H5
					hosts = 'ws://' + this.serve.host + ':' + this.serve.wsport + this.serve.path
				// hosts = 'wss://' + this.serve.host + ':' + this.serve.wssport + this.serve.path
				// hosts = 'tpc://' + this.serve.host + ':1883'
				//#endif
				// #ifdef MP-WEIXIN
				hosts = 'wxs://' + this.serve.host + ':' + this.serve.wssport + this.serve.path
				//#endif
				// #ifdef APP-PLUS
				hosts = 'wxs://' + this.serve.host + ':' + this.serve.wssport + this.serve.path
				//#endif
				// console.log(this.client)
				if (this.client == null || this.client.connented == false) {
					uni.showLoading({
						title: '连接中···'
					})
					this.onHost = 'msg_send/' + (this.userInfo.id ? this.userInfo.id : this.inviteCode)
					this.onSend = 'msg_receiver/' + this.randomFloor
					console.log(this.onHost, this.onSend, 11111111);
					// this.onSend = this.userInfo.id + '_topic1'
					// console.log(JSON.stringify(hosts), JSON.stringify(this.options))
					// uni.showModal({
					// 	title: JSON.stringify(hosts)
					// })
					// uni.showModal({
					// 	title: JSON.stringify(this.options)
					// })
					this.client = mqtt.connect(
						hosts,
						this.options
					);
					this.client.on('connect', () => {
						uni.hideLoading();
						this.showToast('连接成功', 1000, 'success')
						this.subscribe2(send)
					});
					this.client.on('message', (topic, message) => {
						let messageData = JSON.parse(message.toString())
						this.$emit("sendData", message.toString())
						this.receiveMessage = message
					});
				}

				this.client.on('reconnect', error => {
					uni.hideLoading();
					this.showToast('正在重连···', 1000)

				});
				this.client.on('error', error => {
					uni.hideLoading();
					this.showToast('连接失败!', 1000)
				});

			},
			async subscribe() {
				// 判断是否已成功连接
				if (!this.client || !this.client.connected) {
					this.showToast('客户端未连接', 1000)
					return;
				}

				this.client.subscribe(this.onHost, {
					qos: this.Qos
				}, error => {
					if (!error) {
						this.showToast('订阅成功', 1000, 'success')
						console.log('订阅成功', this.onHost);
					}
				});

				/* //订阅多个主题
			this.client.subscribe(['one', 'two', 'three'], { qos: 1 }, err => {
				console.log(err || '订阅成功');
				this.show(err || '订阅成功');
			 });
			
				    // 订阅不同 qos 的不同主题
				    this.client.subscribe(
				        [
				            { hello: 1 },
				            { 'one/two/three': 2 },
				            { '#': 0 }
				        ],
				        (err) => {
				          this.show();console.log(err || '订阅成功')
				        },
				    )
		
		
			}); */
			},
			async subscribe2(send) {
				// 判断是否已成功连接
				if (!this.client || !this.client.connected) {
					this.showToast('客户端未连接', 1000)
					return;
				}

				this.client.subscribe(this.onHost, {
					qos: this.Qos
				}, error => {
					if (!error) {
						this.showToast('订阅成功', 1000, 'success')
						console.log('订阅成功', this.onHost);
						this.publish(send)
					}
				});

				/* //订阅多个主题
			this.client.subscribe(['one', 'two', 'three'], { qos: 1 }, err => {
				console.log(err || '订阅成功');
				this.show(err || '订阅成功');
			 });
			
				    // 订阅不同 qos 的不同主题
				    this.client.subscribe(
				        [
				            { hello: 1 },
				            { 'one/two/three': 2 },
				            { '#': 0 }
				        ],
				        (err) => {
				          this.show();console.log(err || '订阅成功')
				        },
				    )
					
					
			}); */
			},
			async publish(send) {
				// 判断是否已成功连接
				if (!this.client || !this.client.connected) {
					this.showToast('客户端未连接', 1000)
					return;
				}
				if (this.sendMassage != '') {
					// 用户ID userId
					// 出发楼层 startFloor
					// 到达楼层 endFloor
					// 请求时间 时间戳 createTime
					// 签名 MD5 signToken
					// 请求方式 requestType
					// var send = {
					// 	reqTimestamp: this.time,
					// 	userId: 11,
					// 	currentFloor: currentFloor,
					// 	targetFloor: targetFloor,
					// 	signToken: 'test',
					// 	requestType:17
					// }
					// send = this.sendMassage + (this.time++)
					this.client.publish(this.onSend, JSON.stringify(send), error => {
						if(send.isCancelQueueUp === false){
							uni.setStorageSync('mqtt_data', JSON.stringify(send));
							uni.setStorageSync('scancode', (this.userInfo.id ? this.userInfo.id : this.inviteCode));
							uni.setStorageSync('randomFloor', this.randomFloor);
							console.log(error || '消息发布成功' + JSON.stringify(send));
							this.showToast('消息发布成功', 1000, 'success')
						}
					});
				} else {
					this.showToast('发布消息为空', 1000)
				}

			},
			timeOut() {
				setInterval(this.publish, 10000)
			},
			async unsubscribe() {
				this.client.unsubscribe(
					// topic, topic Array, topic Array-Onject
					// ['one', 'two', 'three'],
					this.onHost,
					err => {
						console.log(err || '取消订阅成功');
						this.showToast('取消订阅成功', 1000, 'success')
					}
				);
			},
			async publish2(send) {
				// 判断是否已成功连接
				if (!this.client || !this.client.connected) {
					this.showToast('客户端未连接', 1000)
					return;
				}
				if (this.sendMassage != '') {
					// 用户ID userId
					// 出发楼层 startFloor
					// 到达楼层 endFloor
					// 请求时间 时间戳 createTime
					// 签名 MD5 signToken
					// 请求方式 requestType
					// var send = {
					// 	reqTimestamp: this.time,
					// 	userId: 11,
					// 	currentFloor: currentFloor,
					// 	targetFloor: targetFloor,
					// 	signToken: 'test',
					// 	requestType:17
					// }
					// send = this.sendMassage + (this.time++)
					this.client.publish(this.onSend, JSON.stringify(send), error => {
						if(send.isCancelQueueUp === false){
							uni.setStorageSync('mqtt_data', JSON.stringify(send));
							uni.setStorageSync('scancode', (this.userInfo.id ? this.userInfo.id : this.inviteCode));
							uni.setStorageSync('randomFloor', this.randomFloor);
							console.log(error || '消息发布成功' + JSON.stringify(send));
							this.showToast('消息发布成功', 1000, 'success')
						}else{
							this.unconnect();
						}
					});
				} else {
					this.showToast('发布消息为空', 1000)
				}
			
			},
			unconnect: function() {
				if (!this.client || !this.client.connected) {
					this.showToast('客户端未连接', 1000)
					return;
				}
				this.client.end();
				this.client = null
				this.showToast('成功断开连接', 1000, 'success')
				uni.removeStorage({
					key: 'mqtt_data',
					success: function(res) {
						console.log('success');
					}
				});
				uni.removeStorage({
					key: 'scancode',
					success: function(res) {
						console.log('success');
					}
				});
				uni.removeStorage({
					key: 'randomFloor',
					success: function(res) {
						console.log('success');
					}
				});
				console.log('断开连接');
			},
			showToast: function(title, time, icon = 'none') {
				uni.showToast({
					title: title,
					icon: icon,
				});
				setTimeout(function() {
					uni.hideToast();
				}, time);
			},
		},
	}
</script>
<style>
	button {
		margin-top: 30upx;
		margin-bottom: 30upx;
	}
</style>
