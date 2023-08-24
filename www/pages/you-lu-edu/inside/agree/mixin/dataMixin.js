export default {
    /**
     * @returns {object} 数据模型
     */
    data() {
        return {
            topSetArray: [],
            provinceClass: {
                'school-province-aside-static': false,
                'school-province-aside-fixed': false,
            },
            detailClass: {
                'school-province-content-margin': false,
            },
        };
    },
    /**
     * mounted 生命周期
     */
    mounted() {
        document.documentElement.scrollTop = 0;
        this.contentScrollEvent();
    },
    methods: {
        /**
         * 页面滚动监听（暂时用不到）
         */
        pageScrollEvent() {
            window.addEventListener('scroll', () => {
                const scrollSize = document.documentElement.scrollTop || document.body.scrollTop;
                // 516 底部高度
                const dmdH = document.documentElement.scrollHeight - scrollSize - 516 - 120;

                if (!this.$refs.province || !this.$refs.province.$el) {
                    return;
                }
                if (!this.$refs.detail || !this.$refs.detail.$el) {
                    return;
                }
                const dmpH = this.$refs.province.$el.scrollHeight;
                const dmeH = this.$refs.detail.$el.scrollHeight;
                if (dmeH <= dmpH) {
                    if (scrollSize > 160) {
                        if (this.dmPad) {
                            this.dmPad.className = 'school-pad';
                        } else {
                            this.dmPad = document.createElement('div');
                            this.dmPad.className = 'school-pad';
                            this.$refs.content.parentElement.insertBefore(this.dmPad, this.$refs.content);
                        }
                    } else if (this.dmPad) {
                        this.dmPad.className = 'school-pad-hidden';
                        this.provinceClass['school-province-aside-static'] = false;
                        this.provinceClass['school-province-aside-fixed'] = false;
                        this.detailClass['school-province-content-margin'] = false;
                    }
                    return;
                }
                // 内容区与左侧导航区均可见时底部对齐
                if (dmdH <= dmpH) {
                    this.provinceClass['school-province-aside-static'] = true;
                    this.provinceClass['school-province-aside-fixed'] = false;
                    this.detailClass['school-province-content-margin'] = false;
                } else if (scrollSize > 160) {
                    this.provinceClass['school-province-aside-static'] = false;
                    this.provinceClass['school-province-aside-fixed'] = true;
                    this.detailClass['school-province-content-margin'] = true;

                    if (this.dmPad) {
                        this.dmPad.className = 'school-pad';
                    } else {
                        this.dmPad = document.createElement('div');
                        this.dmPad.className = 'school-pad';
                        this.$refs.content.parentElement.insertBefore(this.dmPad, this.$refs.content);
                    }

                    if (this.dmCover) {
                        this.dmCover.className = 'school-cover';
                    } else {
                        this.dmCover = document.createElement('div');
                        this.dmCover.className = 'school-cover';
                        this.$refs.content.parentElement.insertBefore(this.dmCover, this.$refs.content);
                    }
                } else {
                    this.provinceClass['school-province-aside-static'] = false;
                    this.provinceClass['school-province-aside-fixed'] = false;
                    this.detailClass['school-province-content-margin'] = false;

                    if (this.dmPad) {
                        this.dmPad.className = 'school-pad-hidden';
                    }
                    if (this.dmCover) {
                        this.dmCover.className = 'school-cover-hidden';
                    }
                }
            });
        },
        /**
         * 内容滚动监听
         */
        contentScrollEvent() {
            const contentArea = this.$refs.detail.$el;
            contentArea.addEventListener('scroll', () => {
                this.scrollHandleFun(contentArea.scrollTop);
            });
        },
        /**
         *  标签锚点改变
         *
         * @param {number} e 序号
         * @param {boolean} isScrollStatus 是否滚动到顶部
         */
        titleChange(e, isScrollStatus) {
            this.dataList.forEach((item, index) => {
                if (item.serial === e) {
                    item.isChecked = true;
                    if (isScrollStatus) {
                        this.$refs.detail.$el.scrollTop = this.topSetArray[index].topValue;
                        // element.scrollTo({
                        //     top: this.topSetArray[index].topValue,
                        //     behavior: 'smooth',
                        // });
                        // document.documentElement.scrollTop = this.topSetArray[index].topValue;
                    }
                } else {
                    item.isChecked = false;
                }
            });
        },
        /**
         * 获取内容区域标题距离顶部的距离
         *
         * @param {Array} e 标题顶部距离的集合
         */
        getContentTitleId(e) {
            this.topSetArray = e;
        },
        /**
         * 滚动时处理标题选中状态
         *
         * @param {number} scrollSize 滚动距离
         * @returns {boolean} false 终端进程执行
         */
        scrollHandleFun(scrollSize) {
            if (scrollSize >= this.topSetArray[0].topValue && scrollSize < this.topSetArray[1].topValue) {
                this.titleChange(this.topSetArray[0].serial, false);
                return false;
            }
            if (scrollSize >= this.topSetArray[1].topValue && scrollSize < this.topSetArray[2].topValue) {
                this.titleChange(this.topSetArray[1].serial, false);
                return false;
            }
            if (scrollSize >= this.topSetArray[2].topValue && scrollSize < this.topSetArray[3].topValue) {
                this.titleChange(this.topSetArray[2].serial, false);
                return false;
            }
            if (scrollSize >= this.topSetArray[3].topValue && scrollSize < this.topSetArray[4].topValue) {
                this.titleChange(this.topSetArray[3].serial, false);
                return false;
            }
            if (scrollSize >= this.topSetArray[4].topValue && scrollSize < this.topSetArray[5].topValue) {
                this.titleChange(this.topSetArray[4].serial, false);
                return false;
            }
            if (scrollSize >= this.topSetArray[5].topValue && scrollSize < this.topSetArray[6].topValue) {
                this.titleChange(this.topSetArray[5].serial, false);
                return false;
            }
            if (scrollSize >= this.topSetArray[6].topValue && scrollSize < this.topSetArray[7].topValue) {
                this.titleChange(this.topSetArray[6].serial, false);
                return false;
            }
            if (scrollSize >= this.topSetArray[7].topValue && scrollSize < this.topSetArray[8].topValue) {
                this.titleChange(this.topSetArray[7].serial, false);
                return false;
            }
            if (scrollSize >= this.topSetArray[8].topValue) {
                this.titleChange(this.topSetArray[8].serial, false);
                return false;
            }
            // 不符合滚动范围的，将选中状态取消
            this.titleChange(0, false);
        },
    },
};
