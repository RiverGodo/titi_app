<template>
    <view class="invite-page">
        <view class="invite-content">
            <view class="invite-qrCode">
                <uqrcode :text="link" :size="150" v-if="link"/>
            </view>
            <view class="invite-code">
                <view class="invite-code-tip">分享你的邀请二维码或编号吧</view>
                <view class="invite-code-code" @click="copy">
                    <text>{{data}}</text>
                    <text class="iconfont" >&#xeb4e;</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            data: null,
            link: null,
        }
    },
    onLoad() {
        this.getData();
    },
    methods: {
        copy(){
            uni.setClipboardData({
                data: this.data,
                success: () => {
                    this.$util.msg('复制成功');
                }
            })
        },
        async getData() {
            const res = await this.$get("/company/getCode", {});
            let data = res.data.split("_");
            this.data = data[0];
            this.link = data[1];
        },
    }
}
</script>

<style scoped lang="scss">
	view,text{line-height: 1.8;}
page{
    width: 100%; height: 100%;
}
.invite-page {
    width: 100%;
    height: 100%;
}
.invite-content {
    padding-top: 60rpx;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}
.invite-qrCode {
    background: url("@/static/images/share/bk.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    width: 320rpx;
    height: 320rpx;
    padding: 10rpx;
    .invite-qrCode-txt {
        color: #333333;
        text-align: center;
        font-size: 24rpx;
    }
}
.invite-code {
    justify-content: center;
    align-items: center;
    padding-top: 40rpx;
    .invite-code-tip {
        text-align: center;
        color: #333;
        font-size: 28rpx;
    }
    .invite-code-time {
        text-align: center;
        color: #999;
        font-size: 24rpx;
    }
    .invite-code-code {
        letter-spacing: 20rpx;
        color: $base-color;
        text-align: center;
        font-size: 80rpx;
        font-weight: bold;
        .iconfont{
            color: #333;
        }
    }
}
.nop{
    font-size: 28rpx;
    color: #333;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 200rpx;
    .iconfont{
        font-size: 80rpx;
        color: #333;
    }
}
</style>
