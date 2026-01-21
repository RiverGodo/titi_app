<template>
	<view>
		<u-cell-group class="fun-list">
			<u-cell v-if="userInfo.roleId === 122 || userInfo.roleId === 1" class="fun-item" :border="false" icon="edit-pen" title="人员管理"
				@click="loginOrJump('/pages/admin/examine/examine')" isLink></u-cell>
			<u-cell v-if="userInfo.roleId === 117 || userInfo.roleId === 1" class="fun-item" :border="false" icon="order" title="楼栋管理"
				@click="loginOrJump('/pages/admin/admin_floor/admin_floor')" isLink></u-cell>
			<u-cell v-if="userInfo.roleId === 117 || userInfo.roleId === 1" class="fun-item" :border="false" icon="home" title="公司管理"
				@click="loginOrJump('/pages/admin/admin_company/admin_company')" isLink></u-cell>
			<u-cell v-if="userInfo.roleId === 118 || userInfo.roleId === 120 || userInfo.roleId === 1" class="fun-item" :border="false" icon="bag" title="电梯管理"
				@click="loginOrJump('/pages/admin/admin_elevator/admin_elevator')" isLink></u-cell>
			<u-cell v-if="userInfo.roleId === 118 || userInfo.roleId === 120 || userInfo.roleId === 1" class="fun-item" :border="false" icon="wifi" title="电梯广告机管理"
				@click="loginOrJump('/pages/admin/admin_device_adnode/admin_device_adnode')" isLink></u-cell>
			<u-cell v-if="userInfo.roleId === 118 || userInfo.roleId === 120 || userInfo.roleId === 1" class="fun-item" :border="false" icon="coupon" title="大厅广告机管理"
				@click="loginOrJump('/pages/admin/admin_device_adhost/admin_device_adhost')" isLink></u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			loginOrJump(pageUrl) {
				if (!this.hasLogin) {
					uni.$u.route('/pages/login/social')
				} else {
					uni.$u.route(pageUrl)
				}
			}
		},
		computed: {
			userInfo() {
				return this.$store.getters.userInfo
			},
			hasLogin() {
				return this.$store.getters.hasLogin
			}
		}
	}
</script>

<style>

</style>
