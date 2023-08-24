<template>
    <div v-loading="isLoading" class="school-content-box" ref="content">
        <province-module
            class="school-left-module"
            :class="provinceClass"
            :list="schoolList"
            :active-id="provinceId"
            @province-change="provinceChange"
            ref="province"
        />
        <detail-module class="school-right-module" :class="detailClass" :province-name="provinceName" :school-list="checkedSchool" ref="detail" />
    </div>
</template>

<script>
import '@/api/cp/api.CP0024.query-school-list.js';

import ProvinceModule from '@/www/components/school/province-module.vue';
import DetailModule from '@/www/components/school/detail-module.vue';

export default {
    components: {
        ProvinceModule,
        DetailModule,
    },
    layout: 'new-default',
    data() {
        return {
            isLoading: true,
            provinceId: '', // 选中的省份id
            schoolList: [], // 包含省的完整分校树状列表
            provinceClass: {
                'school-province-aside-static': false,
                'school-province-aside-fixed': false,
            },
            detailClass: {
                'school-province-content-margin': false,
            },
        };
    },
    head() {
        return this.$head({
            title: '分支机构_点亮职业人生_优路教育',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content:
                        '品牌,企业文化,社会责任,企业新闻,分校,全国分校,优路,优路教育,优路教育网,国家职业资格考试,在线教育,在线培训,职业培训,职业教育,素质提升,技能提升,建筑工程考试,消防考试,一级建造师,二级建造师,一级消防工程师,四级英语,六级英语,大学生,公务员,考公考编,心理咨询,初级会计师,财税金融,医卫康养,教师,法律,学历,学历提升',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路教育，职业教育一站式学习平台，提供专业职业考试培训和职业技能提升培训服务，用知识服务助力个人职业发展。',
                },
            ],
        });
    },
    computed: {
        // 当前选中的分校列表
        checkedSchool() {
            const findItem = this.schoolList.find((i) => i.provinceId === this.provinceId);
            return findItem ? findItem.schools : [];
        },
        // 选中的省份名称
        provinceName() {
            const findItem = this.schoolList.find((i) => i.provinceId === this.provinceId);
            return findItem ? findItem.provinceName : '';
        },
    },
    mounted() {
        if (this.$route.params.provinceId) {
            this.provinceId = this.$route.params.provinceId;
        }
        // 查询分校列表
        this.$callApi('cp/query-school-list')
            .then((res) => res.getData())
            .then((data) => {
                this.schoolList = data.map((i) => ({
                    ...i,
                    provinceName: i.provinceName.replace(/省|市|壮族自治区|回族自治区|维吾尔自治区|自治区|特别行政区/, ''),
                }));
                if (!this.provinceId && this.schoolList.length) {
                    this.provinceId = this.schoolList[0].provinceId;
                }
            })
            .finally(() => {
                this.isLoading = false;
            });
        window.addEventListener('scroll', () => {
            const scrollSize = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            // 516 底部高度
            const dmdH = document.documentElement.scrollHeight - scrollSize - 516 - 120;

            if (!this.$refs.province || !this.$refs.province.$el) {
                return;
            }
            if (!this.$refs.detail || !this.$refs.detail.$el) {
                return;
            }
            const dmpH = this.$refs.province.$el.scrollHeight;
            const dmeH = this.$refs.detail.$el.scrollHeight;

            if (dmeH <= dmpH) {
                if (scrollSize > 28) {
                    if (this.dmPad) {
                        this.dmPad.className = 'school-pad';
                    } else {
                        this.dmPad = document.createElement('div');
                        this.dmPad.className = 'school-pad';
                        this.$refs.content.parentElement.insertBefore(this.dmPad, this.$refs.content);
                    }
                } else if (this.dmPad) {
                    this.dmPad.className = 'school-pad-hidden';
                    this.provinceClass['school-province-aside-static'] = false;
                    this.provinceClass['school-province-aside-fixed'] = false;
                    this.detailClass['school-province-content-margin'] = false;
                }
                return;
            }
            // 内容区与左侧导航区均可见时底部对齐
            if (dmdH <= dmpH) {
                console.warn('bbb');
                this.provinceClass['school-province-aside-static'] = true;
                this.provinceClass['school-province-aside-fixed'] = false;
                this.detailClass['school-province-content-margin'] = false;
            } else if (scrollSize > 28) {
                this.provinceClass['school-province-aside-static'] = false;
                this.provinceClass['school-province-aside-fixed'] = true;
                this.detailClass['school-province-content-margin'] = true;

                if (this.dmPad) {
                    this.dmPad.className = 'school-pad';
                } else {
                    this.dmPad = document.createElement('div');
                    this.dmPad.className = 'school-pad';
                    this.$refs.content.parentElement.insertBefore(this.dmPad, this.$refs.content);
                }

                if (this.dmCover) {
                    this.dmCover.className = 'school-cover';
                } else {
                    this.dmCover = document.createElement('div');
                    this.dmCover.className = 'school-cover';
                    this.$refs.content.parentElement.insertBefore(this.dmCover, this.$refs.content);
                }
            } else {
                this.provinceClass['school-province-aside-static'] = false;
                this.provinceClass['school-province-aside-fixed'] = false;
                this.detailClass['school-province-content-margin'] = false;

                if (this.dmPad) {
                    this.dmPad.className = 'school-pad-hidden';
                }
                if (this.dmCover) {
                    this.dmCover.className = 'school-cover-hidden';
                }
            }
        });
    },
    methods: {
        provinceChange(provinceId) {
            this.provinceId = provinceId;
            // 替换url的路径
            history.replaceState('', '', `/school-detail/${provinceId}`);
            if (this.$platform.isIE) {
                window.scroll(0, 0);
            } else {
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                });
            }
        },
    },
};
</script>

<style lang="less">
.school-content-box {
    box-sizing: border-box;
    width: 1200px;
    margin: 20px auto 20px;
    font-size: 0;
}

.school-left-module {
    background-color: white;
    width: 222px;
    display: inline-block;
    vertical-align: top;
    font-size: 16px;
}

.school-right-module {
    width: 962px;
    background-color: white;
    display: inline-block;
    margin-left: 16px;
    font-size: 16px;
    vertical-align: top;
}
.school-province-aside-static {
    vertical-align: bottom;
    position: static;
    top: auto;
    left: auto;
}
.school-province-aside-fixed {
    vertical-align: auto;
    position: fixed;
    top: 100px;
    left: auto;
    z-index: 1;
}

.school-province-content-margin {
    margin-left: 238px;
}

.school-pad {
    height: 28px;
    display: block;
}

.school-pad-hidden {
    height: 28px;
    display: none;
}

.school-cover {
    height: 20px;
    z-index: 20;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background-color: #f5f5f5;
    display: block;
}
.school-cover-hidden {
    display: none;
}
</style>
