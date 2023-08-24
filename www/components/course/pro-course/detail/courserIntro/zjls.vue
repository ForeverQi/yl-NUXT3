<template>
    <!-- 主讲老师 -->
    <div class="zjlsInfo">
        <div class="zjls">
            <div class="zjlsTop">
                <span class="topNumber">
                    {{ propsData.num }}
                    <i></i>
                </span>
                <span class="topText">
                    {{ propsData.title }}
                </span>
                <div class="topCornor">
                    <span></span>
                    <span>{{ propsData.subtitle }}</span>
                    <span></span>
                </div>
            </div>
            <div class="zjlsCon">
                <div class="conTop">
                    <p>{{ propsData.title2 }}</p>
                </div>
                <div class="conBody">
                    <div class="img">
                        <img :src="imgSrc | fileParse" />
                    </div>
                    <div class="teacherIntro">
                        <p class="inforp1">{{ imgItem.userName }}</p>
                        <p class="inforp2" v-if="imgItem.projectList && imgItem.projectList.length > 0">
                            主讲:
                            <span v-for="itempro in imgItem.projectList" :key="itempro.a">
                                <span v-for="(itemsub, i) in itempro.subjectList" :key="itemsub.a">
                                    《{{ itemsub.subjectName }}》
                                    <span v-if="i + 1 != itempro.subjectList.length">、</span>
                                </span>
                            </span>
                        </p>
                        <p class="inforp3">
                            {{ imgItem.teacherBrief }}
                        </p>
                    </div>
                    <div style="clear: both"></div>
                    <div class="conFooter">
                        <headBar ref="headBar" :img-list="teacherList" @chooseItem="chooseItem"></headBar>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '@/api/ecs/api.ECS1023.query-teacher-info-batch.js';
import '@/api/bd/api.BD4704.query-project-info.js';
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import headBar from './headBar.vue';
export default {
    name: 'zjls',
    filters: {
        fileParse(url) {
            return niceloo.path.getServerFileViewPath(url);
        },
    },
    components: { headBar },
    props: {
        propsData: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            imgSrc: '',
            imgItem: '',
            teacherList: [],
            projectName: '',
            teacherIds: [],
            projectId: '',
        };
    },
    watch: {
        propsData(val) {
            let vm = this;
            vm.propsData = val;
            vm.getTeacherInfo();
        },
    },
    mounted() {
        let vm = this;
        if (vm.propsData) {
            vm.getTeacherInfo();
        }
        // vm.getProjectInfo();
    },
    methods: {
        chooseItem(item) {
            let vm = this;
            vm.imgItem = item;
            vm.imgSrc = item.teacherImage;
        },
        getTeacherInfo() {
            let vm = this;
            if (vm.propsData && vm.propsData != undefined) {
                vm.propsData.teacherList.forEach((v, i) => {
                    if (v.teacherId && v.teacherId != undefined) {
                        vm.teacherIds.push(v.teacherId);
                    }
                });
            }
            //班型授课讲师列表
            let params = {};
            params.teacherIds = vm.teacherIds.toString();
            if (vm.teacherIds.length > 0) {
                params.projectId = vm.propsData.projectId;

                this.$callApi('ecs/query-teacher-info-batch', {
                    ...params,
                    onsuccess: (res) => {
                        vm.teacherList = res.multiTeacherInfo;
                        vm.getHeaderBar(vm.teacherList[0]);
                    },

                    onerror: niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            }
        },
        getHeaderBar(temp) {
            let vm = this;
            if (vm.$refs.headBar != undefined) {
                vm.$refs.headBar.chooseItem(temp);
            } else {
                setTimeout(() => {
                    vm.getHeaderBar(temp);
                }, 500);
            }
        },
        //获取项目名称
        getProjectInfo() {
            let params = {};
            params.projectSeocode = this.$route.params.projectSeocode;

            this.$callApi('bd/query-project-info', {
                ...params,
                onsuccess: (res) => {
                    this.projectName = res.projectName;
                    this.projectId = res.projectId;
                },

                onerror: niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
    },
};
</script>
<style lang="less" scoped>
.zjlsInfo {
    padding: 30px 0 50px 30px;
    margin: 20px 30px 0 0;
    border-radius: 2px;
    background-color: #fff;
    .zjls {
        text-align: center;
        .zjlsTop {
            color: #333333;
            font-size: 40px;
            font-family: Source Han Sans CN;
            font-weight: 500;
            text-align: center;
            line-height: 92px;
            display: inline-block;
            .topNumber {
                color: #fbf1f2;
                width: 36px;
                height: 36px;
                line-height: 36px;
                display: inline-block;
                background: linear-gradient(0deg, rgba(177, 195, 255, 1) 0%, rgba(97, 111, 235, 1) 100%);
                position: relative;
                margin-right: 20px;
                i {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    background: linear-gradient(0deg, rgba(177, 195, 255, 1) 0%, rgba(97, 111, 235, 1) 100%);
                    opacity: 0.2;
                    position: absolute;
                    bottom: -10px;
                    right: -10px;
                }
            }
            .topText {
                display: inline-block;
                width: 750px;
                vertical-align: top;
                line-height: 60px;
                margin-top: 20px;
                span {
                    font-weight: 700;
                    color: #626feb;
                }
            }
            .topCornor {
                height: 20px;
                display: flex;
                justify-content: center;
                width: 100%;
                span:nth-child(1) {
                    width: 130px;
                    height: 18px;
                    float: left;
                    background: url('./asset/images/cornor_left.png') no-repeat;
                    // margin-right: 20px;
                }
                span:nth-child(2) {
                    font-size: 18px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #666;
                    line-height: 14px;
                    float: left;
                    padding: 0 15px;
                }
                span:nth-child(3) {
                    width: 130px;
                    height: 18px;
                    float: left;
                    background: url('./asset/images/cornor_right.png') no-repeat;
                    // margin-left: 20px;
                }
            }
        }
        .zjlsCon {
            .conTop {
                width: 1008px;
                height: 164px;
                background: url('./asset/images/zjls_top.png') no-repeat -20px 0;
                display: flex;
                justify-content: center;
                align-items: center;
                p {
                    font-size: 22px;
                    font-family: Source Han Sans CN;
                    font-weight: bold;
                    font-style: italic;
                    color: #626feb;
                    line-height: 30px;
                    margin-left: 80px;
                }
            }
            .conBody {
                width: 980px;
                height: 494px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.06);
                margin-top: 20px;
                .img {
                    width: 320px;
                    height: 320px;
                    float: left;
                    margin-top: -15px;
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        background: #eaeefe;
                    }
                }
                .teacherIntro {
                    width: 660px;
                    height: 304px;
                    float: right;
                    padding: 45px 30px 0;
                    box-sizing: border-box;
                    text-align: left;
                    .inforp1 {
                        font-size: 28px;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #333333;
                        line-height: 25px;
                        margin-bottom: 15px;
                    }
                    .inforp2 {
                        font-size: 16px;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #626feb;
                        line-height: 25px;
                    }
                    .inforp3 {
                        margin-top: 15px;
                        font-size: 16px;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #666666;
                        line-height: 24px;
                        letter-spacing: 0.5px;
                    }
                    .infop4 {
                        font-size: 16px;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #666666;
                        letter-spacing: 0.4px;
                        padding: 10px 0;
                    }
                }
                .conFooter {
                    overflow: hidden;
                    // width:980px;
                    padding: 40px 0;
                }
            }
        }
    }
    .start:before {
        content: url('./asset/images/start.png');
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-right: 8px;
    }
}
</style>
