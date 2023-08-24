<template>
    <div v-if="isLoaded">
        <template v-if="noPaperTip == 0">
            <!--试题测试提示块-->
            <test-tips :paper="paper" @startTest="startTest" v-if="isTips"></test-tips>
            <!--试题测试块-->
            <do-question :paper-id="paperId" @submit="submit" v-if="isTest"></do-question>
            <!--测试结果-->
            <test-result :paper-id="paperId" :answersheet-id="answersheetId" v-if="isSubmit"></test-result>
        </template>
        <template v-if="noPaperTip == 1">
            <!--试题异常提示块-->
            <no-paper-tip :paper="paper"></no-paper-tip>
        </template>
    </div>
</template>

<script>
import TestTips from './testTips';
import DoQuestion from './doQuestion';
import TestResult from './testResult';
import noPaperTip from './noPaperTip';
import PaperService from '~/www/common/paper-class/PaperService.js';

export default {
    name: 'test',
    components: { TestTips, DoQuestion, TestResult, noPaperTip },
    layout: 'nullLayout',
    data() {
        return {
            isLoaded: true,
            paper: null,
            isTips: true,
            isTest: false,
            isSubmit: false,
            paperId: 'PAPER20190830010000000038', //PAPER20190831020000000013,PAPER20190831020000000014，PAPER20190831020000000015,PAPER20190831020000000006,PAPER20190830010000000026,PAPER20190830010000000038
            answersheetId: '',
            noPaperTip: -1,
            loading: null,
        };
    },
    mounted() {
        var vm = this;

        if (typeof window.addEventListener != 'undefined') {
            //for ie9+
            window.addEventListener(
                'message',
                function (e) {
                    //console.log(e);//{func,args}
                    if (e.data.type == 'webpackOk') return;
                    if (window[e.data.func] != undefined) {
                        window[e.data.func].apply(this, e.data.args ? [e.data.args] : []);
                    }
                },
                false
            );
        } else if (typeof window.attachEvent != 'undefined') {
            window.attachEvent('onmessage', function (e) {
                //console.log(e);//{func,args}
                if (e.data.type == 'webpackOk') return;
                if (window[e.data.func] != undefined) {
                    window[e.data.func].apply(this, e.data.args ? [e.data.args] : []);
                }
            });
        }
        vm.sendMessage('loginedo');
        /*window.loginedo = function (data) {
            User.setToken(data.token);
            User.setUser(data.UserInfo);
        };*/
        window.changePaperId = function (paperId) {
            vm.paperId = paperId;
            //初始化
            vm.init(paperId);
            vm.sendMessage('question_loaded');
        };

        //初始化数据
        /*User.setToken('92DEE818A1A146B0A7B08A552D07A425');
            vm.init(vm.paperId);*/
    },
    methods: {
        //发送消息
        sendMessage(func, args) {
            window.parent.postMessage(
                {
                    func,
                    args,
                },
                '*'
            );
        },
        //初始化
        init(paperId) {
            var vm = this;

            vm.isTips = true;
            vm.isTest = false;
            vm.isSubmit = false;

            let paper = null; //试卷对象

            /*Mask.showLoading();*/
            vm.loading = vm.$baseUI.loading();

            /*let paperService = PaperClass.initPaper({
                paperId,
                answersheetId,
                service: window,
                options: {
                    sourceType: 'YOULU',
                },
            });*/

            PaperService.initPaper({
                paperId,
            }).then((paperService) => {
                paper = paperService.getInstance();

                //---------------------paperService-----------------------//
                paperService
                    .loadBaseInfo(function () {
                        //加载试卷详情
                    })
                    .loadQuestions(function () {
                        //加载试卷所有试题
                        paper.getQuestions();
                    })
                    .end(() => {
                        console.log('8758768598798547');
                        /*Mask.hideLoading();*/
                        vm.loading.close();
                        vm.$baseUI.loading.closeAll();
                        vm.paper = paper;
                        if (vm.paper.info.paperAvlstatus == 'N' || vm.paper.info.paperDelstatus == 'Y' || vm.paper.info.questionTotal <= 0) {
                            vm.noPaperTip = 1;
                        } else {
                            vm.noPaperTip = 0;
                        }
                        vm.isLoaded = true;
                    })
                    .catch(() => {
                        //{msg}
                        vm.loading.close();
                        /*Mask.hideLoading();*/
                        vm.$baseUI.loading.closeAll();
                    });
            });
        },
        //开始测试
        startTest() {
            this.isTips = false;
            this.isTest = true;
        },
        //提交答案
        submit(paper) {
            var vm = this;
            console.log(paper, 134);
            paper.submit(function () {
                vm.answersheetId = paper.answersheetId;
                vm.isTips = false;
                vm.isTest = false;
                vm.isSubmit = true;
            });
        },
    },
};
</script>

<style scoped>
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video,
input {
    box-sizing: border-box;
}
</style>
