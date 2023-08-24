<script lang="jsx">
export default {
    name: 'AboutSection',
    data() {
        return {
            currentIndex: 0,
            // 背景图片集合
            imgMap: {
                0: require('./asset/images/1.png'),
                1: require('./asset/images/2.png'),
                2: require('./asset/images/3.png'),
                3: require('./asset/images/4.png'),
            },
        };
    },
    computed: {
        bgStyle() {
            return {
                backgroundImage: `url(${this.imgMap[this.currentIndex]})`,
            };
        },
    },
    render() {
        const map = {
            0: '分支机构',
            1: '科技研发',
            2: '服务体系',
            3: '教学特色',
        };
        const mapDesc = {
            0: '拓宽职教服务范围，凝聚分支机构合力，与时偕行，探索构建闭环教育生态',
            1: '以前沿技术加持创新型变革，以研发实力推动教育数字化转型',
            2: '将标准化服务贯穿始终，并不断拓展更加多元化的衍生服务、增值服务',
            3: '更迭、升级、创新，聚焦社会需求，剖析学员痛点，以特色教学专注职业能力提升',
        };
        const mapMask = {
            0: 'fzlc',
            1: 'fzjg',
            2: 'jxts',
            3: 'kjyf',
        };
        let timer = 0;
        return (
            <div class={['about-wrap_box']} style={this.bgStyle}>
                <div class="about-wrap">
                    <div class="title">
                        <span class="name">砥砺前行，构建职教服务体系</span>
                    </div>
                    <div class="list">
                        {[1, 2, 3, 4].map((r, index) => {
                            return (
                                <a
                                    target="_blank"
                                    href={`/about?hashName=${mapMask[index]}`}
                                    class={['item', `it${index + 1}`, index === this.currentIndex ? 'this' : '']}
                                    onMouseenter={() => {
                                        clearTimeout(timer);
                                        timer = setTimeout(() => {
                                            this.currentIndex = index;
                                        }, 100);
                                    }}
                                    onClick={() => {
                                        // 项目频道页易观埋点使用
                                        this.$emit('click-yi-guan', {
                                            module_type: '企业介绍-品牌亮点',
                                            course_name: map[index],
                                        });
                                    }}
                                >
                                    {/* <div class="mask"></div> */}
                                    {index !== this.currentIndex && (
                                        <div class="content">
                                            <div class="num">0{index + 1}</div>
                                            <div class="name">{map[index]}</div>
                                        </div>
                                    )}
                                    {index === this.currentIndex && (
                                        <div class="expand-content content">
                                            <div class="expand-content_left">
                                                <img src={require('./asset/images/pic-right.png')} />
                                            </div>
                                            <div class="expand-content_right">
                                                <div class="expand-content_title">{map[index]}</div>
                                                <div class="expand-content_desc">{mapDesc[index]}</div>
                                            </div>
                                        </div>
                                    )}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
@font-face {
    font-family: 'bold';
    src: url('./font/d-din-bold.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'ltalic';
    src: url('./font/d-din-italic.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'source';
    src: url('./font/d-din.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
.about-wrap_box {
    width: 100%;
    height: 690px;
    box-sizing: border-box;
    padding: 60px 0 110px 0;
    background: url('./asset/images/1.png') 100% 100% no-repeat;
    background-size: cover;
    position: relative;
    transition: all 0.3s ease-in-out;
    &::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        backdrop-filter: blur(6px);
        background: linear-gradient(180deg, #fbfcff, rgba(251, 252, 255, 0.8) 51%, #fbfcff);
        z-index: 0;
    }
}
.about-wrap {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 3;
    .title {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 52px;
        flex-shrink: 0;
        .name {
            font-weight: 700;
            font-size: 24px;
            color: #3a3d4b;
        }
    }

    .list {
        display: flex;
        height: 440px;
    }
    .item {
        display: block;
        width: 170px;
        height: 100%;
        border-radius: 16px;
        margin-right: 12px;
        background-size: auto 100%;
        background-position: 50%;
        transition: width 0.3s;
        position: relative;
        overflow: hidden;
        .mask {
            height: 100%;
            width: 100%;
            background-image: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
        }
        .content {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 120px;
            background: linear-gradient(180deg, rgba(58, 43, 22, 0), rgba(59, 48, 23, 0.8));
            border-radius: 16px;
            backdrop-filter: blur(6px);
            padding: 22px 34px;
            box-sizing: border-box;

            .num {
                color: rgba(255, 255, 255, 0.6);
                font-family: bold;
                font-weight: 700;
                font-size: 40px;
            }
            .name {
                color: #ffffff;
                font-size: 20px;
                font-weight: 700;
            }
        }
        &.it1 {
            background: url(./asset/images/1.png);
        }
        &.it2 {
            background: url(./asset/images/2.png);
        }
        &.it3 {
            background: url(./asset/images/3.png);
        }
        &.it4 {
            background: url(./asset/images/4.png);
        }

        &.this {
            width: 652px;
        }
        .expand-content {
            display: flex;
            padding: 30px 0 0;
            height: 130px;
            background: rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            .expand-content_left {
                width: 70px;
                position: absolute;
                top: 0;
                left: 0;
                img {
                    position: absolute;
                    top: 35px;
                    left: 24px;
                    width: 30px;
                    height: 20px;
                }
            }
            .expand-content_right {
                padding-left: 70px;
            }
            .expand-content_title {
                font-size: 24px;
                font-weight: 700;
                color: #fff;
                margin-bottom: 28px;
                line-height: 1;
                position: relative;
                &::before {
                    content: '';
                    display: block;
                    position: absolute;
                    bottom: -13px;
                    left: 0;
                    background-color: #fff;
                    width: 24px;
                    height: 4px;
                }
            }
            .expand-content_desc {
                font-size: 14px;
                color: #fff;
                white-space: nowrap;
                line-height: 1;
            }
        }
    }
}
</style>
