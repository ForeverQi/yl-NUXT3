<!--
 * @Author: Li
 * @Date: 2022-03-08 09:22:28
 * @LastEditors: Li
 * @LastEditTime: 2022-04-04 18:28:08
 * @Description:
-->
<template>
    <div class="more-chapter-list">
        <div v-for="(item, index) in catalogList" :key="index" class="more-chapter-item">
            <div class="flex jc-between ai-center more-chapter-item-title" @click="handleShowMoreChapter(item)">
                <div class="flex ai-center">
                    <img src="./asset/images/more-chapter.png" alt="" class="more-chapter-img" />
                    <h4 class="catalog-name">{{ item.catalogName }}</h4>
                </div>
                <img src="./asset/images/up.png" alt="" class="chapter-up-down" v-if="item.isExpand" />
                <img src="./asset/images/down.png" alt="" class="chapter-up-down" v-else />
            </div>
            <ul v-if="item.isExpand">
                <li class="pl40" v-for="(child, eq) in item.coursewareList" :key="eq" @click="handlePlay(child)">
                    <chapter-item :item="child"></chapter-item>
                </li>
            </ul>
        </div>
        <pay-model ref="payModel"></pay-model>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import chapterItem from '../chaptersItem/index.vue';
import payModel from '../../payModel/index.vue';
import mixin from '../../js/mixin.js';

export default {
    name: 'moreChaptersModel',
    components: {
        chapterItem,
        payModel,
    },
    mixins: [mixin],
    inject: ['experienceClass'],
    computed: {
        ...mapState('logout', ['islogin', 'userInfo']),
        catalogList() {
            return this.experienceClass.catalogList;
        },
        drawStatus() {
            return this.experienceClass.drawStatus;
        },
    },
    methods: {
        handleShowMoreChapter(item) {
            item.isExpand = !item.isExpand;
        },
        handlePlay(item) {
            console.log('moreChapters', item);
            if (item.coursewareAuditionstatus === 'N') {
                return;
            } else if (item.coursewareType === '2' && Date.parse(item.coursewareEndtime) > Date.now()) {
                return;
            }
            this.catalogList.forEach((litem) => {
                litem.isVideoExpand = false;
                litem.coursewareList.forEach((sitem) => {
                    sitem.isPlaying = item === sitem;
                    sitem.isPlaying && (litem.isVideoExpand = true);
                });
            });

            return this.playVideo(item).catch((err) => {
                console.error('moreChapters-handlePlay', err);
            });
        },
    },
};
</script>
<style lang="less" scoped>
.more-chapter-list {
    h4 {
        border: 0;
        font-weight: normal;
    }
    .more-chapter-item {
        width: 100%;
        margin-bottom: 16px;
        .more-chapter-item-title {
            height: 58px;
            cursor: pointer;
            background-color: #fff;
            padding: 0 21px 0 17px;
            border-radius: 8px;
            .catalog-name {
                font-weight: bold;
            }
        }
    }
    .chapter-up-down {
        display: block;
        width: 16px;
        height: 16px;
    }
    .more-chapter-img {
        display: block;
        width: 22px;
        height: 22px;
        margin-right: 17px;
    }
    .pl40 {
        padding-left: 40px;
    }
}
</style>
