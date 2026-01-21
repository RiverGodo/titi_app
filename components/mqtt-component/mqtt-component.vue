<template>
    <mix-loading v-if="isLoading"></mix-loading>
</template>

<script>
import config from "../../static/js/config.js";
let qos = 0;
let options = {
    wsOptions: {},
    protocolVersion: 4, //MQTT连接协议版本
    clientId: 'esp_' + Math.random().toString(16).substr(2, 8),
    keepalive: 60,
    clean: false,
    username: config.mqtt.username,
    password: config.mqtt.password,
    reconnectPeriod: 1000, //1000毫秒，两次重新连接之间的间隔
    connectTimeout: 30 * 1000, //1000毫秒，两次重新连接之间的间隔
    resubscribe: true //如果连接断开并重新连接，则会再次自动订阅已订阅的主题（默认true）
};
let hosts = config.mqtt.host;
//此处不能用import，不兼容微信小程序和app
let mqtt = require('mqtt/dist/mqtt.js')

export default {
    data() {
        return {
            isLoading: false,
            onHost: '',
            onSend: '',
            client: null,
            inviteCode: '',
            randomDevice: 0
        };
    },
    methods: {
        async connect(userId) {
            if (this.client == null || !this.client.connented) {
                this.isLoading = true;
                this.onHost = 'msg_send/' + userId;
                this.onSend = 'msg_receiver/' + this.randomDevice; //广告机
                console.log("on send ", hosts, this.onSend)
                this.client = mqtt.connect(hosts, options);
                this.client.on('connect', async () => {
                    this.isLoading = false;
                    console.log("连接成功")
                });
                this.client.on('message', (topic, message) => {
                    this.$emit("sendData", message.toString())
                });
            }
            this.client.on('reconnect', error => {
                this.isLoading = true;
                console.log(error, "重连中")
            });
            this.client.on('error', error => {
                this.$util.msg(error, "连接失败，请重新连接")
            });
        },
        async publish(msg){
            this.client.publish(this.onSend, JSON.stringify(msg), () => {console.log("发布成功", JSON.stringify(msg))});
        },
        async subscribe(){
            this.client.subscribe(this.onHost, {qos}, () => {console.log("订阅成功");});
        },
        unSubscribe() {
            this.client.unsubscribe(this.onHost, () => {
                console.log('取消订阅成功');
            });
        },
        unConnect () {
            if (!this.client || !this.client.connected) {
                return;
            }
            this.client.end();
            this.client = null;
            console.log('断开连接');
        },
    },
}
</script>
