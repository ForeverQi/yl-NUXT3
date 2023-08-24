<script>
export default {
    name: 'CourseClassItem',
    props: {
        itemData: {
            type: Object,
            default() {
                return {};
            },
        },
        cityInfo: {
            type: Object,
            default() {
                return {
                    cityCode: '',
                    cityName: '',
                };
            },
        },
    },
    computed: {
        classtypeHighlights() {
            let classtypeHighlights = this.itemData.classtypeHighlights || '';
            if (classtypeHighlights === '') {
                return [];
            }
            return classtypeHighlights.split(',').slice(0, 1);
        },
        minPrice() {
            let price = (this.itemData.minPrice / 100).toFixed(2);
            let arr = price.split('.');
            if (arr.length === 2 && arr[1] === '00') {
                return arr[0];
            } else {
                return price;
            }
        },
        maxPrice() {
            let price = (this.itemData.maxPrice / 100).toFixed(2);
            let arr = price.split('.');
            if (arr.length === 2 && arr[1] === '00') {
                return arr[0];
            } else {
                return price;
            }
        },
    },
    methods: {
        track() {
            const projectInfo = this.$storage.get('indexSelectProject') || {};
            const data = {
                course_name: this.itemData.goodsName,
                college_name: '-', // 学院名称
                project_id: projectInfo.projectId ?? '-', // 用户已选项目ID
                course_type: '系统课', //
                subject_id: '-',
            };
            this.$yiguan.track('youlu_click_the_recommended_course_for_you', data);
        },
    },
    render() {
        return (
            <a
                href={`/pro-course/detail/${this.itemData.classtypeId}`}
                onClick={() => {
                    this.track();
                }}
                target="_blank"
                class="course-class"
            >
                <div class="type">系统课</div>
                <div class="pic">
                    <image-view src={this.itemData.classtypeAppcoverimgurl} class="img" />
                </div>
                <div class="name">{this.itemData.classtypeName}</div>
                <div class="tags">
                    <div class="city">{this.cityInfo.cityName}</div>
                    {this.classtypeHighlights.length > 0 &&
                        this.classtypeHighlights.map((name) => {
                            return <div class="tag">{name}</div>;
                        })}
                </div>
                <div class="price">
                    <span class="mark">&#65509;</span>
                    {this.itemData.maxPrice === this.itemData.minPrice && <span class="num">{this.minPrice}</span>}
                    {this.itemData.maxPrice !== this.itemData.minPrice && (
                        <span class="num">
                            {this.minPrice}-{this.maxPrice}
                        </span>
                    )}
                </div>
            </a>
        );
    },
};
</script>
<style lang="less" scoped>
.course-class {
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

        .tag-txt {
            margin-right: 6px;
            line-height: 22px;
            padding: 0 7px;
            font-size: 12px;
            color: #f8323c;
            background-color: #ffeff0;
            border-radius: 2px;
        }
    }
    .tags {
        padding-top: 10px;
        display: flex;
        margin-right: -20px;
        .city {
            padding: 5px 10px;
            background: rgba(250, 100, 0, 0.1);
            border-radius: 2px;
            font-size: 12px;
            font-weight: 400;
            color: #fa6400;
            line-height: 12px;
            margin-right: 6px;
        }

        .tag {
            padding: 5px 10px;
            background: #eeeff6;
            border-radius: 2px;
            font-size: 12px;
            font-weight: 400;
            color: #53586c;
            line-height: 12px;
            margin-right: 6px;
        }
    }

    .price {
        padding-top: 25px;

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
