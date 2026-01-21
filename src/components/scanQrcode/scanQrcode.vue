<template>
	<view>
		<view id="reader" width="600px"></view>
		<!-- <button @click="ChooseImage()" type="default">打开相册</button> -->
	</view>
</template>

<script>
	import {
		Html5Qrcode
	} from "html5-qrcode";
	export default {
		name: "scanQrcode",
		data() {
			return {

			};
		},
		mounted() {
			// #ifdef H5
			this.getCameras()
			//#endif
		},
		methods: {
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //使用相机
					success: (res) => {
						console.log(res);
						let path = res.tempFilePaths[0]
						let reader = new FileReader();
						reader.readAsDataURL(res.tempFiles[0]);
						let _this = this;
						let content = path; //图片的src，base64格式
						let img = new Image();
						img.src = content;
						console.log(img.src)
						img.onload = function() { //图片加载完毕
							// _this.compressEvent(img, (dataURL) => {
							// 	//将 照片 存服务器，服务器放回在线地址
							// 	_this.$http.upload(
							// 		'/app/sys/file/webupload/upload?uploadPath=/app/formbuilder',
							// 		dataURL).then((res) => {
							// 		_this.imgList.push(JSON.parse(res))
							// 		uni.hideLoading()
							// 	})
							// })
						}
					}
				})
			},
			getCameras() {

				Html5Qrcode.getCameras()
					.then((devices) => {
						/**
						 * devices would be an array of objects of type:
						 * { id: "id", label: "label" }
						 */
						if (devices && devices.length) {
							// 如果有2个摄像头，1为前置的
							if (devices.length > 1) {
								this.cameraId = devices[1].id;
							} else {
								this.cameraId = devices[0].id;
							}
							this.devices = devices;
							this.start();
							// .. use this to start scanning.
						}
					})
					.catch((err) => {
						// handle err
						console.log(err); // 获取设备信息失败
					});
			},
			//从相册选择照片
			galleryImgs() {
				plus.gallery.pick(
					function(e) {
						let name = e.substr(e.lastIndexOf("/") + 1);
						compressImage(e, name);
					},
					function(e) {}, {
						filter: "image",
					}
				);
			},
			start() {
				const html5QrCode = new Html5Qrcode("reader");
				html5QrCode
					.start(
						this.cameraId, // retreived in the previous step.
						{
							fps: 10, // sets the framerate to 10 frame per second
							qrbox: {
								width: 250,
								height: 250
							}, // sets only 250 X 250 region of viewfinder to
							// scannable, rest shaded.
						},
						(decodedText, decodedResult) => {
							// do something when code is read. For example:
							// if (qrCodeMessage) {
							//   this.getCode(qrCodeMessage);
							//   this.stop();
							// }
							if (decodedResult) {
								this.$emit('scanOver', decodedResult);
								this.stop();
							}
							console.log(decodedText);
							console.log(decodedResult);
						},
						(errorMessage) => {
							// parse error, ideally ignore it. For example:
							// console.log(`QR Code no longer in front of camera.`);
							console.log(errorMessage);
						}
					)
					.catch((err) => {
						// Start failed, handle it. For example,
						console.log(`Unable to start scanning, error: ${err}`);
					});
			},
			stop() {
				this.html5QrCode
					.stop()
					.then((ignore) => {
						// QR Code scanning is stopped.
						console.log("QR Code scanning stopped.");
					})
					.catch((err) => {
						// Stop failed, handle it.
						console.log("Unable to stop scanning.");
					});
			},
		}
	}
</script>

<style>

</style>
