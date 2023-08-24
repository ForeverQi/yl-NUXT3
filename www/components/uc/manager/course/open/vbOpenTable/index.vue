<template>
    <div class="tabWrap">
        <ul class="tabContent">
            <li v-for="item in tabItemList" class="tabItem" :key="item.value" :class="{ active: active === item.router }" @click="toPath(item.router)">
                {{ item.value }}
            </li>
        </ul>
        <div class="checkAll position-right" v-show="editShow && isShowEditBtn" @click="editShow = false">
            <i class="icon edit"></i>
            <span>编辑</span>
        </div>
        <div class="editsWrap position-right" v-show="!editShow">
            <div class="checkAll" @click="checkAll()">
                <i class="icon checks" :class="{ active: allSwitch }"></i>
                <span class="checkSpan" :class="{ active: allSwitch }">全选</span>
            </div>
            <div class="checkAll" @click="deleteAll()">
                <i class="icon delete" :class="{ active: choseList.length > 0 }"></i>
                <span class="deleteSpan" :class="{ active: choseList.length > 0 }">删除</span>
            </div>
            <div class="checkAll" @click="cancel()">
                <i class="icon add"></i>
                <span>取消</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        tabItemList: {
            type: Array,
            default() {
                return [
                    { value: '购买的公开课', router: 'purchased' },
                    { value: '收藏的公开课', router: 'collection' },
                ];
            },
        },
    },
    data() {
        return {
            editShow: true,
            active: true,
            allSwitch: false,
            choseList: [],
            isShowEditBtn: true,
        };
    },
    watch: {
        editShow() {
            this.$nuxt.$emit('editShow', this.editShow);
        },
        $route: {
            handler(val) {
                let strList = val.fullPath.split('/');
                let fullPath = strList[strList.length - 1];
                this.active = fullPath;
                this.isShowEditBtn = this.tabItemList.find((item) => item.router === fullPath).isShowEditBtn;
            },
            immediate: true,
            deep: true,
        },
    },
    created() {
        this.$nuxt.$on('allSwitchChange', (data) => {
            this.allSwitch = data;
        });
        this.$nuxt.$on('choseListChange', (data) => {
            this.choseList = data;
        });
    },
    methods: {
        toPath(route) {
            this.cancel();
            this.$router.push(route);
        },
        checkAll() {
            this.$nuxt.$emit('checkAll');
        },
        cancel() {
            this.editShow = true;
            this.$nuxt.$emit('cancel', this.editShow);
        },
        deleteAll() {
            this.$nuxt.$emit('deleteAll');
        },
    },
};
</script>

<style scoped lang="less">
.tabWrap {
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    background: #fff;
    padding: 20px 20px 0;
    position: relative;
    text-align: center;
}
.tabContent {
    background-color: #f5f6f9;
    display: inline-block;
    border-radius: 8px;
    margin: 0 auto;
    .tabItem {
        font-size: 16px;
        color: #3a3d4b;
        font-weight: normal;
        padding: 10px 32px 11px;
        display: inline-block;
        &.active {
            border-radius: 8px;
            color: #ff2e30;
            background-color: #ffeaea;
            font-weight: bold;
        }
    }
}
.editsWrap {
    display: flex;
    align-items: center;
}
.position-right {
    position: absolute;
    right: 20px;
    top: 30px;
}

.checkAll {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    margin-left: 27px;
    color: rgba(153, 153, 153, 1);
    cursor: pointer;
    .icon {
        height: 17px;
        width: 17px;
        margin-right: 9px;
    }
    .edit {
        background: url('./asset/images/edit@2x.png') no-repeat 0 0 / cover;
    }
    .checks {
        background: url('./asset/images/checkAll@2x.png') no-repeat 0 0 / cover;
        &.active {
            background-image: url('./asset/images/checkAll_active@2x.png');
        }
    }
    .delete {
        background: url('./asset/images/delete@2x.png') no-repeat 0 0 / cover;
        &.active {
            background-image: url('./asset/images/delete_active@2x.png');
        }
    }
    .add {
        background: url('./asset/images/add@2x.png') no-repeat 0 0 / cover;
        &.active {
            background-image: url('./asset/images/add_active@2x.png');
        }
    }
    .deleteSpan.active {
        color: #ff4436;
    }
    .checkSpan.active {
        color: #ff4436;
    }
}
</style>
