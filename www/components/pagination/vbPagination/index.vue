<template>
    <!-- eslint-disable -->
    <div class="mnr_page" v-show="show">
        <span class="mnr_sp mnr_mrt">共{{ page.pageCount + countOver }}条</span>
        <span class="mnr_sp mnr_mrt">{{ page.pageSize + pageSizeOver }}条/页</span>
        <div class="mnrIndex">
            <a href="javascript:void(0)" class="mnr_prev" v-show="page.pageIndex > 1" @click="page.pageIndex <= 1 ? null : prev()">上一页</a>

            <a :href="getHref(1)"></a>
            <a href="javascript:void(0)" class="mnr_num" v-if="0 != page.pages" :class="page.pageIndex == 1 ? 'active' : ''" @click="goPage(1)">1</a>
            <a href="javascript:void(0)" class="mnr_num" v-if="left_">...</a>
            <!--<span class="mnr_sp mnr_mrt" v-if="left_">...</span>-->
            <a
                href="javascript:void(0)"
                :key="index"
                v-for="(i, index) in showPages"
                class="mnr_num"
                :class="{ active: page.pageIndex == i, for_num: index < showPages.length - 1 }"
                @click="goPage(i)"
            >
                {{ i }}
                <a :href="getHref(i)"></a>
            </a>
            <!--<span class="mnr_sp mnr_mrt" v-if="right_">...</span>-->

            <a href="javascript:void(0)" class="mnr_num" v-if="right_">...</a>
            <a
                href="javascript:void(0)"
                class="mnr_num"
                v-if="1 < page.pages"
                :class="page.pageIndex == page.pages ? 'active' : ''"
                @click="goPage(page.pages)"
            >
                {{ page.pages }}
                <a :href="getHref(page.pages)"></a>
            </a>

            <a
                href="javascript:void(0)"
                class="mnr_next"
                v-show="!(page.pages == 0 || page.pageIndex >= page.pages)"
                @click="page.pages == 0 || page.pageIndex >= page.pages ? null : next()"
            >
                下一页
            </a>
            <!-- <select class="form-control  pager-goto-input" v-model="pageSize" style="width: 100px;">
            <option value="5">5条/页</option>
            <option value="10">10条/页</option>
            <option value="15">15条/页</option>
            <option value="20">20条/页</option>
        </select> -->
        </div>
        <div class="mnrJeep">
            <span class="mnr_sp mnr_mrt">跳至</span>
            <input name type="number" class="mnr_ipt" v-model="curepage" @keyup="keyup($event)" min="1" @blur="go()" />
            <span class="mnr_sp">页</span>
            <!--<input type="button" value="确定" class="mnr_btn" @click="go();">  "-->
        </div>
    </div>
</template>
<!-- eslint-disable -->
<script>
/**
 page:{
      pageIndex:1,
      pageSize:10,
      pageCount:0,
    }
 <co-pagination :page="page" :getPage="getPage" />
 */

export default {
    name: 'coPagination',
    data() {
        return {
            pageSize: null,
            show: true,
            curepage: 1,
            showPages: null,
            left_: false,
            right_: false,
        };
    },
    props: {
        countOver: {
            type: Number,
            default: 0,
        },
        pageSizeOver: {
            type: Number,
            default: 0,
        },
        hrefFormat: null, //   /list?pageIndex={pageIndex}
        page: null,
        getPage: null,
        showSizeChanger: { default: true },
        showTotal: { default: true },
    },
    created() {
        //if (this.auto)
        //this.getPage();
    },
    watch: {
        'page.pageIndex': {
            immediate: true, // 很重要！！！
            handler: function (newV, oldV) {
                if (newV == null) return;
                if (this.getPage == null) return;
                this.getPages();
            },
        },
        pageSize: {
            immediate: true, // 很重要！！！
            handler: function (newV, oldV) {
                if (newV == this.page.pageSize) return;
                if (newV == null) return;
                if (this.getPage == null) return;
                this.curepage = 1;
                this.page.pageIndex = 1;
                this.page.pageSize = this.pageSize;
                this.getPages();
                this.getPage();
            },
        },
        'page.pageCount': {
            immediate: true, // 很重要！！！
            handler: function (newV, oldV) {
                if (newV == null) return;
                if (this.getPage == null) return;
                this.pageSize = this.page.pageSize;
                this.getPages();
                this.show = true;
            },
        },
    },
    methods: {
        getHref(pageIndex) {
            if (this.hrefFormat) {
                return StringUtil.fillPlaceholders(this.hrefFormat, {
                    pageIndex,
                });
            } else {
                return 'javascript:void(0)';
            }
        },
        onShowSizeChange(current, pageSize) {
            this.page.pageSize = pageSize;
            if (this.pageIndex == 1) {
                this.getPage();
            } else {
                this.pageIndex = 1;
            }
        },
        go() {
            var curepage = Number(this.curepage) || 1;
            var pageSize = this.page.pageSize;
            var pageCount = this.page.pageCount;
            var pages = Math.floor(pageCount / pageSize) + (pageCount % pageSize == 0 ? 0 : 1);
            if (curepage > pages) curepage = pages || 1;
            if (curepage <= 0) curepage = 1;
            this.curepage = curepage;
            this.goPage(curepage);
        },
        keyup($event) {
            var keycode = $event.keyCode;
            if (keycode == 13) {
                this.go();
            }
        },
        goPage(index) {
            if (index == null) index = this.page.pageIndex;
            this.page.pageIndex = index;
            this.getPage();
        },
        prev: function () {
            this.page.pageIndex--;
            this.goPage();
        },
        next: function () {
            this.page.pageIndex++;
            this.goPage();
        },
        getPages() {
            var pageCount = this.page.pageCount;
            if (pageCount == null) return;
            var pageIndex = this.page.pageIndex;
            var pageSize = this.page.pageSize;
            var pages = Math.floor(pageCount / pageSize) + (pageCount % pageSize == 0 ? 0 : 1);
            var length = 3;
            var p1 = pageIndex - 1;
            var p2 = pageIndex + 1;
            if (p1 < 1) {
                p1 = 1;
                p2 = 3;
            }
            if (p2 > pages) {
                p1 = pages > 3 ? pages - 3 : 1;
                p2 = pages;
            }
            var showPages = [];
            for (var i = p1; i <= p2; i++) {
                if (i <= 1 || i == pages) continue;
                showPages.push(i);
            }
            var left_ = null,
                right_ = null;
            if (p1 > 1 && p1 != 2) left_ = true;
            else left_ = false;
            if (p2 < pages && p2 != pages - 1) right_ = true;
            else right_ = false;
            this.showPages = showPages;
            this.page.pages = pages; //共几页
            this.left_ = left_;
            this.right_ = right_;
        },
    },
};
</script>
<style scoped>
/*分页*/
.mnr_page {
    text-align: center;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mnr_page .mnr_np {
    display: inline-block;
    width: 56px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    border: 1px solid #e9e9e9;
    font-size: 12px;
    color: #000000;
    background: #fff;
    margin: 0 2px;
}

.mnr_page .mnr_np:hover {
    background: #eb0010;
    color: #fff;
}

.mnr_page .mnr_np.active {
    background: #eb0010;
    color: #fff;
}

.mnr_page .mnr_np.forbit {
    color: #cccccc;
    background: #fff;
}

.mnr_page .mnr_num {
    color: #999;
    font-size: 16px;
    display: inline-block;
    line-height: 40px;
    text-align: center;
    background: #fff;
    margin: 0 3px;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid #e9e9e9;
    border-radius: 2px;
}

.mnr_page .mnr_num:hover {
    /* background: rgba(255, 89, 89, 1); */
    color: #fff;
    border: 1px solid rgba(255, 89, 89, 1);
    background: linear-gradient(133deg, #f07963 16%, #e73928 80%);
}

.mnr_page .mnr_num.active {
    background: linear-gradient(133deg, #f07963 16%, #e73928 80%);
    /* background: rgba(255, 89, 89, 1); */
    color: #fff;
    border: 1px solid rgba(255, 89, 89, 1);
}

.mnr_page .mnr_sl {
    color: #000000;
    font-size: 16px;
    display: inline-block;
    padding: 0 5px;
}
.mnr_page .mnr_sp {
    font-size: 14px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #999999;
}
.mnr_page .mnr_sp.mnr_mrt {
    margin-left: 10px;
}
.mnr_page .mnr_ipt {
    border: 1px solid #e9e9e9;
    line-height: 30px;
    outline: none;
    font-size: 16px;
    text-align: center;
    width: 40px;
    height: 40px;
    background: rgba(250, 250, 250, 1);
    box-shadow: 0px 3px 1px 0px rgba(255, 255, 255, 0.77), 0px 2px 2px 0px rgba(191, 191, 191, 1);
    border-radius: 2px;
    margin: 0 6px;
    color: #999;
    -webkit-appearance: none;
}
.mnr_page .mnr_btn {
    border: 1px solid #e9e9e9;
    background: #fff;
    font-size: 12px;
    margin-left: 10px;
    line-height: 23px;
    height: 25px;
    width: 48px;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
    outline: none;
    color: #666666;
}

.mnr_page .mnr_prev,
.mnr_page .mnr_next {
    display: inline-block;
    line-height: 40px;
    text-align: center;
    margin: 0 3px;
    width: 80px;
    height: 40px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid #e9e9e9;
    border-radius: 2px;
    font-size: 16px;
    font-weight: 400;
    color: #999;
}
.mnrIndex {
    margin: 0 12px;
}
.mnrJeep {
    margin-left: 18px;
    display: flex;
    align-items: center;
    font-size: 16px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

input[type='number'] {
    -moz-appearance: textfield;
}
a {
    margin: 0;
    padding: 0;
}
.mnr_page .for_num {
    margin-right: 6px;
}
.mnr_page .for_num:last-child {
    margin-right: 0px;
}
</style>
