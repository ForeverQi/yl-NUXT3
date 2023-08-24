<template>
    <div>
        <ul class="menu-list">
            <li v-for="(item, index) in list" :key="index">
                <!-- 多章节显示 -->
                <div class="more-menu-title flex jc-between ai-center" @click="handleShow(item)">
                    <div class="list-title">第{{ index + 1 }}章&ensp;{{ item.catalogName }}</div>
                    <img src="./asset/images/up.png" alt="" class="menu-title-img" v-if="item.isVideoExpand" />
                    <img src="./asset/images/down.png" alt="" class="menu-title-img" v-else />
                </div>
                <ul v-if="item.isVideoExpand">
                    <li v-for="(child, eq) in item.coursewareList" :key="eq" @click="handlePlay(child, item)" :class="child.isPlaying ? 'active' : ''">
                        <menu-item :item="child"></menu-item>
                    </li>
                </ul>
            </li>
        </ul>
        <pay-model ref="payModel" @freePopupShow="handleFreePopupShow" @payPopupShow="handlePayPopupShow"></pay-model>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import menuItem from '../menu-item';
import mixin from '../../../js/mixin.js';
import payModel from '../../../pay-model';

export default {
    name: 'moreMenuListModel',
    components: {
        menuItem,
        payModel,
    },
    mixins: [mixin],
    props: {
        list: {
            type: Array,
            default: () => {
                return [];
            },
        },
    },
    computed: {
        ...mapState('logout', ['islogin', 'userInfo']),
        ...mapState('trial-course/course', { experienceClass: 'experienceClass' }),
    },
    methods: {
        ...mapMutations('trial-course/course', { updateCatalog: 'updateCatalog', updateCourseWare: 'updateCourseWare' }),
        handleShow(item) {
            this.updateCatalog({
                catalogId: item.catalogId,
                isVideoExpand: !item.isVideoExpand,
            });
        },
        handlePlay(item, parent) {
            console.info('moreMenuList', item);
            //课件类型(1:录播;2:直播;4:资料)
            this.list.forEach((litem) => {
                litem.coursewareList.forEach((sitem) => {
                    this.updateCourseWare({
                        coursewareId: sitem.coursewareId,
                        isPlaying: item === sitem,
                    });
                });
            });
            item.parent = parent;
            if (item.coursewareAuditionstatus === 'N') {
                // return;
                this.listenCluePush();
            }
            return this.playVideo(
                item,
                {
                    playOverLive: true,
                },
                '加锁目录(播放器)触发领取'
            ).catch((err) => {
                console.warn('moreMenuList-handlePlay', err);
            });
        },
        handleFreePopupShow(val) {
            console.info('handleFreePopupShow', val);
            this.$emit('freePopupShow', val);
        },
        handlePayPopupShow(val) {
            console.info('handlePayPopupShow', val);
            this.$emit('payPopupShow', val);
        },
    },
};
</script>
<style lang="less" scoped>
.menu-list {
    margin-left: 15px;
    margin-right: 15px;
    .more-menu-title {
        margin-bottom: 20px;
        .list-title {
            font-size: 14px;
            line-height: 19px;
            color: #fff;
            font-weight: bold;
        }
        .menu-title-img {
            display: block;
            width: 16px;
            height: 16px;
            cursor: pointer;
        }
    }
    .active {
        /deep/ .menu-item {
            background-color: #3f4060;
        }
    }
}
</style>
