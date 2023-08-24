<template>
    <div>
        <ul class="menu-list">
            <li v-for="(item, index) in list" :key="index" @click="handlePlay(item)" :class="item.isPlaying ? 'active' : ''">
                <menu-item :item="item"></menu-item>
            </li>
        </ul>
        <pay-model ref="payModel" @freePopupShow="handleFreePopupShow" @payPopupShow="handlePayPopupShow"></pay-model>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import menuItem from '../menu-item';
import payModel from '../../../pay-model';
import mixin from '../../../js/mixin.js';

export default {
    name: 'onlyMenuListModel',
    components: {
        menuItem,
        payModel,
    },
    mixins: [mixin],
    props: {
        list: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        ...mapState('logout', ['islogin', 'userInfo']),
        ...mapState('trial-course/course', { experienceClass: 'experienceClass' }),
    },
    methods: {
        ...mapMutations('trial-course/course', { updateCourseWare: 'updateCourseWare' }),
        handlePlay(item) {
            console.info('onlyMenuList', item);
            //课件类型(1:录播;2:直播;4:资料)
            //体验课直播课播放页，点击播放区域右侧目录，应该先判断是否登录，再判断，领取状态，最后是直播课状态
            this.list.forEach((litem) => {
                this.updateCourseWare({
                    coursewareId: litem.coursewareId,
                    isPlaying: item === litem,
                });
            });
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
                console.warn('onlyMenuList-handlePlay', err);
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
        margin-bottom: 14px;
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
