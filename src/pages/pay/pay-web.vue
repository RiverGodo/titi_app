<template>
	<web-view src="https://mp.weixin.qq.com/s?__biz=MzkzMzQxODMwNQ==&mid=2247483657&idx=1&sn=9d560923c621965075c56143de15aff8&chksm=c24d8527f53a0c315cabb99858845837ba8eff06a90afceea4865a80ff7ed22c892cb955fe8a#rd"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(item) {
			this.url = decodeURIComponent(item.url)
			console.log(this.url)
			// 传入需要跳转的链接 使用web-view标签进行跳转
		},
		methods: {

		}
	}
</script>

<style>

</style>
