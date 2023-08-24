<template>
    <nuxt-child />
</template>
<script>
export default {
    layout: 'aboutLayout',
    head() {
        return this.$head({
            title: '关于我们_点亮职业人生_优路教育',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content:
                        '品牌,优路,优路教育,优路教育网,国家职业资格考试,在线教育,在线培训,职业培训,职业教育,素质提升,技能提升,建筑工程考试,消防考试,一级建造师,二级建造师,一级消防工程师,四级英语,六级英语,大学生,公务员,考公考编,心理咨询,初级会计师,财税金融,医卫康养,教师,法律,学历,学历提升',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路教育，职业教育一站式学习平台，提供专业职业考试培训和职业技能提升培训服务，用知识服务助力个人职业发展。',
                },
            ],
        });
    },
};
</script>
