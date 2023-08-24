<script lang="jsx">
import '@/api/cc/api..query-class-subjects.js';
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'SubjectView',
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
    data() {
        return {
            selectIndex: 0,
            list: [],
            show: true,

            navOffset: 0,
            scrollable: false,
        };
    },
    computed: {
        ...mapState('class-info/info', {
            classId: 'classId', // 班级ID
            showType: 'showType',
            ctapId: 'ctapId',
            pypId: 'pypId',
        }),
        ...mapState('class-info/practice-muster', {
            subjectList: 'subjectList', // 班级ID
        }),
        navStyle() {
            return {
                transform: `translateX(-${this.navOffset}px)`,
            };
        },
    },
    watch: {
        classId: {
            immediate: true,
            handler() {
                if (this.showType === 'class') {
                    this.init();
                }
            },
        },
        subjectList: {
            immediate: true,
            handler() {
                if (this.showType === 'practice') {
                    this.list = this.subjectList;
                    this.$nextTick(() => {
                        this.doFirstSelectSubject(true);
                    });
                }
            },
        },
    },
    updated() {
        this.update();
    },
    methods: {
        ...mapMutations('class-info/subject', {
            setCurrentSubject: 'setCurrentSubject',
        }),
        ...mapMutations('class-info/info', {
            setClassInfo: 'setClassInfo',
        }),
        ...mapMutations('class-info/practice-muster', {
            changeSubjectList: 'changeSubjectList',
        }),
        init() {
            this.getData();
        },
        doFirstSelectSubject(pypId) {
            let check = false;
            this.list.some((r, index) => {
                check = r.studyStatus === 'Y';
                if (check) {
                    this.selectIndex = index;
                    this.setCurrentSubject(r);
                }
                return check;
            });

            if (pypId && this.list.length > 0) {
                this.$emit('changeItem');
            } else if (!pypId) {
                this.$emit('subjectError');
            }
        },
        getData() {
            const data = {
                url: 'cc/query-class-subjects',
                params: {
                    classId: this.classId,
                },
                isCustom: false,
            };
            this.$httpClient(data)
                .then((res) => {
                    if (Array.isArray(res.subjectList) && res.subjectList.length > 0) {
                        // 设置当前班型信息
                        this.setClassInfo({
                            classTypeId: res.classTypeId,
                            projectId: res.projectId,
                            pypId: res.pypId,
                        });
                        this.list = res.subjectList;
                        this.doFirstSelectSubject(res.pypId);
                    } else {
                        this.$emit('subjectError');
                    }
                })
                .catch((err) => {
                    this.$baseUI.alert(err.getDescription()).then(() => {
                        this.$PageUtil.replaceUrl('/learningCenter/index/myCourse');
                    });
                    this.$emit('subjectError');
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
        scrollNext() {
            const navSize = this.$refs.nav.scrollWidth;
            const containerSize = this.$refs.navScroll.offsetWidth;
            const currentOffset = this.navOffset;

            if (navSize - currentOffset <= containerSize) return;

            let newOffset = navSize - currentOffset > containerSize * 2 ? currentOffset + containerSize : navSize - containerSize;

            this.navOffset = newOffset;
        },
        scrollPrev() {
            const containerSize = this.$refs.navScroll.offsetWidth;
            const currentOffset = this.navOffset;

            if (!currentOffset) return;

            let newOffset = currentOffset > containerSize ? currentOffset - containerSize : 0;

            this.navOffset = newOffset;
        },
        update() {
            if (!this.$refs.nav) return;
            const navSize = this.$refs.nav.scrollWidth;
            const containerSize = this.$refs.navScroll.offsetWidth;
            const currentOffset = this.navOffset;

            if (containerSize < navSize) {
                const currentOffset = this.navOffset;
                this.scrollable = this.scrollable || {};
                this.scrollable.prev = currentOffset;
                this.scrollable.next = currentOffset + containerSize < navSize;
                if (navSize - currentOffset < containerSize) {
                    this.navOffset = navSize - containerSize;
                }
            } else {
                this.scrollable = false;
                if (currentOffset > 0) {
                    this.navOffset = 0;
                }
            }
        },
    },
    render() {
        return (
            <div class="subject-view" style={{ paddingLeft: this.scrollable === false ? '0' : '' }}>
                <div class="left" style={{ paddingLeft: this.scrollable === false ? '0' : '' }}>
                    {this.scrollable !== false && (
                        <vFragment>
                            <div class="prev" onClick={this.scrollPrev}>
                                <img src={require('./asset/images/to-next.png')} class="img rota" />
                            </div>
                            <div class="next" onClick={this.scrollNext}>
                                <img src={require('./asset/images/to-next.png')} class="img" />
                            </div>
                        </vFragment>
                    )}

                    <div class="tabs-scroll" ref="navScroll">
                        <div class="tabs-list" ref="nav" style={this.navStyle}>
                            {this.list.map((r, index) => {
                                return (
                                    <div class="slide" key={r.subjectId}>
                                        <div
                                            class={['item', this.selectIndex === index ? 'this' : '']}
                                            onClick={() => {
                                                this.selectIndex = index;
                                                this.setCurrentSubject(r);
                                                if (this.pypId && this.list.length > 0) {
                                                    if (this.$route.query.questionBankStatus === 'special') {
                                                        const newList = JSON.parse(JSON.stringify(this.subjectList));
                                                        newList.forEach((item) => {
                                                            item.studyStatus = '';
                                                            if (item.subjectId === r.subjectId) {
                                                                item.studyStatus = 'Y';
                                                            }
                                                        });
                                                        this.changeSubjectList(newList);
                                                        this.$emit('changeItem', 'click');
                                                    } else {
                                                        this.$emit('changeItem');
                                                    }
                                                } else if (!this.pypId) {
                                                    this.$emit('subjectError');
                                                }
                                            }}
                                        >
                                            {r.subjectName}
                                        </div>
                                        {index !== this.list.length - 1 && <div class="division"></div>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {this.showType === 'practice' && (
                    <div
                        class="back-btn"
                        onClick={() => {
                            this.$PageUtil.href(`/learningCenter/allTask/${this.classId}?ctapId=${this.ctapId}`);
                        }}
                    >
                        <img class="arrow-left" src={require('./asset/images/arrow-left.png')} />
                        返回课程列表
                    </div>
                )}
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.prev,
.next {
    position: absolute;
    left: 0;
    width: 16px;
    height: 16px;
    top: 50%;
    cursor: pointer;
    transform: translateY(-50%);

    .img {
        width: 100%;
        height: 100%;

        &.rota {
            transform: rotate(180deg);
        }
    }
}

.next {
    left: auto;
    right: 0;
}

.tabs-scroll {
    overflow: hidden;
    .tabs-list {
        display: flex;
        align-items: center;
    }
}

.back-btn {
    flex-shrink: 0;
    font-size: 14px;
    width: 124px;
    height: 36px;
    background: #f4f5f9;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-left: 20px;

    &:hover {
        color: #ff2e30;
    }
    .arrow-left {
        width: 12px;
        height: 12px;
        margin-right: 6px;
    }
}
.subject-view {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    box-sizing: border-box;
    padding-left: 30px;
    padding-right: 30px;
    .left {
        position: relative;
        width: 100%;
        overflow: hidden;
        padding-right: 20px;
        padding-left: 20px;

        .slide {
            display: flex;
            align-items: center;
            flex-shrink: 0;
        }
    }
    .item {
        display: flex;
        align-items: center;
        padding: 0 24px 0 27px;
        font-size: 14px;
        color: #53586c;
        cursor: pointer;

        &:hover,
        &.this {
            color: #ff2e30;

            &::before {
                background-image: url(./asset/images/subject_select.png);
            }
        }

        &::before {
            content: '';
            display: block;
            width: 16px;
            height: 16px;
            margin-right: 2px;
            background-size: 100%;
            background-image: url(./asset/images/subject.png);
        }
    }
    .division {
        width: 1px;
        height: 10px;
        background: #d5d9d9;
    }
}
</style>
