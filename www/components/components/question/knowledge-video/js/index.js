import Knowledge from '../knowledge.vue';
import questionMix from './question';
import knowledgeMix from './knowledge';
import PopupBase from '@/www/components/components/popup-base/index.vue';
import QuestionModel from '@/www/components/components/question/question-model.vue';
import PracticeReportModel from '@/www/components/learningCenter/practice-report-model/index.vue';
export default {
    name: 'knowledge-video',
    components: { PopupBase, Knowledge, QuestionModel, PracticeReportModel },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        //knowledge 展示知识讲解 question 展示做题
        type: {
            type: String,
            default: '',
        },
        //knowledgeId 当前知识点id
        value: {
            type: String,
            required: true,
        },
        list: {
            type: Array,
            default: () => [],
        },
        //是否显示下一个知识点入口（showNext为true并且存在下一个知识点）
        showNext: {
            type: Boolean,
            default: false,
        },
        //班级科目-做题使用
        subjectId: {
            type: String,
            default: '',
        },
        //班级标识-做题使用
        classId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            showType: 'knowledge',
            loading: false,
            currentKnowledge: {}, //当前知识点
            nextKnowledge: {}, //下一个知识点,
            chapterCatalog: [],
            reportDialog: {
                isShow: false,
                answersheetId: '',
            },
        };
    },
    watch: {
        show: {
            handler(val) {
                this.$nextTick(() => {
                    if (this.$refs.popupBase) {
                        this.$refs.popupBase.show = val;
                    }
                });
                let body = document.getElementsByTagName('body');
                if (val) {
                    body[0].style.height = '100vh';
                    body[0].style.overflow = 'hidden';
                } else {
                    body[0].style.height = 'auto';
                    body[0].style.overflow = 'visible';
                }
                if (val) {
                    this.current = 1; //设置答题序号从1开始
                    this.showType = this.type || 'knowledge';
                    this.currentKnowledgeId = this.value;
                    this.getKnowledge();
                }
            },
            immediate: true,
        },
        // 考点考察列表分页数据改变后，获取下一个知识点
        list: {
            handler(val) {
                if (this.showNext) {
                    const index = this.list.findIndex((knowledge) => knowledge.knowledgeId === this.currentKnowledgeId);
                    // 取下一个知识点
                    this.nextKnowledge = index !== this.list.length - 1 ? this.list[index + 1] : {};
                }
            },
            deep: true,
        },
    },
    mixins: [questionMix, knowledgeMix],
    methods: {
        onClose() {
            //做题时，直接点关闭按钮，提示并交卷-关弹窗
            if (this.showType === 'question') {
                this.$refs.questionModelRef && this.$refs.questionModelRef.onSave(true);
            } else {
                this.close();
            }
        },
        close() {
            let body = document.getElementsByTagName('body');
            body[0].style.height = 'auto';
            body[0].style.overflow = 'visible';
            this.$emit('update:show', false);
            this.$refs.popupBase.show = false;
        },
        // 正常提交试卷回调
        postPaper(answersheetId) {
            this.$emit('post-success', answersheetId);
            this.close();
            this.reportDialog = {
                isShow: true,
                answersheetId,
            };
        },
        // 退出试卷回调
        closePaper() {
            this.close();
        },
        postPaperErr() {
            // this.close();
        },
        //关闭做题练习的练习报告回调
        closeReport() {
            this.$emit('close-report');
        },
        //下一个知识点
        toNext() {
            //如果视频播放完成，切换下一个知识点时。重置视频播放完成状态
            if (this.$refs.knowledgeRef && this.$refs.knowledgeRef.isFinished) {
                this.$refs.knowledgeRef.isFinished = false;
            }
            this.currentKnowledgeId = this.nextKnowledge.knowledgeId;
            this.$emit('input', this.currentKnowledgeId);
            this.$emit('change', this.currentKnowledgeId);
            this.showType = 'knowledge';
            this.getKnowledge();
        },
        //精准练习
        onTestPaper() {
            this.$emit('click-question-button', this.currentKnowledgeId);
            this.showType = 'question';
        },
        //获取当前知识点和下一个知识点对象
        getKnowledge() {
            const index = this.list.findIndex((knowledge) => knowledge.knowledgeId === this.currentKnowledgeId);
            this.currentKnowledge = index !== -1 ? this.list[index] : {};
            // 取下一个知识点
            this.nextKnowledge = index !== this.list.length - 1 ? this.list[index + 1] : {};
            if (this.showType === 'knowledge') {
                this.queryKnowledgeChapterNames();
            }
        },
    },
};
