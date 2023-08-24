<template>
    <div class="phrase-query-content" ref="content">
        <!-- 选择科目 -->
        <div class="subject flex-start" ref="subject">
            <i v-if="isMore" class="el-icon-arrow-left" @click="previous"></i>
            <div v-if="isMore" class="subject-wrap" ref="subjectWrap">
                <div>
                    <ul class="subject-list" ref="subjectList">
                        <li v-for="(item, index) in list" :key="index" :class="{ active: activeIndex === index }" @click="handChange(item, index)">
                            {{ item.subjectName }}
                        </li>
                    </ul>
                </div>
            </div>
            <i v-if="isMore" class="el-icon-arrow-right" @click="next"></i>
            <ul v-if="isMore === false" class="subject-list no-more flex">
                <li v-for="(item, index) in list" :key="index" :class="{ active: activeIndex === index }" @click="handChange(item, index)">
                    {{ item.subjectName }}
                </li>
            </ul>
        </div>
        <!-- 内容详情 -->
        <div class="detail">
            <p class="title">{{ currentSubject.name }}</p>
            <div class="original" v-html="calcDetailInfo" @click="showBigImage($event)"></div>
            <div class="video-wrap" v-if="videoId !== ''" :key="key">
                <phrase-query-video :video-id="videoId" :token="token" ref="PhraseQueryVideo" />
            </div>
            <phrase-query-suggest :current-subject="currentSubject" @on-scroll="onScroll" />
        </div>
        <!-- 展示大图 -->
        <div class="mask" v-if="isShowMask" @click.stop="closeWrap">
            <i class="el-icon-close" @click.stop="closeWrap"></i>
            <img ref="image" :style="imageStyle" @click.stop :src="imageUrl" alt />
        </div>
    </div>
</template>

<script src="./index.js"></script>

<style scoped lang="less">
@import url('./index.less');
</style>
