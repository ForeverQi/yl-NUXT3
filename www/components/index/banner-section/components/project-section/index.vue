<script lang="jsx">
import '@/api/public/api..query-category-tree.js';
export default {
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
            list: [],
        };
    },
    fetch() {
        return this.init();
    },
    mounted() {},
    methods: {
        init() {
            // 获取项目
            return this.getProjectList();
        },
        getProjectList() {
            const param = {
                url: 'public/query-category-tree',
                params: {
                    enableStatus: 'Y',
                },
            };
            return this.httpClient(param).then((list) => {
                this.list = list.treeData;
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
        doTrck(item, positionName) {
            const data = {
                college_name: item.projectIds, // 学院名称
                entrance_resource: positionName, // 点击位置
            };
            this.$yiguan.track('youlu_click_all_courses', data);
        },
        trackProject(item, url, positionName, item2) {
            const data = {
                channel_name: item.columnName, // 频道页名称
                abbreviation_name: item.columnShortName, // 频道页简称
                college_name: item2?.columnCategoryName, // 学院名称
                is_channel: item.projectPageStatus === 'yes',
                channel_url: `${location.protocol}//${location.host}${url}`,
                project_position: item.projectIds,
                entrance_resource: positionName,
            };
            this.$yiguan.track('youlu_click_the_project_channel_page', data);
        },
        trackCourse(item, link, item2) {
            // 热推课程埋点
            let type = '';
            if (item.courseType === 'open') {
                type = `公开课`;
            } else if (item.courseType === 'trial') {
                type = `体验课`;
            } else if (item.courseType === 'pro') {
                type = `系统课`;
            }
            const data = {
                college_name: item2?.columnCategoryName, // 学院名称
                course_name: item.courseName, // 课程名称
                project_id: item2?.projectIds ?? '-', // 用户已选项目ID
                subject_id: '-', // 科目ID
                course_type: type,
            };
            this.$yiguan.track('youlu_click_the_hot_course', data);
        },
    },
    render() {
        const showProjectListHtml = (item) => {
            const courseList = item.courseRecommendData ? item.courseRecommendData.slice(0, 4) : [];
            return (
                <div class="project-list">
                    <a
                        class="title"
                        onClick={() => {
                            this.doTrck(item, '项目浮窗-学院入口');
                        }}
                        target="_blank"
                        href={`/course/${item.columnCategorySeoNo}`}
                    >
                        {item.columnCategoryName}
                        <span class="right-icon"></span>
                    </a>
                    <div class="list" style={{ height: courseList.length === 0 ? '' : '152px' }}>
                        {item.columnData.map((projectInfo) => {
                            let link = projectInfo.jumpLinkUrl;
                            if (projectInfo.projectPageStatus === 'yes') {
                                link = `/channel/${projectInfo.columnSeoNo}`;
                            } else if (!link) {
                                link = '#';
                            }

                            return (
                                <a
                                    class="projec-link"
                                    onClick={() => {
                                        this.trackProject(projectInfo, link, '项目浮窗-频道页入口', item);
                                    }}
                                    target="_blank"
                                    href={link}
                                >
                                    {projectInfo.columnName}
                                </a>
                            );
                        })}
                    </div>
                    {courseList.length > 0 && (
                        <div class="recommend-course">
                            <div class="recommend-title">热门推荐</div>
                            <div class="recommend-list">
                                {courseList.map((course) => {
                                    let link = '';
                                    if (course.courseType === 'open') {
                                        link = `/free-course/detail/${course.courseId}`;
                                    } else if (course.courseType === 'trial') {
                                        link = `/trial-course/detail/${course.courseId}`;
                                    } else if (course.courseType === 'pro') {
                                        link = `/pro-course/detail/${course.courseId}`;
                                    }
                                    return (
                                        <a
                                            class="item"
                                            href={link}
                                            onClick={() => {
                                                this.trackCourse(course, link, item);
                                            }}
                                            target="_blank"
                                        >
                                            <div class="img-wrap">
                                                <image-view class="img" src={course.courseUrl} />
                                            </div>
                                            <div class="course-title">{course.courseName}</div>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            );
        };
        const showShortProjectNameHtml = (item) => {
            const list = item.columnData.slice(0, 3);
            let txt = item.columnCategoryName;
            let ret = [];
            list.forEach((r) => {
                let subTxt = '';
                if (r.columnShortName) {
                    subTxt = r.columnShortName;
                } else {
                    subTxt = r.columnName;
                }

                if (txt.length + subTxt.length <= 12) {
                    ret.push(r);
                    txt += subTxt;
                }
            });

            return ret.map((projectInfo, index) => {
                let link = projectInfo.jumpLinkUrl;
                if (projectInfo.projectPageStatus === 'yes') {
                    link = `/channel/${projectInfo.columnSeoNo}`;
                } else if (!link) {
                    link = '#';
                }
                return (
                    <div class="a-block">
                        <a
                            href={link}
                            target="_blank"
                            onClick={() => {
                                this.trackProject(projectInfo, link, '项目简称-入口', item);
                            }}
                            class="project"
                        >
                            {projectInfo.columnShortName ? projectInfo.columnShortName : projectInfo.columnName}
                        </a>
                        {index !== ret.length - 1 && <span class="division">/</span>}
                    </div>
                );
            });
        };
        return (
            <div class="project-wrap">
                {this.list.length > 0 && (
                    <vFragment>
                        <div class="project-bg"></div>

                        <div class="content">
                            {this.list.map((item) => {
                                return (
                                    <div class="line">
                                        <a
                                            class="name"
                                            onClick={() => {
                                                this.doTrck(item, '轮播图左侧-学院入口');
                                            }}
                                            target="_blank"
                                            href={`/course/${item.columnCategorySeoNo}`}
                                        >
                                            {item.columnCategoryName}:
                                        </a>
                                        <div class="block-list">{showShortProjectNameHtml(item)}</div>
                                        {showProjectListHtml(item)}
                                    </div>
                                );
                            })}
                        </div>
                    </vFragment>
                )}
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.recommend-course {
    padding: 0 24px;
    position: absolute;
    bottom: 20px;
    .recommend-title {
        font-size: 15px;
        font-weight: 800;
        text-align: left;
        color: #3a3d4b;
    }
    .recommend-list {
        display: flex;
        .item {
            display: block;
            width: 130px;
            margin-right: 30px;
            &:hover {
                .course-title {
                    color: #ff2e30;
                }
            }
            .img-wrap {
                height: 81px;
                border-radius: 7px;
                overflow: hidden;

                .img {
                    width: 100%;
                    height: 100%;
                }
            }
            .course-title {
                padding-top: 6px;
                font-size: 12px;
                color: #53586c;
                line-height: 18px;
                word-break: break-all;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                height: 36px;
                -webkit-box-orient: vertical;
            }
        }
    }
}
.project-list {
    position: absolute;
    display: none;
    width: 708px;
    height: 100%;
    left: 248px;
    top: 0;
    bottom: 0;
    border-radius: 0 8px 8px 0;
    backdrop-filter: saturate(180%) blur(20px);
    background-color: hsla(0, 0%, 100%, 0.9);
    // background-color: #fff;

    .title {
        height: 48px;
        line-height: 1;
        font-size: 16px;
        font-weight: 700;
        color: #3a3d4b;
        padding-left: 24px;
        padding-top: 20px;
        padding-bottom: 7px;
        display: block;
        cursor: pointer;
        box-sizing: border-box;

        &:hover {
            color: #ff2e30;
            // color: #3a3d4b;
        }
    }
    .list {
        box-sizing: border-box;
        padding: 9px 27px;
        line-height: 1;
        overflow-y: auto;

        .projec-link {
            font-size: 14px;
            margin-right: 30px;
            margin-bottom: 16px;
            color: #53586c;
            display: inline-block;

            &:hover {
                color: #ff2e30;
            }
        }
    }
}
.project-wrap {
    position: relative;
    height: 100%;
    width: 248px;
    z-index: 2;

    .project-bg {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
    }
    .content {
        z-index: 2;
        height: 100%;
        font-size: 14px;
        padding: 10px 0;
        position: relative;
        box-sizing: border-box;
    }
}
.line {
    display: flex;
    height: 35px;
    padding: 0 16px;
    line-height: 35px;
    background-image: url('./asset/images/left.png');
    background-repeat: no-repeat;
    background-position: 230px center;
    background-size: 10px 10px;

    &:hover {
        background-color: hsla(0, 0%, 100%, 0.14);

        .project-list {
            display: block;
        }
    }

    .block-list {
        display: flex;
    }

    .name {
        display: inline-block;
        color: #fff;
        padding-right: 8px;
        cursor: pointer;

        &:hover {
            color: #ff2e30;
        }
    }

    .project {
        &:hover {
            color: #ff2e30;
        }
    }

    .division,
    .project {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.7);
    }

    .division {
        padding: 0 4px;
    }
}

.right-icon {
    display: inline-block;
    margin-left: 5px;
    width: 12px;
    height: 12px;
    background-image: url('./asset/images/right-icon.png');
    background-position: center;
    background-size: 100% 100%;
}
</style>
