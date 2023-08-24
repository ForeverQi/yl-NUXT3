<template>
    <div class="message-item">
        <div class="unread">
            <img class="unread" :src="readStatusIocn" />
        </div>
        <div class="item-content">
            <div class="item-header">
                <span class="item-title">
                    {{ title }}
                    <span class="tag-type" v-if="tag">{{ tag }}</span>
                </span>
                <span class="item-date">{{ dateStr }}</span>
            </div>
            <!-- text-overflow-2 -->

            <!-- :class="{'text-overflow-one':!isCollapse}" v-html="tempContent" -->
            <div class="content" :class="isShowMore && !isExpand ? 'show-hidden' : ''" ref="contentObj">{{ tempContent }}</div>
            <span v-show="isShowMore" class="show-more pointer" @click.stop="toggleText">
                {{ isExpand ? '收起' : '展开' }}
                <img src="./asset/images/open.png" :class="['show-more_icon', isExpand ? 'rotate' : '']" />
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MessageItem',

    props: {
        title: {
            type: String,
            default: '',
        },
        date: {
            type: String,
            default: '',
        },
        content: {
            type: String,
            default: '',
        },
        msgId: {
            type: String,
            default: '',
        },
        tag: {
            type: String,
            default: '',
        },
        status: {
            type: Boolean,
            default: true,
        },
        maxLine: {
            type: Number,
            default: 2,
        },
    },
    data() {
        return {
            // 低于两行就不展示
            isShowMore: false,
            tempContent: '',
            dateStr: '',
            isExpand: false, //展开还是收起  默认收起
        };
    },
    computed: {
        readStatusIocn() {
            return this.status ? require('./asset/images/unread.png') : require('./asset/images/readed.png');
        },
    },
    watch: {
        content: {
            immediate: true,
            handler(value) {
                this.tempContent = value;
            },
        },
    },
    mounted() {
        this.computedContent();
    },
    methods: {
        fomaterDate(date) {
            if (!date) return '';
            // ie new Date() 不支持  20-01-02
            // if (typeof date === 'string') {
            //     date = date.replace(/-/g, '/');
            // }
            // const currentTime = Date.now();
            // const receiveTime = new Date(date).getTime();
            // const isSameDay = this.isOnSameDay(currentTime, receiveTime);
            // const oneMinute = 60 * 1000;
            // const oneHour = 60 * oneMinute;
            // const oneDay = 24 * oneHour;

            // const timeDifference = currentTime - receiveTime;
            // let str = '';
            // if (timeDifference < oneMinute && timeDifference >= 0) {
            //     str = '刚刚';
            // } else if (timeDifference < oneHour && timeDifference >= 0) {
            //     str = Math.floor(timeDifference / 1000 / 60) + '分钟前';
            // } else if (timeDifference >= oneHour && isSameDay && timeDifference >= 0) {
            //     str = DateUtil.dateFmt('hh:mm', new Date(date));
            // } else if (!isSameDay && timeDifference < oneDay && timeDifference >= 0) {
            //     str = '昨天' + DateUtil.dateFmt('hh:mm', new Date(date));
            // } else {
            //     str = DateUtil.dateFmt('YYYY-MM-DD hh:mm', new Date(date));
            // }
            // return str;
        },
        /**
         *  比较两个时间是不是同一天
         * @param {Number} currentTime
         * @param {Number} receiveTime
         * @returns {Boolean}
         */
        isOnSameDay(currentTime, receiveTime) {
            if (Math.abs(currentTime - receiveTime) >= 3600 * 24 * 1000) {
                return false;
            }
            const date1 = new Date(currentTime);
            const date2 = new Date(receiveTime);
            return date1.getDate() === date2.getDate();
        },
        // 计算内容是否展示...及展开符号
        computedContent() {
            this.dateStr = this.fomaterDate(this.date);
            let content = this.content;
            // const contentLen = content.length;
            const contentObj = this.$refs.contentObj;
            const computedStyle = getComputedStyle(contentObj);
            const lineHeight = parseInt(computedStyle.getPropertyValue('line-height'));
            this.isShowMore = !(contentObj.clientHeight <= lineHeight * this.maxLine);
            // 行高乘行数 小于等于容器的高度 则不需处理
            if (!this.isShowMore) return;
            this.$nextTick().then(() => {
                const width = contentObj.clientWidth;
                const fontSize = parseInt(computedStyle.getPropertyValue('font-size'));
                const lineSize = Math.ceil(width / fontSize);

                if (this.isShowMore) {
                    const span = contentObj.querySelector('span.show-more');
                    const showMoreTextWidth = span.clientWidth; //展示的宽度
                    // 第二行可以展示的字数
                    const len = lineSize + Math.ceil((width - showMoreTextWidth) / fontSize);
                    this.tempContent = content.substring(0, len + 1) + '...';
                }
            });
        },
        toggleText() {
            this.isExpand = !this.isExpand;
            if (this.isExpand) {
                this.tempContent = this.content;
            } else {
                this.computedContent();
            }
        },
        handleClick() {
            this.$emit('click', this.msgId);
        },
    },
};
</script>

<style lang="less" scoped>
.message-item {
    width: 100%;
    display: flex;
    &:not(:first-child) {
        margin-top: 30px;
    }
    .unread {
        width: 40px;
        height: 40px;
        user-select: none;
        overflow: hidden;
        i {
            line-height: 40px;
        }
        /deep/ embed {
            // fix：火狐下样式错乱
            width: 40px !important;
        }
    }

    .item-content {
        flex: 1;
        padding-left: 16px;
        box-sizing: border-box;
        overflow: hidden;
    }
    .item-header {
        /*display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;*/
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        .item-title {
            // 兼容ie10 flex
            /*display: block;*/
            display: inline-block;
            font-size: 16px;
            font-weight: Bold;
            text-align: left;
            color: #333333;
            line-height: 16px;
        }
        .tag-type {
            padding-left: 15px;
            padding-right: 12px;
            /*width: 75px;*/
            height: 24px;
            display: inline-block;
            background: url('./asset/images/tag-type.png') no-repeat;
            background-size: 100% 24px;
            font-size: 12px;
            font-weight: 400;
            text-align: center;
            color: #fa6400;
            line-height: 24px;
        }
        .item-date {
            /*display: inline-block;*/
            font-size: 12px;
            font-weight: 400;
            text-align: left;
            color: #999999;
            float: right;
            line-height: 16px;
            float: right;
            position: relative;
            top: 3px;
        }
    }
    .content {
        /*position: relative;*/
        width: 100%;
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        color: #999;
        margin-top: 9px;
        line-height: 20px;
        word-break: break-all;
    }
    .show-hidden {
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .show-more {
        /*position: absolute;
        bottom: 0px;
        right: 0;*/
        float: right;
        width: 45px;
        text-align: right;
        color: #e73928;
        font-size: 12px;
        font-weight: Normal;
        line-height: 12px;
        .show-more_icon {
            display: inline-block;
            vertical-align: middle;
            width: 16px;
            height: 16px;
            border-radius: 2px;
        }

        .rotate {
            transform: rotate(180deg);
            transform-origin: center center;
        }
    }
}
</style>
