<template>
	<view class="flex" :style="{width:radius+'rpx',height:radius+'rpx'}">
		<text class="second" :style="{fontSize:fontSize+'rpx'}">{{second1}}</text>
		<canvas type="2d" style="width: 100%;height:100%" id="countDown" canvas-id="countDown"></canvas>
	</view>
</template>
<script>
	export default{
		props:{
			radius:{
				type:Number,
				default:100
			},
			second:{
				type:Number,
				default:10
			},
			fontSize:{
				type:Number,
				default:30
			},
			color:{
				type:String,
				default:'#0A84FF'
			},
			bgcolor:{
				type:String,
				default:'#f2f2f2'
			},
			lineWidth:{
				type:Number,
				default:5
			}
		},
		data(){
			return{
				second1:this.second,
				second_copy:this.second,
				index:1,
				time:null,
				time1:null,
				index1:1,
				millisecond:null,
				process:null,
				pauseStatus:false,
				ctx:null,
				center:0
			}
		},
		// #ifdef H5 || APP-PLUS
		onReady() {
			this.millisecond = this.second1*5
			this.process = 1/this.millisecond
			this.init().then(res=>{
				this.countDown()
			})
		},
		// #endif
		mounted(){
			this.millisecond = this.second1*5
			this.process = 1/this.millisecond
			this.init().then(res=>{
				this.countDown()
			})
		},
		methods:{
			init(){
				return new Promise((resolve,reject)=>{
					let that = this
					// #ifdef APP-PLUS || H5
					const query= uni.createSelectorQuery().in(this);
					// #endif
					
					// #ifdef MP 
					const query = this.createSelectorQuery()
					// #endif
					query.select('#countDown')
					  .fields({ node: true, size: true})
					  .exec((res) => {
						 console.log(res)
						 // #ifdef MP
						 const canvas = res[0].node
						 // #endif
						
						// #ifdef H5 || APP-PLUS
						 const canvas = uni.createCanvasContext('countDown', that);
						// #endif
						
						// #ifdef H5 || APP-PLUS
						const ctx = uni.createCanvasContext('countDown', that);
						// #endif
						
						// #ifdef MP
						const ctx = canvas.getContext('2d')
						// #endif
						
						let height = res[0].height
						let width = res[0].width
						let center = parseInt(width/2)
						that.center=center
						const dpr = uni.getSystemInfoSync().pixelRatio
						canvas.width = res[0].width * dpr
						canvas.height = res[0].height * dpr
						ctx.scale(dpr, dpr)
						that.ctx=ctx
						resolve('1')
					})
				})
			},
			countDown(){
				if(this.index1==1){
					this.ctx.beginPath()
					this.ctx.arc(this.center,this.center, this.center-5, 0, 2 * Math.PI)
					// #ifdef MP
					this.ctx.strokeStyle=this.color
					this.ctx.lineWidth=this.lineWidth
					this.ctx.stroke()
					// #endif
					
					// #ifdef H5 || APP-PLUS
					this.ctx.setStrokeStyle(this.color)
					this.ctx.setLineWidth(this.lineWidth)
					this.ctx.stroke()
					this.ctx.draw()
					// #endif
				}
				this.time = setInterval(()=>{
					this.ctx.beginPath()
					this.ctx.arc(this.center,this.center, this.center-5, 0, (this.index*this.process) * Math.PI)
					// #ifdef MP
					this.ctx.strokeStyle=this.bgcolor
					this.ctx.lineWidth=this.lineWidth+1
					this.ctx.stroke()
					// #endif
					
					// #ifdef H5 || APP-PLUS
					this.ctx.setStrokeStyle(this.bgcolor)
					this.ctx.setLineWidth(this.lineWidth)
					this.ctx.stroke()
					this.ctx.draw(true)
					// #endif
					let number = this.index/10
					this.second1=this.second-parseInt(number)
					if(this.index*this.process>=2){
						clearInterval(this.time)
						this.$emit('end')
					}else{
						this.index++
					}
				},100)
			},
			refresh(){
				clearInterval(this.time)
				clearInterval(this.time1)
				this.second1=this.second
				this.index=1
				this.index1=1
				this.pauseStatus=false
				this.countDown()
			},
			pause(){
				if(!this.pauseStatus){
					clearInterval(this.time)
					this.index1=this.index
					clearInterval(this.time1)
					this.second_copy=this.second1
					this.second1=this.second_copy
					this.pauseStatus=true
				}
			},
			play(){
				if(this.pauseStatus){
					this.countDown()
					this.pauseStatus=false
				}
			}
		}
	}
</script>
<style scoped>
.flex{
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
}
.second{
	font-size: 28rpx;
	color:#000000;
	position: absolute;
}
</style>
