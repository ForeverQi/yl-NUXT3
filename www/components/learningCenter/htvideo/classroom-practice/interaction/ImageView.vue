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
                <div class="line-img" @click="maxShowPic">
                    <img class="img" :src="showImagePic" />
                </div>
            </div>
        </div>
        <course-image-preview :pic="showImagePic" v-if="showMaxPic" @close="showMaxPic = false" />
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
                };
            },
        },
    },
    data() {
        return {
            defaultPic: '../../assets/images/default.png',
            showImagePic: '',
            showMaxPic: false, // 显示大图展示PIC
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.showImagePic = this.$urlUtils.getViewUrl(this.itemData.filePath);
        },
        maxShowPic() {
            this.showMaxPic = true;
        },
    },
};
</script>
<style lang="less" scoped>
.question-wrap {
    padding-top: 24px;
    display: flex;

    .logo {
        width: 36px;
        height: 36px;
        margin-right: 12px;
        .img {
            width: 100%;
            height: 100%;
        }
    }

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

            .wrap {
                color: #ffffff;
            }
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
            width: 240px;
            height: 150px;
            border-radius: 6px;
            overflow: hidden;
            cursor: pointer;

            .img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
