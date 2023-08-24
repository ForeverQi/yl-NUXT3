<template>
    <!-- 课程介绍 -->
    <div class="xugsInfo">
        <!-- 学员故事 -->
        <div class="xugs">
            <div class="xugsTop">
                <span>优路学员故事</span>
            </div>
            <div class="xugsContent" v-if="studentList.length != 0">
                <ul class="ul1">
                    <li v-if="studentList[0]">
                        <p>{{ studentList[0].virtualstudentStorytitle }}</p>
                        <div class="personelInfo">
                            <span>
                                <i></i>
                                {{ studentList[0].virtualstudentName }}
                            </span>
                            <span>
                                <i></i>
                                {{ studentList[0].classtypeName }}
                            </span>
                            <span>
                                <i></i>
                                通关时间：{{ studentList[0].virtualstudentPasseddate | yearDate }}
                            </span>
                            <span>
                                <i></i>
                                {{ studentList[0].virtualstudentJob }}
                            </span>
                        </div>
                        <span class="ljtdxxgs" @click="gsContentShow('gsContent_li1')"></span>
                    </li>
                    <li v-if="studentList[1]">
                        <p>{{ studentList[1].virtualstudentStorytitle }}</p>
                        <div class="personelInfo">
                            <span>
                                <i></i>
                                {{ studentList[1].virtualstudentName }}
                            </span>
                            <span>
                                <i></i>
                                {{ studentList[1].classtypeName }}
                            </span>
                            <span>
                                <i></i>
                                通关时间：{{ studentList[1].virtualstudentPasseddate | yearDate }}
                            </span>
                            <span>
                                <i></i>
                                {{ studentList[1].virtualstudentJob }}
                            </span>
                        </div>
                        <span class="ljtdxxgs" @click="gsContentShow('gsContent_li3')"></span>
                    </li>
                    <div style="clear: both"></div>
                </ul>
                <div class="gsContent_li1" v-if="gsContent_li1">
                    <i class="arrowpoint_left"></i>
                    <p class="storyTitle" v-html="studentList[0].virtualstudentStorytitle"></p>
                    <div style="margin-bottom: 60px; text-align: left">
                        <vb-parse :article="studentList[0].virtualstudentStory"></vb-parse>
                        <!-- <p v-html="studentList[0].virtualstudentStory"></p> -->
                    </div>
                    <div class="xygssq" @click="gsContent_li1 = false">
                        <span></span>
                        <span>收起故事</span>
                    </div>
                </div>
                <div class="gsContent_li3" v-if="gsContent_li3">
                    <i class="arrowpoint_right"></i>
                    <p class="storyTitle" v-html="studentList[1].virtualstudentStorytitle"></p>
                    <div style="margin-bottom: 60px; text-align: left">
                        <vb-parse :article="studentList[1].virtualstudentStory"></vb-parse>
                        <!-- <p v-html="studentList[1].virtualstudentStory"></p> -->
                    </div>
                    <div class="xygssq" @click="gsContent_li3 = false">
                        <span></span>
                        <span>收起故事</span>
                    </div>
                </div>
                <ul class="ul2">
                    <li v-if="studentList[2]">
                        <p>{{ studentList[2].virtualstudentStorytitle }}</p>
                        <div class="personelInfo">
                            <span>
                                <i></i>
                                {{ studentList[2].virtualstudentName }}
                            </span>
                            <span>
                                <i></i>
                                {{ studentList[2].classtypeName }}
                            </span>
                            <span>
                                <i></i>
                                通关时间：{{ studentList[2].virtualstudentPasseddate | yearDate }}
                            </span>
                            <span>
                                <i></i>
                                {{ studentList[2].virtualstudentJob }}
                            </span>
                        </div>
                        <span class="xxlj" @click="gsContentShow('gsContent_li2')"></span>
                    </li>
                    <li v-if="studentList[3]">
                        <p>{{ studentList[3].virtualstudentStorytitle }}</p>
                        <div class="personelInfo">
                            <span>
                                <i></i>
                                {{ studentList[3].virtualstudentName }}
                            </span>
                            <span>
                                <i></i>
                                {{ studentList[3].classtypeName }}
                            </span>
                            <span>
                                <i></i>
                                通关时间：{{ studentList[3].virtualstudentPasseddate | yearDate }}
                            </span>
                            <span>
                                <i></i>
                                {{ studentList[3].virtualstudentJob }}
                            </span>
                        </div>
                        <span class="xxlj" @click="gsContentShow('gsContent_li4')"></span>
                    </li>
                    <div style="clear: both"></div>
                </ul>
                <div class="gsContent_li2" v-if="gsContent_li2">
                    <i class="arrowpoint_left"></i>
                    <div class="xygsInfo">
                        <div class="infoTop">
                            <div class="img">
                                <img :src="studentInfo.virtualstudentHeadurl | fileParse" />
                            </div>
                            <div class="topText">
                                <span>{{ studentInfo.classtypeName }}</span>
                                <span>学习排名：{{ studentInfo.virtualstudentRanking }}</span>
                            </div>
                            <div class="bottomText">
                                <span>{{ studentInfo.virtualstudentName }}</span>
                                <span>{{ studentInfo.virtualstudentTags }}</span>
                            </div>
                        </div>
                        <div class="infoContent">
                            <ul>
                                <li v-for="item in vsexperiences" :key="item.a">
                                    <span class="date">{{ item.vsexperienceDate | monthDate }}</span>
                                    <span class="lineS"><span class="cirle"></span></span>
                                    <span class="lineText">{{ item.vsexperienceStory }}</span>
                                    <div style="clear: both"></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="xygssq" @click="gsContent_li2 = false">
                        <span></span>
                        <span>收起路径</span>
                    </div>
                </div>
                <div class="gsContent_li4" v-if="gsContent_li4">
                    <i class="arrowpoint_right"></i>
                    <div class="xygsInfo">
                        <div class="infoTop">
                            <div class="img">
                                <img :src="studentInfo.virtualstudentHeadurl | fileParse" />
                            </div>
                            <div class="topText">
                                <span>{{ studentInfo.classtypeName }}</span>
                                <span>学习排名：{{ studentInfo.virtualstudentRanking }}</span>
                            </div>
                            <div class="bottomText">
                                <span>{{ studentInfo.virtualstudentName }}</span>
                                <span>{{ studentInfo.virtualstudentTags }}</span>
                            </div>
                        </div>
                        <div class="infoContent">
                            <ul>
                                <li v-for="item in vsexperiences" :key="item.a">
                                    <span class="date">{{ item.vsexperienceDate | monthDate }}</span>
                                    <span class="lineS"><span class="cirle"></span></span>
                                    <span class="lineText">{{ item.vsexperienceStory }}</span>
                                    <div style="clear: both"></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="xygssq" @click="gsContent_li4 = false">
                        <span></span>
                        <span>收起路径</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '@/api/bd/api.BD4704.query-project-info.js';
import '@/api/cc/api.CC3010.query-virtualstudent-list.js';
import '@/api/cc/api.CC3008.query-virtualstudent-info.js';
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
export default {
    name: 'xugsInfo',
    components: {},
    filters: {
        fileParse(url) {
            return niceloo.path.getServerFileViewPath(url);
        },
        //转换时间格式
        yearDate(value) {
            let date = new Date(value);
            let year = date.getFullYear() + '年';
            let month = date.getMonth() + 1 + '月';
            return year + month;
        },
        monthDate(value) {
            let date = new Date(value);
            let month = date.getMonth() + 1 + '月';
            let day = date.getDate() + '日';
            return month + day;
        },
    },
    data() {
        return {
            gsContent_li1: false,
            gsContent_li2: false,
            gsContent_li3: false,
            gsContent_li4: false,
            vsexperiences: [],
            studentList: [],
            studentInfo: '',
        };
    },
    mounted() {
        this.getProjectInfo();
    },
    methods: {
        gsContentShow(gsContentLi) {
            let vm = this;
            let n = 3;
            for (let i = 0; i < n; i++) {
                vm['gsContentLi' + (i + 1)] = false;
            }
            vm.gsContent_li4 = false;
            vm[gsContentLi] = true;
            if (gsContentLi == 'gsContent_li2' && vm.studentList[2]) {
                vm.getVirtualstudentInfo(vm.studentList[2].virtualstudentId);
            }
            if (gsContentLi == 'gsContent_li4' && vm.studentList[3]) {
                vm.getVirtualstudentInfo(vm.studentList[3].virtualstudentId);
            }
        },
        //虚拟学员列表
        getVirtualstudentList(projectId) {
            let vm = this;
            let params = {};
            params.projectId = projectId;

            this.$callApi('cc/query-virtualstudent-list', {
                ...params,
                onsuccess: (res) => {
                    vm.studentList = res.data;
                    if (vm.studentList[0] != undefined && vm.studentList[0].virtualstudentStory != undefined) {
                        vm.studentList[0].virtualstudentStory = vm.studentList[0].virtualstudentStory.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>');
                    }
                    if (vm.studentList[1] != undefined && vm.studentList[1].virtualstudentStory != undefined) {
                        vm.studentList[1].virtualstudentStory = vm.studentList[1].virtualstudentStory.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>');
                    }
                },

                onerror: niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        //获取项目名称
        getProjectInfo() {
            let params = {};
            let vm = this;
            params.projectSeocode = this.$route.params.projectSeocode;

            this.$callApi('bd/query-project-info', {
                ...params,
                onsuccess: (res) => {
                    vm.projectId = res.projectId;
                    vm.getVirtualstudentList(res.projectId);
                },
                onerror: niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        //获取学习路径
        getVirtualstudentInfo(virtualstudentId) {
            let params = {};
            let vm = this;
            params.virtualstudentId = virtualstudentId;
            this.$callApi('cc/query-virtualstudent-info', {
                ...params,
                onsuccess: (res) => {
                    vm.studentInfo = res;
                    vm.vsexperiences = res.vsexperiences;
                },

                onerror: niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
    },
};
</script>
<style lang="less" scoped>
.xugsInfo {
    padding: 50px 0 50px 30px;
    margin: 20px 30px 0 0;
    border-radius: 2px;
    background-color: #fff;
    .xugs {
        text-align: center;
        .xugsTop {
            color: #333333;
            font-size: 40px;
            font-family: Source Han Sans CN;
            font-weight: 500;
            text-align: center;
            line-height: 92px;
            display: inline-block;
            height: 92px;
            width: 976px;
            background: url('./asset/images/header_decorate.png') no-repeat;
            background-size: 100% 100%;
            span:nth-child(1) {
                display: block;
            }
        }
        .xugsContent {
            margin-top: 40px;
            .storyTitle {
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
                line-height: 28px;
            }
            .ul1,
            .ul2 {
                overflow: hidden;
                li {
                    box-sizing: border-box;
                    padding: 30px 40px 5px;
                    font-family: Source Han Sans CN;
                    height: 260px;
                    position: relative;
                    p {
                        color: #333;
                        font-size: 20px;
                        font-weight: 500;
                        line-height: 28px;
                        text-align: left;
                    }
                    .personelInfo {
                        text-align: left;
                        position: absolute;
                        bottom: 30px;
                        span {
                            display: block;
                            color: #666;
                            font-size: 14px;
                            font-family: Source Han Sans CN;
                            line-height: 26px;
                            vertical-align: middle;
                            i {
                                display: inline-block;
                                width: 16px;
                                height: 16px;
                                margin-right: 7px;
                            }
                        }
                        span:nth-child(1) {
                            i {
                                background: url('./asset/images/header_tip.png') no-repeat;
                            }
                        }
                        span:nth-child(2) {
                            i {
                                background: url('./asset/images/class_tip.png') no-repeat;
                            }
                        }
                        span:nth-child(3) {
                            i {
                                background: url('./asset/images/time_tip.png') no-repeat;
                            }
                        }
                        span:nth-child(4) {
                            i {
                                background: url('./asset/images/zw_tip.png') no-repeat;
                            }
                        }
                    }

                    .ljtdxxgs {
                        display: inline-block;
                        width: 184px;
                        height: 50px;
                        position: absolute;
                        bottom: 20px;
                        right: 0;
                        background: url('./asset/images/ljtdxxgs.png') no-repeat;
                        cursor: pointer;
                    }
                    .xxlj {
                        display: inline-block;
                        width: 184px;
                        height: 50px;
                        position: absolute;
                        bottom: 20px;
                        right: 0;
                        background: url('./asset/images/xxlj.png') no-repeat;
                        cursor: pointer;
                    }
                }
            }
            .ul1 li:nth-child(1) {
                width: 530px;
                float: left;
            }
            .ul1 li:nth-child(2) {
                width: 436px;
                float: right;
            }
            .ul2 li:nth-child(1) {
                width: 436px;
                float: left;
            }
            .ul2 li:nth-child(2) {
                width: 530px;
                float: right;
            }
            .arrowpoint_left {
                display: inline-block;
                width: 0px;
                height: 0px;
                border-top: 8px solid transparent;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-bottom: 8px solid #7b8af1;
                position: absolute;
                left: 50px;
                top: -16px;
            }
            .arrowpoint_right {
                display: inline-block;
                width: 0px;
                height: 0px;
                border-top: 8px solid transparent;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-bottom: 8px solid #7b8af1;
                position: absolute;
                right: 50px;
                top: -16px;
            }
            .gsContent_li1,
            .gsContent_li3 {
                // width: 999px;
                // height:1020px;
                width: 100%;
                // background: url('./asset/images/left_contetn.png') no-repeat;
                // background-size: 100% 100%;
                background: rgba(255, 255, 255, 1);
                border: 2px dashed rgba(123, 138, 241, 1);
                border-radius: 6px;
                box-sizing: border-box;
                padding: 40px;
                position: relative;
            }
            .gsContent_li2,
            .gsContent_li4 {
                // width: 999px;
                // height:1558px;
                width: 100%;
                // background: url('./asset/images/right_content.png') no-repeat;
                // background-size: 100% 100%;
                background: rgba(255, 255, 255, 1);
                border: 2px dashed rgba(123, 138, 241, 1);
                border-radius: 6px;
                padding: 40px 0px;
                position: relative;
                box-sizing: border-box;
                .xygsInfo {
                    .infoTop {
                        width: 100%;
                        height: 184px;
                        background: url('./asset/images/xygs_bgc.png') no-repeat;
                        background-size: 100% 100%;
                        text-align: center;
                        position: relative;

                        .img {
                            width: 120px;
                            height: 120px;
                            border-radius: 50%;
                            margin-top: 11px;
                            position: absolute;
                            left: 50%;
                            margin-left: -56px;
                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                                border-radius: 50%;
                            }
                        }
                        .topText {
                            // overflow: hidden;
                            span {
                                font-size: 16px;
                                font-family: Microsoft YaHei;
                                font-weight: 400;
                                color: #fff;
                                margin-top: 50px;
                            }
                            span:nth-child(1) {
                                float: left;
                                margin-left: 30px;
                            }
                            span:nth-child(2) {
                                float: right;
                                margin-right: 30px;
                            }
                        }
                        .bottomText {
                            position: absolute;
                            left: 50%;
                            margin-left: -8%;
                            bottom: 12px;
                            span {
                                display: block;
                                font-family: Microsoft YaHei;
                            }
                            span:nth-child(1) {
                                font-size: 16px;
                                font-weight: 400;
                                color: #fff;
                                line-height: 30px;
                            }
                            span:nth-child(2) {
                                font-size: 14px;
                                font-weight: bold;
                                color: #000;
                                opacity: 0.5;
                            }
                        }
                    }
                    .infoContent {
                        height: 100%;
                        padding: 0px 40px;
                        text-align: left;
                        margin-bottom: 80px;
                        ul {
                            li {
                                span {
                                    font-size: 16px;
                                    font-family: Microsoft YaHei;
                                    font-weight: 400;
                                    color: #666;
                                    float: left;
                                    line-height: 25px;
                                }
                                .date {
                                    width: 70px;
                                    margin-top: 46px;
                                }
                                .lineS {
                                    display: inline-block;
                                    width: 2px;
                                    height: 49px;
                                    background: #b6c3fc;
                                    margin: 0 25px;
                                }
                                .lineText {
                                    width: 770px;
                                    position: relative;
                                    top: 46px;
                                }
                                .cirle {
                                    display: inline-block;
                                    width: 16px;
                                    height: 16px;
                                    background: rgba(157, 175, 251, 1);
                                    border: 2px solid rgba(255, 255, 255, 1);
                                    box-shadow: 0px 4px 8px 0px rgba(157, 175, 251, 0.38);
                                    border-radius: 50%;
                                    // background:url('../../asset/images/circle.png') no-repeat;
                                    // background-size: 100% 100%;
                                    margin-top: 50px;
                                    margin-left: -9px;
                                }
                            }
                        }
                    }
                }
            }
            .xygssq {
                cursor: pointer;
                position: absolute;
                text-align: center;
                bottom: 25px;
                left: 485px;
                span:nth-child(1) {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    background: url('./asset/images/xygssq.png') no-repeat;
                }
                span:nth-child(2) {
                    display: block;
                    color: #7b8af1;
                    font-size: 14px;
                    font-family: Microsoft YaHei;
                    line-height: 27px;
                }
            }
        }
    }
}
</style>
