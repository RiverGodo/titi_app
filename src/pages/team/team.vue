<template>
	<view>
		<u-tabs :scrollable="false" :list="list1" @click="click"></u-tabs>
		<view class="team-center">
			<u-cell-group v-if="showIndex === 0">
				<u-collapse>
					<u-collapse-item icon="account-fill" v-for="(item, index) of teamList" :key="index"
						:title="item.nickname" :name="'guide'+index">
						<text class="u-collapse-content">等级头衔:上校</text>
						<text class="u-collapse-content">现金:{{item.cashBalance}}</text>
						<text class="u-collapse-content">积分:{{item.integralBalance}}</text>
						<text class="u-collapse-content">碳值:{{item.tbBalance}}</text>
						<text class="u-collapse-content">保证金:{{item.bondBalance}}</text>
					</u-collapse-item>
				</u-collapse>
				<view class="team-btn">
					<!-- #ifdef APP-PLUS -->
					<u-button @click="handleAPPInvitePeople()" type="primary" text="邀请同伴"></u-button>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<u-button @click="handleH5InvitePeople()" type="primary" text="邀请同伴"></u-button>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<button style="width: 100%;" @click="handleWXInvitePeople()" open-type="share">邀请同伴</button>
					<!-- #endif -->
				</view>
			</u-cell-group>
			<view class="category-box" v-if="showIndex === 1">
				<scroll-view scroll-y="true" class='box-left'>
					<view class="category-item" v-for="(item, index) in cityList" :key="item.id">
						<view class="item-title" :class="{ active: cityIndex === index }"
							@click="handleCityClick(index)">
							<text>{{ item.name }}</text>
						</view>
					</view>
				</scroll-view>
				<scroll-view scroll-y="true" class="box-right">
					<view class="invite-button">
						<u-button v-if="memberId" :disabled="true" type="primary" text="省总督已签约"></u-button>
						<!-- #ifdef APP-PLUS -->
						<u-button v-else @click="handleAPPInviteTeam()" type="primary" text="邀请省总督"></u-button>
						<!-- #endif -->
						<!-- #ifdef H5 -->
						<u-button v-else @click="handleH5InviteTeam()" type="primary" text="邀请省总督"></u-button>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<button v-else style="width: 100%;" @click="handleWXInviteTeam()" open-type="share">邀请省总督</button>
						<!-- #endif -->
					</view>
					<view v-for="(item, index) of citySingleList" :key="index">
						<u-cell-group>
							<u-cell v-if="item.memberId" icon="man-add-fill" :title="item.nickname" value="合伙人已签约"></u-cell>
							<!-- #ifdef APP-PLUS -->
							<u-cell v-else @click="handleAPPInviteTeam()" icon="man-add-fill" value="邀请合伙人"
								:isLink="true" :title="item.nickname"></u-cell>
							<!-- #endif -->
							<!-- #ifdef H5 -->
							<u-cell v-else @click="handleH5InviteTeam()" icon="man-add-fill" value="邀请合伙人" :isLink="true"
								:title="item.nickname"></u-cell>
							<!-- #endif -->
							<!-- #ifdef MP-WEIXIN -->
							<u-cell v-else icon="man-add-fill" :title="item.nickname">
								<button slot="value" @click="handleWXInviteTeam(item)" open-type="share">邀请合伙人</button>
							</u-cell>
							<!-- #endif -->
						</u-cell-group>
					</view>
				</scroll-view>
			</view>

		</view>
		<u-overlay style="background: rgb(246, 246, 246);" :show="show" @click="show = false">
			<view class="warp">
				<image style="width: 100%;height: 700rpx;" :src="backImg" mode=""></image>
			</view>
		</u-overlay>
	</view>
</template>

<script>
	import {
		getUserTeam,
		wxShare,
		socialAuthUserInfo
	} from '@/api/auth'
	import {
		getDeptUserData,
		getTeamUserData,
		getListAllSimple
	} from "@/api/partner.js"
	import {
		domainUrl
	} from '@/common/mixin.js'
	import mix from "../../common/mixin.js"
	export default {
		data() {
			return {
				cityIndex: 0,
				list1: [{
					name: '我的团队',
				}, {
					name: '全部城市',
				}],
				teamList: [],
				cityList: [],
				citySingleList:[],
				memberId:0,
				showIndex: 0,
				shareTitle: '团队收益',
				sharePath: '/pages/team/team',
				appid: 'wx4cdf9306457bda2e',
				userId: null,
				show: false,
				backImg: mix.imageUrl + 'wx/fd31ed630f3f3996ff237118c6ef9098f7fa113e6f3764c6d59a44da00710fcb.jpg'
			}
		},
		onLoad() {
			if (!this.hasLogin) {
				uni.setStorageSync('returnPath', "/pages/team/team")
				uni.$u.route('/pages/login/social')
			}else{
				this.$store.dispatch('ObtainUserInfo')
			}
		},
		mounted() {
			this.init()
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
			handleCityClick(index) {
				getTeamUserData({
					deptId: this.cityList[index].id
				}).then(res => {
					// console.log(res);
					this.citySingleList = res.data
				})
				this.memberId = this.cityList[index].memberId
				this.cityIndex = index
			},
			init() {
				let pra2 = {
					id: this.userInfo.id,
					teamState: 0
				}
				getUserTeam(pra2).then(res => {
					this.teamList = res.data
				})
				
				getListAllSimple({
					parentId: 114
				}).then(res => {
					getTeamUserData({
						deptId: 114
					}).then(res2 => {
						// console.log(res,22222);
						let add = res.data
						let app = res2.data
						add.forEach((item,index) => {
							app.forEach((item2,index2) => {
								if(item.leaderUserId === item2.id){
									item.memberId = item2.memberId
								}
							})
						})
						this.cityList = add
					})
					// console.log(res);
				})
			},
			click(item) {
				this.handleCityClick(0)
				this.showIndex = item.index
			},
			handleAPPInviteTeam() {
				let TITLE = this.userInfo.nickname + "邀请您成为城市合伙人"
				let DESC = "成为城市合伙人，和我一起实现共赢"
				let LINK = "https://www.51uhj.com/#/pages/partner/partner"
				let IMGURL = "https://image.51uhj.com/25a421f644932557d2dc72f12cb262aab89a36a5eb72c6555c9c05254dbb3bc8.jpg"
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: LINK,
					title: TITLE,
					summary: DESC,
					imageUrl: IMGURL,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
						if (err.errCode === -8) {
							uni.$u.toast("微信未安装")
						}
					}
				});
			},
			handleWXInviteTeam(item) {
				this.shareTitle = this.userInfo.nickname + '邀请合伙人'
				this.sharePath = '/pages/download/download'
			},
			handleH5InviteTeam() {
				let TITLE = this.userInfo.nickname + "邀请您成为城市合伙人"
				let HREF = window.location.href.split('#')[0]
				let DESC = "成为城市合伙人，和我一起实现共赢"
				let LINK = "https://www.51uhj.com/#/pages/partner/partner"
				let IMGURL = "https://image.51uhj.com/25a421f644932557d2dc72f12cb262aab89a36a5eb72c6555c9c05254dbb3bc8.jpg"
				this.$wxH5Share.get_jssdk(TITLE, HREF, DESC, LINK, IMGURL)
				this.show = true
			},
			handleWXInvitePeople() {
				this.shareTitle = this.userInfo.nickname + '邀请同伴'
				this.sharePath = '/pages/login/register?data=[2,' + this.userInfo.companyId + ',0]&parentId=' + this
					.userInfo.id
			},
			handleAPPInvitePeople() {
				let TITLE = this.userInfo.nickname + "邀请您加入我的团队"
				let DESC = "加入我的友惠见团队，和我一起实现共赢"
				let LINK = "https://www.51uhj.com/#/pages/login/register?data=[2," + this.userInfo.companyId +
					",0]&parentId=" + this.userInfo.id
				let IMGURL = "https://image.51uhj.com/25a421f644932557d2dc72f12cb262aab89a36a5eb72c6555c9c05254dbb3bc8.jpg"
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: LINK,
					title: TITLE,
					summary: DESC,
					imageUrl: IMGURL,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
						if (err.errCode === -8) {
							uni.$u.toast("微信未安装")
						}
					}
				});
			},
			handleH5InvitePeople() {
				let TITLE = this.userInfo.nickname + "邀请您加入我的团队"
				let HREF = window.location.href.split('#')[0]
				let DESC = "加入我的友惠见团队，和我一起实现共赢"
				let LINK = "https://www.51uhj.com/#/pages/login/register?data=[2," + this.userInfo.companyId +
					",0]&parentId=" + this.userInfo.id
				let IMGURL = "https://image.51uhj.com/25a421f644932557d2dc72f12cb262aab89a36a5eb72c6555c9c05254dbb3bc8.jpg"
				this.$wxH5Share.get_jssdk(TITLE, HREF, DESC, LINK, IMGURL)
				this.show = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.team-btn {
		position: fixed;
		width: 90%;
		bottom: 20rpx;
		left: 0;
		right: 0;
		margin: auto;
	}

	// .team-center {
	// 	height: 90vh;
	// 	overflow: hidden;
	// 	overflow-y: auto;
	// }

	.category-box {
		width: 100%;
		position: fixed;
		display: flex;
		overflow: hidden;
		margin-top: 0rpx;
		height: calc(100% - 180rpx);

		.box-left {
			width: 250rpx;
			padding-top: 5rpx;
			overflow: scroll;
			z-index: 2;
			background-color: #f2f2f2;

			.category-item {
				line-height: 80rpx;
				height: 80rpx;
				text-align: center;
				color: #777;

				.item-title {
					font-size: 28rpx;

					&.active {
						font-size: 28rpx;
						font-weight: bold;
						position: relative;
						background: #fff;
						color: $u-primary;
					}

					&.active::before {
						position: absolute;
						left: 0;
						content: "";
						width: 8rpx;
						height: 32rpx;
						top: 25rpx;
						background: $u-primary;
					}
				}
			}
		}
		.box-right {
			width: 550rpx;
			height: 100%;
			box-sizing: border-box;
			z-index: 1;
		}
	}
</style>
