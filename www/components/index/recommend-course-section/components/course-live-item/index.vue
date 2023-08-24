<script lang="jsx">
import dayjs from 'dayjs';
export default {
    name: 'CourseLiveItem',
    props: {
        itemData: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    computed: {
        liveTime() {
            let courseStartTime = this.itemData.courseStartTime;
            if (courseStartTime) {
                courseStartTime = courseStartTime.replace('-', '/');
            }
            return `直播时间：${dayjs(courseStartTime).format('YYYY-MM-DD HH:mm')}`;
        },
    },
    methods: {
        track() {
            const projectInfo = this.$storage.get('indexSelectProject') || {};
            const data = {
                course_name: this.itemData.goodsName,
                college_name: '-', // 学院名称
                project_id: projectInfo.projectId ?? '-', // 用户已选项目ID
                course_type: '公开课', //
                subject_id: '-',
            };
            this.$yiguan.track('youlu_click_the_recommended_course_for_you', data);
        },
    },
    render() {
        return (
            <a
                href={`/free-course/detail/${this.itemData.goodsId}`}
                onClick={() => {
                    this.track();
                }}
                target="_blank"
                class="course-live"
            >
                {this.itemData.courseStatus === '2' && (
                    <div class="status">
                        <div class="live-status-box">
                            <img class="live-status-icon" src={require('./asset/images/start.gif')} alt="" />
                        </div>
                        直播中
                    </div>
                )}
                <div class="type">公开课</div>
                <div class="pic">
                    <image-view src={this.itemData.goodsCover} class="img" />
                </div>
                <div class="name">{this.itemData.goodsName}</div>
                <div class="time">{this.liveTime}</div>
                <div class="price">
                    <span class="mark">&#65509;</span>
                    <span class="num">0</span>
                </div>
            </a>
        );
    },
};
</script>
<style lang="less" scoped>
.course-live {
    position: relative;
    display: block;
    width: 224px;
    height: 280px;
    padding: 0 16px;
    padding-bottom: 20px;
    border-radius: 8px;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #fff;
    transition: all 0.5s;
    cursor: pointer;
    &:hover {
        transform: translate3d(0, -5px, 0);
        box-shadow: 0px 0px 10px 0px rgba(58, 61, 75, 0.1);
        .pic {
            .img {
                transform: translateZ(0) scale3d(1.08, 1.08, 1.08);
            }
        }
    }
    .pic {
        margin: 0 -16px;
        height: 140px;
        overflow: hidden;

        .img {
            width: 100%;
            height: 100%;
            transition: all 0.5s;
        }
    }
    .name {
        padding-top: 13px;
        font-size: 14px;
        font-weight: 700;
        color: #3a3d4b;
        line-height: 22px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .time {
        padding-top: 8px;
        font-size: 12px;
        font-weight: 400;
        color: #53586c;
        line-height: 13px;
    }

    .price {
        padding-top: 37px;

        .mark {
            font-size: 14px;
            font-weight: 700;
            color: #ff2e30;
            line-height: 20px;
        }
        .num {
            font-size: 18px;
            font-weight: 700;
            color: #ff2e30;
            line-height: 20px;
        }
    }

    .status {
        position: absolute;
        top: 12px;
        left: 16px;
        width: 66px;
        height: 20px;
        text-align: center;
        background: rgba(14, 15, 15, 0.7);
        border-radius: 16px;
        font-size: 12px;
        font-weight: 400;
        color: #ffffff;
        line-height: 20px;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;

        .live-status-box {
            margin-right: 4px;
            width: 16px;
            height: 16px;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(90deg, #ff6870, #f8323c);
            img {
                width: 8px;
                height: 8px;
            }
        }
    }
    .type {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 46px;
        height: 24px;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 4px;
        z-index: 10;
        font-size: 12px;
        font-weight: 400;
        text-align: center;
        color: #ffffff;
        line-height: 24px;
    }
}
</style>
