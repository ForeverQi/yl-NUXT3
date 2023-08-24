<script lang="jsx">
import { mapState, mapMutations } from 'vuex';
import '@/api/cc/api..query-elective-show-status.js';
import '@/api/cc/api..alter-elective-status.js';
export default {
    name: 'CourseTabView',
    components: {
        vFragment: {
            functional: true,
            render(h, context) {
                const slots = context.slots();
                return Object.keys(slots).map((k) => {
                    return slots[k];
                });
            },
        },
    },
    props: {
        selectIndex: {
            type: Number,
            default: 0,
        },
        tabList: {
            type: Array,
            default() {
                return ['全部', '未学完', '已学完'];
            },
        },
    },
    data() {
        return {
            scrollBarLeft: 0,
            barFirstTimeMove: true,
            duration: 0.2,
            electiveShowStatus: '',
            isFirst: false,
        };
    },
    computed: {
        ...mapState('class-info/info', {
            classId: 'classId', // 班型ID
            projectName: 'projectName',
            projectId: 'projectId',
        }),
        ...mapState('class-info/subject', {
            currentSubjectId: 'currentSubjectId',
        }),
        tabBarStyle() {
            return {
                transform: `translate(${this.scrollBarLeft}px, -100%)`,
                'transition-duration': `${this.barFirstTimeMove ? 0 : this.duration}s`,
                opacity: this.barFirstTimeMove ? 0 : 1,
            };
        },
    },
    watch: {
        selectIndex: {
            immediate: true,
            handler() {
                // 视图更新后再执行移动操作
                this.$nextTick(() => {
                    this.scrollByIndex();
                });
            },
        },
        classId: {
            immediate: true,
            handler() {
                if (this.currentSubjectId) {
                    this.init();
                }
            },
        },
        currentSubjectId: {
            immediate: true,
            handler(val) {
                if (val && this.classId && !this.isFirst) {
                    this.init();
                }
            },
        },
    },
    methods: {
        ...mapMutations('class-info/info', {
            setClassInfo: 'setClassInfo',
        }),
        init() {
            this.getData();
        },
        getData() {
            const params = {
                url: 'cc/query-elective-show-status',
                params: {
                    classId: this.classId,
                },
                isCustom: false,
            };
            this.isFirst = true;
            this.httpClient(params).then((res) => {
                this.electiveShowStatus = res;
                this.setClassInfo({
                    electiveShowStatus: res,
                });
                this.$emit('ready');
            });
        },
        scrollByIndex() {
            if (!this.$refs.wrap) {
                return;
            }
            const list = this.$refs.wrap.querySelectorAll('.item');
            if (list.length === 0) {
                return;
            }
            // 计算底线移动位置
            const item = list[this.selectIndex];
            const offsetLeft = item.offsetLeft + item.offsetWidth / 2 - this.$refs.bar.offsetWidth / 2;

            this.scrollBarLeft = offsetLeft;

            if (this.barFirstTimeMove) {
                setTimeout(() => {
                    this.barFirstTimeMove = false;
                }, 100);
            }
        },
        changeIndex(index, name) {
            const data = {
                index,
                name,
            };
            this.$emit('changeIndex', data);
        },
        changeElectiveStatus() {
            const data = {
                college_name: '',
                page_name: '学习中心-课程详情',
                project_name: this.projectName ? this.projectName : this.projectId,
            };
            this.$yiguan.learningCenter('web_learning_center_hide_electives', data);

            const params = {
                url: 'cc/alter-elective-status',
                params: {
                    classId: this.classId,
                    electiveStatus: this.electiveShowStatus === 'Y' ? 'N' : 'Y',
                },
                isCustom: false,
            };
            this.httpClient(params).then((res) => {
                this.electiveShowStatus = res;
                this.setClassInfo({
                    electiveShowStatus: res,
                });
                this.$emit('resetData');
            });
        },
        httpClient({ url, params = {}, isCustom = false }) {
            return this.$callApi(url, {
                ...params,
            }).then(
                (res) => {
                    return res.getData();
                },
                (err) => {
                    if (!isCustom) this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                }
            );
        },
    },
    render() {
        return (
            <div class="top" ref="wrap">
                {this.tabList.map((item, index) => {
                    return (
                        <div
                            key={index}
                            class={['item', index == this.selectIndex ? 'this' : '']}
                            onClick={() => {
                                this.changeIndex(index, item);
                            }}
                        >
                            {item}
                        </div>
                    );
                })}
                <div class="bar" ref="bar" style={this.tabBarStyle}></div>
                <div class="status-txt" onClick={this.changeElectiveStatus}>
                    {this.electiveShowStatus === 'Y' ? '隐藏选修课程' : '显示选修课程'}
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.top {
    position: relative;
    height: 60px;
    text-align: center;
    background: #ffffff;
    border-radius: 4px 4px 0px 0px;
    box-shadow: 0px 2px 8px 0px rgba(11, 42, 113, 0.05);
    .bar {
        position: absolute;
        width: 22px;
        height: 4px;
        bottom: 8px;
        opacity: 0;
        background-color: #f8323c;
        transition: all 0.3s ease-in;
    }
    .item {
        display: inline-block;
        margin: 0 43px;
        font-size: 18px;
        line-height: 60px;
        color: #8d90aa;
        cursor: pointer;

        &.this {
            color: #f8323c;
            font-weight: bold;
        }
    }

    .status-txt {
        position: absolute;
        right: 30px;
        top: 24px;
        color: #8d90aa;
        font-size: 12px;
        cursor: pointer;
    }
}
</style>
