<template>
    <div class="question-wrap" :class="{ student: role === 'student' }">
        <div class="logo">
            <img src="../asset/images/teacher.png" v-if="role === 'teacher'" class="img" />
            <img src="../asset/images/zj.png" v-else-if="role === 'assistent'" class="img" />
            <img src="../asset/images/student.png" v-else-if="role === 'student'" class="img" />
        </div>
        <div class="content">
            <div class="name">
                {{ role === 'student' ? '' : itemData.roleName }}
            </div>
            <div class="wrap">
                <div class="line-img" @click="showPlay">
                    <img class="img" src="../asset/images/default-video.png" />
                    <span class="mask">{{ showTotalSecond }}</span>
                </div>
            </div>
        </div>
        <course-image-preview :show-tools="false" type="video" :pic="showImagePic" v-if="showMaxVideo" @close="showMaxVideo = false" />
    </div>
</template>
<script>
import CourseImagePreview from '../CourseImagePreview.vue';

export default {
    components: {
        CourseImagePreview,
    },
    props: {
        role: {
            type: String,
            default: 'teacher',
        },
        itemData: {
            type: Object,
            default() {
                return {
                    filePath: '',
                    roleName: '',
                    mediaDuration: 0,
                };
            },
        },
    },
    data() {
        return {
            showImagePic: '',
            showMaxVideo: false,
        };
    },
    computed: {
        showTotalSecond() {
            let one = parseInt(this.itemData.mediaDuration / 60);
            let two = this.itemData.mediaDuration % 60;
            return `${one < 10 ? `0${one}` : `${one}`}:${two < 10 ? `0${two}` : `${two}`}`;
        },
    },
    methods: {
        showPlay() {
            this.showImagePic = this.$urlUtils.getViewUrl(this.itemData.filePath);
            this.showMaxVideo = true;
        },
    },
};
</script>
<style lang="less" scoped>
.question-wrap {
    padding-top: 24px;
    display: flex;

    &.student {
        flex-direction: row-reverse;

        .logo {
            margin-right: 0;
            margin-left: 12px;
        }
        .content {
            .name {
                text-align: right;
            }
        }
    }

    .logo {
        width: 36px;
        height: 36px;
        margin-right: 12px;
        .img {
            width: 100%;
            height: 100%;
        }
    }

    .content {
        .name {
            font-size: 12px;
            color: #fff;
            text-align: left;
            line-height: 16px;
            margin-bottom: 5px;
            margin-top: 5px;
            padding-left: 3px;
        }
    }
    .wrap {
        position: relative;
        max-width: 580px;
        font-size: 14px;
        text-align: left;
        color: #3a3d4b;
        line-height: 22px;
        border-radius: 4px;
        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, 0.02);
        box-shadow: 0px 2px 4px 1px rgba(11, 42, 113, 0.05);

        .line-img {
            position: relative;
            width: 224px;
            height: 126px;
            border-radius: 6px;
            overflow: hidden;
            cursor: pointer;

            .img {
                width: 100%;
                height: 100%;
            }

            .mask {
                position: absolute;
                bottom: 2px;
                right: 9px;
                color: #ffffff;
                font-size: 12px;
            }
        }
    }
}
</style>
