<template>
    <div v-if="!hideOnSinglePage || pageTotal > 1">
        <div class="pagination">
            <div v-if="layout.indexOf('total') !== -1" class="plugins">共{{ total }}条</div>
            <div v-if="layout.indexOf('sizes') !== -1" class="plugins size-box">
                <select v-if="pageSizes.length > 1" :value="form.pageSize" @change="sizeChange">
                    <option v-for="item in pageSizes" :key="item" :value="item">{{ item }}条/页</option>
                </select>
                <span v-else>{{ form.pageSize }}条/页</span>
            </div>
            <div class="plugins items-box">
                <nuxt-link
                    v-if="layout.indexOf('prev') !== -1"
                    class="page-item prev-next"
                    :class="{ disabled: form.currentPage === 1 }"
                    :to="{ path: pagePathName, query: { page: currentPage - 1 } }"
                    v-slot="{ href }"
                    custom
                >
                    <a :href="href" @click="currentChange(currentPage - 1, $event)">{{ prevText }}</a>
                </nuxt-link>

                <template v-if="layout.indexOf('pager') !== -1">
                    <nuxt-link
                        v-for="(item, index) in pageList"
                        :key="index"
                        class="page-item"
                        :class="{ active: form.currentPage === item.pageIndex }"
                        :to="{ path: pagePathName, query: { page: item.pageIndex } }"
                        v-slot="{ href }"
                        custom
                    >
                        <strong v-if="form.currentPage === item.pageIndex">
                            <a href="javascript:void(0);">{{ item.title }}</a>
                        </strong>
                        <a v-else :href="href" @click="currentChange(item.pageIndex, $event)">{{ item.title }}</a>
                    </nuxt-link>
                </template>
                <nuxt-link
                    v-if="layout.indexOf('next') !== -1"
                    class="page-item prev-next"
                    :class="{ disabled: form.currentPage === pageTotal }"
                    :to="{ path: pagePathName, query: { page: currentPage + 1 } }"
                    v-slot="{ href }"
                    custom
                >
                    <a :href="href" @click="currentChange(currentPage + 1, $event)">{{ nextText }}</a>
                </nuxt-link>
            </div>
            <div v-if="layout.indexOf('jumper') !== -1" class="plugins">
                <span>跳至</span>
                <input class="input-jumper" :value="form.inputPage" @input="inputChange" @blur="blur" @keyup.enter="keyupEnter" />
                <span>页</span>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * 仿照elementUi 参数风格写的分页器
 * 1.只要是props里有的配置，尽可能和elementUi的文档说明功能一样，个别会做细微调整
 * 2.只要是存在的向外抛出的事件，和elementUi的功能及出参也尽可能一样
 * @emits size-change pageSize 改变时会触发
 * @emits current-change currentPage 改变时会触发
 */
export default {
    props: {
        // 每页显示条目个数，支持 .sync 修饰符
        pageSize: {
            type: Number || String,
            default: 10,
        },
        // 当前页数，支持 .sync 修饰符
        currentPage: {
            type: Number,
            default: 1,
        },
        // 总条目数
        total: {
            type: Number,
            default: 0,
        },
        // 每页显示个数选择器的选项设置
        // 注意：当选项不足2项时，展示方式为pageSize的固定文案，不再是下拉选择器
        pageSizes: {
            type: Array,
            default: () => [5, 10, 15, 20],
        },
        // 页码按钮的数量，最小值为5，当总页数超过该值时会折叠,显示...（最好为奇数，否则展示效果不好）
        pagerCount: {
            type: Number,
            default: 5,
        },
        // 只有一页时是否隐藏
        hideOnSinglePage: {
            type: Boolean,
            default: true,
        },
        // 组件布局，子组件名用逗号分隔
        // total 总条数展示
        // sizes 每页显示个数选择器
        // prev，上一页
        // pager，分页列表
        // next，下一页
        // jumper，输入框跳转
        layout: {
            type: Array,
            default: () => ['prev', 'pager', 'next', 'jumper'],
        },
        // 上一页按钮显示的文字
        prevText: {
            type: String,
            default: '上一页',
        },
        // 下一页按钮显示的文字
        nextText: {
            type: String,
            default: '下一页',
        },
        pagePathName: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            // 当前组件内选中的一些状态
            form: {
                pageSize: 10,
                currentPage: 1,
                inputPage: 1,
            },
        };
    },
    fetch() {
        return Promise.resolve();
    },
    computed: {
        /**
         * 当前数据总共分出来多少页
         * @returns {number} 总页数
         */
        pageTotal() {
            // 即使没有数据最少也展示一页
            if (this.total < 1) {
                return 1;
            }
            // 如果总数据按当前分页数正好分完
            if (this.total % this.form.pageSize === 0) {
                return this.total / this.form.pageSize;
            } else {
                // 如果总数据按当前分页数有多余，则需要取整后额外加一页
                return Math.floor(this.total / this.form.pageSize) + 1;
            }
        },
        /**
         * 当前展示的分页列表
         * @returns {array} obj
         * @returns {number} obj[].pageIndex 当前项所属页面索引
         * @returns {string} obj[].title 当前项的展示名称
         */
        pageList() {
            const arr = [];
            // 总数在最大显示数量之内，直接输出全部
            if (this.pageTotal <= this.pagerCount) {
                for (let index = 1; index <= this.pageTotal; index++) {
                    arr.push({
                        pageIndex: index,
                        title: index,
                    });
                }
                return arr;
            }
            // 当前选中的页码在头部最大显示数量之内，尾部页码省略，-2是为了忽略掉后面的...和最后一页
            if (this.form.currentPage < this.pagerCount - 2) {
                // -1是为了忽略最后一页
                for (let index = 1; index <= this.pagerCount - 1; index++) {
                    arr.push({
                        pageIndex: index,
                        title: index === this.pagerCount - 1 ? '...' : index,
                    });
                }
                arr.push({
                    pageIndex: this.pageTotal,
                    title: this.pageTotal,
                });
                return arr;
            }
            // 当前选中的页码在末尾最大显示数量之内，头部页码省略，+2是为了忽略掉前面的...和第一页
            if (this.form.currentPage > this.pageTotal - this.pagerCount + 2) {
                // -1是为了忽略第一页
                for (let index = 0; index < this.pagerCount - 1; index++) {
                    arr.unshift({
                        pageIndex: this.pageTotal - index,
                        title: index === this.pagerCount - 2 ? '...' : this.pageTotal - index,
                    });
                }
                arr.unshift({
                    pageIndex: 1,
                    title: '1',
                });
                return arr;
            }
            // 当前选中的页码在中间，两边都需要省略
            arr.push({
                pageIndex: this.form.currentPage,
                title: this.form.currentPage,
            });
            // -3是忽略第一页,最后一页和当前页
            let prevIndex = 1;
            let nextIndex = 1;
            for (let index = 1; index <= this.pagerCount - 3; index++) {
                if (index % 2 === 0) {
                    arr.unshift({
                        pageIndex: this.form.currentPage - prevIndex,
                        title: index === this.pagerCount - 4 || index === this.pagerCount - 3 ? '...' : this.form.currentPage - prevIndex,
                    });
                    prevIndex += 1;
                } else {
                    arr.push({
                        pageIndex: this.form.currentPage + nextIndex,
                        title: index === this.pagerCount - 4 || index === this.pagerCount - 3 ? '...' : this.form.currentPage + nextIndex,
                    });
                    nextIndex += 1;
                }
            }
            arr.unshift({
                pageIndex: 1,
                title: '1',
            });
            arr.push({
                pageIndex: this.pageTotal,
                title: this.pageTotal,
            });
            return arr;
        },
    },
    watch: {
        pageSize: {
            handler(val) {
                this.form.pageSize = val;
            },
            immediate: true,
        },
        currentPage: {
            handler(val) {
                this.form.currentPage = val;
            },
            immediate: true,
        },
    },
    methods: {
        // 输入框内容变化，处理不合法的输入值
        inputChange(e) {
            if (e.target.value === '') {
                this.form.inputPage = '';
                return;
            }
            let numPage = Number(e.target.value);
            // 输入的内容无法解析成数字,重置为当前选中页数
            this.form.inputPage = ''; // 这个是为了避免当前页码与即将跳转的页码相同，而监听不到数据变化
            if (Number.isNaN(numPage)) {
                this.form.inputPage = this.form.currentPage;
                return;
            }
            // 对数字取整
            numPage = Math.floor(numPage);
            // 输入的数字小于可选范围，改成第一页
            if (numPage < 1) {
                this.form.inputPage = 1;
                return;
            }
            // 输入的数字大于可选范围，改成最后一页
            if (numPage > this.pageTotal) {
                this.form.inputPage = this.pageTotal;
                return;
            }
            this.form.inputPage = numPage;
        },
        // 修改页码
        currentChange(page, e) {
            if (e) {
                e.preventDefault();
            }
            if (page === this.form.currentPage && e) {
                return e.stopPropagation();
            }
            if (page < 1 || page > this.pageTotal) {
                return;
            }
            this.form.currentPage = page;
            this.$emit('update:current-page', page);
            this.$emit('current-change', this.form.currentPage);
        },
        // 修改分页大小
        sizeChange(e) {
            this.form.pageSize = Number(e.target.value);
            this.$emit('update:page-size', this.form.pageSize);
            this.$emit('size-change', this.form.pageSize);
        },
        blur() {
            if (this.form.inputPage === this.form.currentPage) {
                return;
            }
            this.keyupEnter();
        },
        keyupEnter() {
            if (!this.form.inputPage) {
                this.form.inputPage = 1;
            }
            this.currentChange(this.form.inputPage);
        },
    },
};
</script>

<style lang="less" scoped src="./css/index.less"></style>
<style lang="less" scoped>
strong {
    border: 0;
    font-weight: normal;
}
</style>
