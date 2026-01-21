<template>
    <view>
        <view class="top" @click="confirm()">
            <text>确定</text>
        </view>
        <view class="user_list">
            <text>楼栋名称：</text>
            <input v-model="name" type="text" placeholder="请输入楼栋名称">
        </view>
        <view class="user_list" v-if="true">
            <text>通用楼层：</text>
            <input v-model="commonFloor" placeholder="请输入通用楼层，如[-2,-1,1]">
        </view>
        <view class="user_list" v-if="true">
            <text>所有楼层：</text>
            <input v-model="allFloor" placeholder="请输入通用楼层，如：[-2,-1,1,2,3]">
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            commonFloor: '',
            allFloor: '',
            parkId: '',
            id: '',
        }
    },
    async onLoad(options) {
        this.id = options.id;
        this.parkId = options.park;
        if (this.id) {
            this.getData();
        }
    },
    methods: {
        async confirm() {
            if (!this.name) {
                this.$util.msg("请输入楼栋名称");
                return;
            }
            if (!this.commonFloor) {
                this.$util.msg("请添加通用楼层");
                return;
            }
            if (!this.allFloor) {
                this.$util.msg("请添加所有楼层");
                return;
            }
            if(this.commonFloor.indexOf("[") === -1 || this.commonFloor.indexOf("]") === -1){
                this.$util.msg("请输入楼层数组");
                return;
            }
            if(this.allFloor.indexOf("[") === -1 || this.allFloor.indexOf("]") === -1){
                this.$util.msg("请输入楼层数组");
                return;
            }
            let params = {name: this.name, commonFloor: this.commonFloor, allFloor: this.allFloor, parkId: this.parkId}
            if(this.id){
                params.id = this.id;
            }
            const res = await this.$post('/property/addOrUpdateBuilding', params);
            this.$util.msg("提交成功");
            setTimeout(() => {
                uni.navigateBack();
            }, 1000)
        },
        async getData() {
            const res = await this.$get('/property/getBuilding', {
                id: this.id
            });
            let data = res.data;
            this.name = data.name;
            this.commonFloor = data.commonFloor;
            this.allFloor = data.allFloor;
        },
    }
}
</script>

<style lang="scss" scoped>
	view,text{line-height: 1.8;}
.box {
  padding-bottom: 100rpx;
}

.top {
  z-index: 100;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60rpx;
  margin-top: 20rpx;
  display: flex;
  flex-direction: row;
  height: 80rpx;
  line-height: 80rpx;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  background-color: $base-color;
}

.bottmoBtn {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.title_sub2 {
  margin-left: 20rpx;
  margin-top: 30rpx;
  font-size: 30rpx;
}

.line {
  width: 100%;
  height: 15rpx;
  margin-top: 10rpx;
  margin-bottom: 40rpx;
  background-color: #EEEEEE;
}

.sku-list {
  .attrs {
    display: flex;
    flex-wrap: wrap;
    padding-left: 32rpx;
    padding-right: 20rpx;
  }

  .attr {
    min-width: 58rpx;
    height: 58rpx;
    padding: 0 24rpx;
    margin-right: 20rpx;
    margin-bottom: 20rpx;
    font-size: 26rpx;
    color: #333;

    &:after {
      border-color: #e0e0e0;
    }

    &.active {
      color: $base-color;
      background-color: rgba(255, 82, 111, .03);

      &:after {
        border-color: rgba(255, 82, 111, .5);
      }
    }

    &.disabled {
      background-color: #ddd;
    }
  }
}

.spec_container {
  display: flex;
  margin-left: 20rpx;
  margin-right: 20rpx;
  margin-bottom: 40rpx;

  input:nth-child(1) {
    flex: 1;
    height: 60rpx;
    line-height: 60rpx;
    margin-right: 20rpx;
    color: #666666;
    // border-bottom: 1rpx solid #EEEEEE;
  }

}

.btnAddAttr {
  height: 58rpx;
  line-height: 58rpx;
  padding-left: 20rpx;
  padding-right: 20rpx;
  font-size: 30rpx;
  text-align: center;
  background-color: #409eff;
  border-radius: 10rpx;
  margin-left: 20rpx;
  color: #FFFFFF;
}

.btnDelAttr {
  height: 58rpx;
  line-height: 58rpx;
  padding-left: 20rpx;
  padding-right: 20rpx;
  font-size: 30rpx;
  text-align: center;
  background-color: #f78989;
  border-radius: 10rpx;
  margin-left: 20rpx;
  color: #FFFFFF;
}

.btnDelSpec {
  height: 58rpx;
  line-height: 58rpx;
  padding-left: 20rpx;
  padding-right: 20rpx;
  font-size: 30rpx;
  text-align: center;
  background-color: #e6a23c;
  border-radius: 10rpx;
  margin-left: 20rpx;
  color: #FFFFFF;
}


.spec_container_btn {
  margin-left: 20rpx;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  display: flex;
  border-bottom: 1rpx solid #EEEEEE;
  padding-bottom: 10rpx;

  text:nth-child(1) {
    width: 100rpx;
    margin-right: 20rpx;
    font-size: 30rpx;
    background-color: #409eff;
  }

  text:nth-child(2) {
    width: 100rpx;
    margin-right: 20rpx;
    font-size: 30rpx;
    background-color: #f78989;
  }
}

.btn_spec {
  width: 180rpx;
  height: 60rpx;
  line-height: 60rpx;
  background-color: $base-color;
  text-align: center;
  color: #FFFFFF;
  border-radius: 10rpx;
}

.picker {
  flex: 1;
}

.top20 {
  margin-top: 20rpx;
}

.title_sub {
  margin-left: 20rpx;
  font-size: 30rpx;
}

.pro_list {
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  margin-left: 20rpx;
  margin-bottom: 20rpx;
}

.user_list {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 24rpx;
  margin-top: 24rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
  justify-content: space-between;
  border-bottom: 1rpx solid #eee;

  text {
    flex: 1;
    font-size: 30rpx;
    white-space: nowrap;
  }

  input {
    flex: 2;
    font-size: 30rpx;
    white-space: nowrap;
    text-align: right;
  }

}

.user_list_no_line {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 10rpx;
  margin-top: 26rpx;
  margin-bottom: 26rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;


  text {
    font-size: 30rpx;
    white-space: nowrap;
  }

}

.item_pro {
  margin-top: 20rpx;
  margin-right: 20rpx;
  height: 240rpx;
  background-color: #FFFFFF;
  border: 1rpx solid #ffffffff;
  border-radius: 10px;


  image {
    width: 220rpx;
    height: 240rpx;
    display: inline-block;
  }
}

._main {
  height: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  padding-bottom: 50rpx;
}
</style>
