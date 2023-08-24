<template>
    <div>
        <div class="title-box">
            <span class="hint-txt">你当前选中区域：</span>
            <span class="province-name">{{ provinceName }}</span>
            <span class="school-size">共有&nbsp;{{ schoolList.length }}&nbsp;所分校</span>
        </div>
        <div class="content-box">
            <div v-for="(item, index) in schoolList" :key="index" class="card-item">
                <div class="card-title">{{ item.schoolName }}</div>
                <div class="card-txt address">{{ item.address }}</div>
                <div class="card-txt tel">
                    咨询电话：
                    <strong>{{ item.mobile }}</strong>
                </div>
                <div class="card-txt tel">
                    客服热线：
                    <strong>{{ item.telphone }}</strong>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        provinceName: {
            type: String,
            default: '',
        },
        schoolList: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

<style lang="less" scoped>
strong {
    border: 0;
    font-weight: normal;
}
.title-box {
    flex-shrink: 0;
    height: 60px;
    line-height: 60px;
    padding: 0 32px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    .hint-txt {
        font-size: 17px;
        color: #242f3e;
    }

    .province-name {
        font-size: 17px;
        color: #242f3e;
        font-weight: bold;
    }

    .school-size {
        font-size: 12px;
        color: #3a3d4b;
    }
}
.content-box {
    padding: 0 90px;
    margin-top: 32px;
    margin-bottom: 60px;
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    overflow: auto;
}

.card-item {
    box-sizing: border-box;
    width: 380px;
    height: 143px;
    padding-left: 28px;
    padding-right: 12px;
    margin-bottom: 20px;
    background-color: #f5f6f9;
    border-radius: 8px;
    overflow: hidden;
}

.card-title {
    padding: 16px 0 9px 28px;
    font-size: 14px;
    font-weight: bold;
    color: #3a3d4b;
    line-height: 20px;
    background: url('./asset/images/school-ico.png') no-repeat 0 center;
    background-size: 20px 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.card-txt {
    margin-bottom: 12px;
    font-size: 12px;
    color: #3a3d4b;

    &.address {
        height: 32px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    &.tel {
        margin-bottom: 6px;
        color: #77798d;
    }

    strong {
        font-weight: bold;
    }
}
</style>
