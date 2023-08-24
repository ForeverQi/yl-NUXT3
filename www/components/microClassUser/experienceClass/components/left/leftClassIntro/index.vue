<!--
 * @Author: Li
 * @Date: 2022-03-08 09:22:28
 * @LastEditors: Li
 * @LastEditTime: 2022-03-24 16:13:36
 * @Description: 
-->
<template>
    <div class="class-introduce" id="tabDiv">
        <template v-for="(item, index) in courseintroduceDetail">
            <img v-if="item.introduceType === 'img'" :src="item.src" class="mb16 img" :key="index" />
            <p v-else-if="item.introduceType === 'textImg'" v-html="item.content" class="mb16" :key="index"></p>
        </template>
    </div>
</template>
<!--
*introduceType: textImg
*introduceType: teacherInfo
*introduceType: img
-->
<script>
import { parse } from 'html5parser';

export default {
    name: 'leftClassIntroModel',
    inject: ['experienceClass'],
    computed: {
        courseintroduceDetail() {
            try {
                const ret = JSON.parse(this.experienceClass.courseintroduceDetail);
                if (Array.isArray(ret)) {
                    ret.forEach((item) => {
                        if (item.introduceType === 'teacherInfo') {
                            item.teacherImage = `${this.$urlUtils.getViewUrl(item.teacherImage)}`;
                        } else if (item.introduceType === 'img') {
                            item.src = `${this.$urlUtils.getViewUrl(item.src)}`;
                        } else if (item.introduceType === 'textImg') {
                            const nodeArr = this.$html5parserUtil.rewriteNode(parse(item.content));
                            item.content = this.$html5parserUtil.createHTML(nodeArr);
                        }
                    });
                }
                console.error('leftClassIntro', ret);
                return ret.filter((item) => {
                    return item.introduceType === 'textImg' || item.introduceType === 'img';
                });
            } catch (err) {
                console.error(err.message);
                return [];
            }
        },
    },
};
</script>
<style lang="less" scoped>
.class-introduce {
    min-height: 500px;
    img {
        width: 100%;
        height: auto;
    }
    .mb16 {
        margin-bottom: 16px;
    }
    .img {
        border-radius: 5px;
    }
}
</style>
